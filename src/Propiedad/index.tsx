import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { siExiste } from "./archivos";
import { Footer } from "./components/Footer";
import { PanelStoryboard } from "./components/PanelStoryboard";
import { Referencial } from "./components/Referencial";
import { SceneShell } from "./components/SceneShell";
import { Subtitulos } from "./components/Subtitulo";
import { Escena1 } from "./scenes/Escena1";
import { Escena2 } from "./scenes/Escena2";
import { Escena3 } from "./scenes/Escena3";
import { Escena4 } from "./scenes/Escena4";
import { Escena5 } from "./scenes/Escena5";
import { Escena6 } from "./scenes/Escena6";
import { Escena7 } from "./scenes/Escena7";
import { Escena8 } from "./scenes/Escena8";
import type { PropiedadProps } from "./schema";
import { SCENES } from "./timings";
import { theme } from "./theme";

const ESCENAS = [
  { key: "s1", C: Escena1 },
  { key: "s2", C: Escena2 },
  { key: "s3", C: Escena3 },
  { key: "s4", C: Escena4 },
  { key: "s5", C: Escena5 },
  { key: "s6", C: Escena6 },
  { key: "s7", C: Escena7 },
  { key: "s8", C: Escena8 },
] as const;

// Video promocional vertical 9:16, 45 s, 8 escenas contiguas.
// Paneles del storyboard que son renders/fachadas: llevan aviso referencial.
const PANELES_REFERENCIALES = new Set([2, 4, 6]);
// Escenas cuyo diálogo ya está escrito en pantalla.
const SIN_SUBTITULO = new Set([5, 7]);

// Si la imagen de storyboard existe en /public se muestra el panel
// correspondiente en lugar de la escena diseñada (modo animatic).
export const PropiedadCerroColorado: React.FC<PropiedadProps> = (props) => {
  const archivoStoryboard = siExiste(props.storyboard.archivo);
  const usarStoryboard = archivoStoryboard !== null;
  const storyboard = { ...props.storyboard, archivo: archivoStoryboard };
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {siExiste(props.voz) ? <Audio src={staticFile(props.voz as string)} /> : null}
      {ESCENAS.map(({ key, C }, i) => (
        <Sequence
          key={key}
          name={`Escena ${key.slice(1)}`}
          from={SCENES[key].from}
          durationInFrames={SCENES[key].duration}
          premountFor={30}
        >
          {usarStoryboard ? (
            <SceneShell>
              <PanelStoryboard storyboard={storyboard} indice={i} />
              {PANELES_REFERENCIALES.has(i) ? <Referencial /> : null}
            </SceneShell>
          ) : (
            <C {...props} />
          )}
        </Sequence>
      ))}
      {props.mostrarSubtitulos ? <Subtitulos ocultarEn={usarStoryboard ? undefined : SIN_SUBTITULO} /> : null}
      <Footer />
    </AbsoluteFill>
  );
};
