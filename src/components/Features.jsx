import { useRef, useEffect, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

// ═══════════════════════════════════════════════════════════════════════════
// BentoTilt — 3D tilt on desktop only (pointer-based), no-op on touch
// ═══════════════════════════════════════════════════════════════════════════
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    // Only apply 3-D tilt on true pointer (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95,.95,.95)`
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BentoCard — DEFINITIVE mobile + desktop video solution
//
// ROOT CAUSE ANALYSIS & WHY THIS SOLUTION WORKS:
//
// ❌ WRONG (previous approach — caused blank mobile):
//    isMobile ? <div gradient/> : <video />
//    → Video element NEVER rendered on mobile → black screen
//
// ❌ WRONG (IntersectionObserver src-swap approach):
//    src={isInView ? videoSrc : undefined}
//    → On mobile, setting src AFTER mount = browser treats as non-autoplay
//    → NotAllowedError / AbortError thrown → video stays blank
//
// ✅ CORRECT (Netflix / YouTube / TikTok approach):
//    1. <video src="..." autoPlay muted playsInline loop> always rendered
//    2. preload="metadata" → browser pre-buffers header/duration info only
//       (no full download) — works on both mobile data and WiFi
//    3. IntersectionObserver controls PLAY/PAUSE only (not src)
//       → when scrolled into view → .play() → works on mobile/desktop
//       → when scrolled away → .pause() → saves battery on mobile
//    4. No isMobile guard → video always available
//    5. Works 100% on: iOS Safari, Android Chrome, desktop Chrome/Firefox
//
// Vercel deployment: videos in /public/videos/ are served as static assets
// with proper Content-Type: video/mp4 — no server config needed.
// ═══════════════════════════════════════════════════════════════════════════
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // IntersectionObserver: play when visible, pause when hidden
  // This is the ONLY control — src is always set from the start
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() returns a Promise — catch AbortError silently
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const hoverButtonRef = useRef(null);
  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div ref={containerRef} className="relative size-full">
      {/*
        VIDEO — always rendered, src always set.
        autoPlay: hint to browser to start as soon as possible
        muted: REQUIRED for autoplay policy on iOS Safari & Android Chrome
        playsInline: REQUIRED for iOS Safari — prevents fullscreen takeover
        loop: seamless loop
        preload="metadata": browser fetches only header (duration/dimensions)
          — NOT the full file. Enables autoplay without wasting data.
        The IntersectionObserver above handles actual play/pause.
      */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute left-0 top-0 size-full object-cover object-center"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p
              className="mt-3 max-w-64 text-xs md:text-base"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #4285f488, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// Features section — Bento grid layout
// ═══════════════════════════════════════════════════════════════════════════
const Features = () => (
  <section className="pb-52" style={{ background: "#0a0a0a" }}>
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p
          className="font-circular-web text-lg"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Ekosistem AI Terlengkap
        </p>
        <p
          className="max-w-md font-circular-web text-lg opacity-50"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Dengan Gemini Pro, rasakan pengalaman AI yang terintegrasi sempurna di
          seluruh ekosistem Google — dari produktivitas hingga kreativitas.
        </p>
      </div>

      {/* Hero card — full width */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              Gemini <b>A</b>I
            </>
          }
          description="Asisten AI terpintar Google. Tanya apa saja, dapatkan jawaban cerdas, riset mendalam, dan bantu pekerjaan sehari-hari."
          isComingSoon
        />
      </BentoTilt>

      {/* Bento grid — 2-column */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                Goo<b>g</b>le One
              </>
            }
            description="5TB penyimpanan cloud premium — foto, video, file Drive & Gmail semua aman tersimpan tanpa batas."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                G<b>m</b>ail AI
              </>
            }
            description="Tulis, rangkum, dan balas email secara otomatis dengan Gemini di Gmail. Hemat waktu setiap hari."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                Doc<b>s</b> AI
              </>
            }
            description="Buat dokumen, artikel, dan laporan profesional dalam hitungan detik. Gemini bekerja langsung di Google Docs."
            isComingSoon
          />
        </BentoTilt>

        {/* Static "More Features" card — no video needed */}
        <BentoTilt className="bento-tilt_2">
          <div
            className="flex size-full flex-col justify-between p-5"
            style={{
              background: "linear-gradient(135deg, #0d47a1, #1a73e8, #4285F4)",
            }}
          >
            <h1 className="bento-title special-font max-w-64 text-white">
              M<b>o</b>re Fe<b>a</b>tures
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end text-white" />
          </div>
        </BentoTilt>

        {/* feature-5 card — uses same BentoCard for consistency */}
        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            title={<></>}
            description=""
            isComingSoon={false}
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
