import { AbsoluteFill } from "remotion";
import { Caja } from "../components/Cajas";
import { MediaSlot } from "../components/MediaSlot";
import { SceneShell } from "../components/SceneShell";
import { theme } from "../theme";
import type { PropiedadProps } from "../schema";

// 0:27 – 0:33  Documentación registral, representación genérica sin datos.
export const Escena6: React.FC<PropiedadProps> = ({ clips }) => (
  <SceneShell>
    <MediaSlot src={clips.documentos} kind="documentos" etiqueta="documentos.mp4" oscurecer={0.35} />
    <AbsoluteFill style={{ justifyContent: "flex-start", padding: "190px 70px 0" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            background: theme.navy,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <svg viewBox="0 0 100 100" width="76" height="76">
            <path d="M28 12 H60 L78 30 V88 H28 Z" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
            <path d="M38 40 H66 M38 52 H66 M38 64 H54" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <circle cx="66" cy="72" r="11" fill={theme.orange} />
            <path d="M60 72 L64 76 L72 68" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Caja fondo="navy" size={52} delay={6}>
            Documentación registral
          </Caja>
          <Caja fondo="blanco" size={40} delay={14} upper={false} weight={700}>
            Cuenta con documentación registral.
          </Caja>
        </div>
      </div>
    </AbsoluteFill>
  </SceneShell>
);
