'use client';

/** Replays the title sequence from anywhere on the site. */
export function ReplayIntro() {
  return (
    <button
      type="button"
      className="link-plain"
      onClick={() => window.dispatchEvent(new Event('mv:intro'))}
    >
      Replay intro
    </button>
  );
}
