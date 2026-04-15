import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

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

  return (
    <section id="services" className="section-padding">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-14" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{services.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{services.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.cards.map((service, i) => {
            const Wrapper = service.link ? 'a' : 'div';
            const wrapperProps = service.link ? { href: service.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={service.id}
                {...wrapperProps as any}
                className={`service-flip-card group ${service.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.08}s forwards` : 'none',
                }}
              >
                {/* Full-bleed image */}
                <div className="service-flip-card__image">
                  <img
                    src={serviceImages[i % serviceImages.length]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1024}
                    height={768}
                  />
                </div>

                {/* Default state: title overlay at bottom */}
                <div className="service-flip-card__overlay">
                  <h3 className="font-display text-lg font-bold text-white leading-tight">{service.title}</h3>
                  <p className="text-white/70 text-xs mt-1">{service.description.split(' ').slice(0, 4).join(' ')}…</p>
                </div>

                {/* Hover state: text panel below image */}
                <div className="service-flip-card__details">
                  <h3 className="font-display text-base font-bold text-foreground leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1.5 line-clamp-2">{service.description}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
