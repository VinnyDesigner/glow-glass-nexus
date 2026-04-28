import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ target, suffix = "", label }: { target: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) { setValue(numericTarget); clearInterval(timer); }
      else { setValue(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, numericTarget]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary">
        {target === "Secure" ? "Secure" : value}{suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-2 font-medium">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { about } = useContentStore();
  const { language } = useUiStore();
  const L = (en: string, ar?: string) => (language === "ar" && ar ? ar : en);

  return (
    <section id="about" className="section-padding my-0 py-[80px]">
      <div ref={ref} className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{L(about.heading, about.heading_ar)}</h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed">{L(about.description1, about.description1_ar)}</p>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{L(about.description2, about.description2_ar)}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mt-12" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out 0.2s forwards' : 'none' }}>
          {about.stats.map((stat) => (
            <div key={stat.id} className="stat-card rounded-2xl p-8 text-center">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} label={L(stat.label, stat.label_ar)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
