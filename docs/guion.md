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
herramienta de video/voz generativa usando el prompt maestro. Guarda cada
archivo en `public/` y escribe su nombre en la prop correspondiente. Mientras
un clip no exista, se muestra un marcador de posición con la etiqueta
`CLIP PENDIENTE`.

| Prop (`clips.*`)            | Escena | Duración mín. | Contenido                                                      |
|-----------------------------|--------|---------------|----------------------------------------------------------------|
| `dronIntro`                 | 1      | 3.2 s         | Aérea cinematográfica de Cerro Colorado con el Misti al fondo  |
| `presentadoraIntro`         | 1      | 1.8 s         | Asesora a cámara, plano medio, breve                           |
| `dronZona`                  | 2      | 5 s           | Aérea tipo dron de la zona junto a la vía principal            |
| `renderEsquina`             | 3      | 5 s           | Render referencial de local comercial en esquina                |
| `presentadoraZonificacion`  | 5      | 3.3 s         | Asesora hablando a cámara                                       |
| `renderProyecto`            | 5      | 2.7 s         | Render referencial de posible proyecto comercial                |
| `presentadoraLlamado`       | 7      | 6 s           | Asesora caminando / hablando en entorno inmobiliario moderno    |
| `renderLlamado`             | 7      | 1.7 s         | Render referencial breve                                        |
| `atardecer`                 | 8      | 2.7 s         | Vista cinematográfica de Cerro Colorado al atardecer            |
| `presentadoraCierre`        | 8      | 3.3 s         | Asesora en plano medio, cierre                                  |
| `voz` (prop raíz)           | todas  | 45 s          | Narración completa sincronizada a los tiempos de abajo          |

Formatos aceptados: `.mp4`, `.webm`, `.mov` (video) o `.png`, `.jpg` (imagen fija
con movimiento lento). Los clips se reproducen sin audio; la voz va en `voz`.

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
