import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type TituloProps = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly size?: number;
  readonly color?: string;
  readonly align?: "left" | "center";
};

// Titular en mayúsculas con barra naranja y entrada animada.
export const Titulo: React.FC<TituloProps> = ({
  children,
  delay = 0,
  size = 64,
  color = theme.text,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const y = interpolate(p, [0, 1], [40, 0]);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${y}px)`,
        textAlign: align,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 18,
      }}
    >
      <div style={{ width: 120, height: 8, background: theme.orange, borderRadius: 4 }} />
      <div
        style={{
          fontSize: size,
          lineHeight: 1.12,
          fontWeight: 800,
          letterSpacing: 1,
          color,
          textTransform: "uppercase",
          textShadow: "0 4px 24px rgba(0,0,0,0.45)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

type LineaProps = {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly size?: number;
  readonly color?: string;
  readonly weight?: number;
  readonly align?: "left" | "center";
};

export const Linea: React.FC<LineaProps> = ({
  children,
  delay = 0,
  size = 40,
  color = theme.text,
  weight = 500,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const y = interpolate(p, [0, 1], [24, 0]);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${y}px)`,
        fontSize: size,
        lineHeight: 1.3,
        fontWeight: weight,
        color,
        textAlign: align,
        textShadow: "0 3px 18px rgba(0,0,0,0.45)",
      }}
    >
      {children}
    </div>
  );
};

// Etiqueta pequeña en píldora azul.
export const Pildora: React.FC<{ readonly children: React.ReactNode; readonly delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: p,
        transform: `scale(${interpolate(p, [0, 1], [0.9, 1])})`,
        display: "inline-block",
        alignSelf: "flex-start",
        background: theme.blue,
        color: theme.text,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        padding: "12px 28px",
        borderRadius: 999,
      }}
    >
      {children}
    </div>
  );
};
