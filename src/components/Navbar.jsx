import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "../context/AudioContext";

const navItems = ["Fitur", "Tentang", "Cara Klaim", "Kontak"];

// Smooth scroll helper — works on iOS Safari, Android Chrome, all desktop browsers
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Maps each nav item to the section ID it should scroll to
const navScrollTargets = [
  "about",         // Fitur
  "story",         // Tentang
  "claim-section", // Cara Klaim → langsung ke tombol Telegram klaim
  "contact",       // Kontak
];

const NavBar = () => {
  // ── Audio — connected to the global shared instance ──────
  // No <audio> element here. The actual audio lives in AudioContext.jsx
  // and is shared with the rest of the app to prevent double-audio.
  const { isPlaying, toggleAudio } = useAudio();

  // Refs for navigation container
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Gemini" className="w-9 h-9 object-contain" />
            <span
              className="hidden sm:block font-bold text-sm"
              style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}
            >
              Gemini Pro
            </span>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(navScrollTargets[index])}
                  className="nav-hover-btn"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Audio toggle — controls the single shared bgm.mp3.mp3 */}
            <button
              onClick={toggleAudio}
              aria-label={isPlaying ? "Matikan musik latar" : "Nyalakan musik latar"}
              className="ml-10 flex items-center space-x-0.5"
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isPlaying,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
