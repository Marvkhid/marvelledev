import { stack } from '@/lib/site';

export function Marquee() {
  const line = stack.join(' · ') + ' · ';
  return <div className="mq" aria-label="Technologies"><div><span>{line}</span><span aria-hidden="true">{line}</span></div></div>;
}
