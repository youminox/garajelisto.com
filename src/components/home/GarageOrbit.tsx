"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type OrbitItem = {
  k: string;
  name: string;
  img: string | null;
  icon?: string;
  role: string;
  d: string;
  href: string;
};

/** Órbita interactiva de los 8 accesorios esenciales para tu auto (clonada de IngredientOrbit.tsx de prunex1.com). */
export default function GarageOrbit({
  items,
  center,
}: {
  items: OrbitItem[];
  center: string;
}) {
  const [active, setActive] = useState(0);
  const a = items[active];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div className="orbit mx-auto w-full max-w-[540px]">
        <div className="orbit-ring" />
        <div className="orbit-ring r2" />
        <div className="absolute inset-[24%] grid place-items-center overflow-hidden rounded-full bg-gradient-to-br from-fxsky via-white to-[#fde8d4] shadow-[inset_0_10px_40px_rgba(15,23,42,0.14)] border-4 border-white">
          <Image
            src={center}
            alt="Ecosistema Garaje Listo: arrancador de batería portátil, inflador de neumáticos, cámara Dash Cam 4K y escáner OBD2"
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
        <div className="orbit-spin">
          {items.map((it, i) => {
            const ang = (i / items.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(ang) * 44;
            const y = 50 + Math.sin(ang) * 44;
            const on = i === active;
            return (
              <div
                key={it.k}
                className="orbit-item absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={`Ver ${it.name}`}
                    className={`group grid h-14 w-14 place-items-center overflow-hidden rounded-full border-[3px] bg-white shadow-lg transition-all duration-300 sm:h-[76px] sm:w-[76px] cursor-pointer ${
                      on
                        ? "scale-110 border-fxblue shadow-[0_12px_30px_-10px_rgba(234,88,12,0.85)]"
                        : "border-white hover:border-fxblue/60"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl" aria-hidden>
                      {it.icon || "🚗"}
                    </span>
                  </button>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold sm:block ${
                      on ? "bg-fxblue text-white" : "bg-white/90 text-fxink shadow"
                    }`}
                  >
                    {it.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <span className="eyebrow">Equipamiento Completo del Conductor</span>
        <h2 className="section-title mt-3">
          Los 8 accesorios que blindan tu auto contra{" "}
          <span className="text-prune">cualquier imprevisto</span>
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Toca cualquier nodo de la órbita para ver cómo se complementan el
          arrancador de litio, el compresor digital, la Dash Cam 4K y el escáner
          OBD2 en tu guantera y maletero.
        </p>
        <div
          key={active}
          className="card card-static spot mt-7 p-7"
          style={{ animation: "fadeup .5s ease both" }}
        >
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-fxsky">
              <span className="text-3xl" aria-hidden>
                {a.icon || "🚗"}
              </span>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold leading-tight">
                {a.name}
              </p>
              <p className="text-sm font-semibold text-prune">{a.role}</p>
            </div>
          </div>
          <p className="mt-4 text-lg text-[var(--muted)]">{a.d}</p>
          <Link
            href={a.href}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-fxbluedeep hover:underline"
          >
            Leer guía y recomendaciones en Amazon de {a.name} →
          </Link>
        </div>
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Componentes del kit Garaje Listo"
        >
          {items.map((it, i) => (
            <button
              key={it.k}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                i === active
                  ? "border-fxblue bg-fxblue text-white"
                  : "border-[var(--line)] bg-white hover:border-fxblue"
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
