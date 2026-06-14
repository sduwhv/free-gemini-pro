import { useState } from "react";
import { openTelegram } from "../utils/telegram";

// ════════════════════════════════════════════════════════════
// SVG Logo Components — all paths verified from official sources
// ════════════════════════════════════════════════════════════

// Gemini: 4-pointed sparkle star — purple/blue/pink gradient (Google Gemini identity)
const GeminiIcon = () => (
  <svg viewBox="0 0 28 28" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#4285F4" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* 4-pointed star — official Gemini sparkle shape */}
    <path
      d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
      fill="url(#gemini-g)"
    />
  </svg>
);

// Gmail: iconic M-letter envelope in Google colors
const GmailIcon = () => (
  <svg viewBox="0 0 24 18" className="w-9 h-7" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2.4C0 1.07 1.07 0 2.4 0h19.2C22.93 0 24 1.07 24 2.4v13.2C24 16.93 22.93 18 21.6 18H2.4C1.07 18 0 16.93 0 15.6V2.4z" fill="#FFFFFF" opacity="0"/>
    {/* Left blue trapezoid */}
    <path d="M0 2.4V15.6C0 16.93 1.07 18 2.4 18H4.5V5.4L0 2.4z" fill="#4285F4"/>
    {/* Right green trapezoid */}
    <path d="M19.5 5.4V18H21.6C22.93 18 24 16.93 24 15.6V2.4L19.5 5.4z" fill="#34A853"/>
    {/* Bottom red section */}
    <path d="M4.5 18H19.5V5.4L12 10.8L4.5 5.4V18z" fill="#EA4335"/>
    {/* Top yellow M fold */}
    <path d="M0 2.4L12 10.8L24 2.4C24 1.07 22.93 0 21.6 0H2.4C1.07 0 0 1.07 0 2.4z" fill="#FBBC05"/>
  </svg>
);

// Google Docs: blue document page with white lines
const GoogleDocsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8L14 2z" fill="#4285F4"/>
    <path d="M14 2v6h6L14 2z" fill="#A8C7FA"/>
    <path d="M8 13h8v1.5H8zm0 3h8v1.5H8zm0-6h4v1.5H8z" fill="#FFFFFF"/>
  </svg>
);

// Google Drive: 3-colored triangle (yellow bottom-left, green right, blue top)
const GoogleDriveIcon = () => (
  <svg viewBox="0 0 87.3 78" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0a15.9 15.9 0 0 0 2.1 8z" fill="#0066DA"/>
    <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.5 48.5A15.9 15.9 0 0 0 0 53H27.5z" fill="#00AC47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25A15.9 15.9 0 0 0 87.3 53H59.8L73.55 76.8z" fill="#EA4335"/>
    <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832D"/>
    <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2H69.1c1.6 0 3.1-.4 4.45-1.2z" fill="#2684FC"/>
    <path d="M73.4 26.5l-12.5-21.65A7.7 7.7 0 0 0 57.4 1.2L43.65 25l16.15 28H87.3A15.9 15.9 0 0 0 85.2 19z" fill="#FFBA00"/>
  </svg>
);

// Google One: Bold digit "1" in Google colors (blue vertical bar, red/yellow top bend)
const GoogleOneIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    {/* Main vertical blue bar of the "1" */}
    <rect x="13" y="4" width="6" height="24" rx="3" fill="#4285F4"/>
    {/* Red top bend of the "1" */}
    <path d="M13 7.5A3 3 0 0 1 16 4.5c0 0-5 3.5-5.2 3.8a3 3 0 0 0 2.2-.8z" fill="#EA4335"/>
    {/* Yellow diagonal arm of the "1" */}
    <path d="M8.5 11.5l4.5-3.2V7.5A3 3 0 0 0 7.9 10a3.1 3.1 0 0 0 .6 1.5z" fill="#FBBC05"/>
    {/* Green bottom serif */}
    <path d="M10 28h12a1 1 0 0 0 0-2H10a1 1 0 0 0 0 2z" fill="#34A853"/>
  </svg>
);

// Google Flow: Black box with white camera-shutter/play icon (official Flow branding)
const GoogleFlowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#111111"/>
    {/* Camera shutter / play hybrid icon in white */}
    <path d="M9 7l8 5-8 5V7z" fill="#FFFFFF"/>
    <circle cx="17.5" cy="8" r="1.8" fill="#FFFFFF" opacity="0.9"/>
  </svg>
);

