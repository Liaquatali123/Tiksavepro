import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { getPost, posts } from '@/lib/blog';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

type Props = { params: { slug: string } };
export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: 'Article not found' };
  const url = absoluteUrl(`/blog/${post.slug}`);
  return { title: post.title, description: post.description, alternates: { canonical: url }, openGraph: { type: 'article', title: post.title, description: post.description, url, publishedTime: post.published, siteName: SITE_NAME }, twitter: { card: 'summary_large_image', title: post.title, description: post.description } };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const url = absoluteUrl(`/blog/${post.slug}`);
  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.published, dateModified: post.published, author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/about') }, publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') }, mainEntityOfPage: { '@type': 'WebPage', '@id': url } };
  return <article className="section-space"><div className="container-shell">
    <div className="mx-auto max-w-[760px]"><Link href="/blog" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white"><ArrowLeft size={16} /> All creator guides</Link>
      <div className="mt-9 flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full border border-cyan-200/20 bg-cyan-200/5 px-3 py-1 font-semibold text-cyan-100">{post.category}</span><span className="inline-flex items-center gap-1.5 text-zinc-500"><Clock3 size={13} />{post.readTime}</span><time dateTime={post.published} className="text-zinc-500">Updated {new Date(`${post.published}T12:00:00Z`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time></div>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-[-.035em] text-white sm:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-8 text-zinc-300">{post.description}</p>
      <div className="prose-page mt-10 border-t border-white/10 pt-7">{post.intro.map((paragraph, i) => <p key={`intro-${i}`} className="mb-5 leading-8">{paragraph}</p>)}
        {post.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={`${section.heading}-${i}`} className="mb-5 leading-8">{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet} className="mb-2">{bullet}</li>)}</ul>}</section>)}
        <aside className="mt-10 rounded-2xl border border-cyan-200/20 bg-cyan-200/[.045] p-5"><h2 className="!mt-0 text-lg">Key takeaway</h2><p className="!mb-0 leading-7">{post.takeaway}</p></aside>
      </div>
      <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-sm leading-6 text-zinc-400">TikSave Pro is an independent service and is not affiliated with TikTok. Keep original project assets and use any downloaded media only when you have the necessary rights and permission.</div>
      <Link href="/blog" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"><ArrowLeft size={16} /> Browse more guides</Link>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
  </div></article>;
}
