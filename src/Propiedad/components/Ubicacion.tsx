import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// Esquema de ubicación: vía principal y lote en esquina resaltado.
export const Ubicacion: React.FC<{ readonly via: string }> = ({ via }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pVia = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const pLote = spring({ frame: frame - 26, fps, config: { damping: 14 } });
  const dash = interpolate(pVia, [0, 1], [1400, 0]);

  return (
    <svg viewBox="0 0 1080 900" width="100%" height="100%">
      {/* Vía principal */}
      <path d="M-40 720 L1120 260" stroke="#2a3a58" strokeWidth="150" strokeLinecap="round" />
      <path
        d="M-40 720 L1120 260"
        stroke="#e9eef7"
        strokeWidth="6"
        strokeDasharray="40 30"
        strokeDashoffset={dash}
        opacity={pVia}
      />
      {/* Vía secundaria */}
      <path d="M620 -40 L820 940" stroke="#2a3a58" strokeWidth="90" />
      {/* Lote en esquina */}
      <g opacity={pLote} transform={`translate(700 470) scale(${interpolate(pLote, [0, 1], [0.7, 1])}) translate(-700 -470)`}>
        <polygon points="700,310 900,390 840,560 640,480" fill={theme.orange} opacity="0.85" />
        <polygon points="700,310 900,390 840,560 640,480" fill="none" stroke="#fff" strokeWidth="6" />
        <circle cx="770" cy="435" r="18" fill="#fff" />
      </g>
      <g opacity={pVia}>
        <rect x="60" y="760" width="640" height="76" rx="12" fill="rgba(11,18,32,0.8)" />
        <text x="80" y="812" fontFamily={theme.font} fontSize="34" fontWeight="700" fill={theme.text}>
          {via}
        </text>
      </g>
    </svg>
  );
};
