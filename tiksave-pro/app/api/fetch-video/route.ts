import { NextRequest, NextResponse } from 'next/server';
import { isTikTokPageUrl } from '@/lib/utils';
import { clientKey, isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function text(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

// RapidAPI providers return media links in several shapes: strings, url_list arrays,
// or objects containing url/uri/url_list. Normalize those without trusting arbitrary fields.
function mediaUrl(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && /^https:\/\//i.test(value)) return value;
    if (Array.isArray(value)) {
      const found = mediaUrl(...value);
      if (found) return found;
    }
    if (value && typeof value === 'object') {
      const item = value as Record<string, unknown>;
      const found = mediaUrl(item.url, item.uri, item.url_list, item.play_addr, item.download_addr);
      if (found) return found;
    }
  }
  return '';
}

function normalizePayload(payload: unknown) {
  const root = payload && typeof payload === 'object' ? payload as Record<string, any> : {};
  const data = root.data && typeof root.data === 'object' && !Array.isArray(root.data)
    ? root.data as Record<string, any>
    : root;
  const video = data.video && typeof data.video === 'object' ? data.video : {};
  const author = data.author && typeof data.author === 'object'
    ? data.author
    : root.author && typeof root.author === 'object' ? root.author : {};
  const music = data.music && typeof data.music === 'object' ? data.music : {};

  const hdplay = mediaUrl(
    data.hdplay, data.hd_play, data.no_watermark, data.without_watermark,
    data.play, data.play_url, data.video_url, video.hdplay, video.hd_play,
    video.no_watermark, video.play, video.play_addr, video.download_addr,
  );
  const play = mediaUrl(
    data.play, data.play_url, data.video_url, data.wmplay, data.wm_play,
    video.play, video.play_addr, video.url, video.download_addr, hdplay,
  );
  const normalized = {
    id: text(data.id || data.aweme_id || data.video_id || video.id || data.awemeId),
    title: text(data.title || data.desc || data.description || video.title),
    cover: mediaUrl(data.cover, data.origin_cover, data.thumbnail, video.cover, video.origin_cover),
    duration: data.duration ?? video.duration ?? 0,
    hdplay: hdplay || play,
    play: play || hdplay,
    music: mediaUrl(data.music_url, data.music_play, music.play, music.url, music.play_url),
    author: {
      nickname: text(author.nickname || author.name || author.unique_id),
      unique_id: text(author.unique_id || author.uniqueId || author.username),
      avatar: mediaUrl(author.avatar, author.avatar_thumb, author.avatar_url),
    },
  };

  if (!normalized.id || (!normalized.hdplay && !normalized.play)) {
    throw new Error('The provider response did not contain a video ID and playable media URL.');
  }
  return normalized;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(`fetch:${clientKey(request)}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute and try again.' }, { status: 429 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4096) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });

  let body: { url?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 4096) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Send a valid JSON body.' }, { status: 400 });
    }
    body = parsed as { url?: unknown };
  } catch {
    return NextResponse.json({ error: 'Send a valid JSON body.' }, { status: 400 });
  }

  const videoUrl = typeof body.url === 'string' ? body.url.trim() : '';
  if (videoUrl.length > 2048 || !isTikTokPageUrl(videoUrl)) {
    return NextResponse.json({ error: 'Enter a valid HTTPS TikTok post URL.' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST || 'tiktok-video-no-watermark2.p.rapidapi.com';
  if (!apiKey) {
    return NextResponse.json({ error: 'Video fetching is not configured. Add RAPIDAPI_KEY in Vercel Environment Variables.' }, { status: 503 });
  }
  if (!/^[a-z0-9.-]+\.p\.rapidapi\.com$/i.test(host)) {
    return NextResponse.json({ error: 'The video provider configuration is invalid.' }, { status: 500 });
  }

  try {
    const endpoint = new URL(`https://${host}/`);
    endpoint.searchParams.set('url', videoUrl);
    endpoint.searchParams.set('hd', '1');

    const upstream = await fetch(endpoint, {
      method: 'GET',
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
      headers: {
        'X-RapidAPI-Host': host,
        'X-RapidAPI-Key': apiKey,
        Accept: 'application/json',
      },
    });

    const responseText = await upstream.text();
    let payload: any;
    try {
      payload = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: 'The video provider returned an invalid response. Check the RapidAPI subscription and endpoint.' },
        { status: 502 },
      );
    }

    if (!upstream.ok) {
      const message = text(payload?.message || payload?.error);
      if (upstream.status === 429) {
        return NextResponse.json({ error: 'RapidAPI quota or rate limit reached. Check your RapidAPI plan.' }, { status: 429 });
      }
      if (upstream.status === 401 || upstream.status === 403) {
        return NextResponse.json({ error: 'RapidAPI rejected the key or subscription. Check RAPIDAPI_KEY and subscribe to this API.' }, { status: 502 });
      }
      return NextResponse.json({ error: message || `The video provider returned HTTP ${upstream.status}.` }, { status: 502 });
    }

    if (payload?.code !== undefined && ![0, 200].includes(Number(payload.code))) {
      return NextResponse.json({ error: text(payload.message || payload.msg) || 'The post could not be processed.' }, { status: 422 });
    }
    if (payload?.success === false || payload?.status === 'error') {
      return NextResponse.json({ error: text(payload.message || payload.error) || 'The post could not be processed.' }, { status: 422 });
    }

    try {
      return NextResponse.json(normalizePayload(payload), { headers: { 'Cache-Control': 'no-store' } });
    } catch {
      return NextResponse.json(
        { error: 'The provider responded, but no downloadable video URL was found in its response.' },
        { status: 422 },
      );
    }
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    return NextResponse.json(
      { error: timedOut ? 'The provider took too long to respond. Please retry.' : 'Could not reach the video provider. Please retry.' },
      { status: 502 },
    );
  }
}
