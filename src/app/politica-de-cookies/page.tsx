import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Cookies | Garaje Listo",
  description: `Política de cookies y almacenamiento local de GarajeListo.com. Titular: ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Política de cookies"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro="Información clara sobre el uso de almacenamiento local técnico y cookies de atribución de afiliados de Amazon."
    >
      <h2>1. Titular responsable</h2>
      <p>
        El presente sitio web <strong>garajelisto.com</strong> es operado por{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>, con correo electrónico de contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. ¿Qué tecnologías de almacenamiento utilizamos?</h2>
      <p>
        GarajeListo.com está diseñado para ser ultrarrápido y respetuoso con tu
        privacidad. No instalamos cookies publicitarias invasivas de redes de
        terceros. Utilizamos únicamente almacenamiento local técnico (
        <code>localStorage</code> y <code>sessionStorage</code>) en tu navegador
        para:
      </p>
      <ul>
        <li>
          <strong>
            <code>gl_amazon_region</code>:
          </strong>{" "}
          recuerda si seleccionaste ver las ofertas en Amazon Estados Unidos (
          <code>US</code>) o en Amazon España (<code>ES</code>).
        </li>
        <li>
          <strong>
            <code>gl_chat_session</code> y <code>gl_chat_messages</code>:
          </strong>{" "}
          mantiene el historial de tu conversación con el Asesor Mecánico IA
          mientras navegas entre distintas guías del sitio.
        </li>
        <li>
          <strong>
            <code>gl_visitor</code>:
          </strong>{" "}
          identificador técnico aleatorio sin datos personales para evitar spam
          en el chat online.
        </li>
      </ul>

      <h2>3. Cookies de Amazon al pulsar enlaces de afiliado</h2>
      <p>
        Cuando haces clic voluntariamente en cualquiera de nuestros botones o
        tarjetas de producto hacia <strong>Amazon.com</strong> o{" "}
        <strong>Amazon.es</strong>, Amazon instala en su propio dominio una
        cookie temporal de atribución de afiliado (con una duración estándar de
        24 horas) para reconocer que la visita procedió de nuestro identificador
        (<code>garajelisto-20</code> o <code>garajelisto-21</code>), sin ningún
        costo extra para ti.
      </p>

      <h2>4. Cómo borrar o desactivar las cookies</h2>
      <p>
        Puedes borrar el almacenamiento local o bloquear cookies en cualquier
        momento desde la configuración de privacidad de Chrome, Safari, Firefox
        o Edge, o pulsando el botón <em>Reiniciar</em> dentro de la ventana de
        nuestro Asesor Mecánico IA. Para cualquier duda adicional, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
