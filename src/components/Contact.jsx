import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="" />
  </div>
);

const Contact = () => {
  return (
    <div
      id="contact"
      className="my-20 min-h-96 w-screen px-10"
      style={{ background: "#080808" }}
    >
      <div
        className="relative rounded-lg py-24 text-blue-50 sm:overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(66,133,244,0.08) 0%, transparent 70%), #0f0f0f",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p
            className="mb-10 font-general text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Bergabung Sekarang
          </p>

          <AnimatedTitle
            title="Mul<b>a</b>i era baru <br /> produktivitas <br /> ber<b>s</b>ama AI"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <p
            className="mt-6 mb-2 max-w-sm text-center text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}
          >
            Gemini Pro 1 Tahun sudah mencakup semua yang Anda butuhkan — AI,
            storage, dan produktivitas tanpa batas.
          </p>

          <p
            className="mb-8 text-center text-sm"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif" }}
          >
            Bergabunglah sekarang dan rasakan manfaatnya
          </p>

          <button
            onClick={() => {
              const el = document.getElementById("claim-section");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black mt-2"
          >
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                Klaim Akses Gratis
              </div>
              <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                Klaim Akses Gratis
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
