// Diálogo de la asesora por escena. Se usa para los subtítulos.
export const DIALOGO = {
  s1: "Si estás buscando una propiedad con una ubicación estratégica en Cerro Colorado, quiero mostrarte esta oportunidad.",
  s5: "La tasación consigna zonificación de Comercio Especializado, lo que permite evaluar distintas posibilidades para un proyecto.",
  s7: "Si eres empresario, inversionista o estás buscando un espacio para desarrollar tu próximo proyecto, esta propiedad merece ser conocida.",
  s8: (asesora: string, whatsapp: string) =>
    `Soy ${asesora}. Escríbeme al ${whatsapp} y coordinamos una visita.`,
} as const;
