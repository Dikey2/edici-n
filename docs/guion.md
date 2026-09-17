# Video promocional · Propiedad en Cerro Colorado, Arequipa

Vertical 9:16 (1080×1920), 30 fps, 45 s, español latino.
Composición Remotion: `PropiedadCerroColorado` (`src/Propiedad`).

## Cómo trabajar

```bash
npm i
npm run dev                       # Remotion Studio, edita props en el panel derecho
npx remotion render               # genera out/PropiedadCerroColorado.mp4
```

Todos los textos, el nombre, el WhatsApp y los nombres de archivo de los clips
son **props** editables desde Studio (o con `--props`), sin tocar código.

## Material que debe generarse con IA (tomas, presentadora y voz)

Remotion arma la pieza; las tomas realistas y la voz se generan con una
herramienta de video/voz generativa usando el prompt maestro. **Basta con
copiar cada archivo a `public/` con el nombre de la tabla**: el video detecta
qué archivos existen y los usa; mientras un clip no exista se muestra un
marcador de posición con la etiqueta `CLIP PENDIENTE`. Si prefieres otro
nombre, cámbialo en la prop correspondiente desde Studio.

| Archivo en `public/`            | Prop (`clips.*`)           | Escena | Duración mín. | Contenido                                                     |
|---------------------------------|----------------------------|--------|---------------|---------------------------------------------------------------|
| `dron_intro.mp4`                | `dronIntro`                | 1      | 3.2 s         | Aérea cinematográfica de Cerro Colorado con el Misti al fondo |
| `presentadora_intro.mp4`        | `presentadoraIntro`        | 1      | 1.8 s         | Asesora a cámara, plano medio, breve                          |
| `dron_zona.mp4`                 | `dronZona`                 | 2      | 5 s           | Aérea tipo dron de la zona junto a la vía principal           |
| `render_esquina.mp4`            | `renderEsquina`            | 3      | 5 s           | Render referencial de local comercial en esquina              |
| `presentadora_zonificacion.mp4` | `presentadoraZonificacion` | 5      | 3.3 s         | Asesora hablando a cámara                                     |
| `render_proyecto.mp4`           | `renderProyecto`           | 5      | 2.7 s         | Render referencial de posible proyecto comercial              |
| `documentos.mp4`                | `documentos`               | 6      | 6 s           | Documentos genéricos sobre escritorio, sin datos legibles     |
| `presentadora_llamado.mp4`      | `presentadoraLlamado`      | 7      | 6 s           | Asesora caminando / hablando en entorno inmobiliario moderno  |
| `render_llamado.mp4`            | `renderLlamado`            | 7      | 1.7 s         | Render referencial breve                                      |
| `atardecer.mp4`                 | `atardecer`                | 8      | 2.7 s         | Vista cinematográfica de Cerro Colorado al atardecer          |
| `presentadora_cierre.mp4`       | `presentadoraCierre`       | 8      | 3.3 s         | Asesora en plano medio, cierre                                |
| `narracion.mp3`                 | `voz` (prop raíz)          | todas  | 45 s          | Narración completa sincronizada a los tiempos de abajo        |

Las imágenes fijas (`.png`, `.jpg`) también sirven en cualquier ranura: se
muestran a pantalla completa con un zoom lento. Si tienes las 8 imágenes del
storyboard por separado y en alta resolución, guárdalas en `public/` y escribe
sus nombres (por ejemplo `escena1.png`) en las props `clips.*` desde Studio;
es la opción de mejor calidad.

Formatos aceptados: `.mp4`, `.webm`, `.mov` (video) o `.png`, `.jpg` (imagen fija
con movimiento lento). Los clips se reproducen sin audio; la voz va en `voz`.

## Narración

El texto de cada escena vive en `narracion/guion.json` (campo `tts` para la
voz, `subtitulo` para pantalla). `public/narracion.mp3` es una **voz de
prueba** generada offline con Piper (voz es_ES-sharvard, locutora femenina,
acento peninsular) para validar ritmo y sincronía; para la pieza final graba
o genera una voz latina de calidad comercial con el mismo texto.

`scripts/narracion.py` monta la narración completa: sintetiza (o recibe) un
audio por escena, lo coloca al inicio de su escena (o justo después de la
frase anterior si esta se alargó), recorta silencios y escribe:

- `public/narracion.mp3` (vía `narracion.wav`),
- `public/narracion.srt` (subtítulos estándar),
- `narracion/tiempos.json`, que el video usa para mostrar cada subtítulo
  exactamente mientras suena su frase.

```bash
pip install piper-tts
python3 scripts/narracion.py --modelo es_ES-sharvard-medium.onnx --hablante 1 --velocidad 0.72
npx remotion ffmpeg -y -i public/narracion.wav public/narracion.mp3

# Con una voz comercial: exporta 8 archivos wav, uno por escena, y solo monta
python3 scripts/narracion.py --wavs e1.wav e2.wav e3.wav e4.wav e5.wav e6.wav e7.wav e8.wav
```

