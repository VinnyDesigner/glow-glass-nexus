import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();

  return (
    <section id="vision" className="section-padding relative section-mesh">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ animation: isVisible ? 'fadeBlurUp 0.7s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text-dark">{vision.heading}</h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-lg leading-relaxed">{vision.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vision.cards.map((card, i) => {
            const Wrapper = card.link ? 'a' : 'div';
            const wrapperProps = card.link ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={card.id}
                {...wrapperProps as any}
                className={`glass-card-img relative block ${card.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.1}s forwards` : 'none',
                }}
              >
                <div className="card-image-wrapper" style={{ height: '65%', minHeight: 200 }}>
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 tracking-tight">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
