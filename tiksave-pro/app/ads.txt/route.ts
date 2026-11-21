import type { NextRequest } from 'next/server';

const ADS_TXT = 'google.com, pub-4355330129692598, DIRECT, f08c47fec0942fa0\n';

export function GET(_request: NextRequest) {
  return new Response(ADS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
