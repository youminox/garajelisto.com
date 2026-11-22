"use client";

import { useEffect, useState } from "react";
import {
  AmazonProductRecommendation,
  AmazonStoreRegion,
  AMAZON_TAG_ES,
  AMAZON_TAG_US,
  buildAmazonUrl,
  detectUserAmazonRegion,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";

interface AmazonAffiliateBoxProps {
  variant: "verdict" | "vs" | "inline" | "showcase" | "sidebar";
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
  source?: string;
}

function CategoryIcon({
  type,
}: {
  type: AmazonProductRecommendation["categoryType"];
}) {
  if (type === "tire-inflator") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-900 border border-sky-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5M15 12h4" />
        </svg>
      </div>
    );
  }
  if (type === "dash-cam") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-900 border border-amber-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="6" width="18" height="12" rx="2.5" />
          <circle cx="12" cy="12" r="3.2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 9h.01" />
        </svg>
      </div>
    );
  }
  if (type === "obd2-scanner") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-800 border border-emerald-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h5M9 16h6" />
        </svg>
      </div>
    );
  }
  if (type === "battery-charger" || type === "garage-tool") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-500/15 text-slate-800 border border-slate-300/60">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0b0f17] text-[#f59e0b] border border-[#ea580c]/40 shadow-2xs">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    </div>
  );
}

