import React from "react";

interface Props {
  number: number;
  primaryColor: string;
  secondaryColor: string;
}

function renderMajorArt(n: number, pc: string, sc: string): React.ReactElement {
  switch (n) {
    case 0: return (
      <g>
        <circle cx="85" cy="45" r="20" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="1" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
          const r = a * Math.PI / 180;
          return <line key={i} x1={85 + Math.cos(r)*21} y1={45 + Math.sin(r)*21} x2={85 + Math.cos(r)*28} y2={45 + Math.sin(r)*28} stroke={sc} strokeWidth="1" />;
        })}
        <rect x="0" y="130" width="80" height="80" fill={pc} fillOpacity="0.3" />
        <circle cx="42" cy="105" r="9" fill={pc} fillOpacity="0.6" stroke={sc} strokeWidth="0.8" />
        <line x1="42" y1="114" x2="42" y2="140" stroke={pc} strokeWidth="1.8" />
        <ellipse cx="62" cy="140" rx="10" ry="6" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.7" />
      </g>
    );
    case 1: return (
      <g>
        <ellipse cx="60" cy="50" rx="28" ry="10" fill="none" stroke={sc} strokeWidth="1.2" />
        <path d="M40,50 Q50,35 60,50 Q70,65 80,50" fill="none" stroke={sc} strokeWidth="1.5" />
        <rect x="28" y="110" width="64" height="6" rx="2" fill={pc} fillOpacity="0.4" stroke={pc} strokeWidth="0.8" />
        <circle cx="60" cy="82" r="8" fill={pc} fillOpacity="0.4" stroke={sc} />
        <line x1="60" y1="58" x2="60" y2="72" stroke={sc} strokeWidth="2" />
      </g>
    );
    case 2: return (
      <g>
        <rect x="18" y="45" width="12" height="110" rx="3" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
        <rect x="90" y="45" width="12" height="110" rx="3" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.8" />
        <text x="24" y="42" textAnchor="middle" fontSize="8" fill={sc}>B</text>
        <text x="96" y="42" textAnchor="middle" fontSize="8" fill={sc}>J</text>
        <path d="M34,80 Q60,45 86,80" fill={pc} fillOpacity="0.1" stroke={sc} strokeWidth="0.7" />
        <path d="M32,95 Q60,65 88,95 L88,165 Q60,145 32,165 Z" fill={sc} fillOpacity="0.07" stroke={sc} strokeWidth="0.5" />
        <circle cx="60" cy="60" r="12" fill="none" stroke={sc} strokeWidth="1.2" />
        <path d="M50,57 Q60,44 70,57" fill={sc} fillOpacity="0.4" />
      </g>
    );
    case 3: return (
      <g>
        <rect x="30" y="90" width="60" height="65" rx="6" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="1" />
        <circle cx="60" cy="65" r="14" fill={pc} fillOpacity="0.4" stroke={sc} />
        <circle cx="88" cy="50" r="9" fill="none" stroke={sc} strokeWidth="1.2" />
        <line x1="88" y1="59" x2="88" y2="72" stroke={sc} strokeWidth="1.2" />
        <line x1="82" y1="66" x2="94" y2="66" stroke={sc} strokeWidth="1.2" />
        {[-18,-9,0,9,18].map((dx, i) => (
          <g key={i}>
            <line x1={60+dx} y1="155" x2={60+dx} y2="125" stroke={sc} strokeWidth="0.8" strokeOpacity="0.6" />
            <ellipse cx={60+dx} cy="121" rx="3" ry="6" fill={sc} fillOpacity="0.4" />
          </g>
        ))}
      </g>
    );
    case 4: return (
      <g>
        <rect x="22" y="65" width="76" height="95" rx="5" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1.2" />
        <polygon points="22,65 60,42 98,65" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
        <circle cx="60" cy="62" r="14" fill={pc} fillOpacity="0.4" stroke={sc} />
        <line x1="90" y1="70" x2="90" y2="155" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <polygon points="90,60 96,72 84,72" fill={sc} fillOpacity="0.8" />
      </g>
    );
    case 5: return (
      <g>
        <rect x="36" y="72" width="48" height="80" rx="4" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1" />
        <circle cx="60" cy="58" r="12" fill={pc} fillOpacity="0.35" stroke={sc} />
        {[44,40,36].map((y, i) => (
          <rect key={i} x={50-i*2} y={y} width={20+i*4} height="5" rx="2" fill={sc} fillOpacity="0.6" />
        ))}
        <line x1="46" y1="125" x2="74" y2="155" stroke={sc} strokeWidth="1.5" />
        <line x1="74" y1="125" x2="46" y2="155" stroke={sc} strokeWidth="1.5" />
        <circle cx="46" cy="120" r="5" fill="none" stroke={sc} strokeWidth="1.2" />
        <circle cx="74" cy="120" r="5" fill="none" stroke={sc} strokeWidth="1.2" />
      </g>
    );
    case 6: return (
      <g>
        <circle cx="60" cy="42" r="18" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
        <path d="M42,58 Q28,42 36,32 Q48,46 60,46 Q72,46 84,32 Q92,42 78,58" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        <circle cx="38" cy="105" r="9" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
        <rect x="30" y="114" width="16" height="36" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        <circle cx="82" cy="105" r="9" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
        <rect x="74" y="114" width="16" height="36" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
      </g>
    );
    case 7: return (
      <g>
        <rect x="24" y="70" width="72" height="80" rx="4" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="1.2" />
        <rect x="24" y="62" width="72" height="12" rx="2" fill={sc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
        <polygon points="60,44 63,53 72,53 65,58 68,67 60,62 52,67 55,58 48,53 57,53" fill={sc} fillOpacity="0.7" />
        {[30, 74].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy="155" rx="12" ry="8" fill={i?sc:pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.7" />
            <circle cx={x} cy="140" r="7" fill={i?sc:pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.7" />
          </g>
        ))}
      </g>
    );
    case 8: return (
      <g>
        <path d="M40,55 Q50,40 60,55 Q70,70 80,55 Q90,40 80,55 Q70,70 60,55 Q50,40 40,55 Z" fill="none" stroke={sc} strokeWidth="2" />
        <circle cx="60" cy="80" r="11" fill={pc} fillOpacity="0.35" stroke={sc} />
        <rect x="50" y="91" width="20" height="30" rx="4" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        <ellipse cx="60" cy="140" rx="22" ry="18" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1" />
        <circle cx="60" cy="138" r="11" fill={pc} fillOpacity="0.4" stroke={sc} />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
          const r = a * Math.PI / 180;
          return <line key={i} x1={60+Math.cos(r)*11} y1={138+Math.sin(r)*11} x2={60+Math.cos(r)*21} y2={138+Math.sin(r)*21} stroke={pc} strokeWidth="1.2" strokeOpacity="0.5" />;
        })}
      </g>
    );
    case 9: return (
      <g>
        <polygon points="20,165 60,75 100,165" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="0.8" />
        <rect x="78" y="68" width="16" height="22" rx="3" fill={sc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <polygon points="78,68 86,58 94,68" fill={sc} fillOpacity="0.5" />
        <ellipse cx="86" cy="74" rx="5" ry="6" fill="#f4d03f" fillOpacity="0.7" />
        <line x1="84" y1="90" x2="60" y2="170" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="102" r="10" fill={pc} fillOpacity="0.35" stroke={sc} />
        <polygon points="42,170 60,108 78,170" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="0.7" />
      </g>
    );
    case 10: return (
      <g>
        <circle cx="60" cy="105" r="48" fill="none" stroke={sc} strokeWidth="1.5" />
        <circle cx="60" cy="105" r="32" fill="none" stroke={sc} strokeWidth="0.8" />
        <circle cx="60" cy="105" r="10" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        {[0,45,90,135,180,225,270,315].map((a, i) => {
          const r = a * Math.PI / 180;
          return <line key={i} x1={60+Math.cos(r)*10} y1={105+Math.sin(r)*10} x2={60+Math.cos(r)*32} y2={105+Math.sin(r)*32} stroke={sc} strokeWidth="0.8" strokeOpacity="0.6" />;
        })}
        {["T","O","R","A"].map((l, i) => {
          const a = (i * 90 - 90) * Math.PI / 180;
          return <text key={i} x={60+Math.cos(a)*21} y={108+Math.sin(a)*21} textAnchor="middle" fontSize="9" fill={sc} fontFamily="serif">{l}</text>;
        })}
      </g>
    );
    case 11: return (
      <g>
        <rect x="32" y="70" width="56" height="90" rx="5" fill={pc} fillOpacity="0.15" stroke={sc} strokeWidth="1" />
        <circle cx="60" cy="58" r="12" fill={pc} fillOpacity="0.35" stroke={sc} />
        <line x1="60" y1="95" x2="60" y2="115" stroke={sc} strokeWidth="1.5" />
        <line x1="36" y1="108" x2="84" y2="108" stroke={sc} strokeWidth="1.2" />
        <path d="M36,108 L36,115 Q36,120 42,120 L50,120 Q56,120 56,115 L56,108" fill="none" stroke={sc} strokeWidth="0.8" />
        <path d="M64,108 L64,115 Q64,120 70,120 L78,120 Q84,120 84,115 L84,108" fill="none" stroke={sc} strokeWidth="0.8" />
        <line x1="88" y1="82" x2="88" y2="155" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="100" x2="96" y2="100" stroke={sc} strokeWidth="1.5" />
      </g>
    );
    case 12: return (
      <g>
        <line x1="28" y1="52" x2="92" y2="52" stroke={sc} strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="52" x2="60" y2="100" stroke={sc} strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="115" r="11" fill={pc} fillOpacity="0.45" stroke={sc} />
        <line x1="60" y1="104" x2="60" y2="90" stroke={sc} strokeWidth="1.5" />
        <line x1="60" y1="104" x2="46" y2="90" stroke={sc} strokeWidth="1.2" />
        <line x1="60" y1="104" x2="74" y2="90" stroke={sc} strokeWidth="1.2" />
        <line x1="60" y1="126" x2="48" y2="145" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="60" y1="126" x2="72" y2="145" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="128" r="16" fill="none" stroke="#f4d03f" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="3,3" />
      </g>
    );
    case 13: return (
      <g>
        <circle cx="82" cy="48" r="14" fill={sc} fillOpacity="0.2" stroke={sc} strokeWidth="0.8" />
        {[0,72,144,216,288].map((a, i) => {
          const r = a * Math.PI / 180;
          return <ellipse key={i} cx={82 + Math.cos(r)*9} cy={48 + Math.sin(r)*9} rx="5" ry="8" transform={`rotate(${a},${82+Math.cos(r)*9},${48+Math.sin(r)*9})`} fill="#e8e8e8" fillOpacity="0.6" stroke="#ccc" strokeWidth="0.4" />;
        })}
        <circle cx="82" cy="48" r="5" fill="#f4d03f" fillOpacity="0.8" />
        <ellipse cx="50" cy="82" rx="16" ry="18" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="1" />
        <rect x="34" y="98" width="32" height="44" rx="4" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="1" />
        <line x1="50" y1="142" x2="38" y2="170" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="142" x2="62" y2="170" stroke={sc} strokeWidth="2" strokeLinecap="round" />
      </g>
    );
    case 14: return (
      <g>
        <circle cx="60" cy="52" r="14" fill={pc} fillOpacity="0.4" stroke={sc} />
        <path d="M46,62 Q28,48 32,36 Q44,50 52,56" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.7" />
        <path d="M74,62 Q92,48 88,36 Q76,50 68,56" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.7" />
        <path d="M34,90 L42,128 Q48,138 54,128 L62,90 Z" fill="none" stroke={sc} strokeWidth="1.2" />
        <path d="M58,90 L66,128 Q72,138 78,128 L86,90 Z" fill="none" stroke={sc} strokeWidth="1.2" />
        <path d="M42,110 Q60,95 78,110" fill="none" stroke="#5dade2" strokeWidth="1.5" strokeDasharray="2,2" />
        <polygon points="60,72 70,86 50,86" fill="none" stroke={sc} strokeWidth="1" strokeOpacity="0.6" />
      </g>
    );
    case 15: return (
      <g>
        {Array.from({ length: 5 }, (_, i) => {
          const a1 = ((i * 72) + 90) * Math.PI / 180;
          const a2 = (((i + 2) * 72) + 90) * Math.PI / 180;
          return <line key={i} x1={60+Math.cos(a1)*28} y1={58+Math.sin(a1)*28} x2={60+Math.cos(a2)*28} y2={58+Math.sin(a2)*28} stroke={sc} strokeWidth="1.2" />;
        })}
        <circle cx="60" cy="58" r="30" fill="none" stroke={pc} strokeWidth="0.8" strokeOpacity="0.5" />
        <path d="M44,80 Q36,58 48,52" fill="none" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M76,80 Q84,58 72,52" fill="none" stroke={sc} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="38" cy="155" r="8" fill="none" stroke={sc} strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="82" cy="155" r="8" fill="none" stroke={sc} strokeWidth="1" strokeDasharray="2,2" />
        <line x1="60" y1="108" x2="38" y2="147" stroke={sc} strokeWidth="1" strokeDasharray="3,2" />
        <line x1="60" y1="108" x2="82" y2="147" stroke={sc} strokeWidth="1" strokeDasharray="3,2" />
      </g>
    );
    case 16: return (
      <g>
        <rect x="38" y="58" width="44" height="100" rx="3" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="1.2" />
        <polygon points="38,58 60,38 82,58" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="1" />
        <rect x="48" y="30" width="24" height="10" rx="2" fill={sc} fillOpacity="0.6" transform="rotate(15,60,35)" />
        <polyline points="88,42 76,78 84,78 68,118" fill="none" stroke="#f4d03f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="118" r="7" fill={pc} fillOpacity="0.5" stroke={sc} />
        <circle cx="94" cy="125" r="7" fill={pc} fillOpacity="0.5" stroke={sc} />
      </g>
    );
    case 17: return (
      <g>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return <line key={i} x1={60+Math.cos(a)*6} y1={50+Math.sin(a)*6} x2={60+Math.cos(a)*22} y2={50+Math.sin(a)*22} stroke="#f4d03f" strokeWidth="1.5" />;
        })}
        <circle cx="60" cy="50" r="8" fill="#f4d03f" fillOpacity="0.8" />
        {[[90,42],[22,38],[82,72],[15,65],[95,80]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={sc} fillOpacity="0.7" />
        ))}
        <circle cx="50" cy="112" r="10" fill={pc} fillOpacity="0.4" stroke={sc} />
        <rect x="42" y="122" width="16" height="30" rx="4" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
        <path d="M66,108 Q78,102 74,120" fill="none" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M66,130 Q78,122 74,140" fill="none" stroke={sc} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    );
    case 18: return (
      <g>
        <circle cx="60" cy="48" r="22" fill={pc} fillOpacity="0.25" stroke={sc} strokeWidth="1.2" />
        <circle cx="52" cy="44" r="14" fill={pc} fillOpacity="0.4" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
          const r = a * Math.PI / 180;
          return <line key={i} x1={60+Math.cos(r)*22} y1={48+Math.sin(r)*22} x2={60+Math.cos(r)*30} y2={48+Math.sin(r)*30} stroke={sc} strokeWidth="0.7" strokeOpacity="0.5" />;
        })}
        {[20, 88].map((x, i) => (
          <g key={i}>
            <rect x={x} y="100" width="14" height="65" rx="2" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="0.8" />
            <polygon points={`${x},100 ${x+7},90 ${x+14},100`} fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.8" />
          </g>
        ))}
        <path d="M34,165 Q60,148 86,165" fill="none" stroke={sc} strokeWidth="1" strokeOpacity="0.5" />
        <ellipse cx="30" cy="150" rx="9" ry="6" fill={pc} fillOpacity="0.35" stroke={sc} strokeWidth="0.7" />
        <ellipse cx="90" cy="150" rx="9" ry="6" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.7" />
      </g>
    );
    case 19: return (
      <g>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * 22.5) * Math.PI / 180;
          const inner = i % 2 === 0 ? 26 : 22;
          return <line key={i} x1={60+Math.cos(a)*inner} y1={52+Math.sin(a)*inner} x2={60+Math.cos(a)*38} y2={52+Math.sin(a)*38} stroke={sc} strokeWidth={i%2===0?"1.8":"1"} />;
        })}
        <circle cx="60" cy="52" r="20" fill={pc} fillOpacity="0.6" />
        <circle cx="60" cy="52" r="13" fill={sc} fillOpacity="0.8" />
        <circle cx="54" cy="118" r="10" fill={pc} fillOpacity="0.5" stroke={sc} />
        <ellipse cx="60" cy="148" rx="24" ry="14" fill={pc} fillOpacity="0.3" stroke={sc} strokeWidth="1" />
        <circle cx="82" cy="138" r="8" fill={pc} fillOpacity="0.35" stroke={sc} />
        {[24, 96].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="90" r="7" fill={sc} fillOpacity="0.6" />
            <circle cx={x} cy="90" r="4" fill={pc} fillOpacity="0.8" />
          </g>
        ))}
      </g>
    );
    case 20: return (
      <g>
        <circle cx="60" cy="48" r="12" fill={sc} fillOpacity="0.4" stroke={sc} />
        <path d="M48,58 Q32,44 38,32 Q50,46 56,54" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        <path d="M72,58 Q88,44 82,32 Q70,46 64,54" fill={sc} fillOpacity="0.25" stroke={sc} strokeWidth="0.8" />
        <path d="M60,60 L90,72" stroke={sc} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="93" cy="74" rx="6" ry="4" fill={sc} fillOpacity="0.5" stroke={sc} strokeWidth="0.8" />
        <rect x="86" y="56" width="10" height="14" fill={pc} fillOpacity="0.5" stroke={sc} strokeWidth="0.6" />
        <line x1="91" y1="56" x2="91" y2="70" stroke={sc} strokeWidth="0.8" />
        <line x1="86" y1="63" x2="96" y2="63" stroke={sc} strokeWidth="0.8" />
        {[[28,155],[60,148],[92,155]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y-14} r="8" fill={pc} fillOpacity="0.4" stroke={sc} strokeWidth="0.7" />
            <rect x={x-8} y={y-6} width="16" height="22" rx="3" fill={pc} fillOpacity="0.2" stroke={sc} strokeWidth="0.6" />
          </g>
        ))}
      </g>
    );
    case 21: return (
      <g>
        <ellipse cx="60" cy="105" rx="44" ry="62" fill="none" stroke={sc} strokeWidth="3" strokeOpacity="0.4" />
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i * 18) * Math.PI / 180;
          return <ellipse key={i} cx={60+Math.cos(a)*44} cy={105+Math.sin(a)*62} rx="5" ry="8" transform={`rotate(${i*18+90},${60+Math.cos(a)*44},${105+Math.sin(a)*62})`} fill={sc} fillOpacity="0.35" />;
        })}
        <circle cx="60" cy="90" r="9" fill={pc} fillOpacity="0.5" stroke={sc} />
        <line x1="60" y1="99" x2="60" y2="122" stroke={sc} strokeWidth="2" />
        <line x1="60" y1="108" x2="46" y2="100" stroke={sc} strokeWidth="1.5" />
        <line x1="60" y1="108" x2="74" y2="100" stroke={sc} strokeWidth="1.5" />
        {[["♈","20","52"],["♏","92","52"],["♌","20","162"],["♉","92","162"]].map(([s,x,y], i) => (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize="11" fill={sc} fillOpacity="0.6">{s}</text>
        ))}
      </g>
    );
    default: return <></>;
  }
}

export function MajorArcanaArt({ number, primaryColor, secondaryColor }: Props) {
  return <>{renderMajorArt(number, primaryColor, secondaryColor)}</>;
}
