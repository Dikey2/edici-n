import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Caja, PinIcono } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

const WhatsApp: React.FC = () => (
  <svg viewBox="0 0 100 100" width="96" height="96">
    <circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" strokeWidth="6" />
    <path d="M30 74 L35 58 A22 22 0 1 1 45 66 Z" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
  </svg>
);

// 0:39 – 0:45  Cierre al atardecer, asesora en plano medio y contacto.
export const Escena8: React.FC<PropiedadProps> = ({ clips, asesora, whatsapp, ubicacion }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const q = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  return (
    <SceneShell>
      <Sequence durationInFrames={80} premountFor={30}>
        <MediaSlot src={clips.atardecer} kind="atardecer" etiqueta="atardecer.mp4" oscurecer={0.35} />
      </Sequence>
      <Sequence from={80} premountFor={30}>
        <MediaSlot src={clips.presentadoraCierre} kind="presentadora" etiqueta="presentadora_cierre.mp4" oscurecer={0.35} />
      </Sequence>
      <AbsoluteFill style={{ alignItems: "center", padding: "200px 70px 0", gap: 16 }}>
        <Caja fondo="ninguno" size={64} delay={4}>
          ¿Tienes un proyecto
        </Caja>
        <Caja fondo="naranja" size={64} delay={10}>
          En mente?
        </Caja>
        <div style={{ height: 50 }} />
        <div
          style={{
            opacity: p,
            transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            background: theme.navy,
            borderRadius: 999,
            padding: "26px 56px 26px 34px",
            color: "#ffffff",
            fontFamily: theme.font,
            boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
          }}
        >
          <WhatsApp />
          <div>
            <div style={{ fontSize: 38, fontWeight: 500 }}>{asesora}</div>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: 2 }}>{whatsapp}</div>
          </div>
        </div>
        <div
          style={{
            opacity: q,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: theme.navy,
            borderRadius: 999,
            padding: "14px 30px 14px 20px",
            color: "#ffffff",
            fontSize: 32,
            fontWeight: 600,
            fontFamily: theme.font,
          }}
        >
          <PinIcono size={40} />
          {ubicacion}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
