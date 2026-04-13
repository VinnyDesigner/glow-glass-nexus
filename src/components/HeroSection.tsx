import { useScrollAnimation } from "./useScrollAnimation";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
            <span className="gradient-text-dark">National Spatial</span>
            <br />
            <span className="gradient-text">Data Infrastructure</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Unified geospatial platform for secure data sharing, advanced analytics, and intelligent decision-making
          </p>
        </div>
      </div>
    </section>
  );
}