Tiempos medidos de la voz de prueba (la narración termina a los 44.95 s):

| Escena | Voz            | Frase |
|--------|----------------|-------|
| 1      | 0.30 – 5.73 s  | Si estás buscando una propiedad con una ubicación estratégica en Cerro Colorado, quiero mostrarte esta oportunidad. |
| 2      | 6.03 – 10.21 s | Cuatrocientos once metros cuadrados en esquina, con frente directo a la Autopista Arequipa – La Joya. |
| 3      | 10.51 – 13.02 s| Con construcción existente y la misma área techada. |
| 4      | 15.20 – 18.38 s| Con agua, luz, desagüe, pistas asfaltadas, veredas y telefonía. |
| 5      | 21.20 – 26.82 s| La tasación consigna zonificación de Comercio Especializado, lo que permite evaluar distintas posibilidades para un proyecto. |
| 6      | 27.20 – 29.20 s| Además, cuenta con documentación registral. |
| 7      | 33.20 – 39.41 s| Si eres empresario, inversionista o estás buscando un espacio para desarrollar tu próximo proyecto, esta propiedad merece ser conocida. |
| 8      | 39.71 – 44.95 s| Soy Gianela Torres. Escríbeme al 978 308 489 y coordinamos una visita. |

Las frases obligatorias del brief (escenas 1, 5, 7 y 8) se mantienen
literales; las demás solo leen lo que ya aparece en pantalla. Ninguna añade
usos, cifras ni datos no proporcionados.

## Modo storyboard (animatic)

Si tienes la imagen de storyboard (8 paneles en 2 columnas × 4 filas),
guárdala como `public/storyboard.png` y el video la usará automáticamente
(si su tamaño no es 900×1600, ajusta `ancho` y `alto` en Studio). Cada escena
mostrará su panel nítido centrado sobre una copia desenfocada, con zoom
lento, la narración y los subtítulos. Los recortes por defecto están
estimados para una imagen de 900×1600; ajusta `storyboard.paneles` (x, y,
ancho, alto de cada panel) hasta que encajen.

Aviso: en el storyboard de referencia, los paneles 3, 5 y 7 muestran
fachadas con letreros comerciales legibles. El brief prohíbe letreros y
negocios específicos, así que ese material sirve como animatic interno pero
debe sustituirse por renders referenciales sin rótulos antes de publicar.

## Guion y tiempos

| Escena | Tiempo      | Texto en pantalla                                                                 | Diálogo |
|--------|-------------|-----------------------------------------------------------------------------------|---------|
| 1      | 0:00–0:05   | ¿BUSCAS UNA PROPIEDAD CON UBICACIÓN ESTRATÉGICA EN CERRO COLORADO?                | "Si estás buscando una propiedad con una ubicación estratégica en Cerro Colorado, quiero mostrarte esta oportunidad." |
| 2      | 0:05–0:10   | 411.45 m² · UBICACIÓN EN ESQUINA / Frente directo a la Autopista Arequipa – La Joya | — |
| 3      | 0:10–0:15   | CONSTRUCCIÓN EXISTENTE / 411.45 m² DE ÁREA TECHADA (+ aviso IMAGEN REFERENCIAL)   | — |
| 4      | 0:15–0:21   | SERVICIOS DISPONIBLES / Agua · Luz · Desagüe · Pistas asfaltadas · Veredas · Telefonía / Buena conectividad de telefonía y servicios de comunicación. | — |
| 5      | 0:21–0:27   | ZONIFICACIÓN: COMERCIO ESPECIALIZADO                                              | "La tasación consigna zonificación de Comercio Especializado, lo que permite evaluar distintas posibilidades para un proyecto." |
| 6      | 0:27–0:33   | DOCUMENTACIÓN REGISTRAL / Cuenta con documentación registral.                     | — |
| 7      | 0:33–0:39   | —                                                                                 | "Si eres empresario, inversionista o estás buscando un espacio para desarrollar tu próximo proyecto, esta propiedad merece ser conocida." |
| 8      | 0:39–0:45   | ¿TIENES UN PROYECTO EN MENTE? / Conoce esta propiedad y descubre sus posibilidades. / Gianela Torres · WhatsApp 978 308 489 · Cerro Colorado – Arequipa | "Soy Gianela Torres. Escríbeme al 978 308 489 y coordinamos una visita." |

Los subtítulos del diálogo se muestran por defecto (`mostrarSubtitulos`); si la
voz queda perfectamente sincronizada puedes desactivarlos.

## Restricciones respetadas en la composición

No aparece ni se menciona: Av. Italia, cantidad de locales o tiendas, pollería,
negocios o letreros específicos, partida registral, propietarios, DNI, firmas,
direcciones personales, promesas de rentabilidad ni garantías de inversión.
Los renders llevan siempre el rótulo **IMAGEN REFERENCIAL**. Al reemplazar los
marcadores por material generado, mantén esas mismas restricciones en los
clips.
