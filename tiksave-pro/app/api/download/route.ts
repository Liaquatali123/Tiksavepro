import { NextRequest, NextResponse } from 'next/server';
import { safeFilename } from '@/lib/utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_CDN_ROOTS = [
  'tiktok.com', 'tiktokcdn.com', 'tiktokcdn-us.com', 'tiktokcdn-eu.com',
  'tiktokv.com', 'tiktokv.us', 'byteoversea.com', 'ibytedtos.com',
  'ibyteimg.com', 'muscdn.com', 'tokcdn.com',
];
const MAX_BYTES = 300 * 1024 * 1024;
const MAX_REDIRECTS = 4;

function isAllowedCdn(hostname: string) {
  return ALLOWED_CDN_ROOTS.some((root) => hostname === root || hostname.endsWith(`.${root}`));
}

function safeRemoteUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.username || url.password ||
        !isAllowedCdn(url.hostname) || (url.port && url.port !== '443')) return null;
    return url;
  } catch {
    return null;
  }
}

function disposition(filename: string) {
  const clean = safeFilename(filename).replace(/\.(mp4|mp3)$/i, '');
  const extension = /\.mp3$/i.test(filename) ? 'mp3' : 'mp4';
  const ascii = `${clean}.${extension}`;
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(ascii)}`;
}

export async function GET(request: NextRequest) {
  const rawFileUrl = request.nextUrl.searchParams.get('fileUrl') || '';
  const filename = request.nextUrl.searchParams.get('filename') || 'tiksave-archive.mp4';
  if (!rawFileUrl || rawFileUrl.length > 4096) {
    return NextResponse.json({ error: 'A media URL is required.' }, { status: 400 });
  }
  let submittedUrl: URL;
  try {
    submittedUrl = new URL(rawFileUrl);
  } catch {
    return NextResponse.json({ error: 'The media URL is invalid.' }, { status: 400 });
  }
  if (submittedUrl.protocol !== 'https:') {
    return NextResponse.json({ error: 'The media URL must use HTTPS.' }, { status: 400 });
  }
  if (submittedUrl.username || submittedUrl.password || (submittedUrl.port && submittedUrl.port !== '443')) {
    return NextResponse.json({ error: 'The media URL contains an unsupported address or port.' }, { status: 400 });
  }
  if (!isAllowedCdn(submittedUrl.hostname)) {
    // Report only the hostname, never the signed URL or its query parameters.
    return NextResponse.json(
      { error: `Unsupported TikTok media CDN host: ${submittedUrl.hostname}. Add this verified TikTok CDN host to the server allowlist.` },
      { status: 400 },
    );
  }

  // Forward valid byte ranges so mobile browsers can resume large downloads.
  const range = request.headers.get('range');
  if (range && !/^bytes=\d*-\d*(,\d*-\d*)*$/.test(range)) {
    return NextResponse.json({ error: 'Invalid download range.' }, { status: 400 });
  }

  let current = rawFileUrl;
  let upstream: Response | undefined;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const target = safeRemoteUrl(current);
    if (!target) return NextResponse.json({ error: 'The media host is not on the allowed CDN list.' }, { status: 400 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25_000);
    try {
      const headers = new Headers({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Referer: 'https://www.tiktok.com/',
        Accept: 'video/*,audio/*,application/octet-stream;q=0.9,*/*;q=0.5',
      });
      if (range) headers.set('Range', range);
      upstream = await fetch(target, {
        method: 'GET', redirect: 'manual', cache: 'no-store',
        signal: controller.signal, headers,
      });
    } catch {
      clearTimeout(timer);
      return NextResponse.json({ error: 'The media server could not be reached. Please retry the download.' }, { status: 502 });
    }
    clearTimeout(timer);

    if ([301, 302, 303, 307, 308].includes(upstream.status)) {
      const location = upstream.headers.get('location');
      if (!location || hop === MAX_REDIRECTS) {
        return NextResponse.json({ error: 'The media server redirected too many times.' }, { status: 502 });
      }
      try {
        current = new URL(location, target).toString();
      } catch {
        return NextResponse.json({ error: 'The media server returned an invalid redirect.' }, { status: 502 });
      }
      await upstream.body?.cancel().catch(() => undefined);
      continue;
    }
    break;
  }

  if (!upstream || !(upstream.status === 200 || upstream.status === 206) || !upstream.body) {
    return NextResponse.json({ error: 'The media file is unavailable from its source.' }, { status: 502 });
  }

  const type = (upstream.headers.get('content-type') || 'application/octet-stream').split(';')[0].trim().toLowerCase();
  if (!(type.startsWith('video/') || type.startsWith('audio/') ||
        type === 'application/octet-stream' || type === 'binary/octet-stream')) {
    await upstream.body.cancel().catch(() => undefined);
    return NextResponse.json({ error: 'The source did not return a video or audio file.' }, { status: 415 });
  }

  const contentLength = Number(upstream.headers.get('content-length') || 0);
  if (contentLength > MAX_BYTES) {
    await upstream.body.cancel().catch(() => undefined);
    return NextResponse.json({ error: 'This file exceeds the 300 MB download limit.' }, { status: 413 });
  }

  let bytes = 0;
  const limited = upstream.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      bytes += chunk.byteLength;
      if (bytes > MAX_BYTES) {
        controller.error(new Error('Download limit exceeded'));
        return;
      }
      controller.enqueue(chunk);
    },
  }));

  const responseHeaders: Record<string, string> = {
    'Content-Type': type,
    'Content-Disposition': disposition(filename),
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Accept-Ranges': upstream.headers.get('accept-ranges') || 'bytes',
  };
  if (contentLength > 0) responseHeaders['Content-Length'] = String(contentLength);
  const contentRange = upstream.headers.get('content-range');
  if (contentRange) responseHeaders['Content-Range'] = contentRange;

  return new Response(limited, { status: upstream.status, headers: responseHeaders });
}
