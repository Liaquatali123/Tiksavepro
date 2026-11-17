'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { faqs } from '@/lib/faqs';

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/50">
    {faqs.map((item, index) => <div key={item.question}>
      <h3><button id={`faq-question-${index}`} aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)} className="flex min-h-[64px] w-full items-center justify-between gap-5 px-5 py-4 text-left font-semibold text-zinc-100 md:px-6">{item.question}<ChevronDown aria-hidden="true" size={18} className={`shrink-0 text-cyan-300 transition-transform ${open === index ? 'rotate-180' : ''}`} /></button></h3>
      {open === index && <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="px-5 pb-5 text-sm leading-7 text-zinc-400 md:px-6">{item.answer}</div>}
    </div>)}
  </div>;
}
