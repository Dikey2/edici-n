import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { PropiedadProps } from "../schema";
import { theme } from "../theme";
import { FOOTER_ALTO } from "./Footer";

// Zona del sello de tiempo impreso en cada panel (coordenadas del panel) y
// desplazamiento desde donde se clona el fondo para taparlo.
const PARCHE = { x: 8, y: 8, w: 112, h: 46, dx: 118 };

export type Entrada = "derecha" | "izquierda" | "abajo" | "zoom";

type Props = {
  readonly storyboard: PropiedadProps["storyboard"];
  readonly indice: number; // 0–7
  readonly entrada?: Entrada;
};

// Recorta un panel del storyboard y lo presenta como tarjeta con entrada
// animada, cámara en movimiento, destello de luz y fondo desenfocado.
export const PanelStoryboard: React.FC<Props> = ({ storyboard, indice, entrada = "derecha" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height, fps } = useVideoConfig();
  const { archivo, ancho, alto } = storyboard;
  const p = storyboard.paneles[indice];
  if (!archivo || !p) return null;

  const src = staticFile(archivo);
  const escala = (width - 40) / p.w; // margen lateral de 20 px
  const altoPanel = p.h * escala;
  const centroY = (height - FOOTER_ALTO) / 2 + 40;

  // Cámara: zoom lento + paneo, alternando dirección por escena.
  const dir = indice % 2 === 0 ? 1 : -1;
  const zoom = interpolate(frame, [0, durationInFrames], [1.04, 1.16]);
  const panX = interpolate(frame, [0, durationInFrames], [-2.5 * dir, 2.5 * dir]);
  const panY = interpolate(frame, [0, durationInFrames], [1.5, -1.5]);

  // Entrada de la tarjeta.
  const e = spring({ frame, fps, config: { damping: 16, stiffness: 120, mass: 0.9 } });
  const tx = entrada === "derecha" ? interpolate(e, [0, 1], [width, 0]) : entrada === "izquierda" ? interpolate(e, [0, 1], [-width, 0]) : 0;
  const ty = entrada === "abajo" ? interpolate(e, [0, 1], [height * 0.6, 0]) : 0;
  const sc = entrada === "zoom" ? interpolate(e, [0, 1], [0.6, 1]) : interpolate(e, [0, 1], [0.92, 1]);
  const rotY = entrada === "derecha" ? interpolate(e, [0, 1], [35, 0]) : entrada === "izquierda" ? interpolate(e, [0, 1], [-35, 0]) : 0;
  const rotX = entrada === "abajo" ? interpolate(e, [0, 1], [-25, 0]) : 0;

  // Destello que barre la tarjeta tras la entrada.
  const barrido = interpolate(frame, [18, 50], [-60, 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const Recorte: React.FC<{ readonly escala: number; readonly estilo?: React.CSSProperties; readonly camara?: boolean }> = ({
    escala: s,
    estilo,
    camara = true,
  }) => (
    <div style={{ width: p.w * s, height: p.h * s, overflow: "hidden", position: "relative", ...estilo }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: camara ? `scale(${zoom}) translate(${panX}%, ${panY}%)` : undefined,
        }}
      >
        <Img src={src} style={{ position: "absolute", width: ancho * s, height: alto * s, left: -p.x * s, top: -p.y * s, maxWidth: "none" }} />
        {/* Parche que tapa el sello de tiempo con el fondo contiguo */}
        <div
          style={{
            position: "absolute",
            left: (PARCHE.x - 10) * s,
            top: (PARCHE.y - 10) * s,
            width: (PARCHE.w + 20) * s,
            height: (PARCHE.h + 20) * s,
            overflow: "hidden",
            WebkitMaskImage: "radial-gradient(ellipse at center, #000 45%, transparent 72%)",
            maskImage: "radial-gradient(ellipse at center, #000 45%, transparent 72%)",
          }}
        >
          <Img
            src={src}
            style={{
              position: "absolute",
              width: ancho * s,
              height: alto * s,
              left: -(p.x + PARCHE.x - 10 + PARCHE.dx) * s,
              top: -(p.y + PARCHE.y - 10) * s,
              maxWidth: "none",
              filter: "blur(3px)",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Fondo: el mismo panel, ampliado, desenfocado y con paneo contrario */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: e }}>
        <div style={{ transform: `scale(1.15) translate(${-panX * 0.6}%, ${-panY * 0.6}%)` }}>
          <Recorte escala={escala * 2.4} estilo={{ filter: "blur(38px) brightness(0.5) saturate(1.3)" }} camara={false} />
        </div>
      </AbsoluteFill>
      {/* Franjas diagonales sutiles para dar textura al fondo */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 3px, transparent 3px 46px)`,
          transform: `translateX(${-(frame * 1.2) % 92}px)`,
          width: "120%",
          opacity: e,
        }}
      />
      {/* Tarjeta */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: centroY - altoPanel / 2,
          width: p.w * escala,
          height: altoPanel,
          perspective: 1400,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `translate(${tx}px, ${ty}px) scale(${sc}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
            transformOrigin: "center",
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
            border: `3px solid ${theme.orange}`,
            position: "relative",
          }}
        >
          <Recorte escala={escala} />
          {/* Destello */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${barrido}%`,
              width: "28%",
              background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
              transform: "skewX(-15deg)",
              pointerEvents: "none",
            }}
          />
          {/* Esquinas naranja */}
          {[
            { top: 14, left: 14, bt: 1, bl: 1 },
            { bottom: 14, right: 14, bb: 1, br: 1 },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 60 * e,
                height: 60 * e,
                top: c.top,
                left: c.left,
                bottom: c.bottom,
                right: c.right,
                borderTop: c.bt ? `6px solid ${theme.orange}` : undefined,
                borderLeft: c.bl ? `6px solid ${theme.orange}` : undefined,
                borderBottom: c.bb ? `6px solid ${theme.orange}` : undefined,
                borderRight: c.br ? `6px solid ${theme.orange}` : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
