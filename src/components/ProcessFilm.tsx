'use client';
import { useEffect, useRef, useState } from 'react';
import { workProcess } from '@/lib/site';

/**
 * "How I work" as a short film: four scenes that cut on their own, each with its
 * own frame (a document, a layout, code, a launch), played inside a small player
 * with chapter controls. It stops when off screen or in a hidden tab, never
 * autoplays for visitors who prefer reduced motion, and every step's text is in
 * the document whether or not the film is running.
 */
const SLIDE_MS = 5200;

function Art({ index }: { index: number }) {
  const common = { fill: 'none', strokeWidth: 1.3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (index === 0) {
    return (
      <svg viewBox="0 0 220 150" role="presentation">
        <rect x="22" y="18" width="140" height="106" rx="10" {...common} />
        <path d="M40 42h74M40 58h96M40 74h58" {...common} />
        <circle cx="150" cy="96" r="24" {...common} className="ac" />
        <path d="M167 113l18 18" {...common} className="ac" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 220 150" role="presentation">
        <rect x="18" y="16" width="184" height="118" rx="10" {...common} />
        <path d="M18 38h184M60 38v96" {...common} />
        <rect x="74" y="52" width="52" height="30" rx="5" {...common} className="ac" />
        <rect x="136" y="52" width="52" height="30" rx="5" {...common} />
        <rect x="74" y="92" width="114" height="26" rx="5" {...common} />
        <path d="M32 60h16M32 76h16M32 92h16" {...common} />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 220 150" role="presentation">
        <path d="M56 34L30 75l26 41M164 34l26 41-26 41" {...common} className="ac" />
        <path d="M74 52h58M74 70h96M74 88h72M74 106h44" {...common} />
        <circle cx="150" cy="106" r="4" className="ac" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 150" role="presentation">
      <path d="M28 126h164" {...common} />
      <rect x="44" y="96" width="22" height="30" rx="4" {...common} />
      <rect x="80" y="80" width="22" height="46" rx="4" {...common} />
      <rect x="116" y="62" width="22" height="64" rx="4" {...common} />
      <rect x="152" y="44" width="22" height="82" rx="4" {...common} className="ac" />
      <path d="M40 66l34-22 40-10" {...common} className="ac" />
      <path d="M104 32h14v14" {...common} className="ac" />
    </svg>
  );
}

export function ProcessFilm() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [runId, setRunId] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const host = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || reduced || !inView) return;
    const timer = window.setTimeout(
      () => setActive((n) => (n + 1) % workProcess.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, playing, reduced, inView, runId]);

  const scene = workProcess[active];

  return (
    <div className="proc" ref={host} data-playing={playing && !reduced}>
      <div className="proc-top">
        <span className="proc-label"><i />Process film · {workProcess.length} scenes</span>
        <span className="proc-count">0{active + 1} / 0{workProcess.length}</span>
      </div>

      <div className="proc-body">
        <div className="proc-copy">
          {workProcess.map((s, i) => (
            <div key={s.step} className={`proc-slide${i === active ? ' is-on' : ''}`} aria-hidden={i !== active}>
              <span className="proc-step">Step {s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="proc-art" aria-hidden="true" key={active}>
          <Art index={active} />
        </div>
      </div>

      <div className="proc-controls">
        <button
          type="button"
          className="proc-play"
          onClick={() => {
            if (!playing) setRunId((n) => n + 1);
            setPlaying((p) => !p);
          }}
          aria-label={playing ? 'Pause the process film' : 'Play the process film'}
        >
          {playing ? (
            <svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1" /><rect x="7" y="1.5" width="3" height="9" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.8l7 4.2-7 4.2z" /></svg>
          )}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>

        <div className="proc-track">
          {workProcess.map((s, i) => (
            <button
              key={s.step}
              type="button"
              className={`proc-seg${i === active ? ' is-on' : ''}${i < active ? ' is-done' : ''}`}
              onClick={() => {
                setActive(i);
                setPlaying(false);
              }}
              aria-label={`Step ${s.step}, ${s.title}`}
              aria-current={i === active ? 'true' : undefined}
            >
              <span className="proc-seg-bar" aria-hidden="true">
                <i key={`${active}-${runId}`} />
              </span>
              <span className="proc-seg-num">{s.step}</span>
              <span className="proc-seg-title">{s.title}</span>
            </button>
          ))}
        </div>

        <span className="proc-time" aria-hidden="true">00:0{active + 1}</span>
      </div>

      <p className="sr-only" aria-live="polite">
        Scene {active + 1} of {workProcess.length}: {scene.title}. {scene.body}
      </p>
    </div>
  );
}
