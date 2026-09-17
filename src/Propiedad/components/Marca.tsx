import { theme } from "../theme";

// Marca de agua discreta con el nombre de la asesora y la ubicación.
export const Marca: React.FC<{ readonly asesora: string; readonly ubicacion: string }> = ({
  asesora,
  ubicacion,
}) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      bottom: 60,
      display: "flex",
      alignItems: "center",
      gap: 16,
      fontFamily: theme.font,
      color: theme.muted,
      fontSize: 26,
      letterSpacing: 1,
    }}
  >
    <div style={{ width: 10, height: 10, borderRadius: 999, background: theme.orange }} />
    <span style={{ color: theme.text, fontWeight: 700 }}>{asesora}</span>
    <span>·</span>
    <span>{ubicacion}</span>
  </div>
);
