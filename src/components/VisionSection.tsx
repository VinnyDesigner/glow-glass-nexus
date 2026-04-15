import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();

  return (
    <section id="vision" className="section-padding">
      <div ref={ref} className="container mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{vision.heading}</h2>
          <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{vision.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {vision.cards.map((card, i) => {
            const Wrapper = card.link ? 'a' : 'div';
            const wrapperProps = card.link ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={card.id}
                {...wrapperProps as any}
                className={`clean-card block ${card.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.1}s forwards` : 'none',
                }}
              >
                <div className="card-image" style={{ aspectRatio: '4/3' }}>
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5 flex flex-col flex-1 items-center text-center">
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{card.description}</p>
                  <div className="border-t border-border pt-3 mt-auto w-full">
                    <span className="view-details-link justify-center w-full">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