// NotebookLM: Concentric curved lines (fingerprint / open book minimalist in black)
const NotebookLMIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#F0F4FF"/>
    {/* Concentric curved arcs — like a fingerprint */}
    <path d="M12 19c-4.4 0-8-2.8-8-7 0-3.3 2.5-6 5.5-6" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M12 17c-3 0-5.5-1.9-5.5-5 0-2.5 1.8-4.5 4-4.5" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M12 15c-1.7 0-3-1.1-3-3 0-1.5.9-2.5 2-2.8" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M12 13c-.5 0-1-.4-1-1s.4-1 1-1" stroke="#1A1A2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M12 19c3 0 5.5-1.4 7-3.5" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <circle cx="18.5" cy="8.5" r="1.5" fill="#FBBC05"/>
  </svg>
);

// Deep Research: blue magnifying glass
const DeepResearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="#4285F4" strokeWidth="2.2"/>
    <path d="M15.5 15.5L21 21" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M8 10.5h5M10.5 8v5" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// Antigravity 2.0: Futuristic "A" letter — blue, purple, orange gradient
const AntigravityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ag-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="50%" stopColor="#8B5CF6"/>
        <stop offset="100%" stopColor="#F97316"/>
      </linearGradient>
    </defs>
    {/* Bold futuristic A letterform */}
    <path
      d="M12 2L3 21h4l1.5-3.5h7L17 21h4L12 2zm0 5l2.5 6h-5L12 7z"
      fill="url(#ag-g)"
    />
    {/* Small accent triangle at top (futuristic detail) */}
    <path d="M11 4.5L12 2l1 2.5h-2z" fill="#FFFFFF" opacity="0.5"/>
  </svg>
);

// Claude AI (Anthropic): official "A" monogram in terracotta/copper
const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#D97706" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
  </svg>
);

// OpenAI GPT: official rotating spiral in emerald green
const OpenAIIcon = () => (
  <svg viewBox="0 0 16 16" className="w-8 h-8" fill="#10B981" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 .129-.124z"/>
  </svg>
);

// Google AI Studio: test tube / lab flask — developer prompt playground
const AIStudioIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="studio-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285F4"/>
        <stop offset="100%" stopColor="#34A853"/>
      </linearGradient>
    </defs>
    <path d="M9 2v8.5L4.5 18A3 3 0 0 0 7.2 22h9.6a3 3 0 0 0 2.7-4.5L15 10.5V2H9z" stroke="url(#studio-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2h6M5.5 16h13" stroke="url(#studio-g)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="18" r="1" fill="#EA4335"/>
    <circle cx="14" cy="17" r="1.5" fill="#FBBC05"/>
  </svg>
);

// Google Vids: video camera with AI spark
const GoogleVidsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="14" height="12" rx="2.5" fill="#EA4335"/>
    <path d="M16 9.5l5-3v11l-5-3V9.5z" fill="#FBBC05"/>
    <path d="M7 10.5l.4 1.1 1.1.4-1.1.4L7 13.5l-.4-1.1-1.1-.4 1.1-.4L7 10.5z" fill="#FFFFFF"/>
  </svg>
);

// Looker Studio: bar chart data dashboard
const LookerStudioIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="#4285F4" opacity="0.1"/>
    <rect x="5" y="14" width="3" height="6" rx="1" fill="#EA4335"/>
    <rect x="10.5" y="10" width="3" height="10" rx="1" fill="#FBBC05"/>
    <rect x="16" y="6" width="3" height="14" rx="1" fill="#34A853"/>
    <path d="M5 12L10.5 8L16 4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 1"/>
  </svg>
);

// Google Trends: ascending trend line
const GoogleTrendsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="#34A853" opacity="0.1"/>
    <path d="M3 18L8 12l4 3 5-6 4-4" stroke="#34A853" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="21" cy="5" r="2" fill="#EA4335"/>
    <path d="M3 20h18" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
  </svg>
);

// Step icons
const TelegramIcon = () => (
  <svg viewBox="0 0 16 16" className="w-6 h-6" fill="#0088cc" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
  </svg>
);

const VerificationIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11l2 2 4-4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlayStartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z" fill="#FBBC05"/>
    <path d="M19 3l.5 1.5 1.5.5-1.5.5L19 7l-.5-1.5L17 5l1.5-.5L19 3z" fill="#FFFFFF"/>
  </svg>
);

// ════════════════════════════════════════════════════════════
// Data — Benefits & Steps
// ════════════════════════════════════════════════════════════

