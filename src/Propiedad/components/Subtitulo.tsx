import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Subtítulo del diálogo, en la parte baja de la pantalla.
export const Subtitulo: React.FC<{ readonly texto: string; readonly delay?: number }> = ({
  texto,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 150,
        opacity,
        textAlign: "center",
        fontSize: 36,
        lineHeight: 1.35,
        fontWeight: 500,
        color: theme.text,
        background: "rgba(11,18,32,0.72)",
        borderLeft: `6px solid ${theme.orange}`,
        borderRadius: 12,
        padding: "22px 30px",
        fontFamily: theme.font,
      }}
    >
      {texto}
    </div>
  );
};
