import { Sequence } from "remotion";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import { Subtitulo } from "../components/Subtitulo";
import { DIALOGO } from "../guion";
import type { PropiedadProps } from "../schema";

// 0:33 – 0:39  Asesora en entorno inmobiliario; breve corte a render.
export const Escena7: React.FC<PropiedadProps> = ({ clips, mostrarSubtitulos }) => (
  <SceneShell>
    <Sequence durationInFrames={70} premountFor={30}>
      <MediaSlot src={clips.presentadoraLlamado} kind="presentadora" etiqueta="presentadora_llamado.mp4" />
    </Sequence>
    <Sequence from={70} durationInFrames={50} premountFor={30}>
      <MediaSlot src={clips.renderLlamado} kind="render" etiqueta="render_llamado.mp4" />
      <Referencial />
    </Sequence>
    <Sequence from={120} premountFor={30}>
      <MediaSlot src={clips.presentadoraLlamado} kind="presentadora" etiqueta="presentadora_llamado.mp4" />
    </Sequence>
    {mostrarSubtitulos ? <Subtitulo texto={DIALOGO.s7} /> : null}
  </SceneShell>
);
