import { useRef } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="contact" className="section-padding">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-14" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{dataServices.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{dataServices.description}</p>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="shrink-0 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div ref={scrollRef} className="overflow-hidden rounded-2xl flex-1">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {dataServices.entities.map((entity) => (
                <div
                  key={entity.id}
                  title={entity.name}
                  className="logo-card min-w-[200px] h-[150px] flex items-center justify-center p-6 shrink-0 cursor-default"
                >
                  <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="shrink-0 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
