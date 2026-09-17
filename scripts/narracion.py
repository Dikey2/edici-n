#!/usr/bin/env python3
"""Genera la narración completa (45 s) a partir de narracion/guion.json.

- Sintetiza cada escena con Piper (voz local, sin internet en tiempo de uso).
- Coloca cada frase en el inicio de su escena y avisa si no cabe.
- Escribe public/narracion.wav y public/narracion.srt.

Uso:
  pip install piper-tts
  python3 scripts/narracion.py --modelo ruta/es_ES-sharvard-medium.onnx --hablante 1

Para una voz comercial (ElevenLabs, Azure, etc.) usa el texto de `tts` de cada
escena, exporta un archivo por escena y pásalos con --wavs e1.wav ... e8.wav
para que este script solo haga el montaje y los subtítulos.
"""
import argparse
import io
import json
import math
import wave
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
GUION = RAIZ / "narracion" / "guion.json"
SALIDA_WAV = RAIZ / "public" / "narracion.wav"
SALIDA_SRT = RAIZ / "public" / "narracion.srt"
SALIDA_TIEMPOS = RAIZ / "narracion" / "tiempos.json"


def recortar_silencio(datos, sw, ch, umbral=400):
    """Quita el silencio inicial y final de un clip PCM de 16 bits."""
    import array

    muestras = array.array("h", datos)
    paso = ch
    ini, fin = 0, len(muestras)
    while ini < fin and abs(muestras[ini]) < umbral:
        ini += paso
    while fin > ini and abs(muestras[fin - 1]) < umbral:
        fin -= paso
    return muestras[ini:fin].tobytes()


def leer_wav(ruta):
    with wave.open(str(ruta), "rb") as w:
        return w.getframerate(), w.getnchannels(), w.getsampwidth(), w.readframes(w.getnframes())


def sintetizar(texto, modelo, hablante, velocidad):
    from piper import PiperVoice
    from piper.config import SynthesisConfig

    voz = PiperVoice.load(modelo)
    cfg = SynthesisConfig(speaker_id=hablante, length_scale=velocidad)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        voz.synthesize_wav(texto, w, syn_config=cfg)
    buf.seek(0)
    with wave.open(buf, "rb") as w:
        return w.getframerate(), w.getnchannels(), w.getsampwidth(), w.readframes(w.getnframes())


def srt_tiempo(seg):
    ms = int(round(seg * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--modelo", help="ruta al .onnx de Piper")
    ap.add_argument("--hablante", type=int, default=0)
    ap.add_argument("--velocidad", type=float, default=1.0, help="length_scale de Piper (>1 más lento)")
    ap.add_argument("--wavs", nargs="*", help="8 wav ya grabados, uno por escena, en orden")
    ap.add_argument("--margen", type=float, default=0.25, help="silencio inicial por escena (s)")
    ap.add_argument("--pausa", type=float, default=0.35, help="pausa mínima entre frases (s)")
    args = ap.parse_args()

    guion = json.loads(GUION.read_text(encoding="utf-8"))
    escenas = guion["escenas"]
    total = escenas[-1]["fin"]

    clips = []
    for i, e in enumerate(escenas):
        if args.wavs:
            clips.append(leer_wav(args.wavs[i]))
        else:
            if not args.modelo:
                ap.error("indica --modelo o --wavs")
            clips.append(sintetizar(e["tts"], args.modelo, args.hablante, args.velocidad))

    sr, ch, sw = clips[0][0], clips[0][1], clips[0][2]
    for c in clips:
        assert (c[0], c[1], c[2]) == (sr, ch, sw), "todos los clips deben compartir formato"

    bpf = ch * sw  # bytes por frame
    salida = bytearray(int(total * sr) * bpf)
    srt, tiempos = [], []
    cursor = 0.0
    for e, (_, _, _, datos) in zip(escenas, clips):
        if sw == 2:
            datos = recortar_silencio(datos, sw, ch)
        dur = len(datos) / bpf / sr
        # Cada frase empieza en su escena, o tras la anterior si esta se alargó.
        ini_s = max(e["inicio"] + args.margen, cursor + args.pausa)
        fin_s = ini_s + dur
        cursor = fin_s
        aviso = ""
        if ini_s > e["inicio"] + args.margen + 0.01:
            aviso += f"  (empieza {ini_s - e['inicio']:.2f} s tarde)"
        if fin_s > e["fin"]:
            aviso += f"  (invade la siguiente escena {fin_s - e['fin']:.2f} s)"
        print(f"escena {e['id']}: {ini_s:5.2f} → {fin_s:5.2f} s  ({dur:.2f} s){aviso}")
        ini = int(ini_s * sr) * bpf
        fin = min(ini + len(datos), len(salida))
        if fin < ini + len(datos):
            print(f"  ¡La escena {e['id']} se corta: la narración supera los {total:.0f} s!")
        salida[ini:fin] = datos[: max(0, fin - ini)]
        srt.append(f"{e['id']}\n{srt_tiempo(ini_s)} --> {srt_tiempo(min(fin_s + 0.3, total))}\n{e['subtitulo']}\n")
        tiempos.append({"id": e["id"], "inicio": round(ini_s, 3), "fin": round(min(fin_s + 0.3, total), 3)})
    print(f"fin de la narración: {cursor:.2f} s de {total:.0f} s")

    SALIDA_WAV.parent.mkdir(exist_ok=True)
    with wave.open(str(SALIDA_WAV), "wb") as w:
        w.setnchannels(ch)
        w.setsampwidth(sw)
        w.setframerate(sr)
        w.writeframes(bytes(salida))
    SALIDA_SRT.write_text("\n".join(srt), encoding="utf-8")
    SALIDA_TIEMPOS.write_text(json.dumps(tiempos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"→ {SALIDA_WAV.relative_to(RAIZ)}  ({total:.0f} s)")
    print(f"→ {SALIDA_SRT.relative_to(RAIZ)}")
    print(f"→ {SALIDA_TIEMPOS.relative_to(RAIZ)}")


if __name__ == "__main__":
    main()
