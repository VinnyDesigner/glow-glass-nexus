import { useScrollAnimation } from "./useScrollAnimation";
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
      if (current >= numericTarget) {
        setValue(numericTarget);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
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

const stats = [
  { target: "50", suffix: "+", label: "Government Agencies" },
  { target: "24", suffix: "/7", label: "Real-Time Access" },
  { target: "99", suffix: ".9%", label: "Uptime" },
  { target: "Secure", suffix: "", label: "National Standards" },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className={`transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">About</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">About BSDI</h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              BSDI (Bahrain Spatial Data Infrastructure) is a unified geospatial platform designed to enable secure data sharing, advanced analytics, and intelligent decision-making across government and enterprise sectors.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              It brings together GIS, GeoAI, BIM, and governance standards into a single digital ecosystem — ensuring data accuracy, security, and national-level interoperability.
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass-neu rounded-2xl p-6 card-hover text-center">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
