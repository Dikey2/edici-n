import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const FOOTER_ALTO = 110;

const ITEMS = ["Ubicación estratégica", "Documentación registral", "Ideal para tu proyecto comercial", "Cerro Colorado · Arequipa"];

// Cinta inferior: marca fija a la izquierda y texto en desplazamiento continuo.
export const Footer: React.FC = () => {
  const frame = useCurrentFrame();
  const texto = ITEMS.map((i) => `${i}   •   `).join("");
  const ANCHO_TEXTO = 1860;
  const desplazamiento = -((frame * 2.2) % ANCHO_TEXTO);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: FOOTER_ALTO,
        background: theme.navyDeep,
        borderTop: `4px solid ${theme.orange}`,
        display: "flex",
        alignItems: "center",
        fontFamily: theme.font,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 26px",
          height: "100%",
          background: theme.navyDeep,
          zIndex: 1,
          boxShadow: "20px 0 30px rgba(11,29,58,0.9)",
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 60 40" width="50" height="34">
          <path d="M4 34 L30 8 L56 34 Z" fill={theme.orange} />
          <path d="M18 34 L30 20 L42 34 Z" fill={theme.navyDeep} />
          <path d="M30 20 L42 34 L56 34 L30 8 Z" fill="#ffffff" opacity="0.85" />
        </svg>
        <div style={{ color: "#ffffff" }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, whiteSpace: "nowrap" }}>CERRO COLORADO</div>
          <div style={{ fontSize: 13, letterSpacing: 5, color: theme.muted }}>AREQUIPA</div>
        </div>
      </div>
      <div style={{ position: "relative", flex: 1, height: "100%", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            transform: `translateX(${desplazamiento}px)`,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {[0, 1, 2].map((k) => (
            <span key={k} style={{ display: "inline-block", width: ANCHO_TEXTO }}>
              {texto}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
