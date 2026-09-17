# Entregables

Renders listos para publicar. Se regeneran con `npx remotion render` y se
recomprimen para web con:

```bash
npx remotion ffmpeg -y -i out/PropiedadCerroColorado.mp4 -c:v libx264 -crf 22 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k entregables/Propiedad_CerroColorado_1080x1920.mp4
```

- `Propiedad_CerroColorado_1080x1920.mp4`: versión dinámica, 9:16, 45 s, con narración.
