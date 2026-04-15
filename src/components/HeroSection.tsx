import { useState, useEffect } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import heroBgDefault from "@/assets/hero-bg.png";
import heroOverlay from "@/assets/hero-overlay.png";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsla(0, 0%, 100%, ${0.3 + Math.random() * 0.4})`,
            animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { hero } = useContentStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const t1 = hero.title1Style || {};
  const t2 = hero.title2Style || {};
  const sub = hero.subtitleStyle || {};

  const bgSrc = imgError ? heroBgDefault : (hero.backgroundImage || heroBgDefault);

  useEffect(() => {
    setImageLoaded(false);
    setImgError(false);
  }, [hero.backgroundImage]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Bottom layer: Background image with zoom animation */}
      <div className="absolute inset-0">
        <img
          src={bgSrc}
          alt=""
          className="w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out"
          style={{ transform: isVisible ? "scale(1.05)" : "scale(1)" }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImgError(true)}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,${Math.max(hero.overlayOpacity, 40) / 100}) 0%, rgba(0,0,0,${Math.max(hero.overlayOpacity, 55) / 100}) 50%, rgba(0,0,0,${Math.max(hero.overlayOpacity, 65) / 100}) 100%)`,
            opacity: imageLoaded ? 1 : 0.8,
          }}
        />
        {/* Animated gradient sweep */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(135deg, transparent 0%, hsla(348, 83%, 40%, 0.1) 30%, transparent 60%)",
            animation: "gradientSweep 8s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Middle layer: Text with glass container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 flex justify-center">
        <div className={`max-w-3xl text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="-mt-20 md:-mt-32 relative z-10">
            {/* Glassmorphism container */}
            <div
              className="inline-block px-8 py-10 md:px-12 md:py-14 rounded-3xl"
              style={{
                background: "hsla(0, 0%, 100%, 0.05)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid hsla(0, 0%, 100%, 0.1)",
                boxShadow: "0 8px 32px hsla(0, 0%, 0%, 0.2), inset 0 0 80px hsla(0, 0%, 100%, 0.03)",
              }}
            >
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
                className="max-w-xl mx-auto leading-[1.6] whitespace-pre-line"
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
      </div>

      {/* Top layer: Overlay building image */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <img src={heroOverlay} alt="" className="w-full h-full object-cover object-center" />
      </div>
    </section>
  );
}
