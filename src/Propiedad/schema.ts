import { z } from "zod";

// Nombre de archivo dentro de /public, o null para mostrar el marcador
// de posición estilizado hasta que el clip esté disponible.
const archivo = z.string().nullable();

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
  clips: z.object({
    dronIntro: archivo,
    presentadoraIntro: archivo,
    dronZona: archivo,
    renderEsquina: archivo,
    presentadoraZonificacion: archivo,
    renderProyecto: archivo,
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
  voz: null,
  clips: {
    dronIntro: null,
    presentadoraIntro: null,
    dronZona: null,
    renderEsquina: null,
    presentadoraZonificacion: null,
    renderProyecto: null,
    presentadoraLlamado: null,
    renderLlamado: null,
    atardecer: null,
    presentadoraCierre: null,
  },
};
