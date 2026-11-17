'use client';
import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AudioLines, ClipboardPaste, Clock3, Download, FileVideo2, LoaderCircle, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { isTikTokPageUrl } from '@/lib/utils';

type VideoResult = {
  id: string;
  title: string;
  cover: string;
  duration: number | string;
  hdplay: string;
  play: string;
  music: string;
  author: { nickname: string; unique_id: string; avatar: string };
};

function downloadHref(fileUrl: string, filename: string) {
  return `/api/download?fileUrl=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(filename)}`;
}

function safeName(value: string) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 55) || 'TikSave-Video';
}

function fileName(result: VideoResult, kind: 'HD' | 'Standard' | 'Audio') {
  const creator = safeName(result.author?.unique_id || result.author?.nickname || 'TikTok');
  const id = safeName(result.id || 'video');
  return `TikSave-${creator}-${id}-${kind}.${kind === 'Audio' ? 'mp3' : 'mp4'}`;
}

function downloadMedia(fileUrl: string, filename: string) {
  // Let the browser consume the API response as a streamed attachment.
  // Do not fetch it into a Blob: that buffers the complete video in mobile RAM.
  const anchor = document.createElement('a');
  anchor.href = downloadHref(fileUrl, filename);
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function durationLabel(value: number | string) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return 'Duration unavailable';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

export default function DownloadTool() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<VideoResult | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  async function startDownload(fileUrl: string, kind: 'HD' | 'Standard' | 'Audio') {
    if (!result || downloading) return;
    const filename = fileName(result, kind);
    setDownloading(kind);
    try {
      await downloadMedia(fileUrl, filename);
      toast.success(`${filename} download started.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Download failed. Please retry.');
    } finally {
      setDownloading(null);
    }
  }

  async function pasteLink() {
    try {
      if (!navigator.clipboard?.readText) {
        throw new Error('Clipboard access is not available in this browser. Paste the link into the field instead.');
      }
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) { toast.info('Your clipboard is empty.'); return; }
      setUrl(text);
      toast.success('Link pasted. Check it before fetching.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not read your clipboard.');
    }
  }

  async function fetchVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = url.trim();
    if (!isTikTokPageUrl(trimmed)) {
      toast.error('Enter a secure public TikTok link, such as tiktok.com/@name/video/…');
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch('/api/fetch-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'We could not fetch this post. Check the URL and try again.');
      setResult(payload as VideoResult);
      setCoverFailed(false);
      setAvatarFailed(false);
      toast.success('Your archive options are ready.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form onSubmit={fetchVideo} className="glass flex flex-col gap-2 rounded-[22px] p-2 shadow-glow sm:flex-row sm:items-center">
        <label htmlFor="tiktok-url" className="sr-only">Public TikTok video URL</label>
        <input id="tiktok-url" type="url" inputMode="url" autoComplete="url"
          placeholder="Paste a public TikTok video link here…" value={url}
          onChange={(e) => setUrl(e.target.value)} aria-describedby="url-help"
          className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-white placeholder:text-zinc-500 focus:outline-none" />
        {url && <button type="button" onClick={() => { setUrl(''); setResult(null); }}
          aria-label="Clear link" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"><X size={18} /></button>}
        <button type="button" onClick={pasteLink}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"><ClipboardPaste size={16} /> Paste</button>
        <button type="submit" disabled={busy}
          className="gradient-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm">
          {busy ? <><LoaderCircle size={17} className="animate-spin" /> Fetching</> : <>Fetch Video <span aria-hidden="true">→</span></>}
        </button>
      </form>
      <p id="url-help" className="mt-3 px-2 text-left text-xs leading-5 text-zinc-500">
        Use a public post you created or have permission to archive. Private links and login-protected content are not supported.
      </p>

      <AnimatePresence mode="wait">
        {result && (
          <motion.section key={result.id} initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }} aria-label="Video download options"
            className="glass mt-7 overflow-hidden rounded-3xl text-left">
            <div className="grid gap-0 md:grid-cols-[220px_1fr]">
              <div className="relative min-h-56 bg-zinc-800 md:min-h-full">
                {result.cover && !coverFailed ? <Image src={result.cover} alt="Video cover" fill unoptimized
                  sizes="(max-width: 768px) 100vw, 220px" className="object-cover" onError={() => setCoverFailed(true)} /> :
                  <div aria-label="Video cover preview unavailable" className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_20%_25%,rgba(0,242,254,.32),transparent_40%),radial-gradient(ellipse_at_80%_75%,rgba(255,0,80,.30),transparent_42%),linear-gradient(135deg,#111318,#25212a)]">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-black/25 text-white/80 backdrop-blur"><FileVideo2 size={25} /></div>
                  </div>}
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white"><Clock3 size={13} />{durationLabel(result.duration)}</span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  {result.author.avatar && !avatarFailed ? <Image src={result.author.avatar} alt="" width={42} height={42} unoptimized
                    onError={() => setAvatarFailed(true)} className="h-[42px] w-[42px] rounded-full border border-white/15 object-cover" /> :
                    <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-zinc-800 text-sm font-bold text-cyan-200">{result.author.nickname?.slice(0, 1) || 'C'}</span>}
                  <div><p className="font-semibold text-white">{result.author.nickname || 'Creator'}</p><p className="text-xs text-zinc-400">@{result.author.unique_id || 'creator'}</p></div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-300">{result.title || 'Your video is ready to archive.'}</p>
                <div className="mt-5 grid gap-2.5">
                  {result.hdplay && <button type="button" disabled={!!downloading} onClick={() => startDownload(result.hdplay, 'HD')}
                    className="gradient-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-center text-sm disabled:opacity-60">
                    {downloading === 'HD' ? <LoaderCircle size={17} className="animate-spin" /> : <Download size={17} />} {downloading === 'HD' ? 'Preparing download…' : 'Download MP4 (HD • No Watermark)'}
                  </button>}
                  {result.play && <button type="button" disabled={!!downloading} onClick={() => startDownload(result.play, 'Standard')}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-center text-sm font-semibold text-zinc-100 transition hover:bg-white/10 disabled:opacity-60">
                    {downloading === 'Standard' ? <LoaderCircle size={17} className="animate-spin" /> : <Download size={17} />} {downloading === 'Standard' ? 'Preparing download…' : 'Download MP4 (Standard)'}
                  </button>}
                  {result.music && <button type="button" disabled={!!downloading} onClick={() => startDownload(result.music, 'Audio')}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cyan-300/40 px-4 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10 disabled:opacity-60">
                    {downloading === 'Audio' ? <LoaderCircle size={17} className="animate-spin" /> : <AudioLines size={17} />} {downloading === 'Audio' ? 'Preparing download…' : 'Extract Audio (MP3)'}
                  </button>}
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-cyan-300" /> Keep this copy for a use you’re authorized to make. Original creator and music rights remain with their respective owners.</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
