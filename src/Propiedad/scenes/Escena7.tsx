import { Sequence } from "remotion";
import { Subrayado } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

// 0:33 – 0:39  Asesora en entorno inmobiliario; breve corte a render.
export const Escena7: React.FC<PropiedadProps> = ({ clips }) => (
  <SceneShell>
    <Sequence durationInFrames={70} premountFor={30}>
      <MediaSlot src={clips.presentadoraLlamado} kind="presentadora" etiqueta="presentadora_llamado.mp4" oscurecer={0.2} />
    </Sequence>
    <Sequence from={70} durationInFrames={50} premountFor={30}>
      <MediaSlot src={clips.renderLlamado} kind="render" etiqueta="render_llamado.mp4" oscurecer={0.2} />
      <Referencial />
    </Sequence>
    <Sequence from={120} premountFor={30}>
      <MediaSlot src={clips.presentadoraLlamado} kind="presentadora" etiqueta="presentadora_llamado.mp4" oscurecer={0.2} />
    </Sequence>
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 170,
        width: 640,
        background: theme.navy,
        padding: "50px 60px 56px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        fontFamily: theme.font,
        color: "#ffffff",
        fontSize: 38,
        lineHeight: 1.4,
        borderTopLeftRadius: 24,
      }}
    >
      <div>
        Si eres empresario, inversionista o estás buscando un espacio para desarrollar tu{" "}
        <span style={{ background: theme.orange, padding: "2px 10px", borderRadius: 6, fontWeight: 700 }}>
          próximo proyecto,
        </span>{" "}
        esta propiedad merece ser conocida.
      </div>
      <Subrayado delay={20} ancho={160} />
    </div>
  </SceneShell>
);
