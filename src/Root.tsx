import "./index.css";
import { Composition } from "remotion";
import { PropiedadCerroColorado } from "./Propiedad";
import { defaultProps, propiedadSchema } from "./Propiedad/schema";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./Propiedad/timings";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      // npx remotion render PropiedadCerroColorado
      id="PropiedadCerroColorado"
      component={PropiedadCerroColorado}
      schema={propiedadSchema}
      defaultProps={defaultProps}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
