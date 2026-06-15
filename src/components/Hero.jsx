import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { scrollToSection } from "../utils/scrollTo";

gsap.registerPlugin(ScrollTrigger);

const HeroCTA = ({ handleClaimClick }) => (
  <>
    {/* Pill badge */}
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#4285F4",
          display: "inline-block",
          boxShadow: "0 0 8px #4285F4",
          flexShrink: 0,
        }}
      />
      Google One · Gemini Pro
    </span>

    {/* CTA button with shimmer */}
    <button
      id="free-gemini-btn"
      onClick={handleClaimClick}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl font-bold text-white"
      style={{
        padding: "14px 28px",
        background: "linear-gradient(135deg, #1558d6, #4285F4)",
        boxShadow: "0 0 28px rgba(66,133,244,0.5), 0 4px 24px rgba(0,0,0,0.5)",
        fontSize: "0.95rem",
        fontFamily: "Inter, sans-serif",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 0 40px rgba(66,133,244,0.7), 0 4px 28px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 0 28px rgba(66,133,244,0.5), 0 4px 24px rgba(0,0,0,0.5)";
      }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          transition: "transform 0.7s ease",
        }}
      />
      <img
        src="/img/logo.png"
        alt="Gemini"
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          flexShrink: 0,
        }}
      />
      <span>Klaim Gemini Gratis</span>
      <svg
        style={{ width: 16, height: 16, transition: "transform 0.25s ease" }}
        className="group-hover:translate-y-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {/* Trust strip */}
    <div className="flex items-center gap-4">
      {["Aman", "Resmi", "Terpercaya"].map((t) => (
        <span
          key={t}
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, sans-serif" }}
        >
          <svg
            style={{ width: 12, height: 12, flexShrink: 0 }}
            fill="#34A853"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {t}
        </span>
      ))}
    </div>
  </>
);

const Hero = () => {
  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Pada HP/mobile, bypass scrollTrigger clip-path untuk menghindari video terpotong
      gsap.set("#video-frame", {
        clipPath: "none",
        borderRadius: "24px",
      });
      return;
    }

    const targetClipPath = "polygon(14% 0, 72% 0, 88% 90%, 0 95%)";   // trapesium miring desktop
    const targetBorderRadius = "0% 0% 40% 10%";  // rounded corners miring desktop

    gsap.set("#video-frame", {
      clipPath: targetClipPath,
      borderRadius: targetBorderRadius,
    });
    
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleClaimClick = () => {
    scrollToSection("claim-section");
  };

  return (
    <div className="relative min-h-screen md:h-dvh w-screen overflow-x-hidden flex flex-col justify-center items-center md:block bg-[#080808] pt-20 pb-8 md:p-0">
      <div
        id="video-frame"
        className="relative z-10 w-[92vw] aspect-square md:w-screen md:h-dvh overflow-hidden rounded-2xl md:rounded-lg shadow-2xl md:shadow-none border border-white/5 md:border-none mx-auto md:mx-0"
        style={{ background: "#050505" }}
      >
        {/* ── Video Layer ── */}
        <div className="absolute inset-0 w-full h-full">
          <video
            src="/videos/hero-1.mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: "translateZ(0) scale(1.001)", /* sub-pixel fix */
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
              imageRendering: "auto", /* smooths out video compression blocks */
              filter: "contrast(1.06) brightness(1.03) saturate(1.08)", /* enhance detail and colors */
            }}
          />

          {/* ── Dot-Matrix Overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
              opacity: 0.22,
            }}
          />

          {/* Very light vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.05) 40%, rgba(5,5,5,0.05) 65%, rgba(5,5,5,0.85) 100%)",
            }}
          />

          {/* Subtle left-side glow for button readability (Desktop only) */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse 45% 60% at 5% 85%, rgba(5,5,5,0.8) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Desktop CTA Overlay ── */}
        <div className="hidden md:flex absolute bottom-10 left-6 sm:left-12 md:left-16 z-40 flex-col items-start gap-4">
          <HeroCTA handleClaimClick={handleClaimClick} />
        </div>
      </div>

      {/* ── Mobile CTA Section (Natural Flow, no overlay crop) ── */}
      <div className="flex md:hidden flex-col items-center gap-4 mt-6 z-40 px-6 w-full text-center">
        <HeroCTA handleClaimClick={handleClaimClick} />
      </div>
    </div>
  );
};

export default Hero;
