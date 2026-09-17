import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type Props = {
  readonly asesora: string;
  readonly whatsapp: string;
  readonly ubicacion: string;
  readonly delay?: number;
};

// Tarjeta de contacto final.
export const Contacto: React.FC<Props> = ({ asesora, whatsapp, ubicacion, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
        background: "rgba(11,18,32,0.82)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderTop: `8px solid ${theme.orange}`,
        borderRadius: 24,
        padding: "36px 44px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: theme.font,
        color: theme.text,
      }}
    >
      <div style={{ fontSize: 54, fontWeight: 800 }}>{asesora}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg viewBox="0 0 100 100" width="52" height="52">
          <circle cx="50" cy="50" r="44" fill="#25D366" />
          <path d="M30 72 L34 58 A24 24 0 1 1 44 68 Z" fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: 2 }}>{whatsapp}</span>
      </div>
      <div style={{ fontSize: 34, color: theme.muted }}>{ubicacion}</div>
    </div>
  );
};