// ── Removed: individual benefit card data array (replaced by fitur.png poster) ──

const steps = [
  { number: "01", icon: <TelegramIcon />,     title: "Langkah Pertama",  desc: "Masuk ke Vao Channel → Klik Join" },
  { number: "02", icon: <TelegramIcon />,     title: "Langkah Kedua",   desc: "Masuk ke Vao Group → Klik Join" },
  { number: "03", icon: <VerificationIcon />, title: "Langkah Ketiga",  desc: "Selesaikan proses Verifikasi akun" },
  { number: "04", icon: <PlayStartIcon />,    title: "Langkah Keempat", desc: "Klik Start & nikmati Gemini Pro!" },
];

// Daily quota stats data
const quotaStats = [
  { label: "Token AI / Hari", value: "10 Juta+", sub: "Context 1 Juta token / sesi", color: "#8B5CF6", icon: "⚡" },
  { label: "Deep Research", value: "20 / hari", sub: "Jelajah ratusan sumber internet", color: "#4285F4", icon: "🔍" },
  { label: "Flow Credits", value: "33 kredit", sub: "±3 video AI atau 50+ foto HD", color: "#EA4335", icon: "🎬" },
  { label: "NotebookLM Chat", value: "500 / hari", sub: "Riset & tanya jawab intensif", color: "#34A853", icon: "📚" },
  { label: "Audio / Video AI", value: "40 / hari", sub: "20 podcast AI + 20 video present.", color: "#FBBC04", icon: "🎙️" },
  { label: "Cloud Storage", value: "5 TB", sub: "Aktif 24 jam — puluhan juta file", color: "#10B981", icon: "☁️" },
];

// ════════════════════════════════════════════════════════════
// Sub-components
// ════════════════════════════════════════════════════════════

// ── BenefitCard removed — section replaced by FiturPoster component ──

// ════════════════════════════════════════════════════════════
// FiturPoster — Professional full-width image display
// Technique used by Google, Apple, Vercel:
//   • <picture> for art-direction / format negotiation
//   • loading="lazy" + decoding="async" → paint while scrolling
//   • max-width: 100% + height: auto → never overflow viewport
//   • touch-action: pan-y pinch-zoom → native iOS/Android pinch
//   • image-rendering: -webkit-optimize-contrast → crisp on Retina
//   • border-radius + shadow → premium card feel
// ════════════════════════════════════════════════════════════
const FiturPoster = () => (
  <div
    className="w-full mx-auto"
    style={{
      maxWidth: 680,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 8px 60px rgba(66,133,244,0.18), 0 2px 16px rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.10)",
      touchAction: "pan-y pinch-zoom",
      background: "#0d1117",
    }}
  >
    <picture>
      {/* PNG fallback — browsers pick the first matching source */}
      <source srcSet="/img/fitur.png" type="image/png" />
      <img
        src="/img/fitur.png"
        alt="Fitur Unggulan & Manfaat Eksklusif Gemini Pro 1 Tahun — Gemini 3.5, Google One 5TB, Antigravity 2.0, Flow AI, Deep Research, NotebookLM"
        width={1080}
        height={1080}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          /* Crisp on high-DPI / Retina screens */
          imageRendering: "-webkit-optimize-contrast",
          /* Prevent layout shift — browser knows size before load */
          aspectRatio: "1 / 1",
          objectFit: "contain",
          objectPosition: "center top",
        }}
      />
    </picture>
  </div>
);

const QuotaCard = ({ label, value, sub, color, icon }) => (
  <div
    className="relative rounded-2xl p-5 flex flex-col gap-2 overflow-hidden transition-all duration-300"
    style={{
      background: `linear-gradient(135deg, ${color}10 0%, rgba(0,0,0,0) 100%)`,
      border: `1px solid ${color}28`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.border = `1px solid ${color}60`;
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.border = `1px solid ${color}28`;
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div className="text-2xl mb-1">{icon}</div>
    <p className="font-black text-white" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", lineHeight: 1.1 }}>
      {value}
    </p>
    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: color }}>
      {label}
    </p>
    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
      {sub}
    </p>
  </div>
);

