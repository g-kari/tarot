export function CardBack() {
  const W = 120, H = 210;
  const cx = W / 2, cy = H / 2;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <defs>
        <radialGradient id="backGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="#111420" />
          <stop offset="100%" stopColor="#060810" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Card background */}
      <rect width={W} height={H} rx="8" fill="url(#backGrad)" />
      <rect width={W} height={H} rx="8" fill="url(#centerGlow)" />

      {/* Outer frame */}
      <rect x="6" y="6" width={W-12} height={H-12} rx="5" fill="none" stroke="#a89060" strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="10" y="10" width={W-20} height={H-20} rx="3" fill="none" stroke="#a89060" strokeWidth="0.4" strokeOpacity="0.2" />

      {/* Decorative rings */}
      <circle cx={cx} cy={cy} r="44" fill="none" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.25" />
      <circle cx={cx} cy={cy} r="32" fill="none" stroke="#a89060" strokeWidth="0.5" strokeOpacity="0.2" />
      <circle cx={cx} cy={cy} r="18" fill="none" stroke="#6366f1" strokeWidth="0.4" strokeOpacity="0.18" />

      {/* 8-pointed star */}
      <polygon
        points={`${cx},${cy-30} ${cx+6},${cy-6} ${cx+30},${cy} ${cx+6},${cy+6} ${cx},${cy+30} ${cx-6},${cy+6} ${cx-30},${cy} ${cx-6},${cy-6}`}
        fill="#a89060" fillOpacity="0.08"
        stroke="#a89060" strokeWidth="0.6" strokeOpacity="0.4"
      />
      <polygon
        points={`${cx},${cy-16} ${cx+3},${cy-3} ${cx+16},${cy} ${cx+3},${cy+3} ${cx},${cy+16} ${cx-3},${cy+3} ${cx-16},${cy} ${cx-3},${cy-3}`}
        fill="#a89060" fillOpacity="0.25"
      />
      <circle cx={cx} cy={cy} r="4" fill="#a89060" fillOpacity="0.55" />

      {/* Radiating lines - faint */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30) * Math.PI / 180;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * 19}
            y1={cy + Math.sin(a) * 19}
            x2={cx + Math.cos(a) * 31}
            y2={cy + Math.sin(a) * 31}
            stroke="#a89060"
            strokeWidth="0.4"
            strokeOpacity="0.22"
          />
        );
      })}

      {/* Corner accents - minimal dots */}
      {[[14,14],[W-14,14],[14,H-14],[W-14,H-14]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#a89060" fillOpacity="0.4" />
      ))}
    </svg>
  );
}
