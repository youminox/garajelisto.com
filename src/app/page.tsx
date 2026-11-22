import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import GarageCircuitSvg from "@/components/home/GarageCircuitSvg";
import GarageOrbit, { type OrbitItem } from "@/components/home/GarageOrbit";
import MetricsCounters, { type MetricItem } from "@/components/home/MetricsCounters";
import EmergencyComparisonSlider from "@/components/home/EmergencyComparisonSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import GarageKitCalculator, {
  type VehicleKitTier,
} from "@/components/home/GarageKitCalculator";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  GARAGE_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "Garaje Listo 2026: Arrancadores de Batería, Infladores Portátiles, Dash Cams 4K y Herramientas en Amazon",
  description:
    "Garaje Listo es una guía en español que ayuda a los conductores a elegir accesorios para su auto. Compara arrancadores de batería, infladores portátiles, cámaras Dash Cam y herramientas según su precio, compatibilidad y facilidad de uso en Amazon Estados Unidos.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "Garaje Listo: Comparativas de Arrancadores 12V, Infladores 150 PSI y Dash Cams 4K en Amazon US",
    description:
      "260 guías técnicas y comparativas de los mejores accesorios para auto en Amazon EE. UU. y España: precio, compatibilidad por motor y facilidad de uso.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Arrancador de batería portátil, inflador digital de neumáticos y cámara Dash Cam 4K en un garaje moderno",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Cuál es el mejor arrancador de batería portátil para comprar en Amazon Estados Unidos?",
    a: "Para la gran mayoría de sedanes, hatchbacks y SUVs con motor de gasolina de hasta 6.0 litros (o diésel de hasta 3.0 litros), el NOCO Boost Plus GB40 (1000A) es el número 1 en ventas y fiabilidad en Amazon US gracias a sus pinzas UltraSafe anti-chispas y protección contra polaridad inversa. Si buscas carga rápida USB-C de 60W sube al NOCO Boost X GBX45 (1250A), y si conduces una camioneta Pickup V8 o un motor diésel grande, elige el NOCO Boost HD GB70 (2000A) o el GOOLOO GP4000 (4000A).",
  },
  {
    q: "¿Qué inflador portátil de neumáticos es más rápido y fácil de usar?",
    a: "El Fanttik X8 Apex (150 PSI inalámbrico) lidera nuestras pruebas para uso diario: infla un neumático de auto de 28 a 33 PSI en solo 56 segundos, muestra en pantalla la presión actual y la objetivo, y se apaga solo con precisión de ±1 PSI. Si buscas una opción económica con cable al encendedor de 12V por menos de $40, el AstroAI Digital 150 PSI es excelente; y para neumáticos grandes de camioneta 4x4 (31” a 33”), el VIAIR 88P con pinzas directas a la batería es imbatible.",
  },
  {
    q: "¿Cómo saber qué presión PSI exacta llevan las llantas de mi auto?",
    a: "Nunca infles tus neumáticos al número 'MAX PRESS' (44 o 51 PSI) grabado en el caucho de la llanta, ya que esa es la presión máxima estructural. La presión oficial recomendada por el fabricante de tu auto (generalmente entre 32 y 36 PSI) se encuentra en la etiqueta adhesiva pegada en el marco de la puerta del conductor (pilar B) y siempre debe medirse con los neumáticos en frío.",
  },
  {
    q: "¿Qué cámara Dash Cam 4K recomiendan para leer matrículas de noche y resistir el calor?",
    a: "Prioriza siempre cámaras que utilicen supercondensador térmico (en lugar de batería de litio que se hincha al sol) y sensores Sony STARVIS 2. Nuestra recomendación #1 en calidad óptica día/noche es la VIOFO A229 Plus 2CH (doble sensor Sony STARVIS 2 frontal y trasero). Si buscas el paquete 4K más vendido con tarjeta MicroSD incluida a gran precio, elige la REDTIGER F7NP; y si trabajas en Uber, Lyft o quieres grabar también el interior del habitáculo con infrarrojos, la VANTRUE N4 Pro de 3 canales es la mejor.",
  },
  {
    q: "¿Qué escáner OBD2 en español sirve para saber por qué se encendió la luz Check Engine?",
    a: "Todos los autos vendidos en Estados Unidos desde 1996 tienen un puerto estándar OBD2 debajo del volante. Si quieres el diagnóstico más completo desde tu iPhone o Android sin pagar suscripciones anuales, el BlueDriver Bluetooth Pro OBD2 lee motor, frenos ABS, Airbag SRS y transmisión, dándote la solución mecánica verificada. Si prefieres un lector económico con cable y pantalla propia en español por menos de $30, el ANCEL AD310 es infalible.",
  },
  {
    q: "¿Cada cuánto tiempo debo recargar el arrancador portátil que llevo en la guantera?",
    a: "Las baterías de litio de alta descarga mantienen su carga durante meses, pero la regla de oro en Garaje Listo es comprobar y recargar tu arrancador al 100% cada 3 a 4 meses (especialmente antes de que empiece el invierno o antes de un viaje largo por carretera) y después de cada vez que lo utilices para arrancar un vehículo.",
  },
  {
    q: "¿Por qué hay que usar tarjetas MicroSD High Endurance en una cámara Dash Cam?",
    a: "Porque una Dash Cam graba y sobrescribe video 4K o 2K en bucle continuo durante cientos de horas bajo temperaturas de hasta 70 °C en el parabrisas. Las tarjetas MicroSD convencionales terminan dando 'Card Error' o congelando la cámara; utiliza siempre tarjetas catalogadas como High Endurance o Max Endurance (Samsung PRO Endurance o SanDisk High/Max Endurance) de 128 GB o 256 GB.",
  },
];

