"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable Antes ↔ Después clonada de DayNightSlider.tsx de prunex1.com: Varado en Carretera (Cables tradicionales, batería a 11.4V, llanta a 24 PSI) vs Equipado con Garaje Listo (NOCO 12.6V + Fanttik 35.0 PSI + Dash Cam 4K). */
export default function EmergencyComparisonSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const ready = clamp((t - 0.6) / 0.35);

  const phase =
    t < 0.35
      ? "Sin Preparación · Esperando Grúa (90 min)"
      : t < 0.68
      ? "Kit Básico · Conectando Pinzas UltraSafe"
      : "Garaje Listo Pro · Arranque en 30 s + 35 PSI + 4K";

  const statusReading =
    pro > 0.5 ? "12.6V · 35.0 PSI" : "11.4V · 24.0 PSI";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#0b0f17] shadow-[0_40px_80px_-40px_rgba(15,23,42,0.75)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId))
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7c2d12" />
              <stop offset="0.55" stopColor="#ea580c" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b0f17" />
              <stop offset="0.7" stopColor="#111827" />
              <stop offset="1" stopColor="#1e293b" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          {/* Halo de iluminación LED de garaje / carretera */}
          <circle cx="400" cy="260" r="220" fill="url(#dn-lamp)" opacity={pro} />

          {/* Asfalto */}
          <rect
            x="0"
            y="376"
            width="800"
            height="74"
            fill={pro > 0.5 ? "#090d16" : "#94a3b8"}
          />

          {/* Panel de Telemetría Central (Batería 12V + Neumático PSI + Dash Cam) */}
          <rect
            x="230"
            y="108"
            width="340"
            height="210"
            rx="24"
            fill={pro > 0.5 ? "#0f172a" : "#ffffff"}
            stroke={pro > 0.5 ? "#f59e0b" : "#94a3b8"}
            strokeWidth="4"
          />

          {/* Tarjeta Izquierda: Estado Batería 12V */}
          <rect
            x="255"
            y="135"
            width="135"
            height="115"
            rx="14"
            fill={pro > 0.5 ? "#1e293b" : "#fef2f2"}
            stroke={pro > 0.5 ? "#a3e635" : "#ef4444"}
            strokeWidth="2.5"
          />
          <text
            x="322"
            y="165"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill={pro > 0.5 ? "#a3e635" : "#b91c1c"}
          >
            {pro > 0.5 ? "ARRANCADOR 12V" : "BATERÍA MUERTA"}
          </text>
          <text
            x="322"
            y="202"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill={pro > 0.5 ? "#ffffff" : "#991b1b"}
          >
            {pro > 0.5 ? "12.6 V" : "11.4 V"}
          </text>
          <text
            x="322"
            y="230"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="11"
            fill={pro > 0.5 ? "#fef08a" : "#dc2626"}
          >
            {pro > 0.5 ? "1000A UltraSafe OK" : "Esperando Grúa $150"}
          </text>

          {/* Tarjeta Derecha: Presión Neumáticos PSI */}
          <rect
            x="410"
            y="135"
            width="135"
            height="115"
            rx="14"
            fill={pro > 0.5 ? "#1e293b" : "#fff7ed"}
            stroke={pro > 0.5 ? "#38bdf8" : "#f97316"}
            strokeWidth="2.5"
          />
          <text
            x="477"
            y="165"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill={pro > 0.5 ? "#38bdf8" : "#c2410c"}
          >
            {pro > 0.5 ? "INFLADOR 150 PSI" : "ALERTA TPMS BAJA"}
          </text>
          <text
            x="477"
            y="202"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill={pro > 0.5 ? "#ffffff" : "#9a3412"}
          >
            {pro > 0.5 ? "35 PSI" : "24 PSI"}
          </text>
          <text
            x="477"
            y="230"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            fontSize="11"
            fill={pro > 0.5 ? "#a3e635" : "#ea580c"}
          >
            {pro > 0.5 ? "Auto-Stop en 56 s" : "Riesgo de Pinchazo"}
          </text>

          {/* Barra Inferior: Dash Cam 4K + Escáner OBD2 */}
          <rect
            x="255"
            y="265"
            width="290"
            height="34"
            rx="10"
            fill={pro > 0.5 ? "#15803d" : "#e2e8f0"}
          />
          <text
            x="400"
            y="287"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="13"
            fill={pro > 0.5 ? "#ffffff" : "#475569"}
          >
            {pro > 0.5
              ? "✓ Dash Cam 4K STARVIS 2 Grabando · OBD2 Sin Fallos"
              : "✕ Sin Testigo de Video · Código Check Engine Desconocido"}
          </text>

          {/* Indicadores Luminosos Superiores en Modo Pro */}
          <g opacity={ready}>
            <circle cx="400" cy="78" r="14" fill="#a3e635" />
            <text x="400" y="83" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0b0f17">
              ✓
            </text>
          </g>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/45 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
            {statusReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/45 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5 ? "Autonomía Total en Carretera" : "Conductor Desprotegido"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "NOCO Boost + Inflador Fanttik + Dash Cam 4K = Resuelves todo en 2 min"
              : "Cables antiguos: dependes de otro auto o de pagar grúa y taller"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Auto Sin Equipar vs Auto con Garaje Listo →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#0b0f17] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">⚠️ Varado</span>
        <label className="sr-only" htmlFor="dn-range">
          Nivel de preparación del vehículo
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${statusReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">🚗 Garaje Listo</span>
      </div>
    </div>
  );
}
