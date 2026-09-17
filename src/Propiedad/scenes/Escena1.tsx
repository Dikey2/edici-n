import { AbsoluteFill, Sequence } from "remotion";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { Subtitulo } from "../components/Subtitulo";
import { Titulo } from "../components/Texto";
import { DIALOGO } from "../guion";
import type { PropiedadProps } from "../schema";

// 0:00 – 0:05  Toma aérea con el Misti; la asesora aparece brevemente.
export const Escena1: React.FC<PropiedadProps> = ({ clips, mostrarSubtitulos }) => (
  <SceneShell>
    <Sequence durationInFrames={95} premountFor={30}>
      <MediaSlot src={clips.dronIntro} kind="dron" etiqueta="dron_intro.mp4" />
    </Sequence>
    <Sequence from={95} premountFor={30}>
      <MediaSlot src={clips.presentadoraIntro} kind="presentadora" etiqueta="presentadora_intro.mp4" />
    </Sequence>
    <AbsoluteFill style={{ justifyContent: "flex-start", padding: "220px 70px 0" }}>
      <Titulo delay={8} size={62}>
        ¿Buscas una propiedad con ubicación estratégica en Cerro Colorado?
      </Titulo>
    </AbsoluteFill>
    {mostrarSubtitulos ? <Subtitulo texto={DIALOGO.s1} /> : null}
  </SceneShell>
);
