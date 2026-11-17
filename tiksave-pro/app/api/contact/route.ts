import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/site';
import { clientKey, isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: NextRequest) {
  if (isRateLimited(`contact:${clientKey(request)}`, 5, 60 * 60_000)) {
    return NextResponse.json({ error: 'Too many messages from this network. Please try again later.' }, { status: 429 });
  }
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
  }
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) {
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Please send a valid form.' }, { status: 400 });
    }
    input = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Please send a valid form.' }, { status: 400 });
  }

  // Honeypot check: silently discard automated bot submissions
  if (typeof input.website === 'string' && input.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(input.name, 120);
  const email = clean(input.email, 254);
  const subject = clean(input.subject, 160);
  const message = clean(input.message, 5000);
  if (!name || !EMAIL_RE.test(email) || !subject || message.length < 20) {
    return NextResponse.json(
      { error: 'Complete each field and write a message of at least 20 characters.' },
      { status: 400 }
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: `Contact delivery is not configured. Please email ${CONTACT_EMAIL} directly.` },
      { status: 503 }
    );
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(12_000),
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'TikSave Pro <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[TikSave Pro] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: 'We could not send your message right now. Please email us directly instead.' },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'The contact service is temporarily unavailable.' }, { status: 502 });
  }
}
