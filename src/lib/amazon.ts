export const AMAZON_TAG_US = "garajelisto-20";
export const AMAZON_TAG_ES = "garajelisto-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "jump-starter"
  | "tire-inflator"
  | "dash-cam"
  | "obd2-scanner"
  | "battery-charger"
  | "garage-tool";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  rating: string;
  reviewsCount: string;
  categoryType: AmazonCategoryType;
  specs?: {
    power: string;
    compatibility: string;
    protection: string;
    portability: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=garajelisto-20
 * - España / Europa (ES): amazon.es con tag=garajelisto-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("gl_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  NOCO_GB40: {
    id: "noco-boost-plus-gb40",
    badge: "🏆 #1 Más Vendido Amazon US · 1000A UltraSafe",
    title: "NOCO Boost Plus GB40 — Arrancador de Batería de Litio Portátil 1000A 12V (Gasolina 6.0L / Diésel 3.0L)",
    subtitle:
      "El arrancador de batería portátil más vendido y fiable en Amazon Estados Unidos: 1000 amperios pico, pinzas UltraSafe a prueba de chispas y polaridad inversa, carcasa IP65 y linterna LED de 100 lúmenes.",
    features: [
      "Arranca motores de gasolina de hasta 6.0 litros y motores diésel de hasta 3.0 litros (hasta 20 arranques con una sola carga)",
      "Tecnología patentada UltraSafe: cero chispas al conectar y bloqueo automático si inviertes los bornes por error",
      "Funciona como Powerbank USB para tu celular y linterna LED de emergencia con 7 modos (incluyendo SOS y estroboscópico)",
    ],
    rating: "4.7",
    reviewsCount: "98.500+",
    categoryType: "jump-starter",
    specs: {
      power: "1000A Pico (24 Wh)",
      compatibility: "Gas 6.0L / Diésel 3.0L",
      protection: "UltraSafe IP65",
      portability: "1.1 kg (Guantera)",
    },
    queryUS: "NOCO Boost Plus GB40 1000A UltraSafe Car Battery Jump Starter",
    queryES: "NOCO Boost Plus GB40 Arrancador de Bateria 1000A 12V",
    ctaLabel: "Ver Precio y Oferta de NOCO Boost GB40 en Amazon",
  },
  NOCO_GB70: {
    id: "noco-boost-hd-gb70",
    badge: "🛻 Mejor para Pickups, SUVs V8 y Diésel · 2000A",
    title: "NOCO Boost HD GB70 — Arrancador de Batería Heavy-Duty 2000A 12V (Gasolina 8.0L / Diésel 6.0L)",
    subtitle:
      "Potencia industrial de 2000 amperios para camionetas Pickup (Ford F-150, Chevy Silverado, RAM), SUVs grandes y motores diésel de hasta 6.0 litros.",
    features: [
      "2000A de corriente pico con cables de cobre de alto calibre y pinzas HD reforzadas para bornes grandes",
      "Incluye puerto de salida de 12V (15A) para alimentar compresores e infladores de neumáticos pesados",
      "Linterna de trabajo de 400 lúmenes, protección UltraSafe y hasta 40 arranques por carga",
    ],
    rating: "4.8",
    reviewsCount: "29.400+",
    categoryType: "jump-starter",
    specs: {
      power: "2000A Pico (56 Wh)",
      compatibility: "Gas 8.0L / Diésel 6.0L",
      protection: "UltraSafe + Salida 12V",
      portability: "2.2 kg Heavy-Duty",
    },
    queryUS: "NOCO Boost HD GB70 2000A UltraSafe Car Battery Jump Starter",
    queryES: "NOCO Boost HD GB70 Arrancador Bateria 2000A 12V",
    ctaLabel: "Ver NOCO Boost HD GB70 (2000A) en Amazon",
  },
  NOCO_GBX45: {
    id: "noco-boost-x-gbx45",
    badge: "⚡ Nueva Generación USB-C 60W · 1250A Extreme",
    title: "NOCO Boost X GBX45 — Arrancador de Batería 1250A con Carga Rápida USB-C Power Delivery 60W",
    subtitle:
      "Serie Extreme de NOCO con un 25% más de potencia de arranque y puerto bidireccional USB-C de 60W: con solo 5 minutos de carga ya tienes energía para arrancar tu auto.",
    features: [
      "1250 amperios para motores de gasolina de hasta 6.5 litros y diésel de hasta 4.0 litros",
      "Entrada y salida USB-C Power Delivery de 60W: recarga completa en 48 minutos y carga laptops o tablets",
      "Tecnología UltraSafe 2.0 con gestión térmica mejorada y temporizador automático de 60 segundos",
    ],
    rating: "4.6",
    reviewsCount: "11.200+",
    categoryType: "jump-starter",
    specs: {
      power: "1250A Extreme (31 Wh)",
      compatibility: "Gas 6.5L / Diésel 4.0L",
      protection: "UltraSafe 2.0 + USB-C 60W",
      portability: "0.98 kg Compacto",
    },
    queryUS: "NOCO Boost X GBX45 1250A USB-C UltraSafe Jump Starter",
    queryES: "NOCO Boost X GBX45 1250A Arrancador Bateria USB-C",
    ctaLabel: "Ver NOCO Boost X GBX45 (USB-C) en Amazon",
  },
  GOOLOO_GP4000: {
    id: "gooloo-gp4000",
    badge: "💰 Mejor Calidad-Precio 4000A · Todo Motor Gas/Diésel",
    title: "GOOLOO GP4000 — Arrancador de Batería Portátil SuperSafe 4000A (Todos los Gasolina y Diésel hasta 10.0L)",
    subtitle:
      "La mejor relación amperios-precio en Amazon Estados Unidos: 4000A pico y batería de 99.2 Wh (26800 mAh) capaz de arrancar desde un sedán hasta un motor diésel de 10.0 litros.",
    features: [
      "4000 amperios pico con botón BOOST dedicado para despertar baterías muertas a 0 voltios en invierno",
      "Batería de 99.2 Wh (apta para cabina de avión <100 Wh) con puerto USB-C 15W, doble USB Quick Charge y salida 15V/10A",
      "10 protecciones integradas SuperSafe contra chispas, cortocircuito, sobrecorriente y polaridad inversa",
    ],
    rating: "4.6",
    reviewsCount: "16.800+",
    categoryType: "jump-starter",
    specs: {
      power: "4000A Pico (99.2 Wh)",
      compatibility: "Todo Gas / Diésel 10.0L",
      protection: "SuperSafe 10-en-1 + Boost",
      portability: "1.08 kg + Estuche EVA",
    },
    queryUS: "GOOLOO GP4000 Jump Starter 4000A Peak Car Battery Starter",
    queryES: "GOOLOO GP4000 Arrancador de Coches 4000A 12V",
    ctaLabel: "Ver GOOLOO GP4000 (4000A) en Amazon",
  },
  AVAPOW_A68_6000A: {
    id: "avapow-a68-6000a",
    badge: "🔋 Máxima Capacidad 6000A · Pantalla Digital 0-100%",
    title: "AVAPOW A68 6000A — Arrancador de Batería Portátil de Alta Capacidad (118.4 Wh) con Pantalla LCD",
    subtitle:
      "Potencia extrema de 6000A pico con pantalla digital que muestra el porcentaje exacto de carga para no llevarte sorpresas en carretera.",
    features: [
      "Arranca motores de gasolina de cualquier cilindrada y motores diésel de hasta 12.0 litros hasta 60 veces por carga",
      "Pantalla LCD clara con porcentaje exacto de batería y estado de salida de los puertos USB QC 3.0",
      "Incluye estuche rígido resistente al agua, pinzas inteligentes con indicador sonoro y linterna LED de 3 modos",
    ],
    rating: "4.6",
    reviewsCount: "12.500+",
    categoryType: "jump-starter",
    specs: {
      power: "6000A Pico (118.4 Wh)",
      compatibility: "Todo Gas / Diésel 12.0L",
      protection: "8 Protecciones + LCD %",
      portability: "1.25 kg + Maletín",
    },
    queryUS: "AVAPOW 6000A Car Battery Jump Starter A68",
    queryES: "AVAPOW 6000A Arrancador de Bateria Coche Portatil",
    ctaLabel: "Ver AVAPOW A68 (6000A) en Amazon",
  },
  FANTTIK_X8_APEX: {
    id: "fanttik-x8-apex",
    badge: "🛞 #1 Inflador Portátil Inalámbrico · 150 PSI Auto-Stop",
    title: "Fanttik X8 Apex Tire Inflator — Compresor de Aire Portátil Inalámbrico 150 PSI con Pantalla LCD Dual",
    subtitle:
      "El inflador inalámbrico favorito de los conductores en Amazon US: infla un neumático de 28 a 33 PSI en solo 56 segundos y se apaga automáticamente al alcanzar la presión marcada.",
    features: [
      "Pantalla digital dual de alto brillo que muestra a la vez la presión real del neumático y el PSI objetivo con precisión de ±1 PSI",
      "Batería interna de alta descarga que infla 4 neumáticos de 0 a 35 PSI con una sola carga sin necesidad de cables",
      "Manguera con conector rápido anticongelante y 4 modos preajustados (Auto, Moto, Bicicleta y Balón) + función Powerbank y linterna",
    ],
    rating: "4.7",
    reviewsCount: "14.300+",
    categoryType: "tire-inflator",
    specs: {
      power: "150 PSI · 56 s (28→33 PSI)",
      compatibility: "Sedán, SUV, Moto, Bici",
      protection: "Auto-Stop Digital ±1 PSI",
      portability: "610 g Inalámbrico USB-C",
    },
    queryUS: "Fanttik X8 Apex Tire Inflator Portable Air Compressor",
    queryES: "Fanttik X8 Apex Inflador de Neumaticos Portatil 150 PSI",
    ctaLabel: "Ver Inflador Fanttik X8 Apex en Amazon",
  },
  VIAIR_88P: {
    id: "viair-88p",
    badge: "🏔️ Mejor Compresor Heavy-Duty SUV & 4x4 · Pinzas 12V",
    title: "VIAIR 88P Portable Air Compressor — Compresor Metálico 12V de Alto Caudal para Pickups, SUVs y Neumáticos 33”",
    subtitle:
      "Construcción metálica con pinzas caimán que se conectan directo a la batería de 12V para entregar 1.47 CFM (41.6 L/min) sin quemar jamás el fusible del encendedor.",
    features: [
      "Caudal real de 1.47 CFM y hasta 120 PSI capaz de inflar neumáticos todoterreno de hasta 33 pulgadas",
      "Ciclo de trabajo continuo de 25 minutos a 30 PSI con cilindro disipador de aluminio y manómetro integrado",
      "Cable de alimentación de 3 metros + manguera de aire de 4.8 metros que alcanza las 4 ruedas de cualquier Pickup",
    ],
    rating: "4.7",
    reviewsCount: "19.600+",
    categoryType: "tire-inflator",
    specs: {
      power: "120 PSI · 1.47 CFM (41.6 L/m)",
      compatibility: "SUV, Pickup, 4x4 hasta 33”",
      protection: "Pinzas Directas Batería 12V",
      portability: "2.15 kg Chasis Acero/Alu",
    },
    queryUS: "VIAIR 88P Portable Air Compressor 12V Heavy Duty",
    queryES: "VIAIR 88P Compresor de Aire Portatil 12V",
    ctaLabel: "Ver Compresor VIAIR 88P en Amazon",
  },
  ASTROAI_INFLATOR: {
    id: "astroai-tire-inflator",
    badge: "💵 Mejor Inflador Económico < $45 · 54.000+ Reseñas",
    title: "AstroAI Portable Tire Inflator — Compresor de Aire Digital 150 PSI con Apagado Automático y Luz LED",
    subtitle:
      "La compra inteligente y económica para llevar siempre en el maletero: se enchufa a la toma de 12V del auto, marcas los PSI de tu puerta y corta solo al terminar.",
    features: [
      "Pantalla digital retroiluminada en PSI, BAR y kPa con parada automática programable para no sobreinflar nunca",
      "Cable de 12V de 3 metros que llega cómodamente a las 4 ruedas de cualquier sedán o crossover",
      "Incluye boquillas adaptadoras para bicicletas, colchonetas y balones deportivos + fusible de repuesto",
    ],
    rating: "4.5",
    reviewsCount: "54.000+",
    categoryType: "tire-inflator",
    specs: {
      power: "150 PSI · 35 L/min",
      compatibility: "Autos, Crossovers y SUVs",
      protection: "Apagado Automático PSI",
      portability: "0.85 kg Cable 12V 3m",
    },
    queryUS: "AstroAI Tire Inflator Portable Air Compressor 12V Digital",
    queryES: "AstroAI Compresor de Aire Portatil 12V Digital",
    ctaLabel: "Ver Inflador AstroAI Digital en Amazon",
  },
  XIAOMI_COMPRESSOR_2: {
    id: "xiaomi-air-compressor-2",
    badge: "ポケット Ultra-Compacto de Guantera · 6 Modos + USB-C",
    title: "Xiaomi Portable Electric Air Compressor 2 — Inflador Digital Inalámbrico 150 PSI de Bolsillo",
    subtitle:
      "Un 25% más rápido que la primera generación con solo 490 gramos de peso, cabezal de acople rápido e iluminación LED mejorada.",
    features: [
      "Tamaño mini que cabe en el bolsillo de la puerta o guantera del auto y en cualquier mochila",
      "6 modos preconfigurados con presión inteligente y puerto de carga universal USB-C",
      "Ideal para mantener la presión mensual del auto y para motocicletas, scooters y bicicletas de ruta",
    ],
    rating: "4.7",
    reviewsCount: "8.900+",
    categoryType: "tire-inflator",
    specs: {
      power: "150 PSI · +25% Velocidad",
      compatibility: "Auto, Moto, Bici, Scooter",
      protection: "Auto-Stop ±1 PSI",
      portability: "490 g Tamaño Bolsillo",
    },
    queryUS: "Xiaomi Portable Electric Air Compressor 2 Tire Inflator",
    queryES: "Xiaomi Portable Electric Air Compressor 2 Inflador",
    ctaLabel: "Ver Xiaomi Air Compressor 2 en Amazon",
  },
  VIOFO_A229_PLUS: {
    id: "viofo-a229-plus",
    badge: "📹 #1 Dash Cam Visión Nocturna · Doble Sony STARVIS 2",
    title: "VIOFO A229 Plus 2CH — Cámara Dash Cam Frontal y Trasera 2K+2K HDR con Sensores Duales Sony STARVIS 2 y Supercondensador",
    subtitle:
      "La reina de la nitidez nocturna: incorpora el nuevo sensor Sony STARVIS 2 IMX675 tanto en la cámara delantera como en la trasera para leer matrículas de noche sin reflejos.",
    features: [
      "Grabación dual Quad HD 2K (1440P) frontal y 2K (1440P) trasera con HDR de segunda generación",
      "Supercondensador de grado automotriz (sin batería de litio que se hinche) que resiste el sol de verano hasta 70 °C",
      "Wi-Fi ultrarrápido de 5 GHz, GPS de 4 satélites integrado en el soporte, control por voz y Modo Parking 24h (con kit HK4)",
    ],
    rating: "4.6",
    reviewsCount: "4.900+",
    categoryType: "dash-cam",
    specs: {
      power: "2K+2K Dual Sony STARVIS 2",
      compatibility: "Universal 12V / Hardwire HK4",
      protection: "Supercondensador Térmico",
      portability: "Diseño Oculto + Wi-Fi 5GHz",
    },
    queryUS: "VIOFO A229 Plus Dash Cam Front and Rear Dual STARVIS 2",
    queryES: "VIOFO A229 Plus Dash Cam Frontal y Trasera Sony STARVIS 2",
    ctaLabel: "Ver VIOFO A229 Plus (STARVIS 2) en Amazon",
  },
  REDTIGER_F7NP: {
    id: "redtiger-f7np",
    badge: "🔥 Superventas 4K Frontal + Trasera · 38.000+ Reseñas",
    title: "REDTIGER F7NP 4K Dash Cam — Cámara de Auto Frontal 4K UHD y Trasera 1080P con Wi-Fi, GPS y MicroSD Incluida",
    subtitle:
      "El paquete completo de Dash Cam 4K más vendido en Amazon Estados Unidos: incluye cámara frontal 4K, cámara trasera impermeable, soporte GPS y tarjeta MicroSD lista para grabar.",
    features: [
      "Resolución 4K Ultra HD frontal (170°) + 1080P trasera (140°) con apertura F1.55 y visión nocturna WDR",
      "Incluye tarjeta MicroSD en la caja, módulo GPS para registrar ruta y velocidad, y conexión Wi-Fi con App iOS/Android",
      "Alimentada por supercondensador resistente a temperaturas extremas (-20 °C a 70 °C) con G-Sensor de bloqueo de colisión",
    ],
    rating: "4.5",
    reviewsCount: "38.200+",
    categoryType: "dash-cam",
    specs: {
      power: "4K UHD Frontal + 1080P Trasera",
      compatibility: "Incluye MicroSD + GPS + Wi-Fi",
      protection: "Supercondensador + G-Sensor",
      portability: "Pantalla IPS 3.16”",
    },
    queryUS: "REDTIGER F7NP 4K Dash Cam Front Rear Car Camera WiFi GPS",
    queryES: "REDTIGER F7NP Dash Cam 4K Frontal y Trasera WiFi GPS",
    ctaLabel: "Ver Oferta de REDTIGER F7NP 4K en Amazon",
  },
  VANTRUE_N4_PRO: {
    id: "vantrue-n4-pro",
    badge: "🚕 Mejor 3 Canales (Frontal 4K + Cabina IR + Trasera)",
    title: "VANTRUE N4 Pro 3 Channel 4K Dash Cam — Cámara Triple Sony STARVIS 2 con Visión Infrarroja para Cabina",
    subtitle:
      "Seguridad total en 360 grados para conductores de Uber, Lyft, taxis y familias: graba simultáneamente la carretera en 4K, el interior del auto con LEDs infrarrojos y la parte trasera.",
    features: [
      "Sensor principal Sony STARVIS 2 IMX678 4K + cámara interior 1080P con 4 luces IR invisibles + cámara trasera 1080P HDR",
      "Modo Parking con buffer de detección de movimiento que guarda los 10 segundos previos a cualquier golpe o intento de robo",
      "Supercondensador de alta durabilidad, soporte magnético, comandos de voz, Wi-Fi 5GHz y soporte hasta 512GB MicroSD",
    ],
    rating: "4.6",
    reviewsCount: "6.400+",
    categoryType: "dash-cam",
    specs: {
      power: "3 Canales: 4K + 1080P IR + 1080P",
      compatibility: "Autos, SUVs, Uber & Lyft",
      protection: "Supercondensador + Parking 24h",
      portability: "Soporte Magnético + Wi-Fi 5G",
    },
    queryUS: "VANTRUE N4 Pro 3 Channel 4K Dash Cam Sony STARVIS 2",
    queryES: "VANTRUE N4 Pro 3 Canales 4K Dash Cam",
    ctaLabel: "Ver VANTRUE N4 Pro (3 Canales) en Amazon",
  },
  BLUEDRIVER_OBD2: {
    id: "bluedriver-obd2",
    badge: "🔧 #1 Escáner OBD2 Bluetooth Pro · Sin Suscripciones",
    title: "BlueDriver Bluetooth Pro OBDII Scan Tool — Escáner de Diagnóstico Automotriz para iPhone y Android",
    subtitle:
      "Convierte tu teléfono en un escáner de taller profesional: lee y borra códigos Check Engine, frenos ABS, Airbag SRS y transmisión sin pagar cuotas anuales.",
    features: [
      "Base de datos con más de 30 millones de soluciones verificadas que te indican exactamente qué pieza cambiar según tu auto",
      "Diagnóstico avanzado de módulos propietarios (ABS, Airbag, Transmisión) en Ford, GM, Toyota, Honda, Chrysler, BMW y más",
      "Monitoreo de datos en vivo (Live Data), prueba de Smog Check (I/M Readiness) y aplicación 100% gratuita sin suscripción",
    ],
    rating: "4.7",
    reviewsCount: "59.800+",
    categoryType: "obd2-scanner",
    specs: {
      power: "Motor + ABS + Airbag + Trans.",
      compatibility: "Todos los Autos 1996+ (iOS/Android)",
      protection: "0 Suscripciones Mensuales",
      portability: "5.6 cm Bluetooth Inalámbrico",
    },
    queryUS: "BlueDriver Bluetooth Pro OBDII Scan Tool for iPhone Android",
    queryES: "BlueDriver Bluetooth Pro OBD2 Escaner Diagnostico Coche",
    ctaLabel: "Ver Escáner BlueDriver Pro OBD2 en Amazon",
  },
  ANCEL_AD310: {
    id: "ancel-ad310",
    badge: "💵 Mejor Escáner OBD2 Económico < $30 · En Español",
    title: "ANCEL AD310 Classic Enhanced Universal OBD II Scanner — Lector de Códigos Check Engine en Español",
    subtitle:
      "El escáner con cable más fiable y económico de Amazon: no necesita baterías ni celular, se enchufa bajo el volante y muestra el fallo en español en 5 segundos.",
    features: [
      "Lee y borra códigos de falla del motor (Genéricos P0, P2, P3 y específicos del fabricante P1), apaga la luz MIL Check Engine",
      "Verifica al instante el estado de los monitores de emisiones (I/M Readiness) antes de llevar tu auto a la inspección anual",
      "Pantalla LCD retroiluminada con menú completo en español, lectura de VIN, Freeze Frame y flujo de datos en vivo",
    ],
    rating: "4.7",
    reviewsCount: "48.900+",
    categoryType: "obd2-scanner",
    specs: {
      power: "Check Engine + Live Data + I/M",
      compatibility: "Universal OBD2 1996+ (Menú ES)",
      protection: "Sin Baterías (Alimentación OBD2)",
      portability: "Cable Integrado + Pantalla LCD",
    },
    queryUS: "ANCEL AD310 Classic Enhanced Universal OBD II Scanner",
    queryES: "ANCEL AD310 Escaner OBD2 Coche Multimarca en Espanol",
    ctaLabel: "Ver Escáner ANCEL AD310 en Amazon",
  },
  NOCO_GENIUS5: {
    id: "noco-genius5",
    badge: "🔋 #1 Cargador, Mantenedor y Desulfatador 12V/6V (5A)",
    title: "NOCO GENIUS5 (5A) — Cargador Inteligente, Mantenedor y Desulfatador de Baterías 12V y 6V (AGM, Litio, Plomo)",
    subtitle:
      "Imprescindible en tu garaje si tienes un auto que usas poco o con sistema Start-Stop: mantiene la batería al 100% 24/7 sin sobrecargarla y repara placas sulfatadas.",
    features: [
      "Compatible con baterías de 12V y 6V de plomo-ácido, AGM (Start-Stop), EFB, Gel, Ciclo Profundo y Litio (LiFePO4)",
      "Modo de reparación por pulsos de alta frecuencia para recuperar baterías sulfatadas + Modo Force para cargar desde 1 voltio",
      "Sensor térmico integrado que ajusta la curva de carga en invierno y verano automáticamente",
    ],
    rating: "4.7",
    reviewsCount: "62.500+",
    categoryType: "battery-charger",
    specs: {
      power: "5 Amperios (Hasta 120 Ah)",
      compatibility: "12V / 6V · AGM, Litio y Plomo",
      protection: "Sensor Térmico + Desulfatador",
      portability: "Instalación Fija o Pinzas",
    },
    queryUS: "NOCO GENIUS5 5A Smart Car Battery Charger Maintainer Desulfator",
    queryES: "NOCO GENIUS5 Cargador Inteligente Bateria Coche 5A 12V",
    ctaLabel: "Ver Cargador NOCO GENIUS5 en Amazon",
  },
  FANTTIK_V8_APEX_VACUUM: {
    id: "fanttik-v8-apex-vacuum",
    badge: "🌪️ #1 Aspiradora y Soplador Brushless · 19000 Pa",
    title: "Fanttik Slim V8 Apex Car Vacuum — Aspiradora Portátil Inalámbrica 4-en-1 de 19000 Pa con Motor Brushless",
    subtitle:
      "Potencia ciclónica de 19.000 Pascales en solo 450 gramos: aspira arena, piedras y pelos de mascota de las alfombrillas y sopla el polvo de las rejillas de aire.",
    features: [
      "Motor sin escobillas (Brushless) de alta velocidad con 2 modos de succión (12.000 Pa Eco / 19.000 Pa Max)",
      "Diseño 4-en-1: aspiradora de interior, soplador de aire comprimido para rieles, inflador de bolsas y bomba de vacío",
      "Vaciado de depósito en un clic sin ensuciarse las manos, filtro HEPA metálico lavable y carga rápida USB-C",
    ],
    rating: "4.6",
    reviewsCount: "5.200+",
    categoryType: "garage-tool",
    specs: {
      power: "19.000 Pa Motor Brushless",
      compatibility: "Aspiradora + Soplador 4-en-1",
      protection: "Filtro HEPA Metálico + Textil",
      portability: "450 g Recargable USB-C",
    },
    queryUS: "Fanttik Slim V8 Apex Car Vacuum 19000Pa Cordless Handheld",
    queryES: "Fanttik Slim V8 Apex Aspiradora Coche Potente 19000Pa",
    ctaLabel: "Ver Aspiradora Fanttik Slim V8 Apex en Amazon",
  },
};

