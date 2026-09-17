import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// Documentación genérica: carpeta y hojas con líneas, sin datos legibles.
export const Documentos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const p2 = spring({ frame: frame - 24, fps, config: { damping: 200 } });
  const p3 = spring({ frame: frame - 38, fps, config: { damping: 200 } });

  const Hoja: React.FC<{ p: number; x: number; y: number; rot: number }> = ({ p, x, y, rot }) => (
    <g
      opacity={p}
      transform={`translate(${x} ${interpolate(p, [0, 1], [y + 60, y])}) rotate(${rot})`}
    >
      <rect width="420" height="560" rx="18" fill="#f5f7fa" />
      <rect x="40" y="48" width="180" height="16" rx="8" fill={theme.blueDeep} />
      <rect x="40" y="100" width="340" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="128" width="300" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="156" width="330" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="212" width="340" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="240" width="260" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="268" width="320" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="324" width="340" height="10" rx="5" fill="#c7cfdb" />
      <rect x="40" y="352" width="290" height="10" rx="5" fill="#c7cfdb" />
      <circle cx="340" cy="470" r="42" fill="none" stroke={theme.orange} strokeWidth="6" />
      <path d="M320 470 L334 484 L362 454" fill="none" stroke={theme.orange} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );

  return (
    <svg viewBox="0 0 1080 1000" width="100%" height="100%">
      {/* Carpeta */}
      <g opacity={p1}>
        <path d="M120 300 L120 900 Q120 940 160 940 L920 940 Q960 940 960 900 L960 360 Q960 320 920 320 L520 320 L470 260 L160 260 Q120 260 120 300 Z" fill={theme.blueDeep} />
      </g>
      <Hoja p={p2} x={220} y={340} rot={-4} />
      <Hoja p={p3} x={420} y={360} rot={4} />
      <g opacity={p1}>
        <path d="M120 560 L120 900 Q120 940 160 940 L920 940 Q960 940 960 900 L960 560 Q960 520 920 520 L160 520 Q120 520 120 560 Z" fill={theme.blue} opacity="0.95" />
      </g>
    </svg>
  );
};
