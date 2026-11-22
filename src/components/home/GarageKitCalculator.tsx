"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type VehicleKitTier = {
  key: string;
  label: string;
  ampsRequired: number;
  maxEngineLiters: string;
  recommendedPsi: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

/**
 * Configurador interactivo por tipo de vehículo y cilindrada (clonado de PriceBlock.tsx de prunex1.com):
 * Alterna entre Sedán / Compacto 4 Cil., SUV Familiar V6 y Pickup 4x4 / Motor Diésel,
 * y calcula los amperios mínimos de arranque y el ahorro frente a asistencias de grúa y taller.
 */
export default function GarageKitCalculator({
  options,
}: {
  options: VehicleKitTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [engineLiters, setEngineLiters] = useState(2.5);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.NOCO_GB40;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";
  const currency = region === "US" ? "$" : "€";

  const minAmpsNeeded =
    engineLiters <= 2.5
      ? 1000
      : engineLiters <= 4.5
      ? 1250
      : engineLiters <= 6.0
      ? 2000
      : 4000;

  // Costo medio en EE. UU. de 1 asistencia de grúa fuera de garantía ($145) + 1 diagnóstico OBD2 en taller ($120) + revisión neumáticos ($45)
  const yearlySaved = Math.round(280 + engineLiters * 25);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de tipo de vehículo"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => {
                  setK(o.key);
                  if (o.key === "sedan") setEngineLiters(2.0);
                  if (o.key === "suv") setEngineLiters(3.5);
                  if (o.key === "pickup") setEngineLiters(5.7);
                }}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                {p.idealFor}
              </p>
              <p className="mt-2 text-xs font-bold text-prune">
                Potencia: {p.ampsRequired}A · Motor: {p.maxEngineLiters} · Presión:{" "}
                {p.recommendedPsi}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🛒 Ver precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Leer reseña completa →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0b0f17] via-[#111827] to-[#1e293b] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora de Potencia por Cilindrada (Litros)
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuántos amperios necesita el motor de tu auto?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Desliza según la cilindrada en litros de tu motor (ej. 2.0L para un
          sedán 4 cilindros, 3.5L para un SUV V6 o 5.7L+ para una Pickup V8 /
          Diésel).
        </p>
        <label
          htmlFor="engine-liters"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Cilindrada de tu motor (Gasolina o Diésel)</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {engineLiters.toFixed(1)} Litros
          </span>
        </label>
        <input
          id="engine-liters"
          type="range"
          min={1.4}
          max={8.0}
          step={0.2}
          value={engineLiters}
          onChange={(e) => setEngineLiters(Number(e.target.value))}
          className="mt-3 w-full accent-[#f59e0b]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>1.4L (4 Cil.)</span>
          <span>2.5L (SUV)</span>
          <span>3.5L (V6)</span>
          <span>5.7L (V8)</span>
          <span>8.0L (HD)</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Amperios recomendados", `${minAmpsNeeded}A+`],
            ["Ahorro grúa + OBD2", `${currency}${yearlySaved}`],
            ["Se amortiza en", "1 emergencia"],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-xl text-fxlime sm:text-2xl"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            Para un motor de <strong>{engineLiters.toFixed(1)}L</strong>, elige
            al menos <strong>{minAmpsNeeded} Amperios</strong>.
          </span>
          <OpenChatButton
            label="Armar mi kit con el Asesor IA"
            prompt={`Mi auto tiene un motor de ${engineLiters.toFixed(1)} litros (${p.label}). ¿Qué arrancador de batería, inflador portátil y Dash Cam me recomiendas comprar en Amazon?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
