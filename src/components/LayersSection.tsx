import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore, type LayerCard as LayerCardType } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Database, Tag, MapPin, ExternalLink } from "lucide-react";

function LayerCardItem({ card, onClick }: { card: LayerCardType; onClick: (c: LayerCardType) => void }) {
  const L = useLocalized();
  const title = L(card.title, card.title_ar);
  const description = L(card.description, card.description_ar);
  return (
    <button
      type="button"
      onClick={() => onClick(card)}
      title="Click to view details"
      className="group text-left rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={card.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center flex-1 flex flex-col justify-start gap-1">
        <p className="font-display text-xs md:text-sm font-semibold tracking-wide text-foreground truncate">
          {title}
        </p>
        {description && (
          <p className="text-[11px] md:text-xs text-muted-foreground leading-snug line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

export default function LayersSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { layers } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const { language } = useUiStore();
  const isAr = language === "ar";
  const [open, setOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerCardType | null>(null);
  const styles = useSectionStyles(layers);

  const previewCards = (() => {
    const bySlot = [1, 2, 3, 4]
      .map((s) => layers.cards.find((c) => c.previewSlot === s))
      .filter(Boolean) as typeof layers.cards;
    return bySlot.length > 0 ? bySlot : layers.cards.slice(0, 4);
  })();

  const handleCardClick = (c: LayerCardType) => setSelectedLayer(c);

  const labels = {
    shortDesc: isAr ? "وصف موجز" : "Short description",
    details: isAr ? "تفاصيل" : "Details",
    category: isAr ? "الفئة" : "Category",
    lastUpdated: isAr ? "آخر تحديث" : "Last updated",
    source: isAr ? "المصدر" : "Source",
    tags: isAr ? "الوسوم" : "Tags",
    viewInMap: isAr ? "عرض على الخريطة" : "View in Map",
    open: isAr ? "فتح الرابط" : "Open link",
    hint: isAr ? "اضغط لعرض التفاصيل" : "Click to view details",
  };

  return (
    <section id="layers" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(layers.heading, layers.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(layers.description, layers.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {previewCards.map((card) => (
            <LayerCardItem key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>

        {layers.cards.length > previewCards.length && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setOpen(true)} size="lg" className="gap-2">
              {t("common.viewAllLayers")} <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
            <DialogTitle className="font-display text-2xl">{t("common.allLayers")} ({layers.cards.length})</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto px-6 py-6 max-h-[calc(85vh-80px)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {layers.cards.map((card) => (
                <LayerCardItem key={card.id} card={card} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Layer details modal */}
      <Dialog open={!!selectedLayer} onOpenChange={(o) => !o && setSelectedLayer(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] sm:rounded-2xl">
          {selectedLayer && (
            <div className="flex flex-col max-h-[90vh]">
              <div className="relative w-full aspect-[16/8] bg-muted shrink-0">
                <img
                  src={selectedLayer.image}
                  alt={L(selectedLayer.title, selectedLayer.title_ar)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-y-auto p-6 space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {L(selectedLayer.title, selectedLayer.title_ar)}
                  </h3>
                  {selectedLayer.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {L(selectedLayer.description, selectedLayer.description_ar)}
                    </p>
                  )}
                </div>

                {(selectedLayer.detailedDescription || selectedLayer.detailedDescription_ar) && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{labels.details}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {L(selectedLayer.detailedDescription || "", selectedLayer.detailedDescription_ar)}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(selectedLayer.category || selectedLayer.category_ar) && (
                    <div className="flex items-start gap-2">
                      <Database size={16} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">{labels.category}</div>
                        <div className="text-sm font-medium">{L(selectedLayer.category || "", selectedLayer.category_ar)}</div>
                      </div>
                    </div>
                  )}
                  {selectedLayer.lastUpdated && (
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">{labels.lastUpdated}</div>
                        <div className="text-sm font-medium">{selectedLayer.lastUpdated}</div>
                      </div>
                    </div>
                  )}
                  {selectedLayer.source && (
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-muted-foreground">{labels.source}</div>
                        <div className="text-sm font-medium">{selectedLayer.source}</div>
                      </div>
                    </div>
                  )}
                </div>

                {((isAr ? selectedLayer.tags_ar : selectedLayer.tags) || []).length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <Tag size={13} /> {labels.tags}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? selectedLayer.tags_ar : selectedLayer.tags)!.map((tg, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{tg}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border p-4 flex flex-wrap gap-2 justify-end bg-card shrink-0">
                {selectedLayer.link && selectedLayer.link !== "#" && (
                  <Button variant="outline" asChild>
                    <a href={selectedLayer.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink size={16} /> {labels.open}
                    </a>
                  </Button>
                )}
                <Button asChild className="gap-2">
                  <a
                    href={
                      selectedLayer.mapLayerId
                        ? `/map?layer=${encodeURIComponent(selectedLayer.mapLayerId)}`
                        : "/map"
                    }
                  >
                    <MapPin size={16} /> {labels.viewInMap}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
