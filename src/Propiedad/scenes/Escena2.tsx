import { AbsoluteFill } from "remotion";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { Linea, Pildora, Titulo } from "../components/Texto";
import { Ubicacion } from "../components/Ubicacion";
import type { PropiedadProps } from "../schema";

// 0:05 – 0:10  Vista aérea de la zona y esquema de la propiedad junto a la vía.
export const Escena2: React.FC<PropiedadProps> = ({ clips, areaTerreno, via }) => (
  <SceneShell>
    <MediaSlot src={clips.dronZona} kind="dron" etiqueta="dron_zona.mp4" oscurecer={0.55} />
    <AbsoluteFill style={{ justifyContent: "flex-start", padding: "200px 70px 0", gap: 40 }}>
      <Pildora delay={4}>Ubicación</Pildora>
      <Titulo delay={10} size={70}>
        {areaTerreno} · Ubicación en esquina
      </Titulo>
      <Linea delay={22} size={40}>
        Frente directo a la {via}
      </Linea>
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 120 }}>
      <div style={{ height: 900 }}>
        <Ubicacion via={via} />
      </div>
    </AbsoluteFill>
  </SceneShell>
);
