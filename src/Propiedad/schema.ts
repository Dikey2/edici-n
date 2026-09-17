import { z } from "zod";

// Nombre de archivo dentro de /public, o null para mostrar el marcador
// de posición estilizado hasta que el clip esté disponible.
const archivo = z.string().nullable();

const panel = z.object({ x: z.number(), y: z.number(), w: z.number(), h: z.number() });

export const propiedadSchema = z.object({
  asesora: z.string(),
  whatsapp: z.string(),
  ubicacion: z.string(),
  areaTerreno: z.string(),
  areaTechada: z.string(),
  via: z.string(),
  mostrarSubtitulos: z.boolean(),
  // Narración completa (mp3/wav en /public). null = sin audio.
  voz: archivo,
  // Modo storyboard: una sola imagen con los 8 paneles (2 columnas × 4 filas)
  // en /public. Cada escena recorta su panel. null = escenas diseñadas.
  storyboard: z.object({
    archivo: archivo,
    ancho: z.number(),
    alto: z.number(),
    paneles: z.array(panel).length(8),
  }),
  clips: z.object({
    dronIntro: archivo,
    presentadoraIntro: archivo,
    dronZona: archivo,
    renderEsquina: archivo,
    presentadoraZonificacion: archivo,
    renderProyecto: archivo,
    documentos: archivo,
    presentadoraLlamado: archivo,
    renderLlamado: archivo,
    atardecer: archivo,
    presentadoraCierre: archivo,
  }),
});

export type PropiedadProps = z.infer<typeof propiedadSchema>;

export const defaultProps: PropiedadProps = {
  asesora: "Gianela Torres",
  whatsapp: "978 308 489",
  ubicacion: "Cerro Colorado – Arequipa",
  areaTerreno: "411.45 m²",
  areaTechada: "411.45 m²",
  via: "Autopista Arequipa – La Joya",
  mostrarSubtitulos: true,
  voz: "narracion.mp3",
  storyboard: {
    archivo: "storyboard.png",
    ancho: 900,
    alto: 1600,
    // Estimación para la imagen de referencia de 900×1600; ajústalo en Studio.
    paneles: [
      { x: 0, y: 0, w: 447, h: 420 },
      { x: 453, y: 0, w: 447, h: 420 },
      { x: 0, y: 428, w: 447, h: 347 },
      { x: 453, y: 428, w: 447, h: 347 },
      { x: 0, y: 783, w: 447, h: 314 },
      { x: 453, y: 783, w: 447, h: 314 },
      { x: 0, y: 1105, w: 447, h: 350 },
      { x: 453, y: 1105, w: 447, h: 350 },
    ],
  },
  clips: {
    dronIntro: "dron_intro.mp4",
    presentadoraIntro: "presentadora_intro.mp4",
    dronZona: "dron_zona.mp4",
    renderEsquina: "render_esquina.mp4",
    presentadoraZonificacion: "presentadora_zonificacion.mp4",
    renderProyecto: "render_proyecto.mp4",
    documentos: "documentos.mp4",
    presentadoraLlamado: "presentadora_llamado.mp4",
    renderLlamado: "render_llamado.mp4",
    atardecer: "atardecer.mp4",
    presentadoraCierre: "presentadora_cierre.mp4",
  },
};
