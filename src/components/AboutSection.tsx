import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
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
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text-glow">
        {target === "Secure" ? "Secure" : value}{suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-3 font-medium">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { about } = useContentStore();

  return (
    <section id="about" className="section-padding relative section-mesh">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsla(220,20%,95%,0.5)] to-transparent" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.7s ease-out forwards' : 'none' }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text-dark">{about.heading}</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{about.description1}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{about.description2}</p>
          </div>

          <div className="grid grid-cols-2 gap-6" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.7s ease-out 0.2s forwards' : 'none' }}>
            {about.stats.map((stat, i) => (
              <div
                key={stat.id}
                className="glass-neu rounded-2xl p-8 text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_hsla(0,0%,0%,0.1)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
