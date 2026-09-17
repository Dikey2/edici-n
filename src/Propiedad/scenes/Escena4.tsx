import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caja, Subrayado } from "../components/Cajas";
import { SceneShell } from "../components/SceneShell";
import { Servicios } from "../components/Servicios";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

// 0:15 – 0:21  Servicios e infraestructura con iconografía limpia.
export const Escena4: React.FC<PropiedadProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  return (
    <SceneShell>
      <AbsoluteFill style={{ background: theme.navy }} />
      <AbsoluteFill style={{ padding: "0 70px 170px", gap: 22, justifyContent: "center" }}>
        <Caja fondo="ninguno" size={64} delay={4} sombra={false}>
          Servicios disponibles
        </Caja>
        <Subrayado delay={10} ancho={300} />
        <div style={{ height: 40 }} />
        <Servicios />
        <div style={{ height: 30 }} />
        <div
          style={{
            opacity: p,
            transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 24,
            border: "3px solid rgba(255,255,255,0.7)",
            borderRadius: 999,
            padding: "22px 34px",
          }}
        >
          <svg viewBox="0 0 100 100" width="70" height="70">
            <circle cx="30" cy="70" r="8" fill="#ffffff" />
            <path d="M30 44 A26 26 0 0 1 56 70 M30 22 A48 48 0 0 1 78 70" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 32, lineHeight: 1.3, color: "#ffffff", fontWeight: 500 }}>
            Buena conectividad de telefonía y servicios de comunicación.
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
