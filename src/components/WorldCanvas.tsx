'use client';
import { useEffect, useRef } from 'react';

/**
 * The "world" behind the hero: a horizon grid with drifting motes that leans
 * toward the pointer. Pure canvas, no assets, capped DPR, paused when hidden
 * or scrolled away, and rendered once as a still frame under reduced motion.
 */
export function WorldCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = !reduce;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const motes = Array.from({ length: 44 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      s: 0.6 + Math.random() * 1.5,
    }));

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const ox = (pointer.x - 0.5) * 44;
      const oy = (pointer.y - 0.5) * 26;
      const horizon = h * 0.56;

      for (let i = 0; i < 13; i++) {
        const p = i / 12;
        const y = horizon + Math.pow(p, 2.15) * (h - horizon) + oy * p * 0.7;
        ctx.strokeStyle = `rgba(124,155,255,${0.05 + p * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (let i = -9; i <= 9; i++) {
        const x = w / 2 + i * (w / 11) + ox * 0.5;
        ctx.strokeStyle = 'rgba(124,155,255,.07)';
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.06, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (!reduce) {
          m.y -= 0.00055 * m.z;
          if (m.y < -0.05) m.y = 1.05;
        }
        const x = m.x * w + ox * m.z;
        const y = m.y * h + oy * m.z;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${i % 5 === 0 ? '255,255,255' : '124,155,255'},${0.12 + m.z * 0.34})`;
        ctx.arc(x, y, m.s * m.z, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };

    const loop = () => {
      paint();
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduce) start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden && !reduce) start();
        else stop();
      },
      { threshold: 0.01 },
    );

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduce) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      start();
    }

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="world-canvas" aria-hidden="true" />;
}
