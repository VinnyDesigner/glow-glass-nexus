import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

function LayerCardItem({ card }: { card: { id: string; title: string; description?: string; image: string; link?: string } }) {
  const content = (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center flex-1 flex flex-col justify-start gap-1">
        <p className="font-display text-xs md:text-sm font-semibold tracking-wide text-foreground truncate">
          {card.title}
        </p>
        {card.description && (
          <p className="text-[11px] md:text-xs text-muted-foreground leading-snug line-clamp-2">
            {card.description}
          </p>
        )}
      </div>
    </div>
  );

  if (card.link && card.link !== "#") {
    return (
      <a href={card.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default function LayersSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { layers } = useContentStore();
  const [open, setOpen] = useState(false);

  const previewCards = layers.cards.slice(0, 5);

  return (
    <section id="layers" className="section-padding py-[80px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-12"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {layers.heading}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed">
            {layers.description}
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {previewCards.map((card) => (
            <LayerCardItem key={card.id} card={card} />
          ))}
        </div>

        {layers.cards.length > 5 && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setOpen(true)} size="lg" className="gap-2">
              View All Layers <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
            <DialogTitle className="font-display text-2xl">All Layers ({layers.cards.length})</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-80px)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {layers.cards.map((card) => (
                <LayerCardItem key={card.id} card={card} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
