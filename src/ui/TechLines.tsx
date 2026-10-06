/**
 * TechLines – A decorative cyberpunk-style horizontal line divider
 * inspired by sci-fi HUD / tactical UI reference art.
 *
 * Renders an SVG strip of staggered, angled geometric bars with
 * dashed accent segments that mirror the reference image provided.
 */
export const TechLines = ({ className = '' }: { className?: string }) => (
  <div className={`w-full overflow-hidden select-none pointer-events-none ${className}`}>
    <svg
      viewBox="0 0 900 28"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* ── Main thick bar (center spine) ── */}
      <polygon points="220,8 680,8 690,4 710,4 700,8 880,8 880,14 700,14 710,18 690,18 680,14 220,14 210,18 190,18 200,14 20,14 20,8 200,8 190,4 210,4" fill="currentColor" />

      {/* ── Upper thin rail (left) ── */}
      <polygon points="60,3 310,3 320,0 340,0 330,3 520,3 520,5 330,5 340,2 320,2 310,5 60,5" fill="currentColor" opacity="0.7" />

      {/* ── Upper thin rail (right) ── */}
      <polygon points="560,3 750,3 760,0 780,0 770,3 860,3 860,5 770,5 780,2 760,2 750,5 560,5" fill="currentColor" opacity="0.5" />

      {/* ── Lower thin rail (left) ── */}
      <polygon points="40,22 260,22 270,25 290,25 280,22 480,22 480,24 280,24 290,27 270,27 260,24 40,24" fill="currentColor" opacity="0.7" />

      {/* ── Lower thin rail (right) ── */}
      <polygon points="530,22 720,22 730,25 750,25 740,22 840,22 840,24 740,24 750,27 730,27 720,24 530,24" fill="currentColor" opacity="0.5" />

      {/* ── Dashed accent (left zone) ── */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={`dl-${i}`} x={230 + i * 11} y={9.5} width={7} height={3} fill="white" opacity="0.8" rx="0.5" />
      ))}

      {/* ── Dashed accent (right zone) ── */}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <rect key={`dr-${i}`} x={570 + i * 11} y={9.5} width={7} height={3} fill="white" opacity="0.8" rx="0.5" />
      ))}

      {/* ── Left edge wedge block ── */}
      <polygon points="0,6 55,6 65,11 55,16 0,16" fill="currentColor" />

      {/* ── Right edge wedge block ── */}
      <polygon points="900,6 845,6 835,11 845,16 900,16" fill="currentColor" />
    </svg>
  </div>
);
