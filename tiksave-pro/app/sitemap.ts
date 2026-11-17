import type { MetadataRoute } from 'next';
import { posts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/blog', '/about', '/contact', '/privacy-policy', '/terms', '/dmca'];
  const staticPages = pages.map(path => ({ url: absoluteUrl(path), lastModified: new Date(), changeFrequency: path === '/' || path === '/blog' ? 'weekly' as const : 'yearly' as const, priority: path === '/' ? 1 : path === '/blog' ? .8 : .5 }));
  const articles = posts.map(post => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(`${post.published}T00:00:00Z`), changeFrequency: 'monthly' as const, priority: .65 }));
  return [...staticPages, ...articles];
}
