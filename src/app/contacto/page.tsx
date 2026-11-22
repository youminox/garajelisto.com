import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto | Garaje Listo",
  description: `Contacta con ${LEGAL_OWNER} (${LEGAL_LOCATION}), titular de GarajeListo.com, en ${LEGAL_EMAIL} o consulta en vivo a nuestro Asesor Mecánico IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function Page() {
  return (
    <SimplePage
      title="Contacto oficial"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes una consulta técnica sobre un accesorio para tu auto, una sugerencia editorial o una propuesta comercial? Estamos a tu disposición."
    >
      <h2>Datos de contacto directo</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Ubicación / Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>¿Necesitas una recomendación inmediata para tu vehículo?</h2>
      <p>
        Si quieres saber ahora mismo qué arrancador de batería soporta los
        litros de tu motor, qué inflador portátil comprar en Amazon o cómo
        interpretar un código OBD2, nuestro <strong>Asesor Mecánico IA</strong>{" "}
        te responde en segundos las 24 horas del día:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor Mecánico IA Ahora"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
