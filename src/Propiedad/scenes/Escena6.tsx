import { AbsoluteFill } from "remotion";
import { Documentos } from "../components/Documentos";
import { SceneShell } from "../components/SceneShell";
import { Linea, Titulo } from "../components/Texto";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

// 0:27 – 0:33  Documentación registral, representación genérica sin datos.
export const Escena6: React.FC<PropiedadProps> = () => (
  <SceneShell>
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 70% at 50% 100%, ${theme.blueDeep} 0%, ${theme.bg} 60%)`,
      }}
    />
    <AbsoluteFill style={{ padding: "180px 70px 0", gap: 28 }}>
      <Titulo delay={4} size={72}>
        Documentación registral
      </Titulo>
      <Linea delay={14} size={42}>
        Cuenta con documentación registral.
      </Linea>
    </AbsoluteFill>
    <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 340 }}>
      <div style={{ height: 900 }}>
        <Documentos />
      </div>
    </AbsoluteFill>
  </SceneShell>
);
