import { AbsoluteFill } from "remotion";
import { siExiste } from "../archivos";
import { Caja, Pin } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { Ubicacion } from "../components/Ubicacion";
import type { PropiedadProps } from "../schema";

// 0:05 – 0:10  Vista aérea de la zona con la propiedad junto a la vía.
export const Escena2: React.FC<PropiedadProps> = ({ clips, areaTerreno, via }) => {
  const hayClip = siExiste(clips.dronZona) !== null;
  return (
    <SceneShell>
      <MediaSlot src={clips.dronZona} kind="dron" etiqueta="dron_zona.mp4" oscurecer={0.45} />
      {hayClip ? null : (
        <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 340 }}>
          <div style={{ height: 820 }}>
            <Ubicacion via={via} />
          </div>
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ justifyContent: "flex-start", padding: "170px 70px 0", gap: 16 }}>
        <Caja fondo="blanco" size={92} delay={4}>
          {areaTerreno}
        </Caja>
        <Caja fondo="naranja" size={68} delay={12}>
          En esquina
        </Caja>
        <div style={{ height: 24 }} />
        <Pin lineas={["Frente directo a la", via]} delay={22} size={32} />
      </AbsoluteFill>
    </SceneShell>
  );
};
