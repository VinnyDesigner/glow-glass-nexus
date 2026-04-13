import { useScrollAnimation } from "./useScrollAnimation";
import heroBg from "@/assets/hero-bg.png";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        {/* Dark overlay 40% */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Headline — white + red, NO dark text */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
            <span className="text-white">National Spatial</span>
            <br />
            <span className="gradient-text">Data Infrastructure</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
            Unified geospatial platform for secure data sharing, advanced analytics, and intelligent decision-making
          </p>
        </div>
      </div>
    </section>
  );
}
