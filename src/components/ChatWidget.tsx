'use client';
import { useEffect, useRef, useState } from 'react';
import { SUGGESTIONS } from '@/lib/knowledge';
import { waLink, type Link } from '@/lib/site';

type Msg = { role: 'user' | 'assistant'; content: string; links?: Link[] };
const GREETING = 'Hi, I’m Marv AI, the virtual assistant for MarvelleDev. I can tell you about Marvellous’s development experience, explore his projects with you, explain his services, or help you start a website project.';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [limited, setLimited] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { try { const s = sessionStorage.getItem('marv-chat'); if (s) setMsgs(JSON.parse(s) as Msg[]); } catch { /* ignore */ } }, []);
  useEffect(() => { try { sessionStorage.setItem('marv-chat', JSON.stringify(msgs.slice(-20))); } catch { /* ignore */ } end.current?.scrollIntoView({ block: 'end' }); }, [msgs, busy]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);

  async function send(text: string) {
    const q = text.trim().slice(0, 500);
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: q }];
    setMsgs(next); setInput(''); setBusy(true);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next.slice(-8).map(({ role, content }) => ({ role, content })) }) });
      const data = (await res.json()) as { text?: string; links?: Link[]; error?: string; limited?: boolean };
      if (data.limited) setLimited(true);
      setMsgs([...next, { role: 'assistant', content: data.text ?? data.error ?? 'Something went wrong. Please try again.', links: data.links }]);
    } catch {
      setMsgs([...next, { role: 'assistant', content: 'I couldn’t connect just now. You can reach Marvellous on the contact page.', links: [{ label: 'Contact page', href: '/contact' }] }]);
    } finally { setBusy(false); }
  }

  const lastUser = [...msgs].reverse().find((m) => m.role === 'user')?.content ?? '';
  const wa = waLink(`Hi Marvellous, I found you through your website. ${lastUser ? `I’m interested in: ${lastUser.slice(0, 200)}` : 'I’d like to discuss a project.'}`);

  return (
    <>
      <button type="button" className="cbn" aria-expanded={open} aria-controls="marv" onClick={() => setOpen(!open)}>{open ? 'Close chat' : 'Ask MarvelleDev'}</button>
      <section id="marv" className="cp" hidden={!open} aria-label="Marv AI assistant">
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}><b style={{ font: '700 17px var(--font-head)' }}>Marv AI</b><div className="mut" style={{ fontSize: 13 }}>Your guide to MarvelleDev.</div></div>
          <button type="button" className="ib" onClick={() => { setMsgs([]); setLimited(false); }} aria-label="Reset conversation">↺</button>
          <button type="button" className="ib" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>
        {limited && <div className="mut" style={{ fontSize: 12, padding: '8px 16px', background: 'var(--card)' }}>Limited mode: answers are coming from Marvellous’s verified notes right now.</div>}
        <div className="cms" aria-live="polite">
          <div className="cm">{GREETING}</div>
          {msgs.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'cm u' : 'cm'}>
              {m.content}
              {m.links && <div className="cl">{m.links.map((l) => <a key={l.href} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}{l.external ? ' ↗' : ''}</a>)}</div>}
            </div>
          ))}
          {busy && <div className="cm dots" aria-label="Marv AI is typing"><span /><span /><span /></div>}
          <div ref={end} />
        </div>
        {msgs.length === 0 && <div className="qs">{SUGGESTIONS.slice(0, 4).map((s) => <button key={s} type="button" onClick={() => send(s)}>{s}</button>)}</div>}
        {msgs.length >= 2 && <a href={wa} target="_blank" rel="noopener noreferrer" className="lnk" style={{ fontSize: 13, padding: '0 16px 6px' }}>Continue on WhatsApp (you review the message first) →</a>}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--bd)' }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} aria-label="Message Marv AI" placeholder="Ask about Marvellous’s work…" enterKeyHint="send" />
          <button type="submit" className="ib" style={{ background: 'var(--ab)', color: 'var(--abt)', border: 0 }} aria-label="Send message" disabled={busy}>↑</button>
        </form>
      </section>
    </>
  );
}
