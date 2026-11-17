type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/** Best-effort per-process protection. Add a distributed edge limiter for multi-instance deployments. */
export function isRateLimited(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) {
      buckets.forEach((bucket, bucketKey) => {
        if (bucket.resetAt <= now) buckets.delete(bucketKey);
      });
    }
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

export function clientKey(request: Request) {
  // Prefer Vercel's platform-set IP header before general proxy headers
  const ip =
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',').pop()?.trim() ||
    'unknown';
  return ip.slice(0, 80);
}
