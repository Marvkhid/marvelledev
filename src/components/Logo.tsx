export function Logo({ size = 32, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg className={animated ? 'logo-a' : undefined} width={size} height={size} viewBox="0 0 40 40" fill="none" role="img" aria-label="MarvelleDev logo">
      <path d="M6 32V9l14 15L34 9v23" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 22l7 10 7-10" style={{ stroke: 'var(--acc)' }} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