export default function AmazonAffiliateBox({
  variant,
  sectionTitle,
  sectionSubtitle,
  products,
  vsCompetitor,
  source = "article",
}: AmazonAffiliateBoxProps) {
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const changeRegion = (next: AmazonStoreRegion) => {
    setRegion(next);
    try {
      window.localStorage.setItem("gl_amazon_region", next);
    } catch {
      // ignore
    }
  };

  const primaryProduct = products[0];
  const storeName = region === "US" ? "Amazon.com (EE. UU.)" : "Amazon.es (España)";
  const shortStore = region === "US" ? "Amazon.com" : "Amazon.es";
  const activeTag = region === "US" ? AMAZON_TAG_US : AMAZON_TAG_ES;

  const onAmazonClick = (prod: AmazonProductRecommendation, pos: string) => {
    const url = buildAmazonUrl(prod, region);
    trackClick(`${source}-${variant}-${pos}`, {
      article_slug: prod.id,
      article_title: prod.title,
      category: "amazon",
      target_url: url,
    });
  };

  // 1. VERDICT VARIANT (Top box on single review & ranking pages)
  if (variant === "verdict") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <section
        aria-label="Veredicto mecánico y oferta en Amazon"
        className="my-8 rounded-3xl border-2 border-[#ea580c]/45 bg-gradient-to-br from-[#f8fafc] via-white to-[#fef3c7]/60 p-5 sm:p-7 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--line)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b0f17] px-3 py-1 text-xs font-extrabold text-[#fef08a]">
              {primaryProduct.badge}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
              ★★★★★ {primaryProduct.rating}/5 ({primaryProduct.reviewsCount} reseñas)
            </span>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-white border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold text-slate-600">
            <span>Tienda Amazon:</span>
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                region === "US" ? "bg-[#ea580c] text-white font-extrabold" : "hover:text-slate-900"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`px-2 py-0.5 rounded-full transition cursor-pointer ${
                region === "ES" ? "bg-[#ea580c] text-white font-extrabold" : "hover:text-slate-900"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>

        <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="flex items-start gap-3.5">
              <CategoryIcon type={primaryProduct.categoryType} />
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-fxink leading-tight">
                  {primaryProduct.title}
                </h2>
                <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
                  {primaryProduct.subtitle}
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-fxink">
              {primaryProduct.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f59e0b]/30 text-xs font-extrabold text-[#9a3412]">
                    ✓
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm">
            {primaryProduct.specs && (
              <dl className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                <div className="rounded-xl bg-fxsky p-2.5">
                  <dt className="text-[var(--muted)] font-semibold">Potencia / Capacidad</dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">{primaryProduct.specs.power}</dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5">
                  <dt className="text-[var(--muted)] font-semibold">Compatibilidad</dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">{primaryProduct.specs.compatibility}</dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5">
                  <dt className="text-[var(--muted)] font-semibold">Protección</dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">{primaryProduct.specs.protection}</dd>
                </div>
                <div className="rounded-xl bg-fxsky p-2.5">
                  <dt className="text-[var(--muted)] font-semibold">Formato</dt>
                  <dd className="font-display font-extrabold text-fxink mt-0.5">{primaryProduct.specs.portability}</dd>
                </div>
              </dl>
            )}
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => onAmazonClick(primaryProduct, "verdict")}
              className="btn btn-buy shine w-full text-sm !py-3.5"
            >
              <span>🛒 {primaryProduct.ctaLabel}</span>
              <span aria-hidden>↗</span>
            </a>
            <p className="mt-2 text-center text-[11px] text-[var(--muted)]">
              Envío Prime y garantía oficial en {storeName} ({activeTag})
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 2. VS VARIANT (Side-by-side duel on comparison articles)
  if (variant === "vs") {
    const rival = vsCompetitor || products[1];
    const contenders = [primaryProduct, rival];
    return (
      <section
        aria-label="Comparativa rápida en Amazon"
        className="my-8 rounded-3xl border-2 border-[#ea580c]/45 bg-gradient-to-br from-[#0b0f17] via-[#111827] to-[#1e293b] p-5 sm:p-7 text-white shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f59e0b]/20 px-3 py-1 text-xs font-extrabold text-[#fef08a]">
              ⚖️ Duelo Directo · Disponibles en {storeName}
            </span>
            <h2 className="mt-1.5 font-display text-lg sm:text-xl font-extrabold">
              Comparativa Rápida de los 2 Modelos en Amazon
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 rounded-xl bg-white/10 p-1 border border-white/15 text-xs">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                region === "US" ? "bg-amber-400 text-slate-950" : "text-white/75 hover:text-white"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`rounded-lg px-2.5 py-1 font-bold transition cursor-pointer ${
                region === "ES" ? "bg-amber-400 text-slate-950" : "text-white/75 hover:text-white"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {contenders.map((prod, idx) => {
            const url = buildAmazonUrl(prod, region);
            return (
              <div
                key={prod.id + idx}
                className={`flex flex-col justify-between rounded-2xl p-5 border ${
                  idx === 0
                    ? "border-amber-400 bg-white/10"
                    : "border-white/15 bg-white/[0.05]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-extrabold text-amber-300">
                      {idx === 0 ? "🏆 Opción #1 Recomendada" : "⚡ Alternativa Directa"}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      ★★★★★ {prod.rating} ({prod.reviewsCount})
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-extrabold text-white leading-snug">
                    {prod.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/75 leading-relaxed">{prod.subtitle}</p>
                  <ul className="mt-3.5 space-y-1.5 text-xs text-white/85">
                    {prod.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#f59e0b] font-extrabold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(prod, `vs-${idx}`)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-xs sm:text-sm font-extrabold text-slate-950 transition hover:from-amber-300 hover:to-amber-400"
                >
                  <span>{prod.ctaLabel} en {shortStore}</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // 3. INLINE VARIANT (Mid-article high CTR card)
  if (variant === "inline") {
    const url = buildAmazonUrl(primaryProduct, region);
    return (
      <aside
        aria-label="Recomendación destacada en Amazon"
        className="my-9 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-[#fffdf9] via-[#f8fafc] to-[#fef3c7]/45 p-5 sm:p-6 shadow-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-950 border border-amber-400/50">
            {primaryProduct.badge}
          </span>
          <div className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
            <span>Tienda:</span>
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "US" ? "bg-amber-500 text-slate-950 font-extrabold" : "hover:text-slate-900"
              }`}
              title={`Ver en Amazon Estados Unidos (${AMAZON_TAG_US})`}
            >
              🇺🇸 US
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`px-1.5 py-0.5 rounded-full transition cursor-pointer ${
                region === "ES" ? "bg-amber-500 text-slate-950 font-extrabold" : "hover:text-slate-900"
              }`}
              title={`Ver en Amazon España (${AMAZON_TAG_ES})`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <CategoryIcon type={primaryProduct.categoryType} />
            <div>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                {primaryProduct.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {primaryProduct.subtitle}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="font-bold text-amber-600">
                  ★★★★★ {primaryProduct.rating}/5
                </span>
                <span className="text-slate-500 font-medium">
                  ({primaryProduct.reviewsCount} valoraciones)
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  ✓ Disponible con Envío Rápido en {shortStore}
                </span>
              </div>
            </div>
          </div>

          <div className="sm:shrink-0">
            <a
              href={url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => onAmazonClick(primaryProduct, "inline")}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-sm font-extrabold text-slate-950 shadow-sm transition hover:from-amber-400 hover:to-amber-500 hover:shadow-md"
            >
              <span>{primaryProduct.ctaLabel}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  // 4. SIDEBAR VARIANT (Sticky right column on desktop)
  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border-2 border-amber-400/70 bg-gradient-to-b from-[#fffdf8] to-[#f8fafc] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
            🛒 Top en {shortStore}
          </span>
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`cursor-pointer ${region === "US" ? "text-amber-700 font-extrabold underline" : ""}`}
            >
              🇺🇸 US
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`cursor-pointer ${region === "ES" ? "text-amber-700 font-extrabold underline" : ""}`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {products.slice(0, 2).map((prod, idx) => {
            const url = buildAmazonUrl(prod, region);
            return (
              <div
                key={prod.id + idx}
                className="rounded-xl border border-amber-200/80 bg-white p-3.5 shadow-2xs"
              >
                <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900">
                  {prod.badge}
                </span>
                <h4 className="mt-1.5 font-display text-xs font-extrabold text-slate-900 leading-snug">
                  {prod.title}
                </h4>
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  <span className="font-bold text-amber-600">★★★★★ {prod.rating}</span>
                  <span className="text-slate-400">({prod.reviewsCount})</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(prod, `sidebar-${idx}`)}
                  className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-extrabold text-slate-950 transition hover:bg-amber-400"
                >
                  <span>Ver en {shortStore}</span>
                  <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] text-slate-500 leading-tight text-center">
          Afiliado oficial Amazon ({activeTag}).
        </p>
      </div>
    );
  }

  // 5. SHOWCASE VARIANT (Full 3-product comparison grid)
  return (
    <section
      aria-label="Selección de accesorios y herramientas para auto recomendados en Amazon"
      className="my-12 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-br from-[#0b0f17] via-[#111827] to-[#1e293b] p-6 sm:p-8 text-white shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold text-amber-300">
            🛒 Selección Oficial GarajeListo.com · Disponible en {storeName}
          </span>
          <h2 className="mt-2.5 font-display text-xl sm:text-2xl font-extrabold text-white">
            {sectionTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/75">
            {sectionSubtitle}
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center rounded-xl bg-white/10 p-1.5 border border-white/15 text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changeRegion("US")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "US"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇺🇸 Amazon.com
            </button>
            <button
              type="button"
              onClick={() => changeRegion("ES")}
              className={`rounded-lg px-2.5 py-1.5 font-bold transition cursor-pointer ${
                region === "ES"
                  ? "bg-amber-400 text-slate-950 shadow-2xs"
                  : "text-white/75 hover:text-white"
              }`}
            >
              🇪🇸 Amazon.es
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {products.map((product, index) => {
          const url = buildAmazonUrl(product, region);
          const isFeatured = index === 0;

          return (
            <div
              key={product.id + index}
              className={`flex flex-col justify-between rounded-2xl p-5 transition ${
                isFeatured
                  ? "border-2 border-amber-400 bg-gradient-to-b from-amber-500/15 via-white/[0.06] to-white/[0.04] shadow-lg"
                  : "border border-white/15 bg-white/[0.05] hover:border-amber-400/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      isFeatured
                        ? "bg-amber-400 text-slate-950"
                        : "bg-white/10 text-amber-300"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="mt-3.5 font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                  {product.title}
                </h3>

                <p className="mt-2 text-xs text-white/75 leading-relaxed">
                  {product.subtitle}
                </p>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-3.5 text-xs text-white/85">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-amber-400">
                    ★★★★★ {product.rating}/5
                  </span>
                  <span className="text-white/60">
                    {product.reviewsCount} reseñas
                  </span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() => onAmazonClick(product, `showcase-${index}`)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-extrabold transition ${
                    isFeatured
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-md"
                      : "bg-white/15 text-white hover:bg-amber-400 hover:text-slate-950"
                  }`}
                >
                  <span>{product.ctaLabel}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[11px] text-white/55">
        En calidad de Afiliado de Amazon ({activeTag}), GarajeListo.com obtiene ingresos por las compras adscritas que cumplen los requisitos aplicables sin ningún sobrecoste para ti.
      </p>
    </section>
  );
}
