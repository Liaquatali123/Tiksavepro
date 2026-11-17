import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookOpenText, Clock3 } from 'lucide-react';
import { posts } from '@/lib/blog';
import { absoluteUrl, SITE_DESCRIPTION } from '@/lib/site';

export const metadata: Metadata = { title: 'Creator Blog: Video, Audio & Workflow Guides', description: 'Practical, original guides to short-form video production, editing, audio, creator rights, and sustainable workflows.', alternates: { canonical: '/blog' }, openGraph: { title: 'Creator Blog | TikSave Pro', description: SITE_DESCRIPTION, url: absoluteUrl('/blog') } };

export default function BlogIndexPage() {
  return <div className="section-space"><div className="container-shell">
    <div className="max-w-3xl"><p className="eyebrow inline-flex items-center gap-2"><BookOpenText size={15} /> The Creator Blog</p><h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Practical notes for making better short-form work.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">Original guides on the craft around every post—from lighting and dialogue to rights, editing, and a backup habit you can keep.</p></div>
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((post, index) => <article key={post.slug} className="glass group flex min-h-[300px] flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-200/30">
      <div className="flex items-center justify-between gap-3"><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-100">{post.category}</span><span className="font-display text-3xl font-bold text-white/10">{String(index + 1).padStart(2, '0')}</span></div>
      <h2 className="mt-5 font-display text-xl font-bold leading-snug text-white"><Link href={`/blog/${post.slug}`} className="focus-visible:rounded-sm">{post.title}</Link></h2><p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{post.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500"><span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readTime}</span><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="inline-flex items-center gap-1 font-semibold text-cyan-200 group-hover:text-white">Read guide <ArrowUpRight size={14} /></Link></div>
    </article>)}</div>
    <p className="mt-10 max-w-3xl text-xs leading-6 text-zinc-500">Our guides are educational, not legal advice. Copyright and licensing rules vary by location and intended use; consult a qualified professional when you need a definitive answer.</p>
  </div></div>;
}
