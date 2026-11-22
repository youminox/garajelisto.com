import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenChatButton from "@/components/OpenChatButton";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap py-32 text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          Esta guía no se encuentra en nuestro garaje
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
          Explora nuestras 260 comparativas de arrancadores de batería,
          infladores portátiles, cámaras Dash Cam y escáneres OBD2 o pregúntale
          directamente a nuestro Asesor Mecánico IA.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-buy shine">
            Ir al inicio de GarajeListo.com
          </Link>
          <OpenChatButton
            label="Preguntar al Asesor Mecánico IA"
            className="btn btn-ghost"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
