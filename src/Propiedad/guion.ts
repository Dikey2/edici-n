import guion from "../../narracion/guion.json";
import tiempos from "../../narracion/tiempos.json";

export type LineaGuion = {
  readonly id: number;
  readonly subtitulo: string;
  // Ventana real de la voz (segundos), escrita por scripts/narracion.py.
  readonly inicio: number;
  readonly fin: number;
};

// Une el texto del guion con los tiempos medidos de la narración.
export const LINEAS: LineaGuion[] = guion.escenas.map((e) => {
  const t = tiempos.find((x) => x.id === e.id);
  return {
    id: e.id,
    subtitulo: e.subtitulo,
    inicio: t ? t.inicio : e.inicio,
    fin: t ? t.fin : e.fin,
  };
});
