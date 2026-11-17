import type { Metadata } from 'next';
import Link from 'next/link';
import { AudioLines, BookmarkCheck, CheckCircle2, ClipboardPaste, CloudDownload, FileVideo2, FolderSync, Gauge, LockKeyhole, MoveRight, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import DownloadTool from '@/components/download-tool';
import FAQAccordion from '@/components/faq-accordion';
import AdSlot from '@/components/ad-slot';
import { faqs } from '@/lib/faqs';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'TikTok Video Saver for Your Own Creator Archive',
  description: 'Back up public TikTok videos you created or are authorized to save. Get creator-friendly HD video and audio archive options in a simple browser workflow.',
  alternates: { canonical: '/' },
  openGraph: { title: 'TikSave Pro — Creator Backup Utility', description: SITE_DESCRIPTION, url: absoluteUrl('/') },
};

const features = [
  { icon: FileVideo2, title: 'A second copy of your work', text: 'Keep an exported version close for review, repurposing, or a future edit—alongside your original project files.' },
  { icon: Gauge, title: 'A clear, quick workflow', text: 'Paste a public post link, check the returned creator details, then choose an available video or audio format.' },
  { icon: AudioLines, title: 'Video and audio options', text: 'When the source provider makes them available, choose an HD file, a standard video, or an audio-only copy.' },
  { icon: LockKeyhole, title: 'No account needed here', text: 'The tool does not ask for your TikTok password or private account access. Only public post URLs are supported.' },
  { icon: BookmarkCheck, title: 'Made for personal archives', text: 'Build a tidy personal copy of work you own or have permission to save, without turning it into a public repost.' },
  { icon: ShieldCheck, title: 'Rights-first by design', text: 'A download option is not a license. Copyright, music, privacy, and platform rules still apply to every file.' },
];
const steps = [
  { number: '01', icon: ClipboardPaste, title: 'Copy a public link', text: 'Open a public post you created or are allowed to archive, then copy its share URL.' },
  { number: '02', icon: WandSparkles, title: 'Review the match', text: 'Paste the URL and fetch. Check the creator, caption, and thumbnail before you continue.' },
  { number: '03', icon: CloudDownload, title: 'Save your own copy', text: 'Choose an available video or audio option and file it with your original project assets.' },
];

const webApplicationJsonLd = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: SITE_NAME, url: absoluteUrl('/'), applicationCategory: 'MultimediaApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript and a modern browser', description: SITE_DESCRIPTION, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Personal creator backup workflow', 'Public link metadata preview', 'Available video and audio archive formats'],
};
const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };

