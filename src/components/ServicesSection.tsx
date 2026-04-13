import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { services } = useContentStore();

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">{services.heading}</h2>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">{services.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.cards.map((service, i) => (
            <div
              key={service.id}
              className={`glass-neu rounded-2xl overflow-hidden card-hover group transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute bottom-3 left-4 flex gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/40 text-primary" style={{ background: 'hsla(0, 0%, 100%, 0.85)', backdropFilter: 'blur(8px)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
