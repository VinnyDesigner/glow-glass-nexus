import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useLocalizeDate, useT, useSectionStyles } from "@/lib/i18n";
import { ArrowRight, Calendar } from "lucide-react";

export default function NewsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { news } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const fmtDate = useLocalizeDate();
  const styles = useSectionStyles(news);

  return (
    <section id="news" className="section-padding py-[80px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="text-center max-w-3xl mx-auto mb-12"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out 0.15s forwards" : "none" }}
        >
          {news.items.map((item) => {
            const title = L(item.title, item.title_ar);
            const excerpt = L(item.excerpt, item.excerpt_ar);
            const card = (
              <article className="clean-card h-full flex flex-col">
                <div className="card-image aspect-[16/10]">
                  <img
                    src={item.image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar size={13} />
                    <span>{fmtDate(item.date)}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {excerpt}
                  </p>
                  <span className="view-details-link mt-4">
                    {t("news.readMore")} <ArrowRight size={14} />
                  </span>
                </div>
              </article>
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
      </div>
    </section>
  );
}
