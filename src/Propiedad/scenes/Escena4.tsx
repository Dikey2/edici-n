import { AbsoluteFill } from "remotion";
import { SceneShell } from "../components/SceneShell";
import { Servicios } from "../components/Servicios";
import { Linea, Titulo } from "../components/Texto";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

// 0:15 – 0:21  Servicios e infraestructura con iconografía limpia.
export const Escena4: React.FC<PropiedadProps> = () => (
  <SceneShell>
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 70% at 50% 0%, ${theme.blueDeep} 0%, ${theme.bg} 60%)`,
      }}
    />
    <AbsoluteFill style={{ padding: "180px 70px 0", gap: 36 }}>
      <Titulo delay={4} size={72}>
        Servicios disponibles
      </Titulo>
      <Linea delay={12} size={36} color={theme.muted}>
        Agua · Luz · Desagüe · Pistas asfaltadas · Veredas · Telefonía
      </Linea>
      <div style={{ marginTop: 30 }}>
        <Servicios />
      </div>
      <Linea delay={60} size={34} color={theme.text} align="center">
        Buena conectividad de telefonía y servicios de comunicación.
      </Linea>
    </AbsoluteFill>
  </SceneShell>
);
