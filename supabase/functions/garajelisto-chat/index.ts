import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://garajelisto.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "garajelisto-20";
const AMAZON_TAG_ES = "garajelisto-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "noco-boost-plus-gb40": {
    id: "noco-boost-plus-gb40",
    badge: "🏆 #1 Más Vendido Amazon US · 1000A UltraSafe",
    title: "NOCO Boost Plus GB40 — Arrancador de Batería de Litio Portátil 1000A 12V (Gasolina 6.0L / Diésel 3.0L)",
    subtitle:
      "El estándar de oro en Amazon EE. UU.: 1000 amperios pico, tecnología UltraSafe anti-chispas y contra polaridad inversa, carcasa IP65 y linterna LED de 100 lúmenes.",
    rating: "4.7",
    reviewsCount: "98.500+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("NOCO Boost Plus GB40 1000A UltraSafe Car Battery Jump Starter")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("NOCO Boost Plus GB40 Arrancador de Bateria 1000A 12V")}&tag=${AMAZON_TAG_ES}`,
  },
  "noco-boost-hd-gb70": {
    id: "noco-boost-hd-gb70",
    badge: "🛻 Mejor para SUV, Pickup y Diésel · 2000A",
    title: "NOCO Boost HD GB70 — Arrancador de Batería Heavy-Duty 2000A 12V (Gasolina 8.0L / Diésel 6.0L)",
    subtitle:
      "Potencia industrial de 2000A para camionetas Pickup (F-150, Silverado, RAM), SUVs V8 y motores diésel de hasta 6.0 litros con salida 12V para infladores.",
    rating: "4.8",
    reviewsCount: "29.400+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("NOCO Boost HD GB70 2000A UltraSafe Jump Starter")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("NOCO Boost HD GB70 Arrancador 2000A 12V")}&tag=${AMAZON_TAG_ES}`,
  },
  "noco-boost-x-gbx45": {
    id: "noco-boost-x-gbx45",
    badge: "⚡ Carga Rápida USB-C 60W · 1250A Extreme",
    title: "NOCO Boost X GBX45 — Arrancador de Batería 1250A con Carga Rápida USB-C Power Delivery 60W",
    subtitle:
      "La nueva generación Extreme de NOCO: 1250A de arranque para motores de hasta 6.5L gasolina / 4.0L diésel y recarga en solo 48 minutos por USB-C PD.",
    rating: "4.6",
    reviewsCount: "11.200+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("NOCO Boost X GBX45 1250A USB-C Jump Starter")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("NOCO Boost X GBX45 1250A Arrancador Bateria USB-C")}&tag=${AMAZON_TAG_ES}`,
  },
  "gooloo-gp4000": {
    id: "gooloo-gp4000",
    badge: "💰 Mejor Calidad-Precio 4000A · Todo Tipo de Motor",
    title: "GOOLOO GP4000 — Arrancador Portátil SuperSafe 4000A Pico (Todos los Gasolina y Diésel hasta 10.0L)",
    subtitle:
      "Relación amperios-precio imbatible en Amazon Estados Unidos: 4000A pico, botón BOOST para baterías a 0V, doble USB y entrada/salida USB-C.",
    rating: "4.6",
    reviewsCount: "16.800+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("GOOLOO GP4000 Jump Starter 4000A Peak Car Battery")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("GOOLOO GP4000 Arrancador de Coches 4000A")}&tag=${AMAZON_TAG_ES}`,
  },
  "fanttik-x8-apex": {
    id: "fanttik-x8-apex",
    badge: "🛞 #1 Inflador Portátil Inalámbrico · 150 PSI Auto-Stop",
    title: "Fanttik X8 Apex Tire Inflator — Compresor de Aire Portátil Inalámbrico 150 PSI con Pantalla LCD Dual",
    subtitle:
      "Infla un neumático de auto de 28 a 33 PSI en 56 segundos con parada automática exacta (±1 PSI), manguera con acople rápido sin pérdida de aire y batería de larga duración.",
    rating: "4.7",
    reviewsCount: "14.300+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Fanttik X8 Apex Tire Inflator Portable Air Compressor")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Fanttik X8 Apex Inflador de Neumaticos Portatil 150 PSI")}&tag=${AMAZON_TAG_ES}`,
  },
  "viair-88p": {
    id: "viair-88p",
    badge: "🏔️ Mejor Compresor Heavy-Duty SUV & 4x4 · Pinzas 12V",
    title: "VIAIR 88P Portable Compressor — Compresor Metálico 12V de Alto Caudal para Camionetas, SUVs y Neumáticos 33”",
    subtitle:
      "Se conecta directo a los bornes de la batería 12V con pinzas caimán para entregar 1.47 CFM sin quemar el fusible del encendedor. Ideal para pickups y overland.",
    rating: "4.7",
    reviewsCount: "19.600+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("VIAIR 88P Portable Air Compressor 12V Heavy Duty")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("VIAIR 88P Compresor Portatil 12V")}&tag=${AMAZON_TAG_ES}`,
  },
  "astroai-tire-inflator": {
    id: "astroai-tire-inflator",
    badge: "💵 Mejor Inflador Económico < $45 · 12V / Dual Power",
    title: "AstroAI Portable Tire Inflator — Compresor Digital 150 PSI con Apagado Automático y Luz LED",
    subtitle:
      "El inflador económico más vendido en Amazon EE. UU.: configura los PSI de la puerta de tu auto, pulsa inicio y se detiene automáticamente al alcanzar la presión.",
    rating: "4.5",
    reviewsCount: "54.000+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("AstroAI Tire Inflator Portable Air Compressor 12V Digital")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("AstroAI Compresor de Aire Portatil 12V Digital")}&tag=${AMAZON_TAG_ES}`,
  },
  "viofo-a229-plus": {
    id: "viofo-a229-plus",
    badge: "📹 #1 Dash Cam Visión Nocturna · Doble Sony STARVIS 2",
    title: "VIOFO A229 Plus 2CH — Cámara Dash Cam Frontal y Trasera 2K+2K HDR con Sensores Duales Sony STARVIS 2 y Supercondensador",
    subtitle:
      "Lectura nítida de matrículas de noche sin deslumbramiento gracias al sensor Sony STARVIS 2 IMX675 en ambas cámaras, GPS, Wi-Fi 5GHz, control por voz y supercondensador para calor extremo.",
    rating: "4.6",
    reviewsCount: "4.900+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("VIOFO A229 Plus Dash Cam Front and Rear Dual STARVIS 2")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("VIOFO A229 Plus Dash Cam Frontal y Trasera Sony STARVIS 2")}&tag=${AMAZON_TAG_ES}`,
  },
  "redtiger-f7np": {
    id: "redtiger-f7np",
    badge: "🔥 Superventas 4K Frontal + Trasera · Wi-Fi + GPS",
    title: "REDTIGER F7NP 4K Dash Cam — Cámara de Auto Frontal 4K UHD y Trasera 1080P con Wi-Fi, GPS y Tarjeta SD",
    subtitle:
      "La Dash Cam dual 4K con más reseñas positivas en Amazon US: pantalla IPS de 3.16”, gran angular 170°, visión nocturna WDR, G-Sensor y Modo Parking 24h.",
    rating: "4.5",
    reviewsCount: "38.200+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("REDTIGER F7NP 4K Dash Cam Front Rear WiFi GPS")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("REDTIGER F7NP Dash Cam 4K Frontal y Trasera WiFi GPS")}&tag=${AMAZON_TAG_ES}`,
  },
  "vantrue-n4-pro": {
    id: "vantrue-n4-pro",
    badge: "🚕 Mejor 3 Canales (Frontal + Interior IR + Trasera) · 4K",
    title: "VANTRUE N4 Pro 3 Channel 4K Dash Cam — Cámara Triple Sony STARVIS 2 con Visión Infrarroja de Cabina",
    subtitle:
      "Graba simultáneamente la carretera en 4K, el interior del habitáculo con 4 LEDs infrarrojos y la luneta trasera en 1080P. Favorita de conductores Uber, Lyft y familias.",
    rating: "4.6",
    reviewsCount: "6.400+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("VANTRUE N4 Pro 3 Channel 4K Dash Cam Sony STARVIS 2")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("VANTRUE N4 Pro 3 Canales 4K Dash Cam")}&tag=${AMAZON_TAG_ES}`,
  },
  "bluedriver-obd2": {
    id: "bluedriver-obd2",
    badge: "🔧 #1 Escáner OBD2 Bluetooth Pro · Sin Suscripciones",
    title: "BlueDriver Bluetooth Pro OBDII Scan Tool — Escáner de Diagnóstico Automotriz para iPhone y Android (Motor, ABS, Airbag)",
    subtitle:
      "Lee y borra códigos Check Engine, ABS, SRS Airbag y transmisión con base de datos de +30 millones de reparaciones verificadas en EE. UU., sin cuotas mensuales.",
    rating: "4.7",
    reviewsCount: "59.800+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("BlueDriver Bluetooth Pro OBDII Scan Tool for iPhone Android")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("BlueDriver Bluetooth Pro OBD2 Escaner Diagnostico Coche")}&tag=${AMAZON_TAG_ES}`,
  },
  "noco-genius5": {
    id: "noco-genius5",
    badge: "🔋 Mejor Cargador y Mantenedor 12V/6V · Desulfatador",
    title: "NOCO GENIUS5 (5A) — Cargador Inteligente, Mantenedor y Desulfatador de Baterías 12V y 6V (AGM, Litio, Plomo)",
    subtitle:
      "Compensación térmica automática, modo de reparación por pulsos para recuperar baterías sulfatadas y modo Force para cargar baterías descargadas hasta 1V.",
    rating: "4.7",
    reviewsCount: "62.500+",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("NOCO GENIUS5 5A Smart Car Battery Charger Maintainer Desulfator")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("NOCO GENIUS5 Cargador Inteligente Bateria Coche 5A 12V")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "auto",
  "carro",
  "coche",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const { data } = await supabase
    .from("garajelisto_articles")
    .select(
      "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
    )
    .eq("active", true)
    .range(0, 999);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  if (Array.isArray(data)) {
    for (const r of data as ArticleRow[]) {
      if (!bySlug.has(r.slug)) {
        bySlug.set(r.slug, r);
        rows.push(r);
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-garaje.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-arrancadores-de-bateria-portatiles-amazon",
    "mejores-infladores-de-neumaticos-portatiles-auto",
    "mejores-camaras-dash-cam-4k-frontal-y-trasera",
    "noco-boost-plus-gb40-1000a",
    "fanttik-x8-apex-inflador-portatil",
    "viofo-a229-plus-dash-cam-starvis-2",
    "bluedriver-bluetooth-pro-obd2",
    "noco-gb40-vs-gooloo-gp4000",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "garajelisto-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("garajelisto_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("garajelisto_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🚗 Soy tu Asesor Mecánico IA de GarajeListo.com (modelo mini rápido). Dime qué auto o camioneta tienes y tu presupuesto en Amazon, y te recomiendo el arrancador de batería, inflador portátil, cámara Dash Cam o herramienta OBD2 ideal.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("garajelisto_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("garajelisto_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("garajelisto_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor Mecánico IA está en mantenimiento breve. Puedes ver nuestras comparativas en [GarajeListo.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Ver Top Arrancadores Amazon", "Comparativas VS"],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "gl-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("garajelisto_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("garajelisto_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("garajelisto_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Asesor Mecánico & Especialista en Accesorios Automotrices IA Oficial de GarajeListo.com (${SITE}), la guía líder en español con 260 análisis técnicos que ayuda a los conductores a elegir accesorios para su auto en Amazon Estados Unidos y España (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL CONDUCTOR con precisión mecánica y eléctrica:
   - Arrancadores de batería 12V: NOCO Boost Plus GB40 (1000A, ideal para motores gasolina hasta 6.0L y diésel 3.0L), NOCO Boost X GBX45 (1250A + carga rápida USB-C 60W), NOCO Boost HD GB70 (2000A para pickups F-150/Silverado/RAM y diésel hasta 6.0L) y GOOLOO GP4000 (4000A mejor relación amperios/precio).
   - Infladores de neumáticos portátiles: Fanttik X8 Apex (150 PSI inalámbrico con Auto-Stop, infla en 56 s), VIAIR 88P (12V con pinzas a batería para neumáticos grandes de SUV/4x4) y AstroAI Digital 12V (mejor económico < $45).
   - Cámaras Dash Cam: VIOFO A229 Plus 2CH (doble sensor Sony STARVIS 2 IMX675 + supercondensador), REDTIGER F7NP (4K frontal + trasera 1080P superventas) y VANTRUE N4 Pro (3 canales 4K ideal para Uber/Lyft y familias).
   - Herramientas de garaje y diagnóstico: Escáner Bluetooth BlueDriver Pro OBD2 (motor, ABS, airbag sin suscripción) y cargador/mantenedor NOCO GENIUS5 (5A con desulfatador).
   - Enlazar en tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluir sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EL MODELO RECOMENDADO EN AMAZON (${storeName}):
   - Recomienda siempre el arrancador, inflador, cámara o herramienta exacta de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN GARAJELISTO.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta en español con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["noco-boost-plus-gb40"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["noco-boost-plus-gb40"],
        suggested_options: [
          "¿NOCO GB40 vs GOOLOO GP4000?",
          "¿Mejor inflador portátil 150 PSI?",
          "¿Mejor Dash Cam 4K frontal y trasera?",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["noco-boost-plus-gb40"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo explorar nuestro ranking en [GarajeListo.com](${SITE}/mejores-accesorios-auto/mejores-arrancadores-de-bateria-portatiles-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("garajelisto_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("garajelisto_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "garajelisto.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras 260 guías en [GarajeListo.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
