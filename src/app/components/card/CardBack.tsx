export function CardBack() {
  const W = 120, H = 210;
  const cx = W / 2, cy = H / 2;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <defs>
        <radialGradient id="backGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#2a0050" />
          <stop offset="100%" stopColor="#0c0020" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Card background */}
      <rect width={W} height={H} rx="8" fill="url(#backGrad)" />
      <rect width={W} height={H} rx="8" fill="url(#centerGlow)" />

      {/* Outer frame */}
      <rect x="5" y="5" width={W-10} height={H-10} rx="6" fill="none" stroke="#c8a84b" strokeWidth="1.5" strokeOpacity="0.8" />
      <rect x="9" y="9" width={W-18} height={H-18} rx="4" fill="none" stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.35" />

      {/* Corner diamonds */}
      {[[7,7],[W-7,7],[7,H-7],[W-7,H-7]].map(([x,y], i) => (
        <polygon key={i} points={`${x},${y-5} ${x+3.5},${y} ${x},${y+5} ${x-3.5},${y}`} fill="#c8a84b" fillOpacity="0.7" />
      ))}

      {/* Decorative rings */}
      <circle cx={cx} cy={cy} r="50" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="38" fill="none" stroke="#c8a84b" strokeWidth="0.6" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="22" fill="none" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.35" />

      {/* 8-pointed star (two overlapping squares rotated 45°) */}
      <polygon
        points={`${cx},${cy-36} ${cx+8},${cy-8} ${cx+36},${cy} ${cx+8},${cy+8} ${cx},${cy+36} ${cx-8},${cy+8} ${cx-36},${cy} ${cx-8},${cy-8}`}
        fill="#c8a84b" fillOpacity="0.25"
        stroke="#c8a84b" strokeWidth="0.8" strokeOpacity="0.7"
      />
      <polygon
        points={`${cx},${cy-20} ${cx+4},${cy-4} ${cx+20},${cy} ${cx+4},${cy+4} ${cx},${cy+20} ${cx-4},${cy+4} ${cx-20},${cy} ${cx-4},${cy-4}`}
        fill="#c8a84b" fillOpacity="0.5"
      />
      <circle cx={cx} cy={cy} r="6" fill="#d4af37" fillOpacity="0.85" />

      {/* Radiating lines */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 22.5) * Math.PI / 180;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * 22}
            y1={cy + Math.sin(a) * 22}
            x2={cx + Math.cos(a) * 37}
            y2={cy + Math.sin(a) * 37}
            stroke="#c8a84b"
            strokeWidth="0.5"
            strokeOpacity="0.35"
          />
        );
      })}

      {/* Small decorative stars scattered */}
      {[[18,28],[102,28],[18,182],[102,182],[cx,28],[cx,182]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2" fill="#c8a84b" fillOpacity="0.5" />
          {[0,90,180,270].map((a, j) => {
            const r = a * Math.PI / 180;
            return <line key={j} x1={x} y1={y} x2={x+Math.cos(r)*4} y2={y+Math.sin(r)*4} stroke="#c8a84b" strokeWidth="0.5" strokeOpacity="0.5" />;
          })}
        </g>
      ))}
    </svg>
  );
}
