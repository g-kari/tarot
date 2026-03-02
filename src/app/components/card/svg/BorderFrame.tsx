interface BorderFrameProps {
  color?: string;
  width?: number;
  height?: number;
}

export function BorderFrame({ color = "#c8a84b", width = 120, height = 210 }: BorderFrameProps) {
  const m = 4;
  const r = 6;
  const w = width - m * 2;
  const h = height - m * 2;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <g>
      {/* Outer border */}
      <rect x={m} y={m} width={w} height={h} rx={r} fill="none" stroke={color} strokeWidth="1.6" strokeOpacity="0.9" />

      {/* Inner decorative border */}
      <rect x={m + 3.5} y={m + 3.5} width={w - 7} height={h - 7} rx={r - 1.5} fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.35" />

      {/* Fine inner border */}
      <rect x={m + 5.5} y={m + 5.5} width={w - 11} height={h - 11} rx={r - 2} fill="none" stroke={color} strokeWidth="0.25" strokeOpacity="0.2" />

      {/* Corner flourishes */}
      {([
        [m, m, 1, 1],
        [width - m, m, -1, 1],
        [m, height - m, 1, -1],
        [width - m, height - m, -1, -1],
      ] as const).map(([ox, oy, sx, sy], i) => (
        <g key={i}>
          {/* Main corner curve */}
          <path
            d={`M${ox + sx * 2},${oy + sy * 16} Q${ox + sx * 2},${oy + sy * 2} ${ox + sx * 16},${oy + sy * 2}`}
            fill="none" stroke={color} strokeWidth="1.6" strokeOpacity="0.65" strokeLinecap="round"
          />
          {/* Inner corner curve */}
          <path
            d={`M${ox + sx * 5},${oy + sy * 20} Q${ox + sx * 5},${oy + sy * 5} ${ox + sx * 20},${oy + sy * 5}`}
            fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.35" strokeLinecap="round"
          />
          {/* Corner dot */}
          <circle cx={ox + sx * 2.5} cy={oy + sy * 2.5} r="1.8" fill={color} fillOpacity="0.55" />
          {/* Small scrollwork accents */}
          <path
            d={`M${ox + sx * 16},${oy + sy * 2} Q${ox + sx * 19},${oy + sy * 5} ${ox + sx * 16},${oy + sy * 7}`}
            fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"
          />
          <path
            d={`M${ox + sx * 2},${oy + sy * 16} Q${ox + sx * 5},${oy + sy * 19} ${ox + sx * 7},${oy + sy * 16}`}
            fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" strokeLinecap="round"
          />
        </g>
      ))}

      {/* Top center ornament */}
      <path d={`M${cx - 14},${m + 1.5} Q${cx - 6},${m + 5} ${cx},${m + 2} Q${cx + 6},${m + 5} ${cx + 14},${m + 1.5}`}
        fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.45" />
      <circle cx={cx} cy={m + 1} r="1.2" fill={color} fillOpacity="0.5" />
      <line x1={cx - 4} y1={m + 1} x2={cx + 4} y2={m + 1} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />

      {/* Bottom center ornament */}
      <path d={`M${cx - 14},${height - m - 1.5} Q${cx - 6},${height - m - 5} ${cx},${height - m - 2} Q${cx + 6},${height - m - 5} ${cx + 14},${height - m - 1.5}`}
        fill="none" stroke={color} strokeWidth="0.7" strokeOpacity="0.45" />
      <circle cx={cx} cy={height - m - 1} r="1.2" fill={color} fillOpacity="0.5" />
      <line x1={cx - 4} y1={height - m - 1} x2={cx + 4} y2={height - m - 1} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />

      {/* Side center ornaments */}
      {[m + 1, width - m - 1].map((x, i) => (
        <g key={`side-${i}`}>
          <polygon
            points={`${x},${cy - 4} ${x + (i ? -3.5 : 3.5)},${cy} ${x},${cy + 4} ${x + (i ? 3.5 : -3.5)},${cy}`}
            fill={color} fillOpacity="0.35"
          />
          <line x1={x} y1={cy - 8} x2={x} y2={cy - 4.5} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />
          <line x1={x} y1={cy + 4.5} x2={x} y2={cy + 8} stroke={color} strokeWidth="0.4" strokeOpacity="0.3" />
        </g>
      ))}

      {/* Subtle edge filigree lines */}
      {[m + 2.5, width - m - 2.5].map((x, i) => (
        <g key={`fil-${i}`}>
          <line x1={x} y1={m + 22} x2={x} y2={cy - 10} stroke={color} strokeWidth="0.2" strokeOpacity="0.12" />
          <line x1={x} y1={cy + 10} x2={x} y2={height - m - 22} stroke={color} strokeWidth="0.2" strokeOpacity="0.12" />
        </g>
      ))}
    </g>
  );
}
