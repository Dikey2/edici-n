import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { PropiedadProps } from "../schema";

type Props = {
  readonly storyboard: PropiedadProps["storyboard"];
  readonly indice: number; // 0–7
};

// Recorta un panel del storyboard y lo muestra como plano de la escena:
// copia desenfocada de fondo + panel nítido centrado con zoom lento.
export const PanelStoryboard: React.FC<Props> = ({ storyboard, indice }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const { archivo, ancho, alto } = storyboard;
  const p = storyboard.paneles[indice];
  if (!archivo || !p) return null;

  const src = staticFile(archivo);
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.06]);

  // Escala para que el panel ocupe todo el ancho del video.
  const escala = width / p.w;
  const altoPanel = p.h * escala;

  const Recorte: React.FC<{ readonly escala: number; readonly estilo?: React.CSSProperties }> = ({ escala: e, estilo }) => (
    <div style={{ width: p.w * e, height: p.h * e, overflow: "hidden", position: "relative", ...estilo }}>
      <Img
        src={src}
        style={{
          position: "absolute",
          width: ancho * e,
          height: alto * e,
          left: -p.x * e,
          top: -p.y * e,
          maxWidth: "none",
        }}
      />
    </div>
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {/* Fondo: el mismo panel, ampliado y desenfocado */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Recorte escala={escala * 2.4} estilo={{ filter: "blur(40px) brightness(0.55)", transform: `scale(${zoom})` }} />
      </AbsoluteFill>
      {/* Panel nítido */}
      <div style={{ transform: `scale(${zoom})`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
        <Recorte escala={escala} estilo={{ height: altoPanel }} />
      </div>
    </AbsoluteFill>
  );
};
