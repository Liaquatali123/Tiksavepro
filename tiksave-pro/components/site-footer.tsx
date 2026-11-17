import Link from 'next/link';
import { Archive, Heart } from 'lucide-react';

export default function SiteFooter() {
  return <footer className="border-t border-white/10 bg-zinc-950/70">
    <div className="container-shell grid gap-9 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
      <div><Link href="/" className="inline-flex items-center gap-2 font-display font-bold"><Archive size={18} className="text-cyan-300" /> TikSave Pro</Link><p className="mt-3 max-w-sm text-sm text-zinc-400">A creator-first workspace for keeping your own short-form work close, organized, and ready for the next edit.</p></div>
      <div><h2 className="text-sm font-semibold text-zinc-100">Explore</h2><ul className="mt-3 space-y-2 text-sm text-zinc-400"><li><Link className="hover:text-white" href="/blog">Creator Blog</Link></li><li><Link className="hover:text-white" href="/#how-it-works">How it works</Link></li><li><Link className="hover:text-white" href="/about">About TikSave Pro</Link></li><li><Link className="hover:text-white" href="/contact">Contact</Link></li></ul></div>
      <div><h2 className="text-sm font-semibold text-zinc-100">Policies</h2><ul className="mt-3 space-y-2 text-sm text-zinc-400"><li><Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link></li><li><Link className="hover:text-white" href="/terms">Terms of Service</Link></li><li><Link className="hover:text-white" href="/dmca">DMCA & Copyright</Link></li></ul></div>
      <p className="border-t border-white/10 pt-6 text-xs text-zinc-500 md:col-span-3">© {new Date().getFullYear()} TikSave Pro. Built for responsible creator archiving. <span className="ml-1 inline-flex items-center gap-1">Made with <Heart size={12} className="text-rose-400" /> for creators.</span><span className="mt-2 block">TikSave Pro is an independent service and is not affiliated with TikTok or ByteDance.</span></p>
    </div>
  </footer>;
}
