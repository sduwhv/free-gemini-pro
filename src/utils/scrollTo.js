/**
 * scrollToSection(id)
 * Smooth scroll ke element dengan ID tertentu.
 * Digunakan oleh semua tombol "Klaim" yang bukan langsung ke Telegram.
 *
 * @param {string} id - ID element tanpa '#', contoh: "claim-section"
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
