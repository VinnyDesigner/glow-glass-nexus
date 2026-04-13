import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();

  return (
    <section id="vision" className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">{vision.heading}</h2>
          <p className="max-w-3xl mx-auto mt-6 text-muted-foreground text-lg leading-relaxed">{vision.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {vision.cards.map((card, i) => (
            <div
              key={card.id}
              className={`glass-neu rounded-2xl overflow-hidden card-hover group transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
