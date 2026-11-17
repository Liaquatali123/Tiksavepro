export function safeFilename(input: string, fallback = 'tiksave-archive') {
  const clean = input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100);
  return clean || fallback;
}

export function isTikTokPageUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' && (url.hostname === 'tiktok.com' || url.hostname.endsWith('.tiktok.com'));
  } catch {
    return false;
  }
}
