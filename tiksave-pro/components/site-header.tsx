import Link from 'next/link';
import { Archive } from 'lucide-react';
import MobileNav from '@/components/mobile-nav';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#audio', label: 'MP3 Audio' },
  { href: '/blog', label: 'Creator Blog' },
  { href: '/#how-it-works', label: 'How It Works' },
];

export default function SiteHeader() {
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl">
    <div className="container-shell flex h-[72px] items-center justify-between gap-4">
      <Link href="/" aria-label="TikSave Pro home" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-offset-4">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-rose-500 text-zinc-950"><Archive size={19} strokeWidth={2.5} /></span>
        <span className="font-display text-lg font-extrabold tracking-tight">TikSave <span className="text-cyan-300">Pro</span></span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
        {links.map(link => <Link key={link.href} href={link.href} className="text-sm text-zinc-300 transition hover:text-white">{link.label}</Link>)}
      </nav>
      <MobileNav />
    </div>
  </header>;
}