const CLAIMS = [
  "NOCO Boost Plus GB40 (1000A UltraSafe)",
  "Fanttik X8 Apex (150 PSI Auto-Stop)",
  "VIOFO A229 Plus (Doble Sony STARVIS 2)",
  "GOOLOO GP4000 (4000A Gasolina y Diésel)",
  "BlueDriver Bluetooth Pro OBD2",
  "REDTIGER F7NP (4K Frontal + Trasera)",
  "VIAIR 88P Heavy-Duty 12V para SUV & 4x4",
  "Ofertas Verificadas en Amazon EE. UU. y España",
];

const CLAIMS_2 = [
  "NOCO Boost HD GB70 (2000A Pickups)",
  "NOCO Boost X GBX45 (USB-C 60W)",
  "VANTRUE N4 Pro (3 Canales 4K Uber/Lyft)",
  "AstroAI Inflador Digital 12V",
  "NOCO GENIUS5 Cargador & Desulfatador",
  "ANCEL AD310 Escáner OBD2 en Español",
  "Fanttik Slim V8 Apex Aspiradora 19000 Pa",
  "Supercondensador Térmico Anti-Calor",
];

const ICONS: Record<string, string> = {
  trophy: "🏆",
  scale: "⚖️",
  bolt: "⚡",
  battery: "🔋",
  gauge: "🛞",
  camera: "📹",
  cpu: "🔧",
  wrench: "🛠️",
  shield: "🚨",
  sparkles: "✨",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient("home-hero-garaje", "/img/ambiente/home-hero-garaje.webp");

  const orbit: OrbitItem[] = [
    {
      k: "arrancador",
      name: "Arrancador Portátil 12V",
      img: null,
      icon: "⚡",
      role: "1000A a 4000A de litio con pinzas UltraSafe anti-chispas",
      d: "Tu seguro de vida contra baterías muertas en invierno. Modelos como el NOCO Boost Plus GB40 (1000A) o el GOOLOO GP4000 (4000A) arrancan tu motor en 30 segundos sin necesitar otro auto ni esperar a la grúa.",
      href: safeHref("/mejores-accesorios-auto/mejores-arrancadores-de-bateria-portatiles-amazon/"),
    },
    {
      k: "inflador",
      name: "Inflador Digital 150 PSI",
      img: null,
      icon: "🛞",
      role: "Parada automática exacta (±1 PSI) en menos de 60 segundos",
      d: "Mantener los 32–36 PSI recomendados en el marco de tu puerta ahorra gasolina y evita reventones. Con el Fanttik X8 Apex inalámbrico o el VIAIR 88P para camionetas inflas tus neumáticos en casa sin buscar monedas en la gasolinera.",
      href: safeHref("/mejores-accesorios-auto/mejores-infladores-de-neumaticos-portatiles-auto/"),
    },
    {
      k: "dashcam",
      name: "Cámara Dash Cam 4K",
      img: null,
      icon: "📹",
      role: "Sensores Sony STARVIS 2 HDR + Supercondensador térmico",
      d: "Tu testigo imparcial ante accidentes o fraudes de seguro. La VIOFO A229 Plus, la REDTIGER F7NP 4K o la VANTRUE N4 Pro graban matrículas de día y de noche y vigilan tu auto aparcado 24/7.",
      href: safeHref("/mejores-accesorios-auto/mejores-camaras-dash-cam-4k-frontal-y-trasera/"),
    },
    {
      k: "obd2",
      name: "Escáner Diagnóstico OBD2",
      img: null,
      icon: "🔧",
      role: "Lectura y borrado de Check Engine, ABS y Airbag en español",
      d: "Conecta el BlueDriver Bluetooth Pro o el ANCEL AD310 debajo del volante para descubrir en 10 segundos por qué se encendió el Check Engine y cuánto cuesta la pieza real antes de ir al mecánico.",
      href: safeHref("/mejores-accesorios-auto/mejores-escaneres-obd2-en-espanol-check-engine/"),
    },
    {
      k: "mantenedor",
      name: "Cargador Mantenedor 12V",
      img: null,
      icon: "🔋",
      role: "Carga inteligente 5A + Desulfatador por pulsos para AGM y plomo",
      d: "Si trabajas desde casa o tu auto pasa días aparcado, el NOCO GENIUS5 mantiene la batería al 100% sin sobrecargarla y recupera baterías envejecidas mediante pulsos desulfatadores.",
      href: safeHref("/mejores-accesorios-auto/mejores-cargadores-y-mantenedores-de-bateria-12v/"),
    },
    {
      k: "aspiradora",
      name: "Aspiradora Brushless 19kPa",
      img: null,
      icon: "🌪️",
      role: "Succión ciclónica de 19.000 Pa + Soplador de aire comprimido",
      d: "Limpia arena, migas y pelos de mascota de las alfombrillas y rieles de los asientos en 3 minutos con una aspiradora de mano sin escobillas como la Fanttik Slim V8 Apex.",
      href: safeHref("/mejores-accesorios-auto/mejores-aspiradoras-portatiles-para-auto-potentes/"),
    },
    {
      k: "pinchazos",
      name: "Kit Reparación Tubeless",
      img: null,
      icon: "🔩",
      role: "Mechas de caucho vulcanizado y herramientas en T de acero",
      d: "Un clavo o tornillo en la banda de rodadura se sella en 5 minutos sin desmontar la llanta: insertas la mecha tubeless, inflas a 35 PSI con tu compresor portátil y continúas tu viaje.",
      href: safeHref("/mejores-accesorios-auto/mejores-kits-para-reparar-pinchazos-de-neumaticos-tubeless/"),
    },
    {
      k: "herramientas",
      name: "Gato, Torque y Emergencia",
      img: null,
      icon: "🛠️",
      role: "Gato perfil bajo, llave dinamométrica en lb-ft y balizas LED",
      d: "Aprieta las tuercas de tus ruedas al par exacto (80–140 lb-ft), protege el chasis con caballetes de seguridad y señaliza cualquier parada nocturna a 1 km con balizas LED magnéticas.",
      href: safeHref("/mejores-accesorios-auto/mejores-gatos-hidraulicos-y-llaves-para-cambiar-llantas/"),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 1000,
      dec: 0,
      u: "A",
      l: "Corriente base de arranque 12V",
      pct: 96,
      note: "NOCO Boost Plus GB40 (Gas 6.0L / Diésel 3.0L)",
    },
    {
      v: 150,
      dec: 0,
      u: "PSI",
      l: "Presión máxima digital Auto-Stop",
      pct: 98,
      note: "Fanttik X8 Apex y AstroAI (±1 PSI)",
    },
    {
      v: 35,
      dec: 0,
      u: "PSI",
      l: "Presión media recomendada en frío",
      pct: 92,
      note: "Verificar etiqueta en el marco de la puerta",
    },
    {
      v: 12.6,
      dec: 1,
      u: "V",
      l: "Voltaje de batería 12V al 100%",
      pct: 95,
      note: "13.8V–14.4V con motor encendido (alternador)",
    },
    {
      v: 56,
      dec: 0,
      u: "seg",
      l: "Tiempo de recarga 28 → 33 PSI",
      pct: 91,
      note: "Inflado rápido sin cables en tu garaje",
    },
    {
      v: 70,
      dec: 0,
      u: "°C",
      l: "Resistencia térmica supercondensador",
      pct: 94,
      note: "Dash Cams VIOFO, REDTIGER y VANTRUE al sol",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-arrancador-noco", heroImg),
      t: "NOCO Boost Plus GB40 a Fondo",
      d: "Por qué el arrancador de 1000A con pinzas UltraSafe acumula más de 98.000 reseñas positivas en Amazon US.",
      href: safeHref("/resenas-accesorios-auto/noco-boost-plus-gb40-1000a/"),
      alt: "Arrancador de batería portátil NOCO Boost Plus GB40 conectado a una batería de 12V",
    },
    {
      img: ambient("home-inflador-fanttik", heroImg),
      t: "Fanttik X8 Apex Inalámbrico",
      d: "Infla de 28 a 33 PSI en 56 segundos con parada automática digital y sin desenrollar cables.",
      href: safeHref("/resenas-accesorios-auto/fanttik-x8-apex-inflador-portatil/"),
      alt: "Inflador de neumáticos portátil Fanttik X8 Apex mostrando 35 PSI",
    },
    {
      img: ambient("home-dash-cam-4k", heroImg),
      t: "VIOFO A229 Plus vs REDTIGER 4K",
      d: "Cómo el sensor Sony STARVIS 2 y el supercondensador leen matrículas de noche y soportan el sol de verano.",
      href: safeHref("/resenas-accesorios-auto/viofo-a229-plus-dash-cam-starvis-2/"),
      alt: "Cámara Dash Cam 4K instalada detrás del espejo retrovisor del auto",
    },
    {
      img: ambient("home-escaner-obd2", heroImg),
      t: "BlueDriver Pro vs ANCEL AD310",
      d: "Lee y borra códigos Check Engine, ABS y Airbag en español sin pagar $120 de diagnóstico en el taller.",
      href: safeHref("/comparativas/bluedriver-obd2-vs-ancel-ad310/"),
      alt: "Escáner OBD2 Bluetooth diagnosticando un auto desde el teléfono móvil",
    },
    {
      img: ambient("home-pickup-diesel", heroImg),
      t: "Especial Pickups, V8 y Diésel",
      d: "NOCO Boost HD GB70 (2000A), GOOLOO GP4000 (4000A) y el compresor metálico VIAIR 88P para neumáticos grandes.",
      href: safeHref("/mejores-accesorios-auto/mejores-arrancadores-para-pickup-y-motores-diesel/"),
      alt: "Arrancador Heavy-Duty y compresor metálico 12V sobre una camioneta Pickup",
    },
    {
      img: ambient("home-kit-emergencia", heroImg),
      t: "Kit de Emergencia en Maletero",
      d: "Qué llevar siempre en la guantera y el maletero para viajes largos, tormentas de nieve o averías nocturnas.",
      href: safeHref("/mejores-accesorios-auto/mejores-kits-de-emergencia-de-carretera-para-auto/"),
      alt: "Organizador de maletero con arrancador, inflador y balizas LED de emergencia",
    },
    {
      img: ambient("home-aspiradora-auto", heroImg),
      t: "Aspirado 19000 Pa y Detailing",
      d: "Cómo eliminar pelos de mascota, arena y película grasa interior del parabrisas en 10 minutos.",
      href: safeHref("/mejores-accesorios-auto/mejores-aspiradoras-portatiles-para-auto-potentes/"),
      alt: "Aspiradora portátil inalámbrica limpiando el interior de un auto moderno",
    },
  ];

  const calculatorOptions: VehicleKitTier[] = [
    {
      key: "sedan",
      label: "Sedán / Compacto (4 Cil. / Híbrido)",
      ampsRequired: 1000,
      maxEngineLiters: "Gasolina hasta 6.0L / Diésel 3.0L",
      recommendedPsi: "32–35 PSI (Guantera)",
      img: ambient("home-arrancador-noco", heroImg),
      alt: "Arrancador portátil NOCO Boost Plus GB40 de 1000A para sedán y SUV compacto",
      idealFor:
        "Conductores de Toyota Corolla/Camry, Honda Civic/CR-V, Nissan, Mazda o Hyundai que buscan máxima seguridad UltraSafe en tamaño de guantera.",
      reviewHref: safeHref("/resenas-accesorios-auto/noco-boost-plus-gb40-1000a/"),
      productKey: "NOCO_GB40",
    },
    {
      key: "suv",
      label: "SUV Familiar / Crossover V6 (USB-C)",
      ampsRequired: 1250,
      maxEngineLiters: "Gasolina hasta 6.5L / Diésel 4.0L",
      recommendedPsi: "35–36 PSI (Carga USB-C 60W)",
      img: ambient("home-inflador-fanttik", heroImg),
      alt: "Equipamiento NOCO Boost X GBX45 y Fanttik X8 Apex para SUV familiar",
      idealFor:
        "Familias con SUVs de 2 o 3 filas (RAV4, Explorer, Highlander, Pilot, Subaru) que valoran carga ultrarrápida USB-C de 60W y 1250A Extreme.",
      reviewHref: safeHref("/resenas-accesorios-auto/noco-boost-x-gbx45-1250a/"),
      productKey: "NOCO_GBX45",
    },
    {
      key: "pickup",
      label: "Pickup 4x4 / V8 / Motor Diésel",
      ampsRequired: 2000,
      maxEngineLiters: "Gasolina hasta 8.0L–10L / Diésel 6.0L+",
      recommendedPsi: "36–65 PSI (Heavy-Duty 12V)",
      img: ambient("home-pickup-diesel", heroImg),
      alt: "Arrancador Heavy-Duty NOCO Boost HD GB70 de 2000A para camionetas Pickup y diésel",
      idealFor:
        "Propietarios de Ford F-150, Chevy Silverado, RAM 1500/2500, Toyota Tacoma/Tundra o motores diésel que necesitan 2000A–4000A y salida 12V para compresor.",
      reviewHref: safeHref("/resenas-accesorios-auto/noco-boost-hd-gb70-2000a/"),
      productKey: "NOCO_GB70",
    },
  ];

  const POPULAR_PATHS = [
    "/mejores-accesorios-auto/mejores-arrancadores-de-bateria-portatiles-amazon/",
    "/mejores-accesorios-auto/mejores-infladores-de-neumaticos-portatiles-auto/",
    "/mejores-accesorios-auto/mejores-camaras-dash-cam-4k-frontal-y-trasera/",
    "/resenas-accesorios-auto/noco-boost-plus-gb40-1000a/",
    "/resenas-accesorios-auto/fanttik-x8-apex-inflador-portatil/",
    "/comparativas/noco-gb40-vs-gooloo-gp4000/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const homeAmazon = getContextualAmazonProducts(
    "home",
    "mejores-accesorios-auto",
    "Mejores Accesorios para Auto en Amazon Estados Unidos"
  );

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "Garaje Listo: Arrancadores de Batería, Infladores Portátiles, Dash Cams 4K y Herramientas en Amazon",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en sentido opuesto */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/75"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Qué es Garaje Listo? + Mosaico Spotlight (.spot) */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía Automotriz en Español para Amazon EE. UU.
              </span>
              <SplitHeading
                text="Equipa tu auto para cualquier ruta,"
                accent={{
                  text: "sin pagar de más ni equivocarte de modelo",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                <strong className="text-fxink">Garaje Listo</strong> es una guía
                en español que ayuda a los conductores a elegir accesorios para
                su auto. Comparamos{" "}
                <strong className="text-fxink">
                  arrancadores de batería, infladores portátiles, cámaras Dash
                  Cam y herramientas
                </strong>{" "}
                según su precio, compatibilidad real con tu motor y facilidad de
                uso. Cada guía incluye enlaces de afiliado a{" "}
                <strong className="text-fxink">Amazon Estados Unidos</strong>{" "}
                para consultar el precio y comprar el modelo recomendado.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  🚗 Los 4 esenciales que todo conductor debe llevar en el auto
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Arrancador de batería 12V:</strong> el{" "}
                    <strong>NOCO Boost Plus GB40 (1000A)</strong> para motores
                    hasta 6.0L o el <strong>GOOLOO GP4000 (4000A)</strong> para
                    camionetas y diésel.
                  </li>
                  <li>
                    • <strong>Inflador portátil con Auto-Stop:</strong> el{" "}
                    <strong>Fanttik X8 Apex</strong> inalámbrico (infla en 56 s)
                    o el <strong>VIAIR 88P</strong> Heavy-Duty para SUVs y 4x4.
                  </li>
                  <li>
                    • <strong>Cámara Dash Cam con Supercondensador:</strong> la{" "}
                    <strong>VIOFO A229 Plus</strong> (doble Sony STARVIS 2) o la{" "}
                    <strong>REDTIGER F7NP 4K</strong>.
                  </li>
                  <li>
                    • <strong>Diagnóstico OBD2 en español:</strong> el{" "}
                    <strong>BlueDriver Bluetooth Pro</strong> o el{" "}
                    <strong>ANCEL AD310</strong> para leer y borrar Check Engine.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/mejores-accesorios-auto/mejores-arrancadores-de-bateria-portatiles-amazon/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Ranking: Mejores Arrancadores 12V
                </Link>
                <Link
                  href="/mejores-accesorios-auto/mejores-infladores-de-neumaticos-portatiles-auto/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Ver mejores infladores portátiles
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(15,23,42,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("home-kit-emergencia", heroImg)}
                  alt="Maletero de SUV equipado con arrancador portátil, inflador digital de neumáticos y herramientas en un garaje moderno"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">
                  Kit Garaje Listo completo en guantera y maletero
                </span>
              </div>
              {[
                [
                  "⚡",
                  "Arranque UltraSafe",
                  "Pinzas inteligentes a prueba de chispas y polaridad inversa para arrancar a -20 °C sin ayuda.",
                ],
                [
                  "🛞",
                  "Presión PSI Exacta",
                  "Marca 35 PSI en la pantalla LCD y el compresor se detiene automáticamente al terminar.",
                ],
                [
                  "📹",
                  "4K + Sony STARVIS 2",
                  "Lectura nítida de matrículas de noche y supercondensadores que no se hinchan al sol.",
                ],
                [
                  "🔧",
                  "Escáner OBD2 Casa",
                  "Lee códigos P0420, P0300, ABS y Airbag desde tu celular sin pagar cuotas mensuales.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory: Las 4 fases del conductor preparado */}
        <ScrollStory />

        {/* 6. Ingeniería Automotriz 12V, PSI y STARVIS 2 (GarageCircuitSvg) */}
        <section className="relative isolate overflow-hidden bg-[#0b0f17] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Ingeniería Automotriz sin Mitos Comerciales
              </span>
              <SplitHeading
                text="La verdad sobre los amperios pico,"
                accent={{
                  text: "los PSI en frío y los supercondensadores",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                Muchas marcas genéricas anuncian cifras irreales, pero la
                seguridad de tu vehículo depende de tres especificaciones que
                verificamos en{" "}
                <strong className="text-white">GarajeListo.com</strong>:{" "}
                <strong className="text-white">
                  capacidad real en vatios-hora (Wh) y grosor de cobre AWG
                </strong>{" "}
                en las pinzas del arrancador,{" "}
                <strong className="text-white">
                  caudal en litros por minuto (L/min) y ciclo de trabajo
                </strong>{" "}
                del inflador, y{" "}
                <strong className="text-white">
                  supercondensador térmico con sensor Sony STARVIS 2
                </strong>{" "}
                en tu cámara de salpicadero.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["⚡", "Relé Anti-Chispas"],
                  ["🛞", "Auto-Stop ±1 PSI"],
                  ["🌡️", "Supercondensador 70°C"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">
                  ¿Por qué elegir una Dash Cam con supercondensador y no con
                  batería de litio?
                </strong>{" "}
                Porque el parabrisas de un auto aparcado al sol en verano supera
                los 68 °C (155 °F). Modelos como la{" "}
                <em>VIOFO A229 Plus</em>, la <em>REDTIGER F7NP</em> y la{" "}
                <em>VANTRUE N4 Pro</em> usan supercondensadores que nunca se
                hinchan ni pierden tus grabaciones.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/comparativas/dash-cam-supercondensador-vs-bateria-litio/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Supercondensador vs Batería de Litio
                </Link>
                <Link
                  href={safeHref(
                    "/arrancadores-y-bateria-12v/diferencia-entre-amperios-pico-y-cca-arrancador/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Amperios Pico vs CCA Reales
                </Link>
              </div>
            </div>
            <div data-reveal>
              <GarageCircuitSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de los 8 accesorios esenciales del auto */}
        <section className="wrap py-24">
          <GarageOrbit items={orbit} center={heroImg} />
        </section>

        {/* 8. Contadores animados + Tabla comparativa de especificaciones reales */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b0f17] via-[#111827] to-[#1e293b] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.18fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Especificaciones y Compatibilidad Real
              </span>
              <SplitHeading
                text="Los números exactos antes de"
                accent={{ text: "comprar en Amazon", className: "text-gradient" }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Comparamos amperaje de arranque, cilindrada soportada en litros
                (gasolina y diésel), velocidad de inflado en segundos, sensores
                ópticos nocturnos y compatibilidad OBD2 de cada modelo.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/comparativas/noco-gb40-vs-gooloo-gp4000/"
                  className="btn btn-lime shine text-sm"
                  data-magnetic
                >
                  NOCO Boost GB40 vs GOOLOO GP4000
                </Link>
                <Link
                  href="/comparativas/fanttik-x8-apex-vs-xiaomi-air-compressor-2/"
                  className="btn btn-glass text-sm"
                  data-magnetic
                >
                  Fanttik X8 Apex vs Xiaomi Compressor 2
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/95 p-5 sm:p-6 text-fxink shadow-2xl"
              data-reveal
            >
              <span className="inline-block rounded-full bg-fxsky px-3 py-1 text-xs font-extrabold text-fxbluedeep">
                📊 Tabla Comparativa Oficial Amazon US & ES
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold">
                Top 6 Accesorios para Auto Cara a Cara
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-fxsky text-fxink font-display">
                      <th className="p-2.5">Modelo</th>
                      <th className="p-2.5">Categoría</th>
                      <th className="p-2.5">Capacidad</th>
                      <th className="p-2.5">Ventaja Clave</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <td className="p-2.5 font-bold">NOCO Boost GB40</td>
                      <td className="p-2.5">Arrancador 12V</td>
                      <td className="p-2.5 font-bold text-amber-800">1000A (6.0L)</td>
                      <td className="p-2.5">#1 Ventas + UltraSafe IP65</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">GOOLOO GP4000</td>
                      <td className="p-2.5">Arrancador HD</td>
                      <td className="p-2.5 font-bold text-amber-800">4000A (10.0L)</td>
                      <td className="p-2.5">Gas/Diésel + Botón Boost 0V</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Fanttik X8 Apex</td>
                      <td className="p-2.5">Inflador Bat.</td>
                      <td className="p-2.5 font-bold text-amber-800">150 PSI (56 s)</td>
                      <td className="p-2.5">Inalámbrico + LCD Dual ±1 PSI</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">VIAIR 88P</td>
                      <td className="p-2.5">Compresor 4x4</td>
                      <td className="p-2.5 font-bold text-amber-800">1.47 CFM 12V</td>
                      <td className="p-2.5">Pinzas Directas + Ruedas 33”</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">VIOFO A229 Plus</td>
                      <td className="p-2.5">Dash Cam 2CH</td>
                      <td className="p-2.5 font-bold text-amber-800">2K+2K HDR</td>
                      <td className="p-2.5">Doble Sony STARVIS 2 + GPS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">BlueDriver Pro</td>
                      <td className="p-2.5">Escáner OBD2</td>
                      <td className="p-2.5 font-bold text-amber-800">Bluetooth iOS/And</td>
                      <td className="p-2.5">Motor, ABS, Airbag · $0 Cuotas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Nota: todos los modelos listados incluyen enlaces verificados a
                Amazon Estados Unidos (<code>garajelisto-20</code>) y España (
                <code>garajelisto-21</code>).
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparador interactivo Antes ↔ Después (Varado en Carretera vs Equipado con Garaje Listo) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Independencia Total en Carretera
              </span>
              <SplitHeading
                text="No esperes 90 minutos a una grúa,"
                accent={{
                  text: "arranca e infla tú mismo en 2 minutos",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control: compara la frustración de quedarte con la{" "}
              <strong className="text-fxink">batería a 11.4V o una llanta a 24 PSI</strong>{" "}
              frente a llevar tu kit <strong className="text-fxink">Garaje Listo</strong>{" "}
              con arranque autónomo UltraSafe, inflado automático a 35 PSI y
              cámara 4K STARVIS 2.
            </p>
          </div>
          <div data-reveal>
            <EmergencyComparisonSlider />
          </div>
        </section>

        {/* 10. MomentsCarousel 4:5 */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Guías técnicas paso a paso
              </span>
              <SplitHeading
                text="Domina cada accesorio de tu"
                accent={{
                  text: "auto y garaje en casa",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Configurador de Kit por Tipo de Vehículo + Recomendador Amazon */}
        <section id="calculadora" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Simulador de Compatibilidad por Motor
              </span>
              <SplitHeading
                text="Tu kit se amortiza por completo"
                accent={{
                  text: "en la primera emergencia que evitas",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)] text-sm" data-reveal>
              {[
                "Elige entre Sedán 4 Cilindros, SUV Familiar V6 o Pickup V8 / Diésel",
                "Calcula los amperios mínimos según los litros de tu motor",
                "Enlaces directos a Amazon.com (EE. UU.) y Amazon.es (España)",
                "Asesor Mecánico IA en línea (modelo mini rápido) para dudas específicas",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/25 text-sm text-[#9a3412]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <GarageKitCalculator options={calculatorOptions} />
          </div>

          {/* Vitrina Amazon Showcase en la Home */}
          <div className="mt-12" data-reveal>
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={homeAmazon.sectionTitle}
              sectionSubtitle={homeAmazon.sectionSubtitle}
              products={homeAmazon.products}
              source="home"
            />
          </div>
        </section>

        {/* 12. Bento Grid de los 10 Silos + Las 6 Guías Más Consultadas */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Arquitectura de 10 Silos Temáticos · 260 Artículos
              </span>
              <SplitHeading
                text="Explora nuestras 260 guías"
                accent={{
                  text: "sin canibalización y 100% prácticas",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 2;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 sm:p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#0b0f17] via-[#1e293b] to-[#ea580c] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "🚗"}
                      </span>
                      <div className="flex items-center gap-2">
                        {c.isTransactional && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              big
                                ? "bg-amber-400 text-slate-950"
                                : "bg-amber-100 text-amber-900"
                            }`}
                          >
                            🛒 Transaccional Amazon
                          </span>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 text-sm font-semibold ${
                        big ? "text-fxlime" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo completo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 reseñas y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Criterio Editorial E-E-A-T de CARLOS LINGAN BORJA */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Rigor Técnico & Transparencia
              </span>
              <SplitHeading
                text="Análisis automotriz verificado,"
                accent={{
                  text: "pensado para compradores en Amazon",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Dirigido por <strong className="text-fxink">{LEGAL_OWNER}</strong>{" "}
                ({LEGAL_LOCATION} ·{" "}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-fxblue underline"
                >
                  {LEGAL_EMAIL}
                </a>
                ), en GarajeListo.com contrastamos capacidad de batería en Wh y
                amperios reales, caudal de inflado en PSI y L/min, sensores
                ópticos Sony STARVIS 2, supercondensadores y protocolos OBD2
                para que elijas con total seguridad en Amazon Estados Unidos.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra metodología técnica
                </Link>
                <Link
                  href="/sobre-nosotros/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Sobre Carlos Lingan Borja
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-fxlime/25 px-3 py-1 text-xs font-bold text-[#9a3412]">
                  ✓ Lo que verificamos en cada accesorio
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Compatibilidad por cilindrada (gasolina y diésel)</li>
                  <li>• Protecciones anti-chispas y polaridad inversa 12V</li>
                  <li>• Precisión digital de manómetros PSI y Auto-Stop</li>
                  <li>• Resistencia al calor con supercondensador (70 °C)</li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  🛒 Transparencia Amazon Associates
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Enlaces directos a Amazon.com (garajelisto-20)</li>
                  <li>• Soporte dual para Amazon.es (garajelisto-21)</li>
                  <li>• Recomendaciones segmentadas por precio y vehículo</li>
                  <li>• Nota legal: {GARAGE_DISCLAIMER}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Todo lo que debes saber antes de equipar tu auto"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Dudas entre el NOCO Boost GB40, el GOOLOO GP4000, el Fanttik X8
                Apex o la VIOFO A229 Plus? Nuestro Asesor Mecánico IA te
                responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor Mecánico IA"
                  className="btn btn-buy"
                />
                <Link href="/comparativas/" className="btn btn-ghost">
                  Ver todas las comparativas
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Aurora Final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0b0f17] via-[#1e293b] to-[#ea580c] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={heroImg}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Deja hoy tu auto y tu garaje 100% listos"
                  accent={{
                    text: "para cualquier emergencia o viaje en carretera",
                    className: "text-fxlime",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Consulta nuestros rankings actualizados con precios, ofertas y
                  envío rápido en Amazon Estados Unidos (
                  <code>garajelisto-20</code>) y Amazon España (
                  <code>garajelisto-21</code>).
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/mejores-accesorios-auto/mejores-arrancadores-de-bateria-portatiles-amazon/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    🏆 Ver Mejores Arrancadores en Amazon
                  </Link>
                  <OpenChatButton
                    label="Pedir recomendación al Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[340px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <div className="float-y relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
                  <Image
                    src={heroImg}
                    alt="Kit de accesorios para auto Garaje Listo recomendado en Amazon"
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
