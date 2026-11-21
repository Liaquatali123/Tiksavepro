'use client';

import { useEffect } from 'react';

const PUBLISHER_ID = 'ca-pub-4355330129692598';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ size = 'leaderboard' }: { size?: 'leaderboard' | 'rectangle' }) {
  const slotId = size === 'rectangle'
    ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE
    : process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD;

  useEffect(() => {
    if (!slotId) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers, consent settings, or a not-yet-approved site can prevent ad loading.
    }
  }, [slotId]);

  // Auto ads can still run site-wide. Manual units render only after a real
  // ad-unit ID is supplied from the AdSense dashboard; never invent slot IDs.
  if (!slotId) return null;

  return (
    <aside aria-label="Advertisement" className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl">
      <ins
        className="adsbygoogle block min-h-[90px] w-full"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
