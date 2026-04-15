import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import heroBgDefault from "@/assets/hero-bg.png";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { hero } = useContentStore();

  const t1 = hero.title1Style || {};
  const t2 = hero.title2Style || {};
  const sub = hero.subtitleStyle || {};

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero.backgroundImage || heroBgDefault} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${hero.overlayOpacity / 100})` }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          <div className="-mt-20 md:-mt-32 relative z-10">
            <h1 className="font-display leading-[1.05] mb-2 tracking-[-0.02em]">
              <span
                style={{
                  fontSize: t1.fontSize ? `${t1.fontSize}px` : undefined,
                  fontWeight: t1.fontWeight || "800",
                  fontStyle: t1.italic ? "italic" : "normal",
                  color: t1.color || undefined,
                }}
                className={`block ${!t1.fontSize ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : ""} ${!t1.color ? "hero-title-gradient" : ""}`}
              >
                {hero.title1}
              </span>
            </h1>
            <h1 className="font-display leading-[1.05] mb-6 tracking-[-0.02em]">
              <span
                style={{
                  fontSize: t2.fontSize ? `${t2.fontSize}px` : undefined,
                  fontWeight: t2.fontWeight || "800",
                  fontStyle: t2.italic ? "italic" : "normal",
                  color: t2.color || undefined,
                }}
                className={`block ${!t2.fontSize ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : ""} ${!t2.color ? "gradient-text" : ""}`}
              >
                {hero.title2}
              </span>
            </h1>
            <p
              className="max-w-xl leading-[1.6] whitespace-pre-line"
              style={{
                fontSize: sub.fontSize ? `${sub.fontSize}px` : "18px",
                fontWeight: sub.fontWeight || "400",
                fontStyle: sub.italic ? "italic" : "normal",
                color: sub.color || "hsla(0,0%,100%,0.75)",
                letterSpacing: "0.01em",
              }}
            >
              {hero.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
