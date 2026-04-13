import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { hero } = useContentStore();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${hero.overlayOpacity / 100})` }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
            <span className="text-white">{hero.title1}</span>
            <br />
            <span className="gradient-text">{hero.title2}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
