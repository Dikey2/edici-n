import { Sequence } from "remotion";
import { Caja, Subrayado } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import { LINEAS } from "../guion";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

const texto = LINEAS.find((l) => l.id === 5)?.subtitulo ?? "";

// 0:21 – 0:27  Asesora a cámara, alternando con render referencial.
export const Escena5: React.FC<PropiedadProps> = ({ clips }) => (
  <SceneShell>
    <Sequence durationInFrames={100} premountFor={30}>
      <MediaSlot src={clips.presentadoraZonificacion} kind="presentadora" etiqueta="presentadora_zonificacion.mp4" oscurecer={0.2} />
    </Sequence>
    <Sequence from={100} premountFor={30}>
      <MediaSlot src={clips.renderProyecto} kind="render" etiqueta="render_proyecto.mp4" oscurecer={0.2} />
      <Referencial />
    </Sequence>
    {/* Panel azul inferior con la zonificación y el texto del diálogo */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 170,
        background: theme.navy,
        padding: "50px 70px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        fontFamily: theme.font,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <svg viewBox="0 0 100 100" width="90" height="90">
          <path d="M18 90 V30 H52 V90 M52 90 V50 H82 V90 M10 90 H90" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
          <path d="M28 42 H40 M28 56 H40 M28 70 H40 M62 62 H72 M62 76 H72" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <Caja fondo="ninguno" size={48} delay={4} sombra={false}>
          Zonificación
        </Caja>
      </div>
      <Caja fondo="naranja" size={56} delay={10}>
        Comercio especializado
      </Caja>
      <div style={{ fontSize: 36, lineHeight: 1.4, color: "#ffffff", marginTop: 10 }}>{texto}</div>
      <Subrayado delay={24} ancho={160} />
    </div>
  </SceneShell>
);
