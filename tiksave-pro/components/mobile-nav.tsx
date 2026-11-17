'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#audio', label: 'MP3 Audio' },
  { href: '/blog', label: 'Creator Blog' },
  { href: '/#how-it-works', label: 'How It Works' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="relative md:hidden">
    <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(value => !value)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-zinc-100 transition hover:bg-white/5">
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="glass absolute right-0 top-14 z-50 grid min-w-52 gap-1 rounded-2xl p-2 shadow-2xl">
      {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-zinc-200 hover:bg-white/5">{link.label}</Link>)}
    </nav>}
  </div>;
}
