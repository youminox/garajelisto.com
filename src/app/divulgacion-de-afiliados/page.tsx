import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon | Garaje Listo",
  description: `Declaración de transparencia y divulgación de enlaces de afiliado de Amazon Estados Unidos (${AMAZON_TAG_US}) y España (${AMAZON_TAG_ES}) en GarajeListo.com.`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Divulgación de afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Cómo financiamos nuestras 260 guías técnicas gratuitas mediante el Programa de Afiliados de Amazon sin ningún costo adicional para ti."
    >
      <h2>1. Declaración oficial de afiliación</h2>
      <p>
        <strong>GarajeListo.com</strong>, portal titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> · correo electrónico:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el
        Programa de Afiliados de Amazon:
      </p>
      <ul>
        <li>
          <strong>Amazon Estados Unidos (Amazon.com Associates):</strong> ID de
          rastreo oficial <code>{AMAZON_TAG_US}</code>.
        </li>
        <li>
          <strong>Amazon España (Amazon.es Afiliados):</strong> ID de
          seguimiento oficial <code>{AMAZON_TAG_ES}</code>.
        </li>
      </ul>
      <p>
        En calidad de Afiliado de Amazon, obtenemos ingresos por las compras
        adscritas que cumplen los requisitos aplicables.
      </p>

      <h2>2. ¿El precio cambia para el comprador?</h2>
      <p>
        <strong>No, jamás.</strong> El precio que pagas en Amazon es exactamente
        el mismo —incluyendo todas las ofertas Prime, cupones y descuentos del
        día— tanto si accedes desde un enlace de GarajeListo.com como si entras
        directamente a Amazon. La pequeña comisión de afiliado la abona Amazon
        de su propio margen comercial para remunerar nuestro trabajo de
        investigación y análisis.
      </p>

      <h2>3. Independencia editorial garantizada</h2>
      <p>
        Ninguna marca de accesorios automotrices (NOCO, GOOLOO, Fanttik, VIAIR,
        AstroAI, VIOFO, REDTIGER, VANTRUE, Garmin, BlueDriver o ANCEL) paga por
        aparecer en primer lugar en nuestros rankings. Seleccionamos cada modelo
        evaluando criterios objetivos:
      </p>
      <ol>
        <li>
          Capacidad real en vatios-hora (Wh) y amperaje de arranque verificado
          según la cilindrada del motor.
        </li>
        <li>
          Velocidad de inflado en PSI/LPM y precisión del apagado automático.
        </li>
        <li>
          Calidad óptica nocturna (sensores Sony STARVIS 2) y seguridad térmica
          mediante supercondensadores.
        </li>
        <li>
          Índice de satisfacción verificada de miles de conductores reales en
          Amazon Estados Unidos.
        </li>
      </ol>

      <h2>4. Contacto</h2>
      <p>
        Si tienes cualquier pregunta sobre nuestra política de afiliación,
        puedes escribir directamente a <strong>{LEGAL_OWNER}</strong> al correo{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
