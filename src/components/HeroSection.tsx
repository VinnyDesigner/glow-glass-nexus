import { useScrollAnimation } from "./useScrollAnimation";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsla(0,0%,100%,0.1) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-primary/40 animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-[20%] w-1.5 h-1.5 rounded-full bg-primary/50 animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute top-60 right-[30%] w-2 h-2 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
              BSDI Spatial Intelligence Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
            <span className="gradient-text-white">National Spatial</span>
            <br />
            <span className="gradient-text">Data Infrastructure</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            Unified geospatial platform for secure data sharing, advanced analytics, and intelligent decision-making
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="group relative px-8 py-4 rounded-2xl font-semibold text-primary-foreground bg-primary overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsla(0,78%,55%,0.4)]"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(15,80%,55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-2xl font-semibold glass text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/30"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
