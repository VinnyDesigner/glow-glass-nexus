import { useRef } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { dataServices } = useContentStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const duplicated = [...dataServices.entities, ...dataServices.entities];

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 220;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="contact" className="section-padding py-0">
      <div ref={ref} className="container mx-auto py-[20px]">
        <div className="text-center mb-14" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{dataServices.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{dataServices.description}</p>
        </div>

        <div className="relative flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hover:bg-accent shrink-0"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="overflow-hidden rounded-2xl mx-8">
            <div ref={scrollRef} className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
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

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 z-10 h-10 w-10 rounded-full bg-card shadow-md border-border hover:bg-accent shrink-0"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
