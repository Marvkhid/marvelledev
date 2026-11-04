'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * MarvelleDev — title sequence.
 *
 * A short, sound-free opening film that plays once per browser session and can
 * be skipped at any moment (button, Escape, or clicking the frame). It is built
 * from canvas and type rather than a video file: it stays razor sharp on every
 * screen, weighs nothing, and never fights an autoplay policy.
 */
const DURATION = 7200;
const SEEN_KEY = 'mv-intro-v2';
const NAME = 'MARVEL ADENIYI';

/** The set behind the titles: a horizon grid that keeps rising, plus a light sweep. */
function FilmField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const started = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - started) / 1000;
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.64;
      const drift = (t * 0.07) % 1;

      for (let i = 0; i < 17; i++) {
        const p = (i / 16 + drift) % 1;
        const y = horizon + Math.pow(p, 2.15) * (h - horizon);
        ctx.strokeStyle = `rgba(124,155,255,${0.05 + p * 0.16})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (let i = -11; i <= 11; i++) {
        const x = w / 2 + i * (w / 9);
        ctx.strokeStyle = 'rgba(124,155,255,.09)';
        ctx.beginPath();
        ctx.moveTo(w / 2, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const sweep = h - ((t * 190) % (h * 1.25));
      const g = ctx.createLinearGradient(0, sweep - 150, 0, sweep);
      g.addColorStop(0, 'rgba(124,155,255,0)');
      g.addColorStop(0.62, 'rgba(124,155,255,.16)');
      g.addColorStop(1, 'rgba(124,155,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, sweep - 150, w, 300);

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="film-canvas" aria-hidden="true" />;
}

export function CinemaIntro() {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [run, setRun] = useState(0);
  const endTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (endTimer.current) window.clearTimeout(endTimer.current);
    if (exitTimer.current) window.clearTimeout(exitTimer.current);
  };

  const close = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode */
    }
    setLeaving(true);
    exitTimer.current = window.setTimeout(() => setPlaying(false), 560);
  }, []);

  const start = useCallback(() => {
    clearTimers();
    setLeaving(false);
    setRun((n) => n + 1);
    setPlaying(true);
    endTimer.current = window.setTimeout(close, DURATION);
  }, [close]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (!seen && !reduce) start();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onReplay = () => start();
    document.addEventListener('keydown', onKey);
    window.addEventListener('mv:intro', onReplay);

    return () => {
      clearTimers();
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('mv:intro', onReplay);
    };
  }, [close, start]);

  // Hold the page still while the titles run, and always hand scrolling back.
  useEffect(() => {
    if (!playing) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div
      key={run}
      className={`film${leaving ? ' film--out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="MarvelleDev title sequence. Skip with the skip intro button or Escape."
      onClick={close}
    >
      <FilmField />
      <div className="film-vignette" aria-hidden="true" />

      <div className="film-top" aria-hidden="true">
        <span>MarvelleDev · Title 01</span>
        <span className="film-live"><i />Sound off</span>
      </div>

      <div className="film-stage">
        <div className="film-count" aria-hidden="true">
          <span className="film-ring"><b /></span>
          <span className="film-word" style={{ animationDelay: '0.05s' }}>Next.js</span>
          <span className="film-word" style={{ animationDelay: '0.75s' }}>Node.js</span>
          <span className="film-word" style={{ animationDelay: '1.45s' }}>TypeScript</span>
        </div>

        <h1 className="film-name" aria-label={NAME}>
          {NAME.split('').map((char, i) =>
            char === ' ' ? (
              <span key={i} className="film-gap" aria-hidden="true" />
            ) : (
              <span key={i} aria-hidden="true" style={{ '--i': i } as React.CSSProperties}>{char}</span>
            ),
          )}
        </h1>
        <p className="film-sub">Full-stack software developer</p>
        <p className="film-end">I build digital products that solve real problems.</p>
      </div>

      <div className="film-bot">
        <span className="film-time" aria-hidden="true">00:07</span>
        <span className="film-bar" aria-hidden="true"><i /></span>
        <button type="button" className="film-skip" onClick={close}>
          Skip intro <kbd>Esc</kbd>
        </button>
      </div>
    </div>
  );
}
