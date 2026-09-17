import { getStaticFiles } from "remotion";

// Devuelve el nombre si el archivo existe en /public; si no, null.
// Permite "copiar el archivo y listo": nada que configurar en Studio.
export const siExiste = (nombre: string | null): string | null => {
  if (!nombre) return null;
  const existe = getStaticFiles().some((f) => f.name === nombre);
  return existe ? nombre : null;
};
