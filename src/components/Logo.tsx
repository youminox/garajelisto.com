import { useId } from "react";

/** Logotipo de GarajeListo.com: Escudo automotriz + rayo 12V y manómetro PSI */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="0.55" stopColor="#1e293b" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id={`${id}ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef08a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Techo de garaje estilizado */}
      <path
        d="M12 28 L32 14 L52 28"
        fill="none"
        stroke={`url(#${id}ring)`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arco de velocímetro / manómetro PSI */}
      <path
        d="M17 46 A16 16 0 1 1 47 46"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Rayo central de arranque 12V */}
      <path
        d="M34 23 L24 36 H32 L30 49 L41 34 H33 Z"
        fill="#f59e0b"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        Garaje<span className={dark ? "text-fxlime" : "text-fxblue"}>Listo</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
