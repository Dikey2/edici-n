import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LINEAS } from "../guion";
import { theme } from "../theme";
import { FOOTER_ALTO } from "./Footer";

type Props = {
  // Escenas cuyo texto ya aparece en pantalla; ahí no se repite el subtítulo.
  readonly ocultarEn?: ReadonlySet<number>;
};

// Subtítulos de la narración, sincronizados con narracion/tiempos.json.
export const Subtitulos: React.FC<Props> = ({ ocultarEn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const linea = LINEAS.find((l) => t >= l.inicio && t < l.fin);
  if (!linea || ocultarEn?.has(linea.id)) return null;
  const opacity = interpolate(
    t,
    [linea.inicio, linea.inicio + 0.25, linea.fin - 0.25, linea.fin],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: FOOTER_ALTO + 30,
        opacity,
        textAlign: "center",
        fontSize: 36,
        lineHeight: 1.35,
        fontWeight: 500,
        color: theme.text,
        background: "rgba(11,29,58,0.8)",
        borderLeft: `6px solid ${theme.orange}`,
        borderRadius: 12,
        padding: "22px 30px",
        fontFamily: theme.font,
      }}
    >
      {linea.subtitulo}
    </div>
  );
};
