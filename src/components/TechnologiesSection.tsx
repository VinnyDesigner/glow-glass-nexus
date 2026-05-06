import { useMemo, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore, type TechnologyCard } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Search, Sparkles } from "lucide-react";

function TechCard({ card }: { card: TechnologyCard }) {
  const L = useLocalized();
  const title = L(card.title, card.title_ar);
  const description = L(card.description, card.description_ar);
  const category = L(card.category, card.category_ar);
  const tags = (useUiStore.getState().language === "ar" ? card.tags_ar : card.tags) || [];

  const Wrapper: any = card.link ? "a" : "div";
  const wrapperProps = card.link
    ? { href: card.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative h-full rounded-2xl p-5 flex flex-col gap-3 bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(600px circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)" }}
      />
      <div className="flex items-start justify-between gap-3 relative">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden border border-border">
          {card.icon ? (
            <img src={card.icon} alt={title} className="w-8 h-8 object-contain" loading="lazy" />
          ) : (
            <Sparkles size={20} className="text-primary" />
          )}
        </div>
        {category && (
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
            {category}
          </Badge>
        )}
      </div>
      <div className="relative flex-1 flex flex-col">
        <h3 className="font-display text-base font-semibold text-foreground line-clamp-1">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-snug line-clamp-3">{description}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((t, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {t}
              </span>
            ))}
          </div>
        )}
        {card.link && (
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={12} />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default function TechnologiesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { technologies } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const { language } = useUiStore();
  const isAr = language === "ar";
  const styles = useSectionStyles(technologies);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const previewCards = useMemo(() => {
    const bySlot = [1, 2, 3, 4]
      .map((s) => technologies.cards.find((c) => c.previewSlot === s))
      .filter(Boolean) as TechnologyCard[];
    return bySlot.length > 0 ? bySlot : technologies.cards.slice(0, 4);
  }, [technologies.cards]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return technologies.cards;
    return technologies.cards.filter((c) => {
      const fields = [c.title, c.title_ar, c.description, c.description_ar, c.category, c.category_ar, ...(c.tags || []), ...(c.tags_ar || [])];
      return fields.filter(Boolean).some((f) => f!.toLowerCase().includes(q));
    });
  }, [query, technologies.cards]);

  return (
    <section id="technologies" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(technologies.heading, technologies.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(technologies.description, technologies.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {previewCards.map((card) => (
            <TechCard key={card.id} card={card} />
          ))}
        </div>

        {technologies.cards.length > previewCards.length && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setOpen(true)} size="lg" className="gap-2">
              {t("technologies.viewAll")} <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border shrink-0">
            <DialogTitle className="font-display text-2xl">
              {t("technologies.allTechnologies")} ({technologies.cards.length})
            </DialogTitle>
            <div className="relative mt-3">
              <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isAr ? "right-3" : "left-3"}`} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? "ابحث في التقنيات..." : "Search technologies..."}
                className={isAr ? "pr-9" : "pl-9"}
                dir={isAr ? "rtl" : "ltr"}
              />
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((card) => (
                <TechCard key={card.id} card={card} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                {isAr ? "لا توجد نتائج" : "No results"}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
