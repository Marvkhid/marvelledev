'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Chapter = { id: string; label: string };

/**
 * The HUD: a chapter rail and a scroll meter. It reads any element carrying
 * `data-chapter` and an id, so pages without chapters simply render nothing.
 */
export function Hud() {
  const pathname = usePathname();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState('');
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (!els.length) {
      setChapters([]);
      return;
    }
    setChapters(els.map((el) => ({ id: el.id, label: el.dataset.chapter ?? el.id })));
    setActive(els[0].id);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    els.forEach((el) => io.observe(el));

    let frame = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; measure(); });
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (!chapters.length) return null;

  return (
    <aside className="hud" aria-label="Page chapters">
      <div className="hud-track" aria-hidden="true"><i style={{ height: `${pct}%` }} /></div>
      <ol className="hud-list">
        {chapters.map((chapter, i) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`} aria-current={active === chapter.id ? 'true' : undefined}>
              <span className="hud-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="hud-label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className="hud-pct" aria-hidden="true">{String(pct).padStart(2, '0')}</span>
    </aside>
  );
}
