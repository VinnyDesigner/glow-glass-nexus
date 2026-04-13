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
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
        {target === "Secure" ? "Secure" : value}{suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-2">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { about } = useContentStore();

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">{about.heading}</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{about.description1}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed">{about.description2}</p>
          </div>

          <div className={`grid grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {about.stats.map((stat) => (
              <div key={stat.id} className="glass-neu rounded-2xl p-6 card-hover text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
