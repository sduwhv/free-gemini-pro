import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "../utils/scrollTo";

// ── All 10 testimoni images ─────────────────────────────────
const images = [
  "/testimoni/1.jpg.jpeg",
  "/testimoni/2.jpg.jpeg",
  "/testimoni/3.jpg.jpeg",
  "/testimoni/4.jpg.png",
  "/testimoni/5.jpg.jpeg",
  "/testimoni/6.jpg.jpeg",
  "/testimoni/7.jpg.jpeg",
  "/testimoni/8.jpg.jpeg",
  "/testimoni/9.jpg.jpeg",
  "/testimoni/10.jpg.jpeg",
];

// ── Individual testimoni card ───────────────────────────────
const TestiCard = ({ src, index }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-2xl"
      style={{
        width: "clamp(200px, 40vw, 280px)",
        height: "clamp(300px, 55vw, 420px)",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#111",
        transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(66,133,244,0.4)";
        el.style.transform = "translateY(-6px) scale(1.02)";
        el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(66,133,244,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Skeleton loader */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)", backgroundSize: "200% 100%" }}
        />
      )}
      <img
        src={src}
        alt={`Testimoni ${index + 1}`}
        className="w-full h-full object-cover object-top"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
      {/* Number badge */}
      <div
        className="absolute top-3 left-3 flex items-center justify-center rounded-full"
        style={{
          width: 28,
          height: 28,
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="font-bold text-white"
          style={{ fontSize: "0.65rem", fontFamily: "Inter, sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

// ── Marquee row ─────────────────────────────────────────────
const MarqueeRow = ({ items, direction = 1, speed = 35 }) => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate items for seamless loop
    const singleWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += (speed / 60) * direction;
        if (direction > 0 && posRef.current >= singleWidth) posRef.current -= singleWidth;
        if (direction < 0 && posRef.current <= -singleWidth) posRef.current += singleWidth;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
        {/* Two copies for infinite loop */}
        {[...items, ...items].map((src, i) => (
          <TestiCard key={i} src={src} index={i % items.length} />
        ))}
      </div>
    </div>
  );
};

// ── Section component ───────────────────────────────────────
const GeminiTestimonials = () => {
  // Split into two rows
  const rowA = images.slice(0, 5);
  const rowB = images.slice(5, 10);

  return (
    <section
      className="w-full overflow-hidden py-20"
      style={{ background: "#080808" }}
    >
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <p
          className="text-xs uppercase tracking-[0.35em] mb-3"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}
        >
          Sudah terbukti digunakan
        </p>
        <h2
          className="font-black text-white"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Ribuan Pengguna{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4285F4, #34A853)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sudah Merasakan
          </span>
        </h2>
        <p
          className="mt-3 text-sm"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}
        >
          Bukti nyata dari pengguna aktif Gemini Pro
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <MarqueeRow items={rowA} direction={1} speed={30} />
      </div>

      {/* Row 2 — scrolls right (opposite) */}
      <MarqueeRow items={rowB} direction={-1} speed={28} />

      {/* Bottom CTA strip */}
      <div className="text-center mt-12 px-4">
        <p
          className="text-sm mb-4"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif" }}
        >
          Bergabunglah sekarang dan rasakan manfaatnya
        </p>
        <a
          href="#claim-section"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("claim-section");
          }}
          className="inline-flex items-center gap-2 rounded-full font-semibold text-white transition-all duration-300"
          style={{
            padding: "10px 24px",
            background: "rgba(66,133,244,0.15)",
            border: "1px solid rgba(66,133,244,0.35)",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(66,133,244,0.25)";
            e.currentTarget.style.border = "1px solid rgba(66,133,244,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(66,133,244,0.15)";
            e.currentTarget.style.border = "1px solid rgba(66,133,244,0.35)";
          }}
        >
          <span>Klaim Akses Gratis</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default GeminiTestimonials;
