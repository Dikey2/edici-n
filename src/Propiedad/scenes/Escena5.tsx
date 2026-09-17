import { AbsoluteFill, Sequence } from "remotion";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import { Pildora, Titulo } from "../components/Texto";
import type { PropiedadProps } from "../schema";

// 0:21 – 0:27  Asesora a cámara, alternando con render referencial.
export const Escena5: React.FC<PropiedadProps> = ({ clips }) => (
  <SceneShell>
    <Sequence durationInFrames={100} premountFor={30}>
      <MediaSlot src={clips.presentadoraZonificacion} kind="presentadora" etiqueta="presentadora_zonificacion.mp4" />
    </Sequence>
    <Sequence from={100} premountFor={30}>
      <MediaSlot src={clips.renderProyecto} kind="render" etiqueta="render_proyecto.mp4" />
      <Referencial />
    </Sequence>
    <AbsoluteFill style={{ justifyContent: "flex-start", padding: "200px 70px 0", gap: 36 }}>
      <Pildora delay={4}>Zonificación</Pildora>
      <Titulo delay={10} size={72}>
        Comercio especializado
      </Titulo>
    </AbsoluteFill>
  </SceneShell>
);
