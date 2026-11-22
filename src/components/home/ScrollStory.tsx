"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Arranque autónomo de batería 12V en 30 segundos",
    d: "Conectas las pinzas anti-chispas UltraSafe de tu NOCO Boost o GOOLOO al borne positivo (+) y chasis (-); aunque la batería esté muerta en invierno, arrancas sin depender de nadie.",
  },
  {
    n: "02",
    t: "Presión PSI exacta en frío con parada automática",
    d: "Miras la etiqueta del marco de la puerta (ej. 35 PSI), enroscas tu inflador inalámbrico Fanttik X8 Apex y en 56 segundos corta automáticamente con precisión de ±1 PSI.",
  },
  {
    n: "03",
    t: "Grabación 4K HDR 24/7 con Sony STARVIS 2",
    d: "Tu Dash Cam VIOFO o REDTIGER con supercondensador térmico registra matrículas nítidas de día y de noche y vigila impactos en Modo Parking con corte de seguridad a 12.2V.",
  },
  {
    n: "04",
    t: "Diagnóstico OBD2 Bluetooth antes de pisar el taller",
    d: "Si se enciende el Check Engine o ABS, conectas el escáner BlueDriver bajo el volante y lees en español la causa exacta y la pieza verificada desde tu celular.",
  },
];

/** Escena fijada con GSAP ScrollTrigger clonada de prunex1.com: muestra las 4 fases de protección automotriz en Garaje Listo. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .crema-layer"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#ea580c", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".portafilter-group"),
            { opacity: 0.4, x: -24 },
            { opacity: 1, x: 0, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#0284c7", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".gauge-needle"),
            { rotate: 52, svgOrigin: "200 135", duration: 0.5 },
            1.15
          )
          .to(q(".espresso-stream"), { opacity: 0.8, scaleY: 0.7, duration: 0.5 }, 1.25)
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#f59e0b", color: "#0b0f17", duration: 0.2 },
            2
          )
          .to(
            q(".gauge-needle"),
            { rotate: 115, svgOrigin: "200 135", duration: 0.7 },
            2.05
          )
          .to(q(".espresso-stream"), { opacity: 1, scaleY: 1, duration: 0.5 }, 2.1)
          .to(q(".espresso-fill"), { opacity: 1, duration: 0.6 }, 2.4)
          .to(q(".crema-layer"), { opacity: 1, duration: 0.5 }, 2.65)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#ea580c", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".latte-heart"), { opacity: 1, scale: 1, duration: 0.5 }, 3.25)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ciclo-garaje"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Protocolo Conductor Preparado</span>
            <h2 className="section-title mt-3">
              Cuatro pilares.{" "}
              <span className="text-prune">Cero emergencias en carretera.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-slate-600 sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Regla de oro Garaje Listo: el 85% de las asistencias en carretera
              en EE. UU. se deben a baterías de 12V descargadas o neumáticos con
              baja presión que resuelves tú mismo en menos de 2 minutos.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(15,23,42,0.28)]"
              role="img"
              aria-label="Telemetría interactiva de auto: voltaje 12.6V, manómetro digital 35 PSI, cámara 4K STARVIS 2 y diagnóstico OBD2 OK"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f1f5f9" />
                  <stop offset="1" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0b0f17" />
                  <stop offset="0.65" stopColor="#111827" />
                  <stop offset="1" stopColor="#1e293b" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                {/* Carcasa de Estación Digital Automotriz (NOCO + Fanttik + OBD2) */}
                <rect
                  x="96"
                  y="72"
                  width="208"
                  height="324"
                  rx="26"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="3.5"
                />
                <rect
                  x="112"
                  y="86"
                  width="176"
                  height="112"
                  rx="16"
                  fill="#0f172a"
                />

                {/* Manómetro Digital PSI / Amperímetro CCA */}
                <circle
                  cx="200"
                  cy="135"
                  r="38"
                  fill="#111827"
                  stroke="#ea580c"
                  strokeWidth="4"
                />
                <path
                  d="M172 145 A30 30 0 0 1 228 145"
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  className="gauge-needle"
                  x1="200"
                  y1="135"
                  x2="174"
                  y2="145"
                  stroke="#f59e0b"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="135" r="4.5" fill="#fef08a" />
                <text
                  x="200"
                  y="162"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="8.5"
                  fill="#fef08a"
                >
                  35.0 PSI · 12.6V
                </text>

                {/* Pinzas UltraSafe + Conector 12V */}
                <g className="portafilter-group">
                  <rect
                    x="130"
                    y="206"
                    width="64"
                    height="20"
                    rx="6"
                    fill="#dc2626"
                  />
                  <text x="162" y="220" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                    + POS 12V
                  </text>
                  <rect
                    x="206"
                    y="206"
                    width="64"
                    height="20"
                    rx="6"
                    fill="#334155"
                  />
                  <text x="238" y="220" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                    - CHASIS
                  </text>
                </g>

                {/* Pulso de Energía de Arranque 1000A */}
                <path
                  className="espresso-stream"
                  d="M195 228 L195 288 L205 288 L205 228 Z"
                  fill="#f59e0b"
                  opacity="0"
                />

                {/* Pantalla Inferior OBD2 & Dash Cam 4K */}
                <rect
                  x="118"
                  y="352"
                  width="164"
                  height="26"
                  rx="7"
                  fill="#0f172a"
                  stroke="#a3e635"
                  strokeWidth="1.5"
                />
                <text
                  x="200"
                  y="369"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="10"
                  fill="#a3e635"
                >
                  OBD2: 0 ERRORES · 4K REC
                </text>

                {/* Módulo de Batería 12V del Vehículo */}
                <rect
                  x="132"
                  y="282"
                  width="136"
                  height="64"
                  rx="12"
                  fill="#0f172a"
                  stroke="#64748b"
                  strokeWidth="2.5"
                />
                {/* Carga Completa Verde/Ámbar */}
                <rect
                  className="espresso-fill"
                  x="138"
                  y="302"
                  width="124"
                  height="38"
                  rx="8"
                  fill="#15803d"
                  opacity="0"
                />
                {/* Barra Superior 100% Charged */}
                <rect
                  className="crema-layer"
                  x="138"
                  y="288"
                  width="124"
                  height="14"
                  rx="4"
                  fill="#a3e635"
                  opacity="0"
                />
                {/* Icono de Rayo Activo */}
                <path
                  className="latte-heart"
                  d="M203 305 L193 320 H201 L198 334 L209 318 H201 Z"
                  fill="#fef08a"
                  opacity="0"
                />

                {/* Badge Superior de Estado del Vehículo */}
                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(70 18)"
                >
                  <rect
                    width="260"
                    height="44"
                    rx="14"
                    fill="#ffffff"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="22" r="12" fill="#ea580c" />
                  <text
                    x="24"
                    y="26"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    ⚡
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#0f172a"
                  >
                    Vehículo 100% Listo para Ruta
                  </text>
                  <text
                    x="44"
                    y="33"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#ea580c"
                  >
                    1000A UltraSafe · 35 PSI · 4K HDR
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
