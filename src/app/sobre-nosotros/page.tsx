import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Sobre Nosotros y ${LEGAL_OWNER} | Garaje Listo`,
  description: `Conoce la misión de GarajeListo.com y a su fundador ${LEGAL_OWNER} (${LEGAL_LOCATION} · ${LEGAL_EMAIL}), guía en español de accesorios para auto en Amazon.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Sobre Garaje Listo y Carlos Lingan Borja"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="La guía en español creada para que cualquier conductor elija el accesorio exacto para su auto en Amazon Estados Unidos y España."
    >
      <h2>Nuestra misión</h2>
      <p>
        <strong>Garaje Listo</strong> (<code>garajelisto.com</code>) nació con
        una misión clara: traducir las especificaciones eléctricas y mecánicas
        complejas (amperios CCA, vatios-hora, caudal CFM, sensores Sony STARVIS
        2 y códigos OBD2) a un lenguaje claro en español para que cualquier
        conductor pueda equipar su vehículo con seguridad, ahorrando cientos de
        dólares en grúas y visitas innecesarias al taller.
      </p>

      <h2>Fundador y titular del proyecto</h2>
      <ul>
        <li>
          <strong>Fundador & Editor Jefe:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico directo:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>Qué encontrarás en GarajeListo.com</h2>
      <ol>
        <li>
          <strong>200 Guías SEO Técnicas y de Mantenimiento:</strong> cómo usar
          un arrancador en baterías a 0V, qué presión PSI poner en invierno,
          cómo ocultar el cable de tu Dash Cam detrás del airbag del pilar A y
          qué significan los códigos Check Engine más frecuentes.
        </li>
        <li>
          <strong>50 Análisis Transaccionales y Comparativas VS:</strong>{" "}
          reseñas individuales, duelos modelo contra modelo y rankings de compra
          con enlaces directos a Amazon Estados Unidos (
          <code>garajelisto-20</code>) y Amazon España (
          <code>garajelisto-21</code>).
        </li>
        <li>
          <strong>Asesor Mecánico IA 24/7:</strong> un asistente inteligente en
          tiempo real configurado con el modelo rápido mini para recomendarte el
          equipo compatible con la marca, motor y neumáticos de tu auto.
        </li>
      </ol>
    </SimplePage>
  );
}
