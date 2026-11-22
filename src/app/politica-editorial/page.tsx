import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política Editorial y Metodología de Pruebas | Garaje Listo",
  description: `Cómo analizamos y comparamos arrancadores de batería, infladores portátiles, cámaras Dash Cam y escáneres OBD2 en GarajeListo.com bajo la dirección de ${LEGAL_OWNER}.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Política editorial y metodología técnica"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Criterios de ingeniería eléctrica, neumática y óptica con los que evaluamos cada accesorio para auto en GarajeListo.com."
    >
      <h2>1. Dirección editorial</h2>
      <p>
        Toda la arquitectura de contenidos y las 260 guías especializadas de{" "}
        <strong>GarajeListo.com</strong> están dirigidas y supervisadas por{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> (<a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>).
      </p>

      <h2>2. Cómo evaluamos cada categoría de accesorios</h2>
      <p>
        Nuestro objetivo es evitar que un conductor compre un accesorio
        incompatible con la cilindrada de su motor o que falle justo en el
        momento de una emergencia en carretera. Por eso auditamos 4 pilares
        técnicos:
      </p>
      <ul>
        <li>
          <strong>Arrancadores de batería 12V:</strong> no nos quedamos con los
          «amperios pico» publicitarios; contrastamos la energía real del
          paquete de litio en vatios-hora (Wh), el calibre AWG de los cables de
          cobre, la protección anti-chispas y la capacidad real en litros para
          motores gasolina y diésel.
        </li>
        <li>
          <strong>Infladores de neumáticos portátiles:</strong> verificamos el
          tiempo real para subir un neumático estándar de 28 a 35 PSI, la
          exactitud del manómetro digital (±1 PSI), el ciclo de trabajo continuo
          y si requiere toma de encendedor 12V (máx. 15A) o pinzas directas a la
          batería.
        </li>
        <li>
          <strong>Cámaras Dash Cam 4K:</strong> priorizamos modelos con sensores
          Sony STARVIS 2 (IMX678 / IMX675) capaces de leer matrículas de noche
          con HDR y exigimos el uso de supercondensadores para soportar hasta
          70 °C en el parabrisas.
        </li>
        <li>
          <strong>Escáneres OBD2 y herramientas:</strong> comprobamos que el
          menú y las definiciones de códigos DTC estén disponibles en español y
          sin cuotas de suscripción obligatorias.
        </li>
      </ul>

      <h2>3. Arquitectura sin canibalización y actualización continua</h2>
      <p>
        Cada una de nuestras 260 guías responde a una única intención de
        búsqueda con tablas de referencia rápida, pasos numerados y preguntas
        frecuentes verificadas con los estándares de la NHTSA y SAE
        International.
      </p>
    </SimplePage>
  );
}
