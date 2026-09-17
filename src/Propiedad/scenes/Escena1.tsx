import { AbsoluteFill, Sequence } from "remotion";
import { Caja, Pin, Subrayado } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import type { PropiedadProps } from "../schema";

// 0:00 – 0:05  Toma aérea con el Misti; la asesora aparece brevemente.
export const Escena1: React.FC<PropiedadProps> = ({ clips }) => (
  <SceneShell>
    <Sequence durationInFrames={95} premountFor={30}>
      <MediaSlot src={clips.dronIntro} kind="dron" etiqueta="dron_intro.mp4" />
    </Sequence>
    <Sequence from={95} premountFor={30}>
      <MediaSlot src={clips.presentadoraIntro} kind="presentadora" etiqueta="presentadora_intro.mp4" />
    </Sequence>
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 70px 200px", gap: 14 }}>
      <Caja fondo="ninguno" size={52} delay={6}>
        ¿Buscas una propiedad
      </Caja>
      <Caja fondo="ninguno" size={52} delay={10}>
        con ubicación estratégica en
      </Caja>
      <Caja fondo="naranja" size={72} delay={16}>
        Cerro Colorado?
      </Caja>
      <div style={{ height: 40 }} />
      <Pin lineas={["Cerro Colorado", "Arequipa"]} delay={26} />
      <div style={{ marginTop: 18 }}>
        <Subrayado delay={34} ancho={200} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);
