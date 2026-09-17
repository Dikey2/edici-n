import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type Fondo = "blanco" | "naranja" | "navy" | "ninguno";

const FONDOS: Record<Fondo, { bg: string; color: string }> = {
  blanco: { bg: "#ffffff", color: theme.navy },
  naranja: { bg: theme.orange, color: "#ffffff" },
  navy: { bg: theme.navy, color: "#ffffff" },
  ninguno: { bg: "transparent", color: "#ffffff" },
};

type CajaProps = {
  readonly children: React.ReactNode;
  readonly fondo?: Fondo;
  readonly size?: number;
  readonly delay?: number;
  readonly upper?: boolean;
  readonly weight?: number;
  readonly sombra?: boolean;
};

// Bloque de texto sobre caja de color, con entrada deslizante.
export const Caja: React.FC<CajaProps> = ({
  children,
  fondo = "blanco",
  size = 56,
  delay = 0,
  upper = true,
  weight = 800,
  sombra = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const f = FONDOS[fondo];
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px)`,
        alignSelf: "flex-start",
        display: "inline-block",
        background: f.bg,
        color: f.color,
        fontSize: size,
        lineHeight: 1.15,
        fontWeight: weight,
        letterSpacing: upper ? 0.5 : 0,
        textTransform: upper ? "uppercase" : "none",
        padding: fondo === "ninguno" ? 0 : "10px 26px",
        borderRadius: 10,
        boxShadow: sombra && fondo !== "ninguno" ? "0 10px 30px rgba(0,0,0,0.35)" : "none",
        textShadow: fondo === "ninguno" ? "0 4px 20px rgba(0,0,0,0.6)" : "none",
        fontFamily: theme.font,
      }}
    >
      {children}
    </div>
  );
};

export const PinIcono: React.FC<{ readonly color?: string; readonly size?: number }> = ({
  color = "#ffffff",
  size = 44,
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" fill={color} />
    <circle cx="12" cy="9" r="2.6" fill={color === "#ffffff" ? theme.navy : "#ffffff"} />
  </svg>
);

type PinProps = {
  readonly lineas: string[];
  readonly fondo?: "blanco" | "navy";
  readonly delay?: number;
  readonly size?: number;
};

// Tarjeta con icono de ubicación y una o dos líneas de texto.
export const Pin: React.FC<PinProps> = ({ lineas, fondo = "blanco", delay = 0, size = 34 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const blanco = fondo === "blanco";
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`,
        alignSelf: "flex-start",
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: blanco ? "#ffffff" : theme.navy,
        color: blanco ? theme.navy : "#ffffff",
        padding: "16px 28px 16px 20px",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        fontFamily: theme.font,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          background: blanco ? theme.navy : "rgba(255,255,255,0.12)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <PinIcono />
      </div>
      <div style={{ fontSize: size, lineHeight: 1.2, fontWeight: 700 }}>
        {lineas.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
};

// Línea naranja corta, como subrayado decorativo.
export const Subrayado: React.FC<{ readonly delay?: number; readonly ancho?: number }> = ({
  delay = 0,
  ancho = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ width: ancho * p, height: 8, background: theme.orange, borderRadius: 4 }} />
  );
};
