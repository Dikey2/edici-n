import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const stroke = { fill: "none", stroke: "#ffffff", strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const SERVICIOS: { nombre: string; icono: React.ReactNode }[] = [
  { nombre: "Agua", icono: <path {...stroke} d="M50 12 C50 12 22 46 22 64 A28 28 0 0 0 78 64 C78 46 50 12 50 12 Z" /> },
  { nombre: "Luz", icono: <path {...stroke} d="M58 8 L26 56 L48 56 L42 92 L76 42 L54 42 Z" /> },
  {
    nombre: "Desagüe",
    icono: (
      <>
        <path {...stroke} d="M14 40 C26 28 38 28 50 40 C62 52 74 52 86 40" />
        <path {...stroke} d="M14 62 C26 50 38 50 50 62 C62 74 74 74 86 62" />
      </>
    ),
  },
  {
    nombre: "Pistas asfaltadas",
    icono: (
      <>
        <path {...stroke} d="M30 90 L42 10 M70 90 L58 10" />
        <path {...stroke} strokeDasharray="10 12" d="M50 12 L50 90" />
      </>
    ),
  },
  {
    nombre: "Veredas",
    icono: (
      <>
        <circle {...stroke} cx="54" cy="18" r="8" />
        <path {...stroke} d="M40 92 L48 60 L38 48 L46 34 L60 40 L66 54 L78 58 M48 60 L62 74 L58 92" />
      </>
    ),
  },
  {
    nombre: "Telefonía",
    icono: (
      <>
        <path {...stroke} d="M50 88 L50 46" />
        <circle {...stroke} cx="50" cy="42" r="6" />
        <path {...stroke} d="M32 30 A26 26 0 0 1 68 30 M20 18 A42 42 0 0 1 80 18" />
      </>
    ),
  },
];

// Fila de iconos circulares con borde blanco, como en el storyboard.
export const Servicios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", rowGap: 44, columnGap: 20, width: "100%" }}>
      {SERVICIOS.map((s, i) => {
        const p = spring({ frame: frame - 12 - i * 5, fps, config: { damping: 200 } });
        return (
          <div
            key={s.nombre}
            style={{
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: 999,
                border: "4px solid #ffffff",
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <svg viewBox="0 0 100 100" width="84" height="84">
                {s.icono}
              </svg>
            </div>
            <div style={{ fontSize: 32, fontWeight: 600, color: "#ffffff", textAlign: "center", lineHeight: 1.2 }}>{s.nombre}</div>
          </div>
        );
      })}
    </div>
  );
};
