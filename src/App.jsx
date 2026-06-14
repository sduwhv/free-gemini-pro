import { useEffect, useRef } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GeminiFunnel from "./components/GeminiFunnel";
import GeminiTestimonials from "./components/GeminiTestimonials";

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Strategy: attempt silent autoplay immediately on mount.
    // Modern browsers block autoplay until a user gesture has occurred;
    // we store a flag so the FIRST interaction (any click/touch/key)
    // triggers playback and then removes itself — giving instant audio
    // without waiting for the user to scroll or do anything specific.
    audio.volume = 0.3;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    // 1. Try immediately (works in some browsers / when page is reloaded
    //    in background tabs or when the browser has a "trusted" context)
    tryPlay();

    // 2. Fallback: play on the very first interaction (click, touch, or keydown)
    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("click", onFirstInteraction, true);
      window.removeEventListener("touchstart", onFirstInteraction, true);
      window.removeEventListener("keydown", onFirstInteraction, true);
      window.removeEventListener("scroll", onFirstInteraction, true);
    };

    window.addEventListener("click", onFirstInteraction, true);
    window.addEventListener("touchstart", onFirstInteraction, true);
    window.addEventListener("keydown", onFirstInteraction, true);
    window.addEventListener("scroll", onFirstInteraction, { once: true, capture: true });

    return () => {
      window.removeEventListener("click", onFirstInteraction, true);
      window.removeEventListener("touchstart", onFirstInteraction, true);
      window.removeEventListener("keydown", onFirstInteraction, true);
      window.removeEventListener("scroll", onFirstInteraction, true);
    };
  }, []);

  return (
    <>
      {/* Background audio — plays immediately or on first interaction */}
      <audio
        ref={audioRef}
        src="/mp3/bgm.mp3.mp3"
        loop
        preload="auto"
      />

      <main className="relative min-h-screen w-screen overflow-x-hidden" style={{ background: "#080808" }}>
        <NavBar />
        <Hero />
        <GeminiFunnel />
        <About />
        <Features />
        <Story />
        <Contact />
        <GeminiTestimonials />
        <Footer />
      </main>
    </>
  );
}

export default App;
