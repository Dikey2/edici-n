import { AbsoluteFill, Sequence } from "remotion";
import { Contacto } from "../components/Contacto";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { Linea, Titulo } from "../components/Texto";
import type { PropiedadProps } from "../schema";

// 0:39 – 0:45  Cierre al atardecer, asesora en plano medio y contacto.
export const Escena8: React.FC<PropiedadProps> = ({ clips, asesora, whatsapp, ubicacion }) => (
  <SceneShell>
    <Sequence durationInFrames={80} premountFor={30}>
      <MediaSlot src={clips.atardecer} kind="atardecer" etiqueta="atardecer.mp4" oscurecer={0.5} />
    </Sequence>
    <Sequence from={80} premountFor={30}>
      <MediaSlot src={clips.presentadoraCierre} kind="presentadora" etiqueta="presentadora_cierre.mp4" oscurecer={0.5} />
    </Sequence>
    <AbsoluteFill style={{ padding: "180px 70px 0", gap: 26 }}>
      <Titulo delay={6} size={70}>
        ¿Tienes un proyecto en mente?
      </Titulo>
      <Linea delay={18} size={38}>
        Conoce esta propiedad y descubre sus posibilidades.
      </Linea>
      <div style={{ marginTop: 40 }}>
        <Contacto asesora={asesora} whatsapp={whatsapp} ubicacion={ubicacion} delay={30} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);
