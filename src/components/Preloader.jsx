import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAudio } from "../context/AudioContext";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const { playAudio } = useAudio();

  // ── Lock Body Scroll ──
  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";
    // For iOS Safari
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    return () => {
      // Re-enable scrolling when unmounted
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  // ── Fake Loader Progress ──
  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      // Random increment for a more organic loading feel
      const increment = Math.floor(Math.random() * 10) + 1;
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 200); // small delay at 100% before showing button
      }
      
      setProgress(currentProgress);
    }, 150); // Speed of loading

    return () => clearInterval(interval);
  }, []);

  // ── Enter Experience Handler ──
  const handleEnter = () => {
    // 1. Force audio unlock and play
    playAudio();

    // 2. Animate out the preloader
    gsap.to(containerRef.current, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        // 3. Notify App to completely unmount Preloader and enable normal scrolling
        onComplete();
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "rgba(8, 8, 8, 0.75)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-10">
        
        {/* Gemini Logo Silhouette or Simple Text */}
        <div className="relative flex flex-col items-center gap-4 opacity-80">
          <img src="/img/logo.png" alt="Gemini Logo" className="w-16 h-16 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          <h2 className="text-sm tracking-[0.3em] text-white/50 uppercase font-medium">Gemini Pro Experience</h2>
        </div>

        {/* Loading Counter or Enter Button */}
        <div className="h-32 flex items-center justify-center">
          {!isLoaded ? (
            // Counter
            <div className="flex flex-col items-center gap-4">
              <span className="text-7xl md:text-9xl font-black text-white font-zentry tracking-tight">
                {progress}%
              </span>
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            // Enter Button
            <button
              onClick={handleEnter}
              className="group relative overflow-hidden rounded-full px-10 py-5 font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
              }}
            >
              {/* Shimmer Effect */}
              <span className="absolute inset-0 preloader-button-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Gradient Text */}
              <span className="relative z-10 gemini-animated-gradient text-lg">
                Mulai Pengalaman
              </span>
            </button>
          )}
        </div>

        {/* Security / Quality Badges */}
        <div className="absolute bottom-10 flex gap-6 text-[10px] uppercase tracking-widest text-white/30">
          <span>Secured Connection</span>
          <span>•</span>
          <span>High Fidelity Audio</span>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
