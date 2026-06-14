import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
//  Global Audio Context
//  Provides a single audio instance shared across all components.
//  Technique: AudioContext unlock (bypasses autoplay policy on
//  Chrome/Firefox/Safari/iOS) used by Spotify Web Player &
//  YouTube Music — most reliable approach available in 2024.
// ─────────────────────────────────────────────────────────────

const AudioCtx = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);      // Web AudioContext for unlock
  const sourceRef = useRef(null);        // MediaElementSourceNode
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockedRef = useRef(false);

  // ── 1. Create the HTMLAudioElement once ──────────────────
  useEffect(() => {
    const audio = new Audio("/mp3/bgm.mp3.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    // Security: restrict CORS on the audio request
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // ── 2. Unlock AudioContext on first user gesture ─────────
  //  Most browsers (including iOS Safari since iOS 13) require a
  //  user-gesture before ANY audio can play. We listen for the
  //  FIRST gesture on the document and resume the suspended
  //  AudioContext, which permanently unlocks audio for the session.
  const unlock = useCallback(async () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;

    try {
      // Create Web AudioContext
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
          // Connect our <audio> element through the Web AudioContext
          // so it shares the same unlocked context
          if (!sourceRef.current && audioRef.current) {
            sourceRef.current = audioCtxRef.current.createMediaElementSource(
              audioRef.current
            );
            sourceRef.current.connect(audioCtxRef.current.destination);
          }
        }
      }

      if (audioCtxRef.current?.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      setIsUnlocked(true);

      // Start playing immediately after unlock
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (_) {
          // User may have paused — that's OK
        }
      }
    } catch (_) {
      // Silently fail — audio is non-critical
    }
  }, []);

  // ── 3. Attempt silent autoplay on mount ─────────────────
  //  Works in browsers that allow autoplay (desktop Chrome with
  //  the site previously visited, or when MEI > 0).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsUnlocked(true);
        unlockedRef.current = true;
      } catch (_) {
        // Blocked — wait for first user interaction (step 4)
      }
    };

    // Small delay so the browser marks the page as "loaded"
    // which improves MEI score and autoplay chance
    const timer = setTimeout(tryAutoplay, 200);
    return () => clearTimeout(timer);
  }, []);

  // ── 4. Listen for first user interaction as fallback ────
  useEffect(() => {
    const events = ["click", "touchstart", "keydown", "pointerdown"];
    const handleInteraction = () => {
      unlock();
      // Remove all listeners after first interaction
      events.forEach((e) =>
        document.removeEventListener(e, handleInteraction, true)
      );
    };

    events.forEach((e) =>
      document.addEventListener(e, handleInteraction, { capture: true, once: false })
    );

    return () => {
      events.forEach((e) =>
        document.removeEventListener(e, handleInteraction, true)
      );
    };
  }, [unlock]);

  // ── 5. Toggle play/pause ─────────────────────────────────
  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isUnlocked) {
      await unlock();
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (_) {}
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isUnlocked, unlock]);

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleAudio, isUnlocked }}>
      {children}
    </AudioCtx.Provider>
  );
};

// Custom hook for consuming audio state
export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
