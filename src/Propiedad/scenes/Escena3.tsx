import { AbsoluteFill } from "remotion";
import { Caja } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { Referencial } from "../components/Referencial";
import { SceneShell } from "../components/SceneShell";
import type { PropiedadProps } from "../schema";

// 0:10 – 0:15  Render referencial de una propiedad comercial en esquina.
export const Escena3: React.FC<PropiedadProps> = ({ clips, areaTechada }) => (
  <SceneShell>
    <MediaSlot src={clips.renderEsquina} kind="render" etiqueta="render_esquina.mp4" oscurecer={0.4} />
    <Referencial />
    <AbsoluteFill style={{ justifyContent: "flex-start", padding: "190px 70px 0", gap: 16 }}>
      <Caja fondo="navy" size={62} delay={6}>
        Construcción existente
      </Caja>
      <Caja fondo="naranja" size={48} delay={14} upper={false} weight={700}>
        {areaTechada} de área techada
      </Caja>
    </AbsoluteFill>
  </SceneShell>
);
