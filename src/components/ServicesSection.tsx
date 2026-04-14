import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { services } = useContentStore();

  return (
    <section id="services" className="section-padding relative section-mesh">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-12`} style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.7s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text-dark">{services.heading}</h2>
          <p className="max-w-2xl mx-auto mt-5 text-muted-foreground text-lg leading-relaxed">{services.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.cards.map((service, i) => {
            const Wrapper = service.link ? 'a' : 'div';
            const wrapperProps = service.link ? { href: service.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={service.id}
                {...wrapperProps as any}
                className={`glass-card-img relative block ${service.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.1}s forwards` : 'none',
                }}
              >
                <div className="card-image-wrapper" style={{ height: '65%', minHeight: 200 }}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute bottom-3 left-4 flex gap-2 z-10">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag-shimmer text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-[hsla(0,100%,59%,0.3)] text-primary bg-[hsla(0,0%,100%,0.9)] backdrop-blur-[8px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                  {service.link && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300">
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