export default function HomePage() {
  return <>
    <section className="relative isolate overflow-hidden pb-16 pt-16 sm:pt-24 lg:pb-24 lg:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><div className="absolute -left-48 top-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" /><div className="absolute -right-48 top-0 h-[460px] w-[460px] rounded-full bg-rose-500/10 blur-[135px]" /><div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.045),transparent_55%)]" /></div>
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-8">
        <div>
          <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/5 px-3 py-1.5"><Sparkles size={14} /> Creator backup studio</div>
          <h1 className="mt-6 max-w-[760px] font-display text-4xl font-extrabold leading-[1.08] tracking-[-.045em] text-white sm:text-5xl lg:text-[3.75rem]">Archive Your TikTok Creations in <span className="gradient-text">Crystal-Clear HD</span></h1>
          <p className="mt-5 max-w-[620px] text-base leading-7 text-zinc-300 sm:text-lg">A fast, browser-first way to make a personal copy of your public creator work. Check available video and audio files, then save them directly to your device—no watermark option when the source supports it.</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400"><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> No TikTok password</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> Public links only</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300" /> Creator-first use</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[500px] lg:mr-0" aria-label="Preview of a creator archive card">
          <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-br from-cyan-400/10 to-rose-500/10 blur-2xl" />
          <div className="glass relative rotate-[1deg] rounded-[28px] p-4 shadow-2xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="text-xs font-semibold uppercase tracking-[.16em] text-zinc-400">Archive preview</span></div><span className="rounded-full border border-cyan-200/20 bg-cyan-200/5 px-2.5 py-1 text-[11px] font-semibold text-cyan-100">READY TO FILE</span></div>
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#101317]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(0,242,254,.33),transparent_35%),radial-gradient(ellipse_at_82%_72%,rgba(255,0,80,.3),transparent_38%),linear-gradient(135deg,#12151a,#242029_58%,#121317)]" />
              <div className="relative flex aspect-[1.75/1] items-center justify-center overflow-hidden">
                <div className="absolute left-[17%] top-[12%] h-32 w-20 rotate-[-13deg] rounded-[18px] border border-white/15 bg-zinc-900/60 shadow-2xl backdrop-blur-sm sm:h-40 sm:w-24"><div className="absolute inset-x-2 top-3 h-1 rounded-full bg-white/20" /><div className="absolute bottom-3 left-2 right-2 h-10 rounded-xl bg-gradient-to-br from-cyan-300/40 to-cyan-900/30" /></div>
                <div className="absolute right-[17%] top-[12%] h-32 w-20 rotate-[12deg] rounded-[18px] border border-white/15 bg-zinc-900/60 shadow-2xl backdrop-blur-sm sm:h-40 sm:w-24"><div className="absolute inset-x-2 top-3 h-1 rounded-full bg-white/20" /><div className="absolute bottom-3 left-2 right-2 h-10 rounded-xl bg-gradient-to-br from-rose-300/40 to-rose-900/30" /></div>
                <div className="relative grid h-24 w-24 place-items-center rounded-[30px] border border-white/20 bg-zinc-900/70 shadow-[0_0_80px_rgba(0,242,254,.19)] backdrop-blur-xl"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-rose-500 text-zinc-950"><FolderSync size={29} strokeWidth={1.8} /></div><div className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full border-4 border-zinc-900 bg-emerald-400 text-zinc-950"><CheckCircle2 size={16} strokeWidth={3} /></div></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4"><div><p className="font-display text-sm font-bold text-white">Creator archive / 2026</p><p className="mt-1 text-xs text-zinc-500">Originals, exports, and notes in one place</p></div><div className="flex -space-x-2"><span className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-cyan-300 to-blue-700" /><span className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-rose-300 to-rose-700" /><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-zinc-900 bg-zinc-700 text-[10px] font-semibold">+1</span></div></div>
          </div>
          <div className="glass absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:flex"><div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><ShieldCheck size={18} /></div><div><p className="text-xs font-semibold text-white">Rights-aware workflow</p><p className="text-[11px] text-zinc-500">Save work you own or may use</p></div></div>
        </div>
      </div>
      <div className="container-shell mt-14 max-w-4xl text-center sm:mt-20"><DownloadTool /><p className="mx-auto mt-5 max-w-2xl text-xs leading-5 text-zinc-500">Media links are requested from a third-party processing provider. TikSave Pro does not store a personal media library. Only archive content you own or have permission to save.</p></div>
    </section>

    <div className="container-shell pb-6"><AdSlot size="leaderboard" /></div>

    <section id="how-it-works" className="section-space border-y border-white/[.06] bg-zinc-900/25">
      <div className="container-shell"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">A simple, careful process</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Three steps to a calmer archive</h2><p className="mt-4 text-zinc-400">A downloadable copy helps with continuity. Your original footage and editable project files are still the most dependable master archive.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{steps.map((step, index) => <article key={step.number} className="glass relative rounded-2xl p-6"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-cyan-200"><step.icon size={22} /></span><span className="font-display text-3xl font-extrabold text-white/10">{step.number}</span></div><h3 className="mt-6 font-display text-lg font-bold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{step.text}</p>{index < 2 && <MoveRight aria-hidden="true" size={17} className="absolute -right-3 top-11 z-10 hidden text-zinc-600 md:block" />}</article>)}</div>
      </div>
    </section>

    <section id="audio" className="section-space"><div className="container-shell"><div className="grid items-end gap-6 md:grid-cols-[1fr_auto]"><div><p className="eyebrow">Built around creative continuity</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Useful tools for the work behind the post</h2><p className="mt-4 max-w-2xl text-zinc-400">Save a reference copy, keep track of exports, and make your next production session easier to pick up.</p></div><Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">Read creator guides <MoveRight size={16} /></Link></div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(feature => <article key={feature.title} className="glass rounded-2xl p-6 transition hover:-translate-y-0.5 hover:border-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-300/15 to-rose-400/15 text-cyan-200"><feature.icon size={21} /></span><h3 className="mt-5 font-display text-lg font-bold text-zinc-100">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{feature.text}</p></article>)}</div>
    </div></section>

    <section className="container-shell pb-8"><AdSlot size="rectangle" /></section>

    <section className="section-space border-y border-white/[.06] bg-zinc-900/25"><div className="container-shell"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Good to know</p><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently asked questions</h2><p className="mt-4 text-zinc-400">Clear answers about eligibility, formats, storage, and creator rights.</p></div><div className="mx-auto mt-9 max-w-3xl"><FAQAccordion /></div></div></section>

    <section className="section-space"><div className="container-shell"><div className="glass relative overflow-hidden rounded-[28px] px-6 py-10 sm:px-10 sm:py-14"><div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-cyan-300/10 blur-[90px]" /><div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="eyebrow">Make the next session easier</p><h2 className="mt-3 max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">Keep the files you need to keep creating.</h2><p className="mt-3 max-w-xl text-sm text-zinc-400">Browse practical guides to workflow, lighting, sound, editing, and responsible reuse.</p></div><Link href="/blog" className="gradient-button inline-flex min-h-12 items-center gap-2 rounded-xl px-5 text-sm">Visit the Creator Blog <MoveRight size={17} /></Link></div></div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
  </>;
}
