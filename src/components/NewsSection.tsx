import { useMemo, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useLocalizeDate, useT, useSectionStyles } from "@/lib/i18n";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { news } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const fmtDate = useLocalizeDate();
  const styles = useSectionStyles(news);
  const [open, setOpen] = useState(false);

  // Priority preview selection: show only flagged items (max 4); fallback to latest 4
  const sortedItems = useMemo(() => {
    const priority = news.items.filter((i) => i.priorityPreview);
    if (priority.length > 0) return priority.slice(0, 4);
    return [...news.items].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (isNaN(da) || isNaN(db)) return 0;
      return db - da;
    });
  }, [news.items]);

  return (
    <section id="news" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-8"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(news.heading, news.heading_ar)}
          </h2>
          <p className="mt-5 text-muted-foreground text-base leading-relaxed" style={styles.description}>
            {L(news.description, news.description_ar)}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {sortedItems.slice(0, 4).map((item, i) => {
            const title = L(item.title, item.title_ar);
            const card = (
              <div
                className="group relative rounded-2xl overflow-hidden h-full"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.12}s forwards` : "none",
                }}
              >
                <div
                  className="relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden transition-transform duration-400 ease-out hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    boxShadow: "0 8px 32px hsla(210,20%,50%,0.12), 0 2px 8px hsla(210,20%,50%,0.06)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                    style={{
                      background:
                        "linear-gradient(to top, hsla(0,0%,100%,0.9) 0%, hsla(0,0%,100%,0.75) 60%, hsla(0,0%,100%,0) 100%)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <Calendar size={13} />
                      <span>{fmtDate(item.date)}</span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-secondary-foreground leading-snug">
                      {title}
                    </h3>
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      border: "1px solid hsla(348, 83%, 40%, 0.25)",
                      boxShadow: "0 0 24px hsla(348, 83%, 40%, 0.08)",
                    }}
                  />
                </div>
              </div>
            );
            if (item.link && item.link !== "#") {
              return (
                <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              );
            }
            return <div key={item.id}>{card}</div>;
          })}
        </div>

        {/* View all CTA */}
        <div
          className="mt-12 flex justify-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.3s forwards" : "none" }}
        >
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            className="gap-2 rounded-full px-8 shadow-md hover:shadow-lg transition-all"
          >
            <Newspaper size={18} />
            {t("news.viewAll")}
          </Button>
        </div>
      </div>

      {/* All News Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <Newspaper size={22} className="text-primary" />
              {t("news.allNews")}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("news.allNewsDesc")}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh]">
            <ul className="divide-y divide-border">
              {sortedItems.length === 0 && (
                <li className="px-6 py-10 text-center text-muted-foreground text-sm">
                  {t("news.empty")}
                </li>
              )}
              {sortedItems.map((item) => {
                const title = L(item.title, item.title_ar);
                const excerpt = L(item.excerpt, item.excerpt_ar);
                const hasLink = item.link && item.link !== "#";
                const Inner = (
                  <div className="flex gap-4 px-6 py-4 hover:bg-muted/50 transition-colors group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <img
                        src={item.image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                        <Calendar size={12} />
                        <span>{fmtDate(item.date)}</span>
                      </div>
                      <h4 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                      </h4>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {excerpt}
                      </p>
                      {hasLink && (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary">
                          {t("news.readMore")} <ArrowRight size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                );
                return (
                  <li key={item.id}>
                    {hasLink ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                        {Inner}
                      </a>
                    ) : (
                      Inner
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
