import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  GARAGE_DISCLAIMER,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Aviso Legal y Condiciones de Uso | Garaje Listo",
  description: `Aviso legal, titularidad e información corporativa de GarajeListo.com. Titular: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Aviso legal y condiciones de uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro={`Información legal y titularidad de GarajeListo.com conforme a la normativa aplicable de comercio electrónico y protección al consumidor.`}
    >
      <h2>1. Datos identificativos del titular de la web</h2>
      <p>
        En cumplimiento del deber de información y transparencia aplicable a los
        servicios de la sociedad de la información, se hace constar que el
        presente portal web <strong>garajelisto.com</strong> (en adelante,{" "}
        <strong>Garaje Listo</strong>) es titularidad de:
      </p>
      <ul>
        <li>
          <strong>Titular y responsable legal:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de contacto oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Dominio web principal:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Objeto y naturaleza del sitio web</h2>
      <p>
        <strong>Garaje Listo</strong> es una guía técnica e informativa en
        español que ayuda a los conductores a elegir accesorios para su auto,
        comparando arrancadores de batería portátiles, infladores de neumáticos,
        cámaras de salpicadero (Dash Cam), escáneres de diagnóstico OBD2 y
        herramientas de garaje según su precio, compatibilidad y facilidad de
        uso.
      </p>
      <p>
        En este sitio web {GARAGE_DISCLAIMER}. GarajeListo.com no vende
        productos directamente ni procesa pagos; todas las transacciones se
        realizan en las plataformas oficiales de Amazon.
      </p>

      <h2>3. Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{LEGAL_OWNER}</strong> participa en el Programa de Afiliados de
        Amazon Services LLC Associates Program (Amazon Estados Unidos, con ID de
        rastreo <code>{AMAZON_TAG_US}</code>) y en el Programa de Afiliados de
        Amazon EU (Amazon España, con ID de seguimiento{" "}
        <code>{AMAZON_TAG_ES}</code>), programas de publicidad para afiliados
        diseñados para ofrecer a sitios web un modo de obtener comisiones por
        publicidad mediante enlaces a <code>Amazon.com</code> y{" "}
        <code>Amazon.es</code>.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los textos, comparativas técnicas, tablas de compatibilidad por
        cilindrada, gráficos interactivos, diseño visual y código fuente de{" "}
        <strong>garajelisto.com</strong> son propiedad intelectual de{" "}
        <strong>{LEGAL_OWNER}</strong> o cuentan con las licencias
        correspondientes. Queda prohibida su reproducción total o parcial sin
        autorización expresa por escrito enviada desde{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>5. Limitación de responsabilidad mecánica y eléctrica</h2>
      <p>
        La información publicada en GarajeListo.com tiene carácter divulgativo y
        orientativo. El usuario debe verificar siempre las especificaciones de
        voltaje (12V), presión de neumáticos en frío (etiqueta del pilar B de la
        puerta), par de apriete (lb-ft / Nm) y normas de seguridad del manual de
        propietario de su vehículo antes de realizar cualquier operación de
        mantenimiento o instalación.
      </p>
    </SimplePage>
  );
}
