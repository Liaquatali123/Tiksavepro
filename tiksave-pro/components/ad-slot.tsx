export default function AdSlot({ size = 'leaderboard' }: { size?: 'leaderboard' | 'rectangle' }) {
  return <aside aria-label="Advertisement" className={`ad-slot mx-auto w-full max-w-5xl rounded-2xl ${size === 'rectangle' ? 'min-h-[250px]' : 'min-h-[90px]'}`}>
    <div className="text-center"><span className="block text-[10px] font-semibold uppercase tracking-[.22em] text-zinc-500">Advertisement</span><span className="mt-1 block text-xs text-zinc-600">Ad placement reserved</span></div>
  </aside>;
}
