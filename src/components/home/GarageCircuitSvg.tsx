/** SVG animado clonado de FiberGel.tsx de prunex1.com: muestra la electrónica automotriz 12V (1000A–4000A CCA UltraSafe + 35 PSI Auto-Stop + Supercondensador 4K STARVIS 2). */
export default function GarageCircuitSvg() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 120,
      y2 = 210 + Math.sin(a) * 120;
    const mx = 200 + Math.cos(a + 0.5) * 80,
      my = 210 + Math.sin(a + 0.5) * 80;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Ilustración técnica animada: descarga controlada de 1000 a 4000 amperios 12V con protección anti-chispas, regulación digital a 35 PSI y telemetría OBD2"
      >
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#fef08a" />
            <stop offset="0.55" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#ea580c" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#f59e0b" stopOpacity="0.38" />
            <stop offset="1" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle
          cx="200"
          cy="210"
          r="150"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeDasharray="3 7"
        />
        <circle
          cx="200"
          cy="210"
          r="105"
          fill="none"
          stroke="rgba(245,158,11,0.38)"
          strokeDasharray="5 5"
        />
        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke="#f59e0b"
            strokeOpacity="0.75"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <g filter="url(#fg-goo)">
          <circle className="gel-blob" cx="200" cy="210" r="46" fill="url(#fg-gel)" />
          <circle
            className="gel-blob"
            cx="178"
            cy="196"
            r="26"
            fill="#ea580c"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            className="gel-blob"
            cx="224"
            cy="226"
            r="24"
            fill="#d97706"
            style={{ animationDelay: "0.9s" }}
          />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#fbbf24"
              style={{
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
                animationDelay: p.d,
              }}
            />
          ))}
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700">
          <g transform="translate(10 38)">
            <rect
              width="148"
              height="26"
              rx="13"
              fill="rgba(245,158,11,0.18)"
              stroke="rgba(245,158,11,0.55)"
            />
            <text x="74" y="17" textAnchor="middle" fill="#fef08a">
              1000A–4000A UltraSafe
            </text>
          </g>
          <g transform="translate(242 54)">
            <rect
              width="146"
              height="26"
              rx="13"
              fill="rgba(163,230,53,0.18)"
              stroke="rgba(163,230,53,0.6)"
            />
            <text x="73" y="17" textAnchor="middle" fill="#d9f99d">
              150 PSI · Auto-Stop ±1
            </text>
          </g>
          <g transform="translate(104 372)">
            <rect
              width="192"
              height="26"
              rx="13"
              fill="rgba(234,88,12,0.24)"
              stroke="rgba(245,158,11,0.6)"
            />
            <text x="96" y="17" textAnchor="middle" fill="#fef3c7">
              Sony STARVIS 2 + Supercondensador
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
