import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LINEAS } from "../guion";
import { theme } from "../theme";
import { FOOTER_ALTO } from "./Footer";

type Bloque = { texto: string; inicio: number; fin: number; id: number };

const PALABRAS_POR_BLOQUE = 3;

// Divide cada frase en bloques de pocas palabras y reparte su tiempo en
// proporción a la longitud de cada bloque (estilo "karaoke" de redes).
const BLOQUES: Bloque[] = LINEAS.flatMap((l) => {
  const palabras = l.subtitulo.split(/\s+/);
  const grupos: string[] = [];
  for (let i = 0; i < palabras.length; i += PALABRAS_POR_BLOQUE) {
    grupos.push(palabras.slice(i, i + PALABRAS_POR_BLOQUE).join(" "));
  }
  const total = grupos.reduce((a, g) => a + g.length + 2, 0);
  let t = l.inicio;
  const dur = l.fin - l.inicio - 0.3; // deja el último tramo sin texto
  return grupos.map((g) => {
    const d = ((g.length + 2) / total) * dur;
    const b = { texto: g, inicio: t, fin: t + d, id: l.id };
    t += d;
    return b;
  });
});

type Props = { readonly ocultarEn?: ReadonlySet<number> };

export const Subtitulos: React.FC<Props> = ({ ocultarEn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const b = BLOQUES.find((x) => t >= x.inicio && t < x.fin);
  if (!b || ocultarEn?.has(b.id)) return null;
  const desde = Math.round(b.inicio * fps);
  const pop = spring({ frame: frame - desde, fps, config: { damping: 12, stiffness: 220, mass: 0.6 } });
  const scale = interpolate(pop, [0, 1], [0.7, 1]);
  const enfasis = /\d|m²|esquina|comercio|registral|proyecto|visita/i.test(b.texto);
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        bottom: FOOTER_ALTO + 70,
        display: "flex",
        justifyContent: "center",
        fontFamily: theme.font,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          fontSize: 62,
          lineHeight: 1.1,
          fontWeight: 900,
          textTransform: "uppercase",
          textAlign: "center",
          color: enfasis ? theme.orange : "#ffffff",
          textShadow: "0 4px 0 rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.6)",
          WebkitTextStroke: "1.5px rgba(0,0,0,0.35)",
          letterSpacing: 1,
          maxWidth: 1000,
        }}
      >
        {b.texto}
      </div>
    </div>
  );
};
