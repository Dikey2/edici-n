import { Chip } from "./Chip";
import type { PropiedadProps } from "../schema";

type Props = { readonly indice: number; readonly props: PropiedadProps };

// Palabras clave animadas en la franja superior, una composición por escena.
export const Callouts: React.FC<Props> = ({ indice, props }) => {
  const fila: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" };
  const filaCentro: React.CSSProperties = { ...fila, alignItems: "center" };
  switch (indice) {
    case 0:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="naranja" size={64}>
            Propiedad en venta
          </Chip>
          <Chip delay={12} fondo="blanco" size={40}>
            Cerro Colorado · Arequipa
          </Chip>
          <Chip delay={20} fondo="ninguno" size={34}>
            Ubicación estratégica
          </Chip>
        </div>
      );
    case 1:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="blanco" size={92}>
            {props.areaTerreno}
          </Chip>
          <Chip delay={12} fondo="naranja" size={56}>
            En esquina
          </Chip>
          <Chip delay={22} fondo="ninguno" size={30}>
            Frente a la {props.via}
          </Chip>
        </div>
      );
    case 2:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="navy" size={54}>
            Construcción existente
          </Chip>
          <Chip delay={12} fondo="naranja" size={54}>
            {props.areaTechada} techados
          </Chip>
        </div>
      );
    case 3:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="naranja" size={52}>
            Servicios disponibles
          </Chip>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 940 }}>
            {["Agua", "Luz", "Desagüe", "Pistas asfaltadas", "Veredas", "Telefonía"].map((s, i) => (
              <Chip key={s} delay={14 + i * 5} fondo="blanco" size={30}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="ninguno" size={44}>
            Zonificación
          </Chip>
          <Chip delay={12} fondo="naranja" size={58}>
            Comercio especializado
          </Chip>
        </div>
      );
    case 5:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="navy" size={54}>
            Documentación registral
          </Chip>
          <Chip delay={14} fondo="blanco" size={36}>
            ✓ Cuenta con documentación registral
          </Chip>
        </div>
      );
    case 6:
      return (
        <div style={fila}>
          <Chip delay={4} fondo="ninguno" size={40}>
            ¿Empresario o inversionista?
          </Chip>
          <Chip delay={14} fondo="naranja" size={56}>
            Tu próximo proyecto
          </Chip>
        </div>
      );
    default:
      return (
        <div style={filaCentro}>
          <Chip delay={4} fondo="ninguno" size={44}>
            ¿Tienes un proyecto en mente?
          </Chip>
          <Chip delay={14} fondo="naranja" size={66} pulso>
            Escríbeme · {props.whatsapp}
          </Chip>
          <Chip delay={24} fondo="blanco" size={32}>
            {props.asesora}
          </Chip>
        </div>
      );
  }
};
