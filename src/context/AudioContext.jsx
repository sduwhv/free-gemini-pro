import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
//  Global Audio Context
//  Provides a single audio instance shared across all components.
//  Uses pure HTML5 Audio to avoid CORS silent bugs and 
//  asynchronous browser gesture chain breakage on mobile.
// ─────────────────────────────────────────────────────────────

const AudioCtx = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // ── 1. Create the HTMLAudioElement once ──────────────────
  useEffect(() => {
    // bgm.mp3.mp3 is the exact name of the file in public/mp3/
    const audio = new Audio("/mp3/bgm.mp3.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ── 2. Play audio (Synchronous to preserve user gesture) ──
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsUnlocked(true);
      })
      .catch((err) => {
        console.warn("Autoplay blocked or playback failed:", err);
      });
  }, []);

  // ── 3. Toggle play/pause ─────────────────────────────────
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsUnlocked(true);
        })
        .catch((err) => {
          console.warn("Playback failed:", err);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // ── 4. Try silent autoplay on mount (MEI score fallback) ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsUnlocked(true);
        })
        .catch(() => {
          // Blocked by browser autoplay policy — user gesture required
        });
    };

    const timer = setTimeout(tryAutoplay, 200);
    return () => clearTimeout(timer);
  }, []);

  // ── 5. Fallback unlock on first interaction anywhere ──────
  useEffect(() => {
    const events = ["click", "touchstart", "keydown", "pointerdown"];
    
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsUnlocked(true);
            // Remove listeners once successfully playing
            events.forEach((e) =>
              document.removeEventListener(e, handleInteraction, true)
            );
          })
          .catch(() => {
            // Keep listening if it fails
          });
      }
    };

    events.forEach((e) =>
      document.addEventListener(e, handleInteraction, { capture: true, once: false })
    );

    return () => {
      events.forEach((e) =>
        document.removeEventListener(e, handleInteraction, true)
      );
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleAudio, playAudio, isUnlocked }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
