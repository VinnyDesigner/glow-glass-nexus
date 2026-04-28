import { useState, useEffect, useCallback, useRef } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";
import heroSlide5 from "@/assets/hero-slide-5.png";

const DEFAULT_SLIDES = [heroSlide1, heroSlide2, heroSlide3, heroSlide4, heroSlide5];
const SLIDE_DURATION = 3000;
const TRANSITION_DURATION = 1000;

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { hero } = useContentStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slides = hero.heroImages && hero.heroImages.length > 0 ? hero.heroImages : DEFAULT_SLIDES;

  // language-aware getters via dynamic import to avoid stale render
  const { language } = useUiStore();
  const title1 = language === "ar" && hero.title1_ar ? hero.title1_ar : hero.title1;
  const title2 = language === "ar" && hero.title2_ar ? hero.title2_ar : hero.title2;
  const subtitle = language === "ar" && hero.subtitle_ar ? hero.subtitle_ar : hero.subtitle;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const isAr = language === "ar";
  const t1 = (isAr ? hero.title1StyleAr : undefined) || hero.title1Style || {};
  const t2 = (isAr ? hero.title2StyleAr : undefined) || hero.title2Style || {};
  const sub = (isAr ? hero.subtitleStyleAr : undefined) || hero.subtitleStyle || {};

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Image slides with Ken Burns effect */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: currentIndex === i ? 1 : 0,
            transitionDuration: `${TRANSITION_DURATION}ms`,
            zIndex: currentIndex === i ? 1 : 0,
          }}
        >
          <img
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${(hero.overlayOpacity || 30) / 100 * 0.6}) 0%, rgba(0,0,0,${(hero.overlayOpacity || 30) / 100}) 60%, rgba(0,0,0,${(hero.overlayOpacity || 30) / 100 * 0.9}) 100%)`,
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className={`max-w-3xl text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="-mt-10 md:-mt-16">
            <div>
              <div>
                <h1 className="hero-display-font leading-[1.02] mb-2">
                  <span
                    style={{
                      fontSize: t1.fontSize ? `${t1.fontSize}px` : undefined,
                      fontWeight: t1.fontWeight || "800",
                      fontStyle: t1.italic ? "italic" : "normal",
                      color: t1.color || undefined,
                      fontFamily: t1.fontFamily || undefined,
                    }}
                    className={`block ${!t1.fontSize ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl" : ""} ${!t1.color ? "hero-title-gradient" : ""}`}
                  >
                    {title1}
                  </span>
                </h1>
                <h1 className="hero-display-font leading-[1.02] mb-6">
                  <span
                    style={{
                      fontSize: t2.fontSize ? `${t2.fontSize}px` : undefined,
                      fontWeight: t2.fontWeight || "800",
                      fontStyle: t2.italic ? "italic" : "normal",
                      color: t2.color || undefined,
                      fontFamily: t2.fontFamily || undefined,
                    }}
                    className="block text-5xl font-extrabold text-[#ff9494]"
                  >
                    {title2}
                  </span>
                </h1>
                <p
                  className="max-w-xl mx-auto leading-[1.6] whitespace-pre-line"
                  style={{
                    fontSize: sub.fontSize ? `${sub.fontSize}px` : "18px",
                    fontWeight: sub.fontWeight || "400",
                    fontStyle: sub.italic ? "italic" : "normal",
                    color: sub.color || "hsla(0,0%,100%,0.75)",
                    fontFamily: sub.fontFamily || undefined,
                    letterSpacing: "0.01em",
                  }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots - bottom right */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative w-3 h-3 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
            style={{
              background: currentIndex === i ? "hsl(348, 83%, 40%)" : "rgba(255,255,255,0.35)",
              transform: currentIndex === i ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {currentIndex === i && (
              <div
                key={`progress-${currentIndex}-${i}`}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.4)",
                  animation: `dotProgress ${SLIDE_DURATION}ms linear forwards`,
                  transformOrigin: "left center",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}