import type { PropsWithChildren } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const FADE = 12;

// Fundido de entrada/salida en los bordes de cada escena.
export const SceneShell: React.FC<PropsWithChildren> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, FADE, durationInFrames - FADE, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg, fontFamily: theme.font, opacity }}>
      {children}
    </AbsoluteFill>
  );
};
