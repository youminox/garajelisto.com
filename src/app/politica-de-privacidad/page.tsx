import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad y Protección de Datos | Garaje Listo",
  description: `Política de privacidad de GarajeListo.com. Responsable del tratamiento: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Política de privacidad"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro="Transparencia total sobre cómo protegemos tu privacidad al navegar y consultar nuestro Asesor Mecánico IA en GarajeListo.com."
    >
      <h2>1. Responsable del tratamiento de los datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Qué datos recopilamos y con qué finalidad</h2>
      <p>
        En <strong>GarajeListo.com</strong> no exigimos registro de usuario ni
        solicitud de tarjetas bancarias. Únicamente tratamos los siguientes
        datos técnicos mínimos:
      </p>
      <ol>
        <li>
          <strong>Consultas al Asesor Mecánico IA (Chat Online):</strong> cuando
          utilizas nuestro chat interactivo, se almacena un identificador
          anónimo de sesión, la página desde la que consultas y los mensajes
          enviados con la finalidad exclusiva de responder tus dudas sobre
          arrancadores, infladores, cámaras Dash Cam o herramientas y mejorar la
          calidad de las recomendaciones.
        </li>
        <li>
          <strong>Preferencia de tienda Amazon (US / ES):</strong> guardamos en
          el almacenamiento local de tu navegador (<code>localStorage</code>) si
          prefieres consultar precios en Amazon Estados Unidos (
          <code>Amazon.com</code>) o Amazon España (<code>Amazon.es</code>).
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si nos
          escribes directamente a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, utilizaremos tu
          dirección de correo únicamente para responder a tu consulta.
        </li>
      </ol>

      <h2>3. Base jurídica y conservación</h2>
      <p>
        La base legal para el tratamiento es el consentimiento del usuario al
        iniciar una consulta en el chat o enviarnos un correo electrónico, así
        como el interés legítimo de mantener la seguridad técnica del portal.
        Los registros anónimos del chat se conservan únicamente durante el
        tiempo necesario para control de calidad editorial.
      </p>

      <h2>4. Destinatarios y enlaces externos a Amazon</h2>
      <p>
        No vendemos ni cedemos datos personales a terceros. Al hacer clic en un
        enlace de afiliado hacia <code>Amazon.com</code> o{" "}
        <code>Amazon.es</code>, abandonas GarajeListo.com y pasas a regirte por
        la política de privacidad oficial de Amazon.
      </p>

      <h2>5. Derechos del usuario</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso,
        rectificación, supresión, oposición y limitación del tratamiento
        escribiendo a <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION}) al
        correo electrónico <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
