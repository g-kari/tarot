interface BorderFrameProps {
  color?: string;
  width?: number;
  height?: number;
}

export function BorderFrame({ color = "#c8a84b", width = 120, height = 210 }: BorderFrameProps) {
  const m = 5;   // margin
  const r = 6;   // corner radius
  const w = width - m * 2;
  const h = height - m * 2;

  return (
    <g>
      {/* Outer decorative rect */}
      <rect
        x={m} y={m} width={w} height={h} rx={r} ry={r}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.85"
      />
      {/* Inner thin line */}
      <rect
        x={m + 3.5} y={m + 3.5} width={w - 7} height={h - 7} rx={r - 2} ry={r - 2}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      {/* Corner diamonds */}
      {[
        [m + 2, m + 2],
        [width - m - 2, m + 2],
        [m + 2, height - m - 2],
        [width - m - 2, height - m - 2],
      ].map(([cx, cy], i) => (
        <polygon
          key={i}
          points={`${cx},${cy - 4} ${cx + 3},${cy} ${cx},${cy + 4} ${cx - 3},${cy}`}
          fill={color}
          fillOpacity="0.8"
        />
      ))}
    </g>
  );
}
