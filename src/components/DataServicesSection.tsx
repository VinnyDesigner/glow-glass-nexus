import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">{dataServices.heading}</h2>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">{dataServices.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {dataServices.entities.map((entity, i) => (
            <a
              key={entity.id}
              href={entity.link}
              target="_blank"
              rel="noopener noreferrer"
              title={entity.name}
              className={`neu-card aspect-square flex items-center justify-center p-8 group transition-all duration-300 hover:scale-105 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
