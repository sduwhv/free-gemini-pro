/**
 * openTelegram — Deep Link Strategy (digunakan di Telegram resmi, Tokopedia, WhatsApp)
 *
 * 1. Mobile   → coba tg://resolve?domain=... (membuka Telegram app langsung)
 *              → jika app tidak terinstall, fallback ke https://t.me/ dalam 1.5s
 * 2. Desktop  → langsung buka https://t.me/ di tab baru
 */

const TELEGRAM_BOT   = "redeem_gemini_bot";
const TELEGRAM_START = "ref_1787908361";

const TELEGRAM_BOT_2   = "sheeridverifier_bot";
const TELEGRAM_START_2 = "REF1787908361";

export const TELEGRAM_WEB_URL = `https://t.me/${TELEGRAM_BOT}?start=${TELEGRAM_START}`;
export const TELEGRAM_APP_URL = `tg://resolve?domain=${TELEGRAM_BOT}&start=${TELEGRAM_START}`;

export const TELEGRAM_WEB_URL_2 = `https://t.me/${TELEGRAM_BOT_2}?start=${TELEGRAM_START_2}`;
export const TELEGRAM_APP_URL_2 = `tg://resolve?domain=${TELEGRAM_BOT_2}&start=${TELEGRAM_START_2}`;

/**
 * Deteksi mobile: Android / iPhone / iPad / iPod / Opera Mini / IEMobile
 */
export function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(
    navigator.userAgent
  );
}

/**
 * openTelegram()
 * Panggil fungsi ini di setiap tombol "Klaim" di seluruh aplikasi.
 */
export function openTelegram() {
  if (isMobileDevice()) {
    let appOpened = false;

    const timeout = setTimeout(() => {
      // App tidak terbuka dalam 1.5 detik → fallback ke Telegram Web
      if (!appOpened) {
        window.location.href = TELEGRAM_WEB_URL;
      }
    }, 1500);

    // Jika Telegram app terbuka, page akan menjadi hidden
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
        clearTimeout(timeout);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    // Coba buka Telegram app
    window.location.href = TELEGRAM_APP_URL;
  } else {
    // Desktop → buka Telegram Web di tab baru
    window.open(TELEGRAM_WEB_URL, "_blank", "noopener,noreferrer");
  }
}

/**
 * openTelegram2()
 * Panggil fungsi ini untuk link klaim alternatif ke-2.
 */
export function openTelegram2() {
  if (isMobileDevice()) {
    let appOpened = false;

    const timeout = setTimeout(() => {
      if (!appOpened) {
        window.location.href = TELEGRAM_WEB_URL_2;
      }
    }, 1500);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
        clearTimeout(timeout);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.location.href = TELEGRAM_APP_URL_2;
  } else {
    window.open(TELEGRAM_WEB_URL_2, "_blank", "noopener,noreferrer");
  }
}
