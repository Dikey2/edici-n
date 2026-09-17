import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

type Servicio = { nombre: string; icono: React.ReactNode };

const stroke = { fill: "none", stroke: theme.text, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const SERVICIOS: Servicio[] = [
  {
    nombre: "Agua",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M50 12 C50 12 22 46 22 64 A28 28 0 0 0 78 64 C78 46 50 12 50 12 Z" />
      </svg>
    ),
  },
  {
    nombre: "Luz",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M58 8 L26 56 L48 56 L42 92 L76 42 L54 42 Z" />
      </svg>
    ),
  },
  {
    nombre: "Desagüe",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M14 40 C26 28 38 28 50 40 C62 52 74 52 86 40" />
        <path {...stroke} d="M14 62 C26 50 38 50 50 62 C62 74 74 74 86 62" />
      </svg>
    ),
  },
  {
    nombre: "Pistas asfaltadas",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M30 90 L42 10 M70 90 L58 10" />
        <path {...stroke} strokeDasharray="10 12" d="M50 12 L50 90" />
      </svg>
    ),
  },
  {
    nombre: "Veredas",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M10 70 L90 70 M10 84 L90 84" />
        <path {...stroke} d="M22 70 L26 56 L74 56 L78 70" />
        <path {...stroke} d="M38 56 L38 70 M50 56 L50 70 M62 56 L62 70" />
      </svg>
    ),
  },
  {
    nombre: "Telefonía",
    icono: (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path {...stroke} d="M50 88 L50 46" />
        <circle {...stroke} cx="50" cy="42" r="6" />
        <path {...stroke} d="M32 30 A26 26 0 0 1 68 30 M20 18 A42 42 0 0 1 80 18" />
      </svg>
    ),
  },
];

// Cuadrícula de servicios con entrada escalonada.
export const Servicios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 28,
        width: "100%",
      }}
    >
      {SERVICIOS.map((s, i) => {
        const p = spring({ frame: frame - 14 - i * 6, fps, config: { damping: 200 } });
        return (
          <div
            key={s.nombre}
            style={{
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              padding: "38px 20px",
              borderRadius: 24,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: `linear-gradient(145deg, ${theme.blue}, ${theme.blueDeep})`,
                boxShadow: `0 0 0 6px rgba(45,127,249,0.18)`,
              }}
            >
              {s.icono}
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: theme.text, textAlign: "center" }}>{s.nombre}</div>
          </div>
        );
      })}
    </div>
  );
};
