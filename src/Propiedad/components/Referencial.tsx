import { theme } from "../theme";

// Aviso obligatorio sobre renders: imagen ilustrativa, no fotografía real.
export const Referencial: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 40,
      top: 360,
      background: "rgba(11,18,32,0.75)",
      color: theme.text,
      border: `2px solid ${theme.orange}`,
      borderRadius: 8,
      padding: "10px 20px",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontFamily: theme.font,
    }}
  >
    Imagen referencial
  </div>
);
