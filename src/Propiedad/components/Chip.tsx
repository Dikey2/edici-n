import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type Props = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly fondo?: "naranja" | "blanco" | "navy" | "ninguno";
  readonly size?: number;
  readonly pulso?: boolean;
};

const FONDOS = {
  naranja: { bg: theme.orange, color: "#fff" },
  blanco: { bg: "#fff", color: theme.navy },
  navy: { bg: theme.navy, color: "#fff" },
  ninguno: { bg: "transparent", color: "#fff" },
};

// Palabra clave que entra con rebote; opcionalmente late para llamar la atención.
export const Chip: React.FC<Props> = ({ children, delay = 0, fondo = "naranja", size = 56, pulso = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 11, stiffness: 180, mass: 0.7 } });
  const latido = pulso ? 1 + 0.03 * Math.sin((frame - delay) / 4) : 1;
  const rot = interpolate(p, [0, 1], [-6, 0]);
  const f = FONDOS[fondo];
  return (
    <div
      style={{
        opacity: Math.min(1, p * 1.5),
        transform: `scale(${p * latido}) rotate(${rot}deg)`,
        transformOrigin: "left center",
        display: "inline-block",
        alignSelf: "flex-start",
        background: f.bg,
        color: f.color,
        fontSize: size,
        lineHeight: 1.05,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: 1,
        padding: fondo === "ninguno" ? 0 : "12px 28px",
        borderRadius: 14,
        boxShadow: fondo === "ninguno" ? "none" : "0 12px 30px rgba(0,0,0,0.4)",
        textShadow: fondo === "ninguno" ? "0 4px 20px rgba(0,0,0,0.7)" : "none",
        fontFamily: theme.font,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
};
