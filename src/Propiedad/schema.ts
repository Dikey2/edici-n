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
    archivo: "storyboard.jpg",
    ancho: 900,
    alto: 1600,
    // Recortes medidos sobre la imagen de storyboard de 900×1600.
    paneles: [
      { x: 0, y: 0, w: 450, h: 419 },
      { x: 454, y: 0, w: 446, h: 419 },
      { x: 0, y: 423, w: 450, h: 350 },
      { x: 454, y: 423, w: 446, h: 350 },
      { x: 0, y: 778, w: 450, h: 314 },
      { x: 454, y: 778, w: 446, h: 314 },
      { x: 0, y: 1096, w: 450, h: 356 },
      { x: 454, y: 1096, w: 446, h: 356 },
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
