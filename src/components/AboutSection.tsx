import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useUiStore } from "@/stores/uiStore";
import { toArabicDigits, useSectionStyles } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import StatVisualization, { VizStyle } from "./StatVisualization";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

function AnimatedNumber({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const { language } = useUiStore();
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, "")) || 0;
  const isFloat = /\./.test(target);
  const isSecure = target === "Secure";
  const secureLabel = language === "ar" ? "آمن" : "Secure";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const steps = 50;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) { setValue(numericTarget); clearInterval(timer); }
      else { setValue(current); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, numericTarget]);

  const display = isFloat ? value.toFixed(1) : Math.floor(value).toLocaleString();

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
      {isSecure ? secureLabel : (language === "ar" ? toArabicDigits(display) : display)}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { about } = useContentStore();
  const { language } = useUiStore();
  const L = (en: string, ar?: string) => (language === "ar" && ar ? ar : en);
  const styles = useSectionStyles(about);

  return (
    <section id="about" className="section-padding my-0 py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(about.heading, about.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(about.description1, about.description1_ar)}
          </p>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed" style={styles.description}>
            {L(about.description2, about.description2_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mt-12"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out 0.2s forwards' : 'none' }}
        >
          {about.stats.map((stat, idx) => {
            const hasViz = stat.visualizationType && stat.visualizationType !== "none" && stat.visualizationStyle;
            const IconCmp = stat.icon ? (LucideIcons as any)[stat.icon] : null;
            const Icon = IconCmp || Sparkles;
            const trendUp = stat.trendDirection !== "down";
            const TrendIcon = trendUp ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={stat.id}
                className="group relative clean-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Header: icon + trend */}
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  {typeof stat.trend === "number" && stat.trend !== 0 && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
                        trendUp
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      <TrendIcon size={12} />
                      {trendUp ? "+" : "-"}{Math.abs(stat.trend)}%
                    </span>
                  )}
                </div>

                {/* KPI value */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {L(stat.label, stat.label_ar)}
                  </p>
                  {(stat.description || stat.description_ar) && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {L(stat.description || "", stat.description_ar)}
                    </p>
                  )}
                </div>

                {/* Mini chart */}
                {hasViz && (
                  <div className="mt-auto -mx-1">
                    <StatVisualization
                      style={stat.visualizationStyle as VizStyle}
                      data={stat.vizData}
                      labels={stat.vizLabels}
                      height={70}
                      useBrandColors={stat.useBrandColors !== false}
                      colors={stat.colors}
                      legendEnabled={stat.legendEnabled}
                      tooltipEnabled={stat.tooltipEnabled !== false}
                      animationEnabled={stat.animationEnabled !== false}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
