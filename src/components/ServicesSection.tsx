import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useT, useSectionStyles } from "@/lib/i18n";

import serviceAdminConsole from "@/assets/service-admin-console.jpg";
import serviceGeocatalog from "@/assets/service-geocatalog.jpg";
import serviceSmartMap from "@/assets/service-smart-map.jpg";
import serviceGeointelligence from "@/assets/service-geointelligence.jpg";
import serviceDataAnalytics from "@/assets/service-data-analytics.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceApi from "@/assets/service-api.jpg";
import serviceDecisionSupport from "@/assets/service-decision-support.jpg";

const serviceImages = [
  serviceAdminConsole,
  serviceGeocatalog,
  serviceSmartMap,
  serviceGeointelligence,
  serviceDataAnalytics,
  serviceCloud,
  serviceApi,
  serviceDecisionSupport,
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { services } = useContentStore();
  const L = useLocalized();
  const t = useT();
  const styles = useSectionStyles(services);

  return (
    <section id="services" className="section-padding py-[56px]">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-8" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground" style={styles.heading}>{L(services.heading, services.heading_ar)}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed" style={styles.description}>{L(services.description, services.description_ar)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.cards.map((service, i) => {
            const Wrapper = service.link ? 'a' : 'div';
            const wrapperProps = service.link ? { href: service.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={service.id}
                {...wrapperProps as any}
                className={`clean-card block ${service.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.08}s forwards` : 'none',
                }}
              >
                <div className="card-image" style={{ aspectRatio: '4/3' }}>
                  <img src={serviceImages[i % serviceImages.length]} alt={L(service.title, service.title_ar)} className="w-full h-full object-cover" loading="lazy" width={1024} height={768} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground mb-1.5">{L(service.title, service.title_ar)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{L(service.description, service.description_ar)}</p>
                  <div className="border-t border-border pt-3 mt-auto">
                    <span className="view-details-link justify-end w-full">
                      {t("common.viewDetails")}
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
