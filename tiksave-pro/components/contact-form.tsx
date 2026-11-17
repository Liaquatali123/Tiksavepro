'use client';
import { FormEvent, useState } from 'react';
import { LoaderCircle, Send, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setBusy(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not send your message.');
      setSent(true);
      form.reset();
      toast.success('Your message has been sent.');
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'We could not send your message.';
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[.06] p-6">
        <CircleCheck size={24} className="text-emerald-300" />
        <h2 className="mt-3 font-display text-xl font-bold text-white">Thanks for reaching out.</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Your message has been sent to our team. We’ll reply to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-cyan-200 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass grid gap-4 rounded-2xl p-5 sm:p-7">
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className="min-h-12 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 text-white placeholder:text-zinc-600"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className="min-h-12 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 text-white placeholder:text-zinc-600"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={160}
          className="min-h-12 w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 text-white placeholder:text-zinc-600"
          placeholder="How can we help?"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-zinc-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          className="w-full resize-y rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white placeholder:text-zinc-600"
          placeholder="Share the details. Please do not include passwords or private account links."
        />
      </div>
      {error && (
        <p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-sm text-rose-200">
          {error}{' '}
          <a className="underline underline-offset-4" href={`mailto:${contactEmail}`}>
            Email us directly
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="gradient-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm"
      >
        {busy ? (
          <>
            <LoaderCircle size={17} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </button>
      <p className="text-xs leading-5 text-zinc-500">
        We use these details only to respond to your inquiry. Do not send sensitive personal information.
      </p>
    </form>
  );
}
