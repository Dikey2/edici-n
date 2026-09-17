import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { siExiste } from "./archivos";
import { Callouts } from "./components/Callouts";
import { Footer } from "./components/Footer";
import { type Entrada, PanelStoryboard } from "./components/PanelStoryboard";
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
  { key: "s1", C: Escena1, entrada: "zoom" },
  { key: "s2", C: Escena2, entrada: "derecha" },
  { key: "s3", C: Escena3, entrada: "izquierda" },
  { key: "s4", C: Escena4, entrada: "abajo" },
  { key: "s5", C: Escena5, entrada: "derecha" },
  { key: "s6", C: Escena6, entrada: "izquierda" },
  { key: "s7", C: Escena7, entrada: "abajo" },
  { key: "s8", C: Escena8, entrada: "zoom" },
] as const satisfies ReadonlyArray<{ key: keyof typeof SCENES; C: React.FC<PropiedadProps>; entrada: Entrada }>;

// Paneles del storyboard que son renders/fachadas: llevan aviso referencial.
const PANELES_REFERENCIALES = new Set([2, 4, 6]);
// Escenas cuyo diálogo ya está escrito en pantalla (solo en las escenas diseñadas).
const SIN_SUBTITULO = new Set([5, 7]);
// Cuadros en que la escena entrante se solapa con la saliente.
const SOLAPE = 10;

// Si la imagen de storyboard existe en /public se muestra el panel
// correspondiente en lugar de la escena diseñada (modo animatic).
export const PropiedadCerroColorado: React.FC<PropiedadProps> = (props) => {
  // Acepta el nombre configurado y, si no existe, la otra extensión habitual.
  const alterno = props.storyboard.archivo?.replace(/\.(png|jpe?g)$/i, (m) => (m.toLowerCase() === ".png" ? ".jpg" : ".png")) ?? null;
  const archivoStoryboard = siExiste(props.storyboard.archivo) ?? siExiste(alterno);
  const usarStoryboard = archivoStoryboard !== null;
  const storyboard = { ...props.storyboard, archivo: archivoStoryboard };
  const musica = siExiste("musica.mp3");
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {siExiste(props.voz) ? <Audio src={staticFile(props.voz as string)} /> : null}
      {musica ? <Audio src={staticFile(musica)} volume={0.14} /> : null}
      {ESCENAS.map(({ key, C, entrada }, i) => {
        const solapeIni = i === 0 ? 0 : SOLAPE;
        return (
          <Sequence
            key={key}
            name={`Escena ${key.slice(1)}`}
            from={SCENES[key].from - solapeIni}
            durationInFrames={SCENES[key].duration + solapeIni}
            premountFor={30}
          >
            {usarStoryboard ? (
              <SceneShell>
                <PanelStoryboard storyboard={storyboard} indice={i} entrada={entrada} />
                <div style={{ position: "absolute", left: 50, right: 50, top: 46, height: 300, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <Callouts indice={i} props={props} />
                </div>
                {PANELES_REFERENCIALES.has(i) ? <Referencial /> : null}
              </SceneShell>
            ) : (
              <C {...props} />
            )}
          </Sequence>
        );
      })}
      {props.mostrarSubtitulos ? <Subtitulos ocultarEn={usarStoryboard ? undefined : SIN_SUBTITULO} /> : null}
      <Footer />
    </AbsoluteFill>
  );
};
