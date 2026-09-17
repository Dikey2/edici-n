import { theme } from "../theme";

export const FOOTER_ALTO = 170;

const stroke = { fill: "none", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const Item: React.FC<{ readonly icono: React.ReactNode; readonly l1: string; readonly l2: string }> = ({
  icono,
  l1,
  l2,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 46, height: 46, flexShrink: 0 }}>{icono}</div>
    <div style={{ fontSize: 19, lineHeight: 1.2, fontWeight: 600, color: "#ffffff" }}>
      <div>{l1}</div>
      <div>{l2}</div>
    </div>
  </div>
);

// Banda inferior fija con los tres atributos y la marca, como en el storyboard.
export const Footer: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: FOOTER_ALTO,
      background: theme.navyDeep,
      borderTop: `3px solid ${theme.orange}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      gap: 14,
      fontFamily: theme.font,
    }}
  >
    <Item
      l1="Ubicación"
      l2="estratégica"
      icono={
        <svg viewBox="0 0 24 24" width="46" height="46">
          <path {...stroke} d="M3 11 L12 4 L21 11 M5 10 V20 H19 V10 M10 20 V14 H14 V20" />
        </svg>
      }
    />
    <div style={{ width: 1, height: 70, background: "rgba(255,255,255,0.25)" }} />
    <Item
      l1="Documentación"
      l2="registral"
      icono={
        <svg viewBox="0 0 24 24" width="46" height="46">
          <path {...stroke} d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" />
          <path {...stroke} d="M8.5 12 L11 14.5 L15.5 9.5" />
        </svg>
      }
    />
    <div style={{ width: 1, height: 70, background: "rgba(255,255,255,0.25)" }} />
    <Item
      l1="Ideal para tu"
      l2="proyecto comercial"
      icono={
        <svg viewBox="0 0 24 24" width="46" height="46">
          <path {...stroke} d="M3 21 H21 M5 21 V11 H10 V21 M14 21 V6 H19 V21 M7 14 H8 M7 17 H8 M16 9 H17 M16 12 H17 M16 15 H17" />
        </svg>
      }
    />
    <div style={{ width: 1, height: 70, background: "rgba(255,255,255,0.25)" }} />
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <svg viewBox="0 0 60 40" width="56" height="38">
        <path d="M4 34 L30 8 L56 34 Z" fill={theme.orange} />
        <path d="M18 34 L30 20 L42 34 Z" fill={theme.navyDeep} />
        <path d="M30 20 L42 34 L56 34 L30 8 Z" fill="#ffffff" opacity="0.85" />
      </svg>
      <div style={{ color: "#ffffff", fontFamily: theme.font }}>
        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: 2, whiteSpace: "nowrap" }}>CERRO COLORADO</div>
        <div style={{ fontSize: 14, letterSpacing: 5, color: theme.muted }}>AREQUIPA</div>
      </div>
    </div>
  </div>
);
