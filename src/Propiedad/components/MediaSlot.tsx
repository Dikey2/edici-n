import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { siExiste } from "../archivos";
import { theme } from "../theme";

type Kind = "dron" | "presentadora" | "render" | "atardecer";

type Props = {
  readonly src: string | null;
  readonly kind: Kind;
  readonly etiqueta: string;
  readonly zoom?: boolean;
  readonly oscurecer?: number; // 0–1, capa oscura para legibilidad del texto
};

const esVideo = (f: string) => /\.(mp4|webm|mov|m4v)$/i.test(f);

// Ranura de material audiovisual: reproduce el clip indicado en /public o,
// si aún no existe, un marcador de posición estilizado con el nombre del
// archivo esperado. Aplica un lento movimiento tipo Ken Burns.
export const MediaSlot: React.FC<Props> = ({
  src: srcProp,
  kind,
  etiqueta,
  zoom = true,
  oscurecer = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = zoom ? interpolate(frame, [0, durationInFrames], [1, 1.08]) : 1;
  // Si el archivo indicado no está en /public, se usa el marcador.
  const src = siExiste(srcProp);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        {src ? (
          esVideo(src) ? (
            <OffthreadVideo
              src={staticFile(src)}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Img
              src={staticFile(src)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )
        ) : (
          <Placeholder kind={kind} />
        )}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,18,32,${oscurecer * 0.6}) 0%, rgba(11,18,32,0) 35%, rgba(11,18,32,${oscurecer}) 100%)`,
        }}
      />
      {src ? null : (
        <div
          className="absolute left-8 top-8 rounded-md px-4 py-2 text-[22px] font-medium tracking-wide"
          style={{ background: "rgba(0,0,0,0.55)", color: theme.muted, border: `1px solid ${theme.muted}55` }}
        >
          CLIP PENDIENTE · {etiqueta}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Fondo ilustrativo mientras no hay clip: cielo, el Misti y la ciudad.
const Placeholder: React.FC<{ readonly kind: Kind }> = ({ kind }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, -30]);
  const cielo =
    kind === "atardecer"
      ? "linear-gradient(180deg, #1b1f3a 0%, #6b3b5a 45%, #f28c3a 78%, #f7c27a 100%)"
      : "linear-gradient(180deg, #0e1a33 0%, #1f3b6e 55%, #3d6fb3 100%)";
  const presentadora = kind === "presentadora";

  return (
    <AbsoluteFill style={{ background: cielo }}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {kind === "atardecer" ? (
          <circle cx="760" cy="1180" r="140" fill="#ffd28a" opacity="0.9" />
        ) : (
          <circle cx="820" cy="380" r="90" fill="#ffffff" opacity="0.18" />
        )}
        {/* Misti */}
        <g transform={`translate(${drift} 0)`}>
          <path d="M0 1320 L330 900 L440 980 L560 760 L700 960 L800 880 L1080 1300 L1080 1920 L0 1920 Z" fill="#1d2b47" />
          <path d="M470 860 L560 760 L650 890 L600 870 L560 830 L520 875 Z" fill="#e9eef7" opacity="0.85" />
          <path d="M0 1400 L200 1240 L360 1330 L520 1200 L760 1350 L900 1280 L1080 1400 L1080 1920 L0 1920 Z" fill="#141f36" />
        </g>
        {/* Ciudad */}
        <g fill="#0b1220" opacity="0.9">
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={i * 62} y={1500 + ((i * 37) % 110)} width="46" height={420 - ((i * 37) % 110)} />
          ))}
        </g>
        {presentadora ? (
          <g opacity="0.55">
            <ellipse cx="540" cy="1920" rx="360" ry="520" fill="#0b1220" />
            <circle cx="540" cy="1120" r="120" fill="#0b1220" />
          </g>
        ) : null}
        {kind === "render" ? (
          <g opacity="0.9">
            <polygon points="240,1180 540,1040 840,1180 540,1320" fill="#243a66" />
            <polygon points="240,1180 540,1320 540,1560 240,1420" fill="#1b2c4f" />
            <polygon points="840,1180 540,1320 540,1560 840,1420" fill="#2f4c85" />
            <polygon points="240,1180 540,1040 540,1300 240,1440" fill="none" />
            {/* Ventanas sobre la fachada izquierda (pendiente 0.4667) */}
            {Array.from({ length: 4 }).map((_, i) => {
              const x0 = 280 + i * 60;
              const yt = 1230 + (x0 - 240) * 0.4667;
              const dy = 36 * 0.4667;
              return (
                <polygon
                  key={`l${i}`}
                  points={`${x0},${yt} ${x0 + 36},${yt + dy} ${x0 + 36},${yt + dy + 50} ${x0},${yt + 50}`}
                  fill={theme.orange}
                  opacity="0.85"
                />
              );
            })}
            {/* Ventanas sobre la fachada derecha (pendiente -0.4667) */}
            {Array.from({ length: 4 }).map((_, i) => {
              const x0 = 600 + i * 60;
              const yt = 1320 - (x0 - 540) * 0.4667;
              const dy = -36 * 0.4667;
              return (
                <polygon
                  key={`r${i}`}
                  points={`${x0},${yt} ${x0 + 36},${yt + dy} ${x0 + 36},${yt + dy + 50} ${x0},${yt + 50}`}
                  fill={theme.orange}
                  opacity="0.7"
                />
              );
            })}
          </g>
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};
