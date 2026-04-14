import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();

  const duplicated = [...dataServices.entities, ...dataServices.entities];

  return (
    <section id="contact" className="section-padding relative section-mesh">
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-12`} style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.7s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text-dark">{dataServices.heading}</h2>
          <p className="max-w-2xl mx-auto mt-5 text-muted-foreground text-lg leading-relaxed">{dataServices.description}</p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {duplicated.map((entity, i) => (
              <div
                key={`${entity.id}-${i}`}
                title={entity.name}
                className="glass-neu min-w-[200px] h-[150px] flex items-center justify-center p-6 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_hsla(0,0%,0%,0.1)] cursor-default shrink-0"
              >
                <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
