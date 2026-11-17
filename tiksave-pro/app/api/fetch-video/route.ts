import { NextRequest, NextResponse } from 'next/server';
import { isTikTokPageUrl } from '@/lib/utils';
import { clientKey, isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function text(value: unknown): string { return typeof value === 'string' ? value : typeof value === 'number' ? String(value) : ''; }
function normalizePayload(payload: unknown) {
  const root = payload && typeof payload === 'object' ? payload as Record<string, any> : {};
  const data = root.data && typeof root.data === 'object' ? root.data as Record<string, any> : root;
  const author = data.author && typeof data.author === 'object' ? data.author : root.author && typeof root.author === 'object' ? root.author : {};
  const video = data.video && typeof data.video === 'object' ? data.video : {};
  const audio = data.music && typeof data.music === 'object' ? data.music : {};
  const normalized = {
    id: text(data.id || data.aweme_id || data.video_id || video.id),
    title: text(data.title || data.desc || data.description || video.title),
    cover: text(data.cover || data.origin_cover || data.thumbnail || video.cover),
    duration: data.duration ?? video.duration ?? 0,
    hdplay: text(data.hdplay || data.hd_play || data.no_watermark || video.hdplay || video.play_addr),
    play: text(data.play || data.play_url || video.play || video.play_addr),
    music: text(data.music || data.music_url || audio.play || audio.url || audio.music),
    author: { nickname: text(author.nickname || author.name), unique_id: text(author.unique_id || author.uniqueId || author.username), avatar: text(author.avatar || author.avatar_thumb || author.avatar_url) },
  };
  if (!normalized.id || (!normalized.hdplay && !normalized.play)) throw new Error('The provider did not return downloadable media for this post.');
  return normalized;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(`fetch:${clientKey(request)}`, 20, 60_000)) return NextResponse.json({ error: 'Too many requests. Please wait a minute and try again.' }, { status: 429 });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 4096) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
  let body: { url?: unknown };
  try { const raw = await request.text(); if (raw.length > 4096) return NextResponse.json({ error: 'Request is too large.' }, { status: 413 }); const parsed: unknown = JSON.parse(raw); if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return NextResponse.json({ error: 'Send a valid JSON body.' }, { status: 400 }); body = parsed as { url?: unknown }; } catch { return NextResponse.json({ error: 'Send a valid JSON body.' }, { status: 400 }); }
  const videoUrl = typeof body.url === 'string' ? body.url.trim() : '';
  if (videoUrl.length > 2048 || !isTikTokPageUrl(videoUrl)) return NextResponse.json({ error: 'Enter a valid HTTPS TikTok post URL.' }, { status: 400 });

  const apiKey = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST || 'tiktok-video-no-watermark2.p.rapidapi.com';
  if (!apiKey) return NextResponse.json({ error: 'Video fetching is not configured yet. Please try again later.' }, { status: 503 });
  if (!/^[a-z0-9.-]+\.p\.rapidapi\.com$/i.test(host)) return NextResponse.json({ error: 'The video provider configuration is invalid.' }, { status: 500 });

  try {
    const upstream = await fetch(`https://${host}/`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(18_000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-rapidapi-host': host, 'x-rapidapi-key': apiKey, 'Accept': 'application/json' },
      body: new URLSearchParams({ url: videoUrl, hd: '1' }),
    });
    if (!upstream.ok) {
      const status = upstream.status === 429 ? 429 : 502;
      return NextResponse.json({ error: upstream.status === 429 ? 'The provider is busy. Please wait a moment and retry.' : 'The video provider could not process this link.' }, { status });
    }
    const payload = await upstream.json();
    if (payload?.code && Number(payload.code) !== 0 && Number(payload.code) !== 200) return NextResponse.json({ error: text(payload.message) || 'The post could not be processed.' }, { status: 422 });
    try { return NextResponse.json(normalizePayload(payload), { headers: { 'Cache-Control': 'no-store' } }); }
    catch { return NextResponse.json({ error: 'No downloadable media was returned. The post may be private or unavailable.' }, { status: 422 }); }
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    return NextResponse.json({ error: timedOut ? 'The provider took too long to respond. Please retry.' : 'Could not reach the video provider.' }, { status: 502 });
  }
}
