import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();

  const duplicated = [...dataServices.entities, ...dataServices.entities];

  return (
    <section id="contact" className="section-padding">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-14" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{dataServices.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{dataServices.description}</p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {duplicated.map((entity, i) => (
              <div
                key={`${entity.id}-${i}`}
                title={entity.name}
                className="logo-card min-w-[200px] h-[150px] flex items-center justify-center p-6 shrink-0 cursor-default"
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
