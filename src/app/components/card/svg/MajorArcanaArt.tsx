import React from "react";

interface Props {
  number: number;
  primaryColor: string;
  secondaryColor: string;
}

function renderMajorArt(n: number, pc: string, sc: string): React.ReactElement {
  switch (n) {
    /* ── 0  The Fool 愚者 ── */
    case 0: return (
      <g>
        <defs>
          <radialGradient id="m0sun" cx="80%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f4d03f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Sun */}
        <circle cx="92" cy="40" r="22" fill="url(#m0sun)" />
        <circle cx="92" cy="40" r="10" fill="#f4d03f" fillOpacity="0.65" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30 * Math.PI / 180;
          return <line key={i} x1={92 + Math.cos(a) * 11} y1={40 + Math.sin(a) * 11} x2={92 + Math.cos(a) * 18} y2={40 + Math.sin(a) * 18} stroke="#f4d03f" strokeWidth="0.8" strokeOpacity="0.5" />;
        })}
        {/* Mountains background */}
        <polygon points="0,130 25,85 55,110 80,78 110,105 120,130" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.5" strokeOpacity="0.2" />
        {/* Cliff edge */}
        <path d="M0,155 L55,148 Q65,147 72,160 L72,185 L0,185 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.6" strokeOpacity="0.3" />
        {/* Figure */}
        <circle cx="52" cy="100" r="9" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <rect x="44" y="109" width="16" height="32" rx="4" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        <line x1="52" y1="141" x2="44" y2="162" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="52" y1="141" x2="60" y2="160" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        {/* Bundle on stick */}
        <line x1="40" y1="95" x2="30" y2="118" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="120" r="6" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.7" />
        {/* White rose */}
        <circle cx="60" cy="108" r="3" fill="#fff" fillOpacity="0.5" stroke={sc} strokeWidth="0.5" />
        {/* Small dog */}
        <ellipse cx="70" cy="148" rx="7" ry="5" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.6" />
        <circle cx="76" cy="144" r="3.5" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.5" />
        <line x1="78" y1="143" x2="80" y2="141" stroke={sc} strokeWidth="0.5" />
      </g>
    );

    /* ── 1  The Magician 魔術師 ── */
    case 1: return (
      <g>
        {/* Infinity symbol above */}
        <path d="M48,42 Q40,32 48,38 Q56,44 64,34 Q72,24 64,30 Q56,36 48,42" fill="none" stroke="#f4d03f" strokeWidth="1.2" strokeOpacity="0.7" />
        {/* Figure */}
        <circle cx="60" cy="62" r="10" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <rect x="50" y="72" width="20" height="35" rx="4" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        {/* Right hand raised with wand */}
        <line x1="70" y1="78" x2="82" y2="58" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="82" y1="42" x2="82" y2="72" stroke={sc} strokeWidth="1.8" strokeLinecap="round" />
        {/* Left hand pointing down */}
        <line x1="50" y1="80" x2="36" y2="100" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        {/* Table */}
        <rect x="22" y="112" width="76" height="5" rx="1" fill={sc} fillOpacity="0.4" stroke={sc} strokeWidth="0.7" />
        <rect x="30" y="117" width="4" height="35" fill={sc} fillOpacity="0.25" />
        <rect x="86" y="117" width="4" height="35" fill={sc} fillOpacity="0.25" />
        {/* Four suit symbols on table */}
        <circle cx="34" cy="108" r="4" fill={sc} fillOpacity="0.35" stroke={sc} strokeWidth="0.5" />
        <polygon points="50,104 53,110 47,110" fill={sc} fillOpacity="0.4" />
        <line x1="66" y1="102" x2="66" y2="112" stroke={sc} strokeWidth="1.2" />
        <circle cx="82" cy="108" r="4" fill="none" stroke={sc} strokeWidth="0.8" />
        {/* Roses and lilies at bottom */}
        {[25, 40, 55, 70, 85, 100].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={160 + (i % 2) * 4} r="3" fill={i % 2 ? pc : sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
            <line x1={x} y1={163 + (i % 2) * 4} x2={x} y2={172} stroke={sc} strokeWidth="0.4" strokeOpacity="0.3" />
          </g>
        ))}
      </g>
    );

    /* ── 2  The High Priestess 女教皇 ── */
    case 2: return (
      <g>
        {/* Two pillars B and J */}
        <rect x="16" y="44" width="12" height="120" rx="2" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        <rect x="92" y="44" width="12" height="120" rx="2" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        <text x="22" y="42" textAnchor="middle" fontSize="7" fill={sc} fontFamily="serif" fillOpacity="0.7">B</text>
        <text x="98" y="42" textAnchor="middle" fontSize="7" fill={sc} fontFamily="serif" fillOpacity="0.7">J</text>
        {/* Pillar caps */}
        <rect x="13" y="42" width="18" height="5" rx="1" fill={sc} fillOpacity="0.3" />
        <rect x="89" y="42" width="18" height="5" rx="1" fill={pc} fillOpacity="0.3" />
        {/* Veil with pomegranates */}
        <path d="M28,50 Q60,35 92,50 L92,164 Q60,150 28,164 Z" fill={sc} fillOpacity="0.06" stroke={sc} strokeWidth="0.4" strokeOpacity="0.2" />
        {[35, 50, 65, 80].map((x, i) => (
          <circle key={i} cx={x} cy={52 + (i % 2) * 8} r="2.5" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.3" />
        ))}
        {/* Seated figure */}
        <circle cx="60" cy="68" r="10" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
        {/* Crown with crescent */}
        <path d="M52,60 L54,52 L60,56 L66,52 L68,60" fill={sc} fillOpacity="0.5" stroke={sc} strokeWidth="0.6" />
        <circle cx="60" cy="50" r="5" fill="none" stroke={sc} strokeWidth="0.6" strokeOpacity="0.5" />
        {/* Robes */}
        <path d="M48,78 L42,140 Q60,135 78,140 L72,78 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {/* Cross on chest */}
        <line x1="60" y1="82" x2="60" y2="95" stroke={sc} strokeWidth="1" strokeOpacity="0.5" />
        <line x1="54" y1="87" x2="66" y2="87" stroke={sc} strokeWidth="1" strokeOpacity="0.5" />
        {/* Scroll (TORA) */}
        <rect x="52" y="100" width="16" height="22" rx="2" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.5" />
        <text x="60" y="114" textAnchor="middle" fontSize="5" fill={sc} fillOpacity="0.4" fontFamily="serif">TORA</text>
        {/* Crescent at feet */}
        <path d="M50,148 Q60,140 70,148 Q60,155 50,148" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.5" />
      </g>
    );

    /* ── 3  The Empress 女帝 ── */
    case 3: return (
      <g>
        <defs>
          <linearGradient id="m3field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pc} stopOpacity="0.15" />
            <stop offset="100%" stopColor={pc} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Wheat field background */}
        <rect x="10" y="130" width="100" height="50" fill="url(#m3field)" rx="4" />
        {[18, 30, 42, 54, 66, 78, 90, 102].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={155} x2={x} y2={128 - (i % 3) * 3} stroke={sc} strokeWidth="0.6" strokeOpacity="0.4" />
            <ellipse cx={x} cy={126 - (i % 3) * 3} rx="2.5" ry="5" fill={sc} fillOpacity="0.3" />
          </g>
        ))}
        {/* Waterfall on right */}
        <path d="M95,55 Q100,80 98,110 Q96,130 95,155" fill="none" stroke={sc} strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="3,2" />
        {/* Throne / cushion */}
        <rect x="32" y="85" width="56" height="50" rx="6" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        {/* Seated figure */}
        <circle cx="60" cy="68" r="11" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
        <path d="M46,78 L40,132 Q60,128 80,132 L74,78 Z" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.7" />
        {/* Crown of 12 stars */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 - 90) * Math.PI / 180;
          return <circle key={i} cx={60 + Math.cos(a) * 16} cy={56 + Math.sin(a) * 8} r="1.2" fill="#f4d03f" fillOpacity="0.7" />;
        })}
        {/* Venus symbol */}
        <circle cx="28" cy="100" r="6" fill="none" stroke={sc} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="28" y1="106" x2="28" y2="116" stroke={sc} strokeWidth="1" strokeOpacity="0.4" />
        <line x1="24" y1="112" x2="32" y2="112" stroke={sc} strokeWidth="1" strokeOpacity="0.4" />
        {/* Scepter */}
        <line x1="78" y1="80" x2="88" y2="55" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="89" cy="52" r="4" fill={sc} fillOpacity="0.4" />
      </g>
    );

    /* ── 4  The Emperor 皇帝 ── */
    case 4: return (
      <g>
        {/* Mountain backdrop */}
        <polygon points="0,120 20,70 45,95 65,55 90,80 120,120" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.4" strokeOpacity="0.15" />
        {/* Stone throne */}
        <rect x="24" y="72" width="72" height="85" rx="3" fill={pc} fillOpacity="0.12" stroke={sc} strokeWidth="1" />
        <rect x="24" y="62" width="72" height="14" rx="2" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        {/* Ram heads on throne */}
        {[30, 90].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={78} r="5" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
            <path d={`M${x - 4},${76} Q${x - 8},${72} ${x - 6},${68}`} fill="none" stroke={sc} strokeWidth="0.7" strokeLinecap="round" />
            <path d={`M${x + 4},${76} Q${x + 8},${72} ${x + 6},${68}`} fill="none" stroke={sc} strokeWidth="0.7" strokeLinecap="round" />
          </g>
        ))}
        {/* Seated figure */}
        <circle cx="60" cy="56" r="11" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1.1" />
        <rect x="46" y="67" width="28" height="42" rx="4" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        {/* Crown */}
        <polygon points="50,48 53,38 57,45 60,34 63,45 67,38 70,48" fill={sc} fillOpacity="0.65" stroke={sc} strokeWidth="0.5" />
        {/* Ankh scepter */}
        <line x1="84" y1="72" x2="84" y2="145" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <circle cx="84" cy="68" r="5" fill="none" stroke={sc} strokeWidth="1.2" />
        <line x1="80" y1="76" x2="88" y2="76" stroke={sc} strokeWidth="1.2" />
        {/* Orb in hand */}
        <circle cx="40" cy="88" r="6" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
        <line x1="40" y1="82" x2="40" y2="78" stroke={sc} strokeWidth="0.8" />
        <line x1="37" y1="78" x2="43" y2="78" stroke={sc} strokeWidth="0.8" />
        {/* Legs */}
        <line x1="52" y1="109" x2="46" y2="145" stroke={sc} strokeWidth="1.2" />
        <line x1="68" y1="109" x2="74" y2="145" stroke={sc} strokeWidth="1.2" />
      </g>
    );

    /* ── 5  The Hierophant 法王 ── */
    case 5: return (
      <g>
        {/* Pillars */}
        <rect x="14" y="40" width="8" height="125" rx="2" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
        <rect x="98" y="40" width="8" height="125" rx="2" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
        {/* Triple crown */}
        {[46, 42, 38].map((y, i) => (
          <rect key={i} x={50 - i * 2} y={y} width={20 + i * 4} height="6" rx="2" fill={sc} fillOpacity={0.4 + i * 0.1} stroke={sc} strokeWidth="0.5" />
        ))}
        <circle cx="60" cy="36" r="3" fill="#f4d03f" fillOpacity="0.6" />
        {/* Figure head */}
        <circle cx="60" cy="62" r="10" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
        {/* Robes */}
        <path d="M46,72 L36,155 Q60,148 84,155 L74,72 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        {/* Raised hand blessing */}
        <line x1="70" y1="78" x2="82" y2="65" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M80,62 L82,56 M80,62 L84,57 M80,62 L86,60" fill="none" stroke={sc} strokeWidth="0.7" strokeLinecap="round" />
        {/* Staff in left hand */}
        <line x1="40" y1="80" x2="34" y2="155" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="80" x2="40" y2="80" stroke={sc} strokeWidth="1.2" />
        <line x1="28" y1="86" x2="40" y2="86" stroke={sc} strokeWidth="1" />
        <line x1="28" y1="92" x2="40" y2="92" stroke={sc} strokeWidth="0.8" />
        {/* Crossed keys at bottom */}
        <line x1="48" y1="140" x2="72" y2="160" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="72" y1="140" x2="48" y2="160" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="48" cy="140" r="2.5" fill={sc} fillOpacity="0.4" />
        <circle cx="72" cy="140" r="2.5" fill={sc} fillOpacity="0.4" />
        {/* Two acolytes */}
        {[30, 90].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={130} r="5" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.5" />
            <rect x={x - 5} y={135} width="10" height="18" rx="2" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.4" />
          </g>
        ))}
      </g>
    );

    /* ── 6  The Lovers 恋人 ── */
    case 6: return (
      <g>
        <defs>
          <radialGradient id="m6glow" cx="50%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f4d03f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="10" y="28" width="100" height="50" fill="url(#m6glow)" />
        {/* Angel above */}
        <circle cx="60" cy="42" r="9" fill={sc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
        <path d="M46,48 Q36,38 42,30 Q50,42 54,46" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        <path d="M74,48 Q84,38 78,30 Q70,42 66,46" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        {/* Sun behind angel */}
        <circle cx="60" cy="35" r="16" fill="none" stroke="#f4d03f" strokeWidth="0.6" strokeOpacity="0.4" />
        {/* Two figures */}
        {[38, 82].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={100} r="8" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
            <rect x={x - 8} y={108} width="16" height="32" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
            <line x1={x} y1={140} x2={x - 5} y2={162} stroke={sc} strokeWidth="1" />
            <line x1={x} y1={140} x2={x + 5} y2={162} stroke={sc} strokeWidth="1" />
          </g>
        ))}
        {/* Tree of knowledge (left figure) */}
        <line x1="22" y1="80" x2="22" y2="130" stroke={sc} strokeWidth="1.2" />
        {[82, 90, 98, 106].map((y, i) => (
          <circle key={i} cx={22 + (i % 2 ? 4 : -4)} cy={y} r="3" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.3" />
        ))}
        {/* Tree of life (right figure) */}
        <line x1="98" y1="80" x2="98" y2="130" stroke={sc} strokeWidth="1.2" />
        {[82, 90, 98, 106].map((y, i) => (
          <ellipse key={i} cx={98 + (i % 2 ? 4 : -4)} cy={y} rx="3" ry="4" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.3" />
        ))}
        {/* Ground */}
        <path d="M10,165 Q60,158 110,165" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
      </g>
    );

    /* ── 7  The Chariot 戦車 ── */
    case 7: return (
      <g>
        {/* City walls behind */}
        <rect x="10" y="38" width="100" height="22" rx="2" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.4" />
        {[20, 36, 52, 68, 84, 100].map((x, i) => (
          <rect key={i} x={x - 3} y={32} width="6" height="10" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.3" />
        ))}
        {/* Starry canopy */}
        <path d="M30,62 Q60,48 90,62 L92,75 L28,75 Z" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {[38, 50, 60, 70, 82].map((x, i) => (
          <polygon key={i} points={`${x},${58 + (i % 2) * 3} ${x + 1.5},${55 + (i % 2) * 3} ${x + 3},${58 + (i % 2) * 3} ${x + 1.5},${53 + (i % 2) * 3}`} fill="#f4d03f" fillOpacity="0.6" />
        ))}
        {/* Figure under canopy */}
        <circle cx="60" cy="80" r="9" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <polygon points="52,72 56,64 60,70 64,64 68,72" fill={sc} fillOpacity="0.5" />
        <rect x="44" y="88" width="32" height="22" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        {/* Chariot body */}
        <rect x="26" y="110" width="68" height="28" rx="4" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1" />
        {/* Winged disk on chariot */}
        <circle cx="60" cy="118" r="5" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.6" />
        <path d="M55,118 Q46,114 38,118" fill="none" stroke={sc} strokeWidth="0.6" />
        <path d="M65,118 Q74,114 82,118" fill="none" stroke={sc} strokeWidth="0.6" />
        {/* Two sphinxes */}
        {[32, 76].map((x, i) => (
          <g key={i}>
            <ellipse cx={x + 6} cy={152} rx="14" ry="8" fill={i ? sc : pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.7" />
            <circle cx={x + 2} cy={142} r="6" fill={i ? sc : pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.6" />
          </g>
        ))}
      </g>
    );

    /* ── 8  Strength 力 ── */
    case 8: return (
      <g>
        {/* Infinity symbol */}
        <path d="M48,40 Q40,30 48,36 Q56,42 64,32 Q72,22 64,28 Q56,34 48,40" fill="none" stroke="#f4d03f" strokeWidth="1" strokeOpacity="0.6" />
        {/* Woman figure */}
        <circle cx="55" cy="62" r="9" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <path d="M46,70 Q42,90 44,120 Q55,115 60,120 L64,70 Z" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.7" />
        {/* Arms reaching to lion */}
        <path d="M64,75 Q68,78 72,82" fill="none" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M46,78 Q42,85 44,92" fill="none" stroke={sc} strokeWidth="1" strokeLinecap="round" />
        {/* Lion */}
        <ellipse cx="65" cy="108" rx="24" ry="16" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        <circle cx="72" cy="92" r="11" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
        {/* Lion's mane */}
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * 36 + 180) * Math.PI / 180;
          return <line key={i} x1={72 + Math.cos(a) * 11} y1={92 + Math.sin(a) * 11} x2={72 + Math.cos(a) * 16} y2={92 + Math.sin(a) * 16} stroke={sc} strokeWidth="0.8" strokeOpacity="0.4" />;
        })}
        {/* Lion's jaw open */}
        <path d="M78,96 Q82,100 78,104" fill="none" stroke={sc} strokeWidth="0.8" />
        {/* Lion's tail */}
        <path d="M42,112 Q30,118 28,130 Q30,128 34,132" fill="none" stroke={sc} strokeWidth="1" strokeLinecap="round" />
        {/* Lion legs */}
        <line x1="50" y1="120" x2="48" y2="140" stroke={sc} strokeWidth="1" />
        <line x1="80" y1="118" x2="82" y2="138" stroke={sc} strokeWidth="1" />
        {/* Flower chain */}
        {[30, 42, 54, 66, 78, 90].map((x, i) => (
          <circle key={i} cx={x} cy={155 + (i % 2) * 3} r="2" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.3" />
        ))}
      </g>
    );

    /* ── 9  The Hermit 隠者 ── */
    case 9: return (
      <g>
        {/* Mountain */}
        <polygon points="10,170 60,55 110,170" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.5" strokeOpacity="0.2" />
        <polygon points="25,170 60,75 95,170" fill={pc} fillOpacity="0.08" />
        {/* Snow cap */}
        <polygon points="50,70 60,55 70,70" fill="#fff" fillOpacity="0.1" />
        {/* Robed figure on peak */}
        <circle cx="60" cy="78" r="8" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
        <path d="M50,86 Q46,110 44,145 L76,145 Q74,110 70,86 Z" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {/* Hood */}
        <path d="M52,80 Q52,72 60,70 Q68,72 68,80" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        {/* Staff */}
        <line x1="44" y1="90" x2="40" y2="155" stroke={sc} strokeWidth="1.8" strokeLinecap="round" />
        {/* Lantern held high */}
        <line x1="70" y1="84" x2="80" y2="62" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <rect x="74" y="52" width="12" height="14" rx="2" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        <rect x="76" y="54" width="8" height="10" rx="1" fill="#f4d03f" fillOpacity="0.4" />
        {/* Six-pointed star in lantern */}
        <polygon points="80,56 81.5,59 84.5,59 82,61 83,64 80,62 77,64 78,61 75.5,59 78.5,59" fill="#f4d03f" fillOpacity="0.7" />
        {/* Lantern glow */}
        <circle cx="80" cy="59" r="10" fill="#f4d03f" fillOpacity="0.08" />
        <circle cx="80" cy="59" r="18" fill="#f4d03f" fillOpacity="0.04" />
        {/* Distant stars */}
        {[[20, 42], [95, 48], [15, 58], [105, 55]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1" fill="#f4d03f" fillOpacity="0.4" />
        ))}
      </g>
    );

    /* ── 10  Wheel of Fortune 運命の輪 ── */
    case 10: return (
      <g>
        {/* Outer wheel */}
        <circle cx="60" cy="100" r="50" fill="none" stroke={sc} strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="60" cy="100" r="42" fill="none" stroke={sc} strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="60" cy="100" r="20" fill={pc} fillOpacity="0.12" stroke={sc} strokeWidth="0.8" />
        {/* Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
          const r = a * Math.PI / 180;
          return <line key={i} x1={60 + Math.cos(r) * 20} y1={100 + Math.sin(r) * 20} x2={60 + Math.cos(r) * 42} y2={100 + Math.sin(r) * 42} stroke={sc} strokeWidth="0.6" strokeOpacity="0.35" />;
        })}
        {/* TARO/ROTA letters */}
        {[["T", -90], ["A", 0], ["R", 90], ["O", 180]].map(([l, a], i) => {
          const r = (a as number) * Math.PI / 180;
          return <text key={i} x={60 + Math.cos(r) * 31} y={103 + Math.sin(r) * 31} textAnchor="middle" fontSize="8" fill={sc} fillOpacity="0.6" fontFamily="serif">{l as string}</text>;
        })}
        {/* Hebrew letters */}
        {[["י", 45], ["ה", 135], ["ו", 225], ["ה", 315]].map(([l, a], i) => {
          const r = (a as number) * Math.PI / 180;
          return <text key={`h${i}`} x={60 + Math.cos(r) * 31} y={103 + Math.sin(r) * 31} textAnchor="middle" fontSize="6" fill={sc} fillOpacity="0.35">{l as string}</text>;
        })}
        {/* Sphinx on top */}
        <ellipse cx="60" cy="48" rx="10" ry="6" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.6" />
        <circle cx="60" cy="42" r="5" fill={sc} fillOpacity="0.35" stroke={sc} strokeWidth="0.5" />
        <line x1="60" y1="40" x2="60" y2="34" stroke={sc} strokeWidth="1" />
        <line x1="56" y1="36" x2="64" y2="36" stroke={sc} strokeWidth="0.8" />
        {/* Serpent descending (right) */}
        <path d="M88,78 Q95,90 90,105 Q85,115 88,125" fill="none" stroke={sc} strokeWidth="1.2" strokeOpacity="0.4" />
        {/* Anubis ascending (left) */}
        <circle cx="26" cy="115" r="5" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.5" />
        <line x1="26" y1="120" x2="26" y2="130" stroke={sc} strokeWidth="0.8" />
        {/* Four corner creatures */}
        {[["♈", 14, 38], ["♏", 100, 38], ["♌", 14, 164], ["♉", 100, 164]].map(([s2, x, y], i) => (
          <text key={i} x={x as number} y={y as number} textAnchor="middle" fontSize="10" fill={sc} fillOpacity="0.4">{s2 as string}</text>
        ))}
      </g>
    );

    /* ── 11  Justice 正義 ── */
    case 11: return (
      <g>
        {/* Pillars */}
        <rect x="14" y="44" width="8" height="120" rx="2" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />
        <rect x="98" y="44" width="8" height="120" rx="2" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />
        {/* Purple veil */}
        <path d="M22,44 Q60,38 98,44 L98,164 Q60,158 22,164 Z" fill={pc} fillOpacity="0.06" />
        {/* Seated figure */}
        <circle cx="60" cy="60" r="10" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="1" />
        <rect x="42" y="70" width="36" height="52" rx="4" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        {/* Crown */}
        <rect x="50" y="48" width="20" height="6" rx="1" fill={sc} fillOpacity="0.4" stroke={sc} strokeWidth="0.4" />
        <polygon points="50,48 55,42 60,48 65,42 70,48" fill={sc} fillOpacity="0.5" />
        {/* Raised sword in right hand */}
        <line x1="80" y1="78" x2="88" y2="42" stroke={sc} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="84" y1="62" x2="92" y2="62" stroke={sc} strokeWidth="1.2" />
        {/* Sword tip */}
        <polygon points="88,42 86,38 90,38" fill={sc} fillOpacity="0.5" />
        {/* Scales in left hand */}
        <line x1="40" y1="78" x2="30" y2="68" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="68" x2="40" y2="68" stroke={sc} strokeWidth="1" />
        {/* Scale pans */}
        <path d="M18,68 L16,78 Q20,82 24,78 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        <path d="M38,68 L36,78 Q40,82 44,78 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        <line x1="20" y1="68" x2="20" y2="72" stroke={sc} strokeWidth="0.4" />
        <line x1="40" y1="68" x2="40" y2="72" stroke={sc} strokeWidth="0.4" />
        {/* Red robe drape */}
        <path d="M42,122 L38,155 Q60,150 82,155 L78,122" fill={pc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />
      </g>
    );

    /* ── 12  The Hanged Man 吊られた男 ── */
    case 12: return (
      <g>
        {/* T-cross (Tau) */}
        <line x1="24" y1="45" x2="96" y2="45" stroke={sc} strokeWidth="3.5" strokeLinecap="round" />
        <line x1="24" y1="45" x2="24" y2="38" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <line x1="96" y1="45" x2="96" y2="38" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        {/* Leaves on crossbar */}
        {[30, 42, 54, 66, 78, 90].map((x, i) => (
          <ellipse key={i} cx={x} cy={42} rx="2.5" ry="4" fill={sc} fillOpacity="0.2" transform={`rotate(${i % 2 ? 15 : -15},${x},42)`} />
        ))}
        {/* Rope */}
        <line x1="60" y1="45" x2="60" y2="78" stroke={sc} strokeWidth="1" strokeDasharray="2,1.5" />
        {/* Hanging figure (upside down) */}
        {/* Legs - one crossed */}
        <line x1="60" y1="78" x2="60" y2="96" stroke={sc} strokeWidth="1.5" />
        <line x1="60" y1="88" x2="50" y2="80" stroke={sc} strokeWidth="1.2" />
        {/* Body */}
        <rect x="50" y="96" width="20" height="28" rx="4" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        {/* Arms out */}
        <line x1="50" y1="106" x2="34" y2="118" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="70" y1="106" x2="86" y2="118" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        {/* Head at bottom */}
        <circle cx="60" cy="134" r="10" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        {/* Halo */}
        <circle cx="60" cy="134" r="16" fill="none" stroke="#f4d03f" strokeWidth="1.2" strokeOpacity="0.5" />
        <circle cx="60" cy="134" r="18" fill="#f4d03f" fillOpacity="0.06" />
        {/* Serene expression hint */}
        <path d="M56,136 Q60,138 64,136" fill="none" stroke={sc} strokeWidth="0.4" strokeOpacity="0.5" />
      </g>
    );

    /* ── 13  Death 死神 ── */
    case 13: return (
      <g>
        {/* Rising sun between towers */}
        <circle cx="60" cy="42" r="14" fill="#f4d03f" fillOpacity="0.2" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 22.5 + 180) * Math.PI / 180;
          return <line key={i} x1={60 + Math.cos(a) * 14} y1={42 + Math.sin(a) * 14} x2={60 + Math.cos(a) * 22} y2={42 + Math.sin(a) * 22} stroke="#f4d03f" strokeWidth="0.8" strokeOpacity="0.3" />;
        })}
        {/* Two towers */}
        {[22, 88].map((x, i) => (
          <g key={i}>
            <rect x={x} y={34} width="10" height="36" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.5" />
            <polygon points={`${x},34 ${x + 5},28 ${x + 10},34`} fill={sc} fillOpacity="0.2" />
          </g>
        ))}
        {/* Skeleton on horse */}
        <ellipse cx="58" cy="125" rx="28" ry="16" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {/* Horse head */}
        <path d="M82,108 Q90,95 86,85 Q84,82 80,84" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {/* Horse legs */}
        <line x1="36" y1="138" x2="32" y2="160" stroke={sc} strokeWidth="0.8" />
        <line x1="44" y1="140" x2="42" y2="162" stroke={sc} strokeWidth="0.8" />
        <line x1="72" y1="138" x2="76" y2="160" stroke={sc} strokeWidth="0.8" />
        <line x1="78" y1="136" x2="82" y2="158" stroke={sc} strokeWidth="0.8" />
        {/* Skeleton rider */}
        <circle cx="58" cy="88" r="8" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        {/* Skull features */}
        <circle cx="55" cy="87" r="1.5" fill={sc} fillOpacity="0.4" />
        <circle cx="61" cy="87" r="1.5" fill={sc} fillOpacity="0.4" />
        <line x1="56" y1="92" x2="60" y2="92" stroke={sc} strokeWidth="0.5" />
        {/* Skeleton body */}
        <line x1="58" y1="96" x2="58" y2="115" stroke={sc} strokeWidth="1.2" />
        <line x1="50" y1="100" x2="66" y2="100" stroke={sc} strokeWidth="0.8" />
        {/* Flag/banner */}
        <line x1="58" y1="75" x2="58" y2="98" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M58,75 L78,82 L58,89" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        {/* Rose on flag */}
        <circle cx="68" cy="82" r="3" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.4" />
        {/* Fallen king */}
        <polygon points="24,152 28,148 32,152 28,146" fill={sc} fillOpacity="0.3" />
        <rect x="22" y="154" width="12" height="10" rx="2" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.4" />
      </g>
    );

    /* ── 14  Temperance 節制 ── */
    case 14: return (
      <g>
        {/* Path to mountain */}
        <path d="M60,170 Q65,140 70,120 Q78,95 85,75 Q90,60 88,50" fill="none" stroke={sc} strokeWidth="0.8" strokeOpacity="0.2" />
        {/* Mountain in distance */}
        <polygon points="75,55 88,38 100,55" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.3" />
        {/* Sun on horizon */}
        <circle cx="88" cy="42" r="8" fill="#f4d03f" fillOpacity="0.25" />
        {/* Angel figure */}
        <circle cx="55" cy="62" r="10" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        {/* Wings */}
        <path d="M44,68 Q28,52 22,40 Q32,50 42,62" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.7" />
        <path d="M66,68 Q82,52 88,40 Q78,50 68,62" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.7" />
        <path d="M42,72 Q30,60 26,50 Q34,58 43,68" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.4" />
        <path d="M68,72 Q80,60 84,50 Q76,58 67,68" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.4" />
        {/* Robes */}
        <path d="M44,72 L38,150 Q55,145 72,150 L66,72 Z" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        {/* Triangle on chest */}
        <polygon points="55,78 50,88 60,88" fill="none" stroke={sc} strokeWidth="0.7" strokeOpacity="0.4" />
        {/* Two cups pouring */}
        <path d="M34,92 L30,100 Q34,106 38,100 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        <path d="M72,88 L68,96 Q72,102 76,96 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        {/* Water stream between cups */}
        <path d="M36,98 Q52,85 72,92" fill="none" stroke="#5dade2" strokeWidth="1.5" strokeOpacity="0.4" />
        {/* One foot in water */}
        <path d="M30,155 Q55,148 80,155" fill="#5dade2" fillOpacity="0.08" stroke="#5dade2" strokeWidth="0.5" strokeOpacity="0.2" />
        {/* Irises */}
        {[25, 82].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={142} x2={x} y2={155} stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
            <ellipse cx={x} cy={140} rx="3" ry="4" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.3" />
          </g>
        ))}
      </g>
    );

    /* ── 15  The Devil 悪魔 ── */
    case 15: return (
      <g>
        {/* Inverted pentagram */}
        <circle cx="60" cy="58" r="26" fill="none" stroke={pc} strokeWidth="0.6" strokeOpacity="0.3" />
        {Array.from({ length: 5 }, (_, i) => {
          const a1 = ((i * 72) + 90) * Math.PI / 180;
          const a2 = (((i + 2) * 72) + 90) * Math.PI / 180;
          return <line key={i} x1={60 + Math.cos(a1) * 24} y1={58 + Math.sin(a1) * 24} x2={60 + Math.cos(a2) * 24} y2={58 + Math.sin(a2) * 24} stroke={sc} strokeWidth="1" strokeOpacity="0.5" />;
        })}
        {/* Baphomet figure */}
        <circle cx="60" cy="62" r="10" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
        {/* Horns */}
        <path d="M52,56 Q46,40 40,36" fill="none" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M68,56 Q74,40 80,36" fill="none" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        {/* Bat wings */}
        <path d="M50,68 Q32,58 18,52 Q28,66 22,78 Q32,70 40,72" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
        <path d="M70,68 Q88,58 102,52 Q92,66 98,78 Q88,70 80,72" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
        {/* Pedestal/cube */}
        <rect x="38" y="88" width="44" height="24" rx="2" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        {/* Torch between horns */}
        <line x1="60" y1="56" x2="60" y2="44" stroke={sc} strokeWidth="1" />
        <polygon points="56,44 60,36 64,44" fill="#f4d03f" fillOpacity="0.4" />
        {/* Two chained figures */}
        {[34, 78].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={125} r="5" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.5" />
            <rect x={x - 5} y={130} width="10" height="16" rx="2" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.4" />
            {/* Tail */}
            <path d={`M${x + (i ? 3 : -3)},${146} Q${x + (i ? 8 : -8)},${150} ${x + (i ? 5 : -5)},${155}`} fill="none" stroke={sc} strokeWidth="0.6" />
            {/* Chain */}
            <line x1={x + (i ? -5 : 5)} y1={125} x2={i ? 82 : 38} y2={108} stroke={sc} strokeWidth="0.6" strokeDasharray="2,1.5" strokeOpacity="0.5" />
            {/* Horns */}
            <line x1={x - 2} y1={121} x2={x - 4} y2={117} stroke={sc} strokeWidth="0.5" />
            <line x1={x + 2} y1={121} x2={x + 4} y2={117} stroke={sc} strokeWidth="0.5" />
          </g>
        ))}
      </g>
    );

    /* ── 16  The Tower 塔 ── */
    case 16: return (
      <g>
        {/* Dark sky */}
        <rect x="10" y="28" width="100" height="80" fill={sc} fillOpacity="0.04" rx="4" />
        {/* Tower */}
        <rect x="40" y="55" width="40" height="105" rx="2" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="1" />
        {/* Tower windows */}
        {[70, 90, 110, 130].map((y, i) => (
          <g key={i}>
            <rect x={50 + (i % 2) * 14} y={y} width="6" height="8" rx="1" fill={sc} fillOpacity="0.15" stroke={sc} strokeWidth="0.3" />
          </g>
        ))}
        {/* Crown flying off */}
        <polygon points="48,52 54,40 60,48 66,40 72,52" fill={sc} fillOpacity="0.4" stroke={sc} strokeWidth="0.6" />
        <path d="M60,46 Q65,32 75,28" fill="none" stroke={sc} strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.3" />
        {/* Lightning bolt */}
        <polyline points="88,32 72,62 82,62 62,98" fill="none" stroke="#f4d03f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="86,34 70,64 80,64 60,100" fill="none" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" />
        {/* Flames from top */}
        {[44, 52, 60, 68, 76].map((x, i) => (
          <path key={i} d={`M${x},55 Q${x + (i % 2 ? 3 : -3)},${48 - i * 2} ${x},${42 - i * 2}`}
            fill="none" stroke="#e74c3c" strokeWidth="1" strokeOpacity={0.3 + i * 0.05} />
        ))}
        {/* Two falling figures */}
        <g transform="rotate(25,28,90)">
          <circle cx="28" cy="85" r="4" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.5" />
          <rect x="24" y="89" width="8" height="14" rx="2" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        </g>
        <g transform="rotate(-20,92,100)">
          <circle cx="92" cy="95" r="4" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.5" />
          <rect x="88" y="99" width="8" height="14" rx="2" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        </g>
        {/* Rain of fire dots */}
        {[[22, 65], [95, 72], [18, 98], [100, 105], [30, 120], [88, 130]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="#e74c3c" fillOpacity="0.3" />
        ))}
      </g>
    );

    /* ── 17  The Star 星 ── */
    case 17: return (
      <g>
        <defs>
          <radialGradient id="m17star" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f4d03f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Large star */}
        <circle cx="60" cy="42" r="20" fill="url(#m17star)" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return <line key={i} x1={60 + Math.cos(a) * 7} y1={42 + Math.sin(a) * 7} x2={60 + Math.cos(a) * 18} y2={42 + Math.sin(a) * 18} stroke="#f4d03f" strokeWidth="1.5" strokeOpacity="0.6" />;
        })}
        <circle cx="60" cy="42" r="6" fill="#f4d03f" fillOpacity="0.7" />
        {/* 7 smaller stars */}
        {[[28, 38], [92, 38], [20, 55], [100, 55], [35, 30], [85, 30], [60, 25]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#f4d03f" fillOpacity="0.5" />
        ))}
        {/* Kneeling figure */}
        <circle cx="50" cy="95" r="8" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
        <path d="M42,102 Q38,118 40,135 L60,135 Q58,118 56,102 Z" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        {/* One foot in water */}
        <line x1="42" y1="135" x2="38" y2="148" stroke={sc} strokeWidth="1" />
        {/* One foot on land */}
        <line x1="58" y1="135" x2="62" y2="148" stroke={sc} strokeWidth="1" />
        {/* Left pitcher pouring to pool */}
        <path d="M36,108 Q28,106 26,110 L32,112 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        <path d="M26,112 Q20,125 18,140" fill="none" stroke="#5dade2" strokeWidth="1" strokeOpacity="0.4" />
        {/* Right pitcher pouring to land */}
        <path d="M62,105 Q70,104 72,108 L66,110 Z" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        <path d="M72,108 Q78,118 82,130 Q86,140 90,148" fill="none" stroke="#5dade2" strokeWidth="1" strokeOpacity="0.4" />
        {/* Water pool */}
        <ellipse cx="30" cy="155" rx="22" ry="8" fill="#5dade2" fillOpacity="0.08" stroke="#5dade2" strokeWidth="0.4" strokeOpacity="0.2" />
        {/* Ibis bird in tree */}
        <line x1="98" y1="110" x2="98" y2="148" stroke={sc} strokeWidth="1" />
        {[112, 118, 124].map((y, i) => (
          <ellipse key={i} cx={98 + (i % 2 ? 4 : -4)} cy={y} rx="4" ry="3" fill={sc} fillOpacity="0.15" />
        ))}
        <circle cx="96" cy="108" r="2.5" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.3" />
      </g>
    );

    /* ── 18  The Moon 月 ── */
    case 18: return (
      <g>
        <defs>
          <radialGradient id="m18moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pc} stopOpacity="0.4" />
            <stop offset="60%" stopColor={pc} stopOpacity="0.15" />
            <stop offset="100%" stopColor={pc} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Moon with glow */}
        <circle cx="60" cy="45" r="24" fill="url(#m18moon)" />
        <circle cx="60" cy="45" r="18" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
        {/* Crescent shadow */}
        <circle cx="54" cy="42" r="13" fill={pc} fillOpacity="0.35" />
        {/* Moon face hint */}
        <circle cx="56" cy="42" r="1.5" fill={sc} fillOpacity="0.3" />
        <circle cx="63" cy="42" r="1.5" fill={sc} fillOpacity="0.3" />
        <path d="M56,48 Q60,50 64,48" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Drops falling from moon */}
        {[[45, 62], [52, 58], [68, 58], [75, 62], [60, 64]].map(([x, y], i) => (
          <path key={i} d={`M${x},${y} Q${x + 1},${y + 3} ${x},${y + 4}`} fill={sc} fillOpacity="0.2" />
        ))}
        {/* Two towers */}
        {[22, 88].map((x, i) => (
          <g key={i}>
            <rect x={x} y={78} width="12" height="60" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.6" />
            <polygon points={`${x},78 ${x + 6},70 ${x + 12},78`} fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
            <rect x={x + 3} y={88} width="6" height="6" rx="1" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.3" />
          </g>
        ))}
        {/* Path between towers */}
        <path d="M34,150 Q60,130 86,150" fill="none" stroke={sc} strokeWidth="0.6" strokeOpacity="0.25" />
        {/* Two dogs/wolves */}
        {[38, 74].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={130} rx="8" ry="6" fill={i ? sc : pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
            <circle cx={x + (i ? 6 : -6)} cy={125} r="4" fill={i ? sc : pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.4" />
            {/* Howling pose */}
            <path d={`M${x + (i ? 4 : -4)},123 L${x + (i ? 6 : -6)},118`} fill="none" stroke={sc} strokeWidth="0.5" />
          </g>
        ))}
        {/* Crayfish from pool */}
        <ellipse cx="60" cy="160" rx="6" ry="4" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        <line x1="55" y1="158" x2="50" y2="155" stroke={sc} strokeWidth="0.5" />
        <line x1="65" y1="158" x2="70" y2="155" stroke={sc} strokeWidth="0.5" />
        {/* Water pool */}
        <path d="M20,158 Q60,152 100,158 L100,172 Q60,165 20,172 Z" fill={sc} fillOpacity="0.06" stroke={sc} strokeWidth="0.3" strokeOpacity="0.2" />
      </g>
    );

    /* ── 19  The Sun 太陽 ── */
    case 19: return (
      <g>
        <defs>
          <radialGradient id="m19sun" cx="50%" cy="30%" r="45%">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f4d03f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Sun glow */}
        <circle cx="60" cy="48" r="35" fill="url(#m19sun)" />
        {/* Sun rays */}
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * 22.5) * Math.PI / 180;
          const inner = i % 2 === 0 ? 20 : 17;
          return <line key={i} x1={60 + Math.cos(a) * inner} y1={48 + Math.sin(a) * inner} x2={60 + Math.cos(a) * 32} y2={48 + Math.sin(a) * 32} stroke="#f4d03f" strokeWidth={i % 2 === 0 ? "1.5" : "0.8"} strokeOpacity="0.5" />;
        })}
        {/* Sun face */}
        <circle cx="60" cy="48" r="16" fill="#f4d03f" fillOpacity="0.55" stroke={sc} strokeWidth="0.6" />
        <circle cx="60" cy="48" r="12" fill="#f4d03f" fillOpacity="0.3" />
        <circle cx="55" cy="46" r="1.5" fill={sc} fillOpacity="0.4" />
        <circle cx="65" cy="46" r="1.5" fill={sc} fillOpacity="0.4" />
        <path d="M55,52 Q60,55 65,52" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
        {/* Garden wall */}
        <rect x="10" y="120" width="100" height="14" fill={sc} fillOpacity="0.08" stroke={sc} strokeWidth="0.4" />
        {/* Sunflowers */}
        {[18, 32, 46, 60, 74, 88, 102].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={120} x2={x} y2={100 + (i % 2) * 5} stroke={sc} strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx={x} cy={98 + (i % 2) * 5} r="4" fill="#f4d03f" fillOpacity="0.25" stroke={sc} strokeWidth="0.3" />
            <circle cx={x} cy={98 + (i % 2) * 5} r="1.5" fill={sc} fillOpacity="0.3" />
          </g>
        ))}
        {/* Child on horse */}
        <ellipse cx="58" cy="148" rx="20" ry="12" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.7" />
        <path d="M74,140 Q80,132 78,125" fill="none" stroke={sc} strokeWidth="0.7" />
        <circle cx="55" cy="128" r="7" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.7" />
        <rect x="49" y="135" width="12" height="10" rx="2" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.5" />
        {/* Horse legs */}
        <line x1="42" y1="158" x2="38" y2="170" stroke={sc} strokeWidth="0.7" />
        <line x1="50" y1="158" x2="48" y2="170" stroke={sc} strokeWidth="0.7" />
        <line x1="66" y1="156" x2="70" y2="170" stroke={sc} strokeWidth="0.7" />
        <line x1="72" y1="155" x2="76" y2="168" stroke={sc} strokeWidth="0.7" />
        {/* Banner/flag */}
        <line x1="55" y1="120" x2="55" y2="136" stroke={sc} strokeWidth="0.8" />
        <rect x="55" y="120" width="12" height="8" rx="1" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.3" />
      </g>
    );

    /* ── 20  Judgement 審判 ── */
    case 20: return (
      <g>
        {/* Clouds */}
        {[[20, 42], [50, 38], [80, 44], [35, 48], [65, 46]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx={10 + i * 2} ry={5 + i} fill={sc} fillOpacity="0.06" stroke={sc} strokeWidth="0.3" strokeOpacity="0.15" />
        ))}
        {/* Angel in clouds */}
        <circle cx="60" cy="48" r="9" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
        {/* Wings */}
        <path d="M50,52 Q34,42 24,34 Q36,44 48,50" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        <path d="M70,52 Q86,42 96,34 Q84,44 72,50" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        {/* Trumpet */}
        <line x1="60" y1="54" x2="60" y2="68" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M54,68 L60,68 L60,80 L54,76 Z" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.5" />
        <path d="M66,68 L60,68 L60,80 L66,76 Z" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.5" />
        {/* Cross on flag */}
        <rect x="62" y="56" width="14" height="10" rx="1" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <line x1="69" y1="57" x2="69" y2="65" stroke={sc} strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="63" y1="61" x2="75" y2="61" stroke={sc} strokeWidth="0.5" strokeOpacity="0.4" />
        {/* Mountains */}
        <polygon points="0,130 20,100 45,115 60,95 80,110 100,98 120,130" fill={sc} fillOpacity="0.06" stroke={sc} strokeWidth="0.3" strokeOpacity="0.15" />
        {/* People rising from coffins */}
        {[28, 60, 92].map((x, i) => (
          <g key={i}>
            <rect x={x - 8} y={140} width="16" height="24" rx="1" fill={sc} fillOpacity="0.1" stroke={sc} strokeWidth="0.5" />
            <circle cx={x} cy={132} r="6" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.6" />
            <line x1={x - 4} y1={128} x2={x} y2={120} stroke={sc} strokeWidth="0.6" strokeLinecap="round" />
            <line x1={x + 4} y1={128} x2={x} y2={120} stroke={sc} strokeWidth="0.6" strokeLinecap="round" />
          </g>
        ))}
        {/* Waves at bottom */}
        <path d="M10,165 Q30,160 50,165 Q70,170 90,165 Q100,162 110,165" fill="none" stroke={sc} strokeWidth="0.5" strokeOpacity="0.2" />
      </g>
    );

    /* ── 21  The World 世界 ── */
    case 21: return (
      <g>
        {/* Laurel wreath */}
        <ellipse cx="60" cy="100" rx="40" ry="56" fill="none" stroke={sc} strokeWidth="2" strokeOpacity="0.35" />
        {/* Wreath leaves */}
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * 15) * Math.PI / 180;
          return (
            <ellipse key={i}
              cx={60 + Math.cos(a) * 40} cy={100 + Math.sin(a) * 56}
              rx="4" ry="7"
              transform={`rotate(${i * 15 + 90},${60 + Math.cos(a) * 40},${100 + Math.sin(a) * 56})`}
              fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.3" strokeOpacity="0.3"
            />
          );
        })}
        {/* Ribbons at top and bottom of wreath */}
        <path d="M52,44 Q48,40 44,42 Q48,46 52,48" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
        <path d="M68,44 Q72,40 76,42 Q72,46 68,48" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
        <path d="M52,156 Q48,160 44,158 Q48,154 52,152" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
        <path d="M68,156 Q72,160 76,158 Q72,154 68,152" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.4" />
        {/* Dancing figure inside wreath */}
        <circle cx="60" cy="80" r="8" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
        <path d="M54,88 Q52,105 54,120 Q60,122 66,120 Q68,105 66,88 Z" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
        {/* Flowing scarf */}
        <path d="M54,92 Q44,88 38,92 Q44,96 54,98" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.4" />
        <path d="M66,92 Q76,88 82,92 Q76,96 66,98" fill={sc} fillOpacity="0.12" stroke={sc} strokeWidth="0.4" />
        {/* Raised leg */}
        <line x1="56" y1="120" x2="48" y2="138" stroke={sc} strokeWidth="1" />
        <line x1="64" y1="120" x2="68" y2="132" stroke={sc} strokeWidth="1" />
        <path d="M68,132 Q72,134 74,130" fill="none" stroke={sc} strokeWidth="0.7" />
        {/* Two wands */}
        <line x1="52" y1="86" x2="40" y2="74" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="68" y1="86" x2="80" y2="74" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        {/* Four corner creatures */}
        {/* Angel (top-left) */}
        <circle cx="16" cy="42" r="5" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <path d="M12,45 Q8,42 10,38" fill="none" stroke={sc} strokeWidth="0.4" />
        <path d="M20,45 Q24,42 22,38" fill="none" stroke={sc} strokeWidth="0.4" />
        {/* Eagle (top-right) */}
        <circle cx="104" cy="42" r="5" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <path d="M100,40 L98,38 M108,40 L110,38" fill="none" stroke={sc} strokeWidth="0.5" />
        {/* Lion (bottom-left) */}
        <circle cx="16" cy="160" r="5" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <path d="M12,158 Q8,155 10,152 M20,158 Q24,155 22,152" fill="none" stroke={sc} strokeWidth="0.4" />
        {/* Bull (bottom-right) */}
        <circle cx="104" cy="160" r="5" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.4" />
        <path d="M100,158 L98,154 M108,158 L110,154" fill="none" stroke={sc} strokeWidth="0.5" />
      </g>
    );

    default: return <></>;
  }
}

export function MajorArcanaArt({ number, primaryColor, secondaryColor }: Props) {
  return <>{renderMajorArt(number, primaryColor, secondaryColor)}</>;
}
