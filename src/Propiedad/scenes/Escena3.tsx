import { AbsoluteFill } from "remotion";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import { Linea, Titulo } from "../components/Texto";
import type { PropiedadProps } from "../schema";

// 0:10 – 0:15  Render referencial de una propiedad comercial en esquina.
export const Escena3: React.FC<PropiedadProps> = ({ clips, areaTechada }) => (
  <SceneShell>
    <MediaSlot src={clips.renderEsquina} kind="render" etiqueta="render_esquina.mp4" oscurecer={0.5} />
    <Referencial />
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 70px 400px", gap: 28 }}>
      <Titulo delay={8} size={72}>
        Construcción existente
      </Titulo>
      <Linea delay={20} size={52} weight={700}>
        {areaTechada} de área techada
      </Linea>
    </AbsoluteFill>
  </SceneShell>
);
