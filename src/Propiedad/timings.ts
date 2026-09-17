export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const s = (seconds: number) => Math.round(seconds * FPS);

// Escenas contiguas según el guion (0:00 → 0:45).
export const SCENES = {
  s1: { from: s(0), duration: s(5) }, // 0:00 – 0:05  Intro
  s2: { from: s(5), duration: s(5) }, // 0:05 – 0:10  Ubicación
  s3: { from: s(10), duration: s(5) }, // 0:10 – 0:15  Construcción
  s4: { from: s(15), duration: s(6) }, // 0:15 – 0:21  Servicios
  s5: { from: s(21), duration: s(6) }, // 0:21 – 0:27  Zonificación
  s6: { from: s(27), duration: s(6) }, // 0:27 – 0:33  Documentación
  s7: { from: s(33), duration: s(6) }, // 0:33 – 0:39  Llamado
  s8: { from: s(39), duration: s(6) }, // 0:39 – 0:45  Cierre
} as const;

export const TOTAL_FRAMES = SCENES.s8.from + SCENES.s8.duration; // 1350 = 45 s
