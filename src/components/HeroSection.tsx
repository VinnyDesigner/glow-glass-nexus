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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero.backgroundImage || heroBgDefault} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${hero.overlayOpacity / 100})` }} />
        {/* Subtle animated grid overlay for GIS feel */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(hsla(0,0%,100%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating glass elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-20 h-20 rounded-2xl bg-[hsla(0,0%,100%,0.05)] backdrop-blur-sm border border-[hsla(0,0%,100%,0.1)] rotate-12 animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-3xl bg-[hsla(0,0%,100%,0.04)] backdrop-blur-sm border border-[hsla(0,0%,100%,0.08)] -rotate-6 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[35%] right-[20%] w-14 h-14 rounded-xl bg-[hsla(0,100%,59%,0.06)] backdrop-blur-sm border border-[hsla(0,100%,59%,0.1)] rotate-45 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="font-display leading-[1.0] mb-2 tracking-[-0.02em]">
            <span
              style={{
                fontSize: t1.fontSize ? `${t1.fontSize}px` : undefined,
                fontWeight: t1.fontWeight || "800",
                fontStyle: t1.italic ? "italic" : "normal",
                color: t1.color || undefined,
              }}
              className={`${!t1.fontSize ? "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]" : ""} ${!t1.color ? "hero-title-gradient" : ""}`}
            >
              {hero.title1}
            </span>
          </h1>
          <h1 className="font-display leading-[1.0] mb-6 tracking-[-0.02em]">
            <span
              style={{
                fontSize: t2.fontSize ? `${t2.fontSize}px` : undefined,
                fontWeight: t2.fontWeight || "800",
                fontStyle: t2.italic ? "italic" : "normal",
                color: t2.color || undefined,
              }}
              className={`${!t2.fontSize ? "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]" : ""} ${!t2.color ? "gradient-text" : ""}`}
            >
              {hero.title2}
            </span>
          </h1>
          <p
            className="max-w-2xl mx-auto leading-[1.6] tracking-wide whitespace-pre-line"
            style={{
              fontSize: sub.fontSize ? `${sub.fontSize}px` : undefined,
              fontWeight: sub.fontWeight || "300",
              fontStyle: sub.italic ? "italic" : "normal",
              color: sub.color || "rgba(255,255,255,0.75)",
              letterSpacing: "0.01em",
            }}
          >
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