export interface ContextualAmazonBundle {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
}

/**
 * Selecciona los 3 productos de Amazon más relevantes según el slug, categoría y título de la página.
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title?: string
): ContextualAmazonBundle {
  const text = `${slug} ${category} ${title || ""}`.toLowerCase();

  // 1. Duelo NOCO GB40 vs NOCO GBX45
  if (text.includes("gb40") && text.includes("gbx45")) {
    return {
      sectionTitle: "Duelo en Amazon: NOCO Boost Plus GB40 (1000A) vs NOCO Boost X GBX45 (1250A USB-C)",
      sectionSubtitle:
        "Compara precio y disponibilidad de las dos generaciones del arrancador #1 de NOCO junto con el cargador mantenedor oficial.",
      products: [
        CATALOG.NOCO_GB40,
        CATALOG.NOCO_GBX45,
        CATALOG.NOCO_GENIUS5,
      ],
      vsCompetitor: CATALOG.NOCO_GBX45,
    };
  }

  // 2. Duelo NOCO GB40 vs GOOLOO GP4000
  if (text.includes("gb40") && text.includes("gooloo")) {
    return {
      sectionTitle: "Duelo en Amazon: NOCO Boost Plus GB40 (1000A UltraSafe) vs GOOLOO GP4000 (4000A)",
      sectionSubtitle:
        "Los dos arrancadores de batería portátiles más vendidos en Amazon Estados Unidos frente a frente.",
      products: [
        CATALOG.NOCO_GB40,
        CATALOG.GOOLOO_GP4000,
        CATALOG.NOCO_GB70,
      ],
      vsCompetitor: CATALOG.GOOLOO_GP4000,
    };
  }

  // 3. Pickups, V8, Diésel, GB70 o AVAPOW 6000A
  if (
    text.includes("gb70") ||
    text.includes("avapow") ||
    text.includes("diesel") ||
    text.includes("diésel") ||
    text.includes("pickup") ||
    text.includes("6000a") ||
    text.includes("4000a")
  ) {
    return {
      sectionTitle: "Selección Heavy-Duty en Amazon para Pickups, SUVs V8 y Motores Diésel",
      sectionSubtitle:
        "Arrancadores de 2000A a 6000A y compresor de alto caudal con pinzas directas a la batería de 12V.",
      products: [
        text.includes("avapow") ? CATALOG.AVAPOW_A68_6000A : CATALOG.NOCO_GB70,
        CATALOG.GOOLOO_GP4000,
        CATALOG.VIAIR_88P,
      ],
      vsCompetitor: text.includes("avapow") ? CATALOG.NOCO_GB70 : CATALOG.GOOLOO_GP4000,
    };
  }

  // 4. Duelo Infladores: Fanttik X8 Apex vs Xiaomi
  if (text.includes("fanttik") && text.includes("xiaomi")) {
    return {
      sectionTitle: "Duelo de Infladores Inalámbricos en Amazon: Fanttik X8 Apex vs Xiaomi Air Compressor 2",
      sectionSubtitle:
        "Precisión digital de 150 PSI con parada automática para olvidarte para siempre de las gasolineras.",
      products: [
        CATALOG.FANTTIK_X8_APEX,
        CATALOG.XIAOMI_COMPRESSOR_2,
        CATALOG.ASTROAI_INFLATOR,
      ],
      vsCompetitor: CATALOG.XIAOMI_COMPRESSOR_2,
    };
  }

  // 5. Duelo Infladores: AstroAI vs VIAIR 88P
  if (text.includes("viair") || (text.includes("astroai") && text.includes("88p"))) {
    return {
      sectionTitle: "Compresores de Neumáticos 12V en Amazon: VIAIR 88P Heavy-Duty y AstroAI Digital",
      sectionSubtitle:
        "Desde mantenimiento rápido al encendedor 12V hasta inflado todoterreno con pinzas a la batería.",
      products: [
        CATALOG.VIAIR_88P,
        CATALOG.ASTROAI_INFLATOR,
        CATALOG.FANTTIK_X8_APEX,
      ],
      vsCompetitor: CATALOG.ASTROAI_INFLATOR,
    };
  }

  // 6. Silo o Artículos de Infladores y Neumáticos
  if (
    category === "infladores-y-neumaticos" ||
    text.includes("inflador") ||
    text.includes("compresor") ||
    text.includes("neumatico") ||
    text.includes("llanta") ||
    text.includes("psi") ||
    text.includes("tpms") ||
    text.includes("pinchazo")
  ) {
    return {
      sectionTitle: "Los 3 Mejores Infladores de Neumáticos Portátiles en Amazon Estados Unidos",
      sectionSubtitle:
        "Comparativa de velocidad, caudal L/min y apagado automático digital para auto, SUV y camioneta.",
      products: [
        CATALOG.FANTTIK_X8_APEX,
        CATALOG.ASTROAI_INFLATOR,
        CATALOG.VIAIR_88P,
      ],
      vsCompetitor: CATALOG.ASTROAI_INFLATOR,
    };
  }

  // 7. Dash Cam 3 Canales (Uber, Lyft, Vantrue)
  if (text.includes("vantrue") || text.includes("3-canales") || text.includes("uber") || text.includes("lyft")) {
    return {
      sectionTitle: "Cámaras Dash Cam 4K y 3 Canales con Visión Nocturna STARVIS 2 en Amazon",
      sectionSubtitle:
        "Grabación simultánea de carretera, cabina con infrarrojos y luneta trasera con supercondensador térmico.",
      products: [
        CATALOG.VANTRUE_N4_PRO,
        CATALOG.VIOFO_A229_PLUS,
        CATALOG.REDTIGER_F7NP,
      ],
      vsCompetitor: CATALOG.VIOFO_A229_PLUS,
    };
  }

  // 8. Silo o Artículos de Cámaras Dash Cam
  if (
    category === "camaras-dash-cam-y-seguridad" ||
    text.includes("dash-cam") ||
    text.includes("dash cam") ||
    text.includes("viofo") ||
    text.includes("redtiger") ||
    text.includes("garmin") ||
    text.includes("70mai") ||
    text.includes("starvis") ||
    text.includes("microsd")
  ) {
    return {
      sectionTitle: "Las 3 Mejores Cámaras Dash Cam 4K / STARVIS 2 con Supercondensador en Amazon",
      sectionSubtitle:
        "Visión nocturna de matrículas HDR, Wi-Fi 5GHz, GPS y Modo Parking 24 horas resistente al calor extremo.",
      products: [
        text.includes("redtiger") ? CATALOG.REDTIGER_F7NP : CATALOG.VIOFO_A229_PLUS,
        text.includes("redtiger") ? CATALOG.VIOFO_A229_PLUS : CATALOG.REDTIGER_F7NP,
        CATALOG.VANTRUE_N4_PRO,
      ],
      vsCompetitor: CATALOG.REDTIGER_F7NP,
    };
  }

  // 9. Silo o Artículos de Diagnóstico OBD2 y Check Engine
  if (
    category === "diagnostico-obd2-y-codigos" ||
    text.includes("obd2") ||
    text.includes("check-engine") ||
    text.includes("check engine") ||
    text.includes("bluedriver") ||
    text.includes("ancel") ||
    text.includes("p0420") ||
    text.includes("p0300") ||
    text.includes("p0171") ||
    text.includes("p0455") ||
    text.includes("codigo")
  ) {
    return {
      sectionTitle: "Los Mejores Escáneres OBD2 en Español para Diagnosticar y Borrar Check Engine",
      sectionSubtitle:
        "Ahorra cientos de dólares en el taller leyendo códigos de motor, ABS y Airbag desde casa.",
      products: [
        CATALOG.BLUEDRIVER_OBD2,
        CATALOG.ANCEL_AD310,
        CATALOG.NOCO_GENIUS5,
      ],
      vsCompetitor: CATALOG.ANCEL_AD310,
    };
  }

  // 10. Cargadores y Mantenedores de Batería (NOCO Genius5)
  if (
    text.includes("genius5") ||
    text.includes("mantenedor") ||
    text.includes("cargador") ||
    text.includes("desulfatador") ||
    text.includes("agm")
  ) {
    return {
      sectionTitle: "Cuidado Completo de Baterías 12V en Amazon: Mantenedor Inteligente + Arrancadores",
      sectionSubtitle:
        "Mantén y desulfata tu batería en el garaje con el NOCO GENIUS5 y lleva protección portátil en la guantera.",
      products: [
        CATALOG.NOCO_GENIUS5,
        CATALOG.NOCO_GB40,
        CATALOG.NOCO_GBX45,
      ],
      vsCompetitor: CATALOG.NOCO_GB40,
    };
  }

  // 11. Limpieza Interior, Aspiradoras y Organización
  if (
    category === "cuidado-interior-y-organizacion" ||
    text.includes("aspiradora") ||
    text.includes("interior") ||
    text.includes("maletero") ||
    text.includes("pelos") ||
    text.includes("alfombrilla")
  ) {
    return {
      sectionTitle: "Equipamiento Recomendado en Amazon para Limpieza Interior y Orden en el Maletero",
      sectionSubtitle:
        "Aspiradora brushless de 19.000 Pa + los dos accesorios esenciales que nunca deben faltar en tu organizador.",
      products: [
        CATALOG.FANTTIK_V8_APEX_VACUUM,
        CATALOG.FANTTIK_X8_APEX,
        CATALOG.NOCO_GB40,
      ],
      vsCompetitor: CATALOG.FANTTIK_X8_APEX,
    };
  }

  // 12. Default / Home / Emergencias / Herramientas / Arrancadores: La Trilogía Esencial del Conductor
  return {
    sectionTitle: "El Kit Esencial Garaje Listo en Amazon: Arrancador 12V + Inflador 150 PSI + Dash Cam",
    sectionSubtitle:
      "Los 3 accesorios mejor valorados en Amazon Estados Unidos para no quedarte nunca varado por batería, neumáticos o accidentes.",
    products: [
      CATALOG.NOCO_GB40,
      CATALOG.FANTTIK_X8_APEX,
      CATALOG.REDTIGER_F7NP,
    ],
    vsCompetitor: CATALOG.GOOLOO_GP4000,
  };
}
