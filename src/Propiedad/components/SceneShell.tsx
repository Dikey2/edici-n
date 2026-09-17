import type { PropsWithChildren } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const FADE = 10;

// Fundido corto al final de cada escena; la entrada la anima cada escena.
export const SceneShell: React.FC<PropsWithChildren> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(frame, [durationInFrames - FADE, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ fontFamily: theme.font, opacity }}>
      {children}
    </AbsoluteFill>
  );
};
