'use client';
import { useState } from 'react';

const fmt = (n: number) => n.toLocaleString('en-NG', { maximumFractionDigits: 1 });

export function Calculator() {
  const [v, setV] = useState(1000), [r, setR] = useState(3), [c, setC] = useState(20), [s, setS] = useState(150000);
  const enq = (v * r) / 100, cust = (enq * c) / 100, gross = cust * s;
  const num = (set: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => set(Math.max(0, Number(e.target.value) || 0));
  return (
    <div className="card calc">
      <p className="tag">Illustrative estimator</p>
      <div className="g">
        <div><label htmlFor="cv">Monthly relevant visitors</label><input id="cv" type="number" min={0} value={v} onChange={num(setV)} /></div>
        <div><label htmlFor="cr">Enquiry rate (%)</label><input id="cr" type="number" min={0} max={100} step={0.1} value={r} onChange={num(setR)} /></div>
        <div><label htmlFor="cc">Enquiry-to-customer rate (%)</label><input id="cc" type="number" min={0} max={100} step={0.1} value={c} onChange={num(setC)} /></div>
        <div><label htmlFor="cs">Average sale (₦)</label><input id="cs" type="number" min={0} value={s} onChange={num(setS)} /></div>
      </div>
      <div className="g" style={{ marginTop: 22 }} aria-live="polite">
        <div><span className="mut">Estimated enquiries / month</span><output>≈ {fmt(enq)}</output></div>
        <div><span className="mut">Estimated customers / month</span><output>≈ {fmt(cust)}</output></div>
        <div><span className="mut">Estimated gross sales / month</span><output>≈ ₦{fmt(gross)}</output></div>
      </div>
      <p className="mut" style={{ fontSize: 13 }}>Hypothetical estimates from the numbers you enter, not a guarantee or any client’s actual result. Gross sales are not profit, and a website doesn’t create qualified traffic automatically.</p>
    </div>
  );
}