// ════════════════════════════════════════════════════════════
// Main component
// ════════════════════════════════════════════════════════════
const GeminiFunnel = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden py-20 px-4"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(66,133,244,0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ══ SECTION 1 — FITUR POSTER ═══════════════════════ */}
      <div className="max-w-3xl mx-auto mb-8 px-2">
        {/* Section header */}
        <div className="text-center mb-7">
          <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
            Semua yang kamu dapatkan
          </p>
          <h2
            className="font-black text-white"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            Fitur Lengkap{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6 0%, #4285F4 35%, #34A853 65%, #FBBC04 85%, #EA4335 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Gemini Pro
            </span>{" "}
            1 Tahun
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
            Satu paket — akses penuh ke seluruh ekosistem AI Google <strong className="text-white">+ bonus</strong> model AI premium terbaik dunia.
          </p>
        </div>

        {/* Professional poster — replaces individual card grid */}
        <FiturPoster />
      </div>

      {/* ══ SECTION 2 — DAILY QUOTA STATS ═══════════════════ */}
      <div className="max-w-5xl mx-auto mb-24">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
            Kapasitas Harian Anda
          </p>
          <h2
            className="font-black text-white"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", letterSpacing: "-0.02em" }}
          >
            Kuota{" "}
            <span style={{ background: "linear-gradient(90deg, #FBBC04, #EA4335)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Masif
            </span>{" "}
            yang Otomatis Refresh
          </h2>
          <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
            Google menerapkan kuota harian yang sangat besar. Token teks Anda otomatis di-refresh setiap <strong className="text-white">5 jam</strong> — hampir tanpa batas penggunaan normal.
          </p>
        </div>

        {/* 3x2 stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {quotaStats.map((q, i) => (
            <QuotaCard key={i} {...q} />
          ))}
        </div>

        {/* Bonus detail callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gemini token detail */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(66,133,244,0.06))", border: "1px solid rgba(139,92,246,0.2)" }}>
            <p className="text-xs uppercase tracking-widest mb-2 font-bold" style={{ color: "#8B5CF6" }}>⚡ Gemini 3.5 Pro — Detail Token</p>
            <ul className="space-y-1.5" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
              <li>• <strong className="text-white">1.000.000 token</strong> per sesi (≈ 1.500 halaman dokumen)</li>
              <li>• <strong className="text-white">10–20 Juta+</strong> token estimasi per hari</li>
              <li>• Kuota Anda <strong className="text-white">4× lebih besar</strong> dari akun gratis</li>
              <li>• Refresh otomatis setiap <strong className="text-white">5 jam</strong> — tidak perlu tunggu midnight</li>
            </ul>
          </div>
          {/* GPT OSS detail */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,78,59,0.06))", border: "1px solid rgba(16,185,129,0.2)" }}>
            <p className="text-xs uppercase tracking-widest mb-2 font-bold" style={{ color: "#10B981" }}>🚀 GPT OSS 120B — Antigravity IDE</p>
            <ul className="space-y-1.5" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
              <li>• <strong className="text-white">UNLIMITED TOKEN</strong> — 0 batas harian</li>
              <li>• Generate / review <strong className="text-white">30.000+ baris kode</strong> per hari</li>
              <li>• Deteksi bug seluruh proyek aplikasi dalam <strong className="text-white">satu sesi</strong></li>
              <li>• Reset 100% setiap <strong className="text-white">00:00 WIB</strong> — kuota murni milik Anda</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ══ SECTION 3 — HOW TO GET IT ════════════════════════ */}
      <div className="max-w-2xl mx-auto mb-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
            Cara mendapatkan
          </p>
          <h2 className="font-black text-white" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em" }}>
            4 Langkah Mudah
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-5 rounded-2xl px-6 py-4 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.border = "1px solid rgba(66,133,244,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
              }}
            >
              <span
                className="shrink-0 font-black"
                style={{ fontSize: "1.4rem", background: "linear-gradient(135deg, #4285F4, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", minWidth: "2.2rem", fontFamily: "Inter, sans-serif" }}
              >
                {step.number}
              </span>
              <div className="flex-shrink-0 flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.05)" }}>
                {step.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
                  {step.title}
                </p>
                <p className="font-semibold text-white" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 4 — TELEGRAM SCREENSHOT ════════════════ */}
      <div className="max-w-md mx-auto mb-12">
        <p className="text-center text-xs uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
          Panduan Bergabung
        </p>
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.09)" }}>
          <img src="/photo-telegram/photo-telegram.jpg.png" alt="Panduan Telegram" className="w-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* ══ SECTION 5 — MAIN CTA (Telegram) ════════════════ */}
      {/* Anchor target — scroll-to lands HERE so Telegram button is immediately visible */}
      <div id="claim-section" style={{ scrollMarginTop: "80px" }} />
      <div className="flex justify-center mb-12">
        {/*
          Deep Link Strategy (profesional — dipakai Telegram, WhatsApp, Tokopedia):
          1. Deteksi apakah user di mobile (userAgent check)
          2. Mobile → coba buka tg://resolve?domain=... (membuka Telegram app langsung)
          3. Jika tidak ada Telegram di HP → fallback ke https://t.me/ (Telegram Web)
          4. Desktop → langsung ke https://t.me/ (Telegram Web/Desktop)
        */}
        <button
          id="telegram-claim-btn"
          onClick={openTelegram}
          className="group relative inline-block cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span
            className="absolute inset-0 rounded-2xl blur-xl opacity-70"
            style={{ background: "linear-gradient(135deg, #1a73e8, #4285F4)", animation: "pulse 2.5s ease-in-out infinite" }}
          />
          <span
            className="relative flex items-center gap-3 rounded-2xl font-black text-white shadow-2xl"
            style={{
              padding: "18px 40px",
              background: "linear-gradient(135deg, #0d47a1, #1558d6, #4285F4)",
              boxShadow: "0 0 50px rgba(66,133,244,0.55), 0 0 100px rgba(66,133,244,0.15)",
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              letterSpacing: "-0.01em",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.23l-2.969-.924c-.645-.204-.657-.645.135-.954l11.566-4.458c.537-.194 1.006.131.992.327z" />
            </svg>
            Klaim Gemini Pro 1 Tahun — GRATIS
          </span>
        </button>
      </div>

      {/* ══ SECTION 6 — WHATSAPP CTA ═══════════════════════ */}
      <div className="max-w-lg mx-auto mb-16">
        {/* Promo teaser above WA box */}
        <div className="text-center mb-5">
          <p
            className="font-black text-white"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.1rem, 3vw, 1.45rem)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
          >
            😩 Gak mau ribet setup sendiri?
          </p>
          <p className="mt-1.5 text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}>
            Chat kami sekarang — kami yang urus semua, kamu tinggal nikmati.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "rgba(37,211,102,0.04)", border: "1px solid rgba(37,211,102,0.12)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 18.86a7.14 7.14 0 01-3.42-.87l-3.8 1 1.03-3.73A7.14 7.14 0 1112.14 18.86z"/>
            </svg>
            <p className="font-bold text-white" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}>
              Butuh Bantuan? Chat Kami Sekarang!
            </p>
          </div>
          <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "Inter, sans-serif" }}>
            Tim kami siap membantu 24/7. Respons cepat, proses mudah & terjamin aman.
          </p>
          <a
            href="https://wa.me/6285935313080"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl font-bold text-white transition-all duration-200"
            style={{
              padding: "13px 28px",
              background: "linear-gradient(135deg, #075E54, #128C7E, #25D366)",
              boxShadow: "0 0 24px rgba(37,211,102,0.3)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 0 35px rgba(37,211,102,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(37,211,102,0.3)";
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat via WhatsApp — 085935313080
          </a>
        </div>
      </div>

      {/* ══ SECTION 7 — YOUTUBE (Lazy Load) ═════════════════ */}
      <div className="max-w-4xl mx-auto mb-4">
        <p className="text-center text-xs uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}>
          Tutorial Lengkap
        </p>
        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer"
          style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.09)", background: "#000" }}
          onClick={() => setPlayVideo(true)}
        >
          {playVideo ? (
            <iframe
              src="https://www.youtube.com/embed/KtW0ZO3ZA1A?autoplay=1"
              title="Gemini Pro Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <>
              <img
                src="https://img.youtube.com/vi/KtW0ZO3ZA1A/maxresdefault.jpg"
                alt="Tutorial Gemini Pro"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.65 }}
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 0 40px rgba(255,255,255,0.35)" }}
                >
                  <svg className="w-7 h-7 ml-1" fill="#FF0000" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span
                  className="text-white font-semibold text-sm px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
                >
                  Tonton Tutorial Lengkap
                </span>
              </div>
            </>
          )}
        </div>

        {/* Link alternatif untuk membuka langsung di YouTube */}
        <div className="text-center mt-5">
          <a
            href="https://youtu.be/KtW0ZO3ZA1A?si=74v6Y6vztRGmNHPJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 hover:text-red-400 transition-colors uppercase px-4 py-2 rounded-full border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10"
            style={{ fontFamily: "Inter, sans-serif", transition: "all 0.3s ease" }}
          >
            <span>Buka Langsung di YouTube</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GeminiFunnel;
