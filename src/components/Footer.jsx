import { FaWhatsapp, FaYoutube, FaInstagram, FaTelegram } from "react-icons/fa";

const socialLinks = [
  { href: "https://wa.me/6285935313080", icon: <FaWhatsapp />, label: "WhatsApp" },
  { href: "https://t.me/redeem_gemini_bot?start=ref_1787908361", icon: <FaTelegram />, label: "Telegram" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer
      className="w-screen py-8"
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
        {/* Logo + copyright */}
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="Gemini" style={{ width: 28, height: 28, objectFit: "contain" }} />
          <p
            className="text-sm font-light"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            © 2025 Gemini Pro Access. All rights reserved.
          </p>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-5">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-xl transition-all duration-300 hover:scale-125"
              style={{ color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4285F4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-5">
          {["Kebijakan Privasi", "Syarat & Ketentuan"].map((t) => (
            <a
              key={t}
              href="#"
              className="text-xs font-light hover:underline"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif" }}
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
