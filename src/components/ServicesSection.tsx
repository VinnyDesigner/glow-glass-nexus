import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

import serviceAdminConsole from "@/assets/service-admin-console.jpg";
import serviceGeocatalog from "@/assets/service-geocatalog.jpg";
import serviceSmartMap from "@/assets/service-smart-map.jpg";
import serviceGeointelligence from "@/assets/service-geointelligence.jpg";
import serviceDataAnalytics from "@/assets/service-data-analytics.jpg";
import serviceCloud from "@/assets/service-cloud.jpg";
import serviceSpatialApi from "@/assets/service-spatial-api.jpg";
import serviceDecisionSupport from "@/assets/service-decision-support.jpg";

const serviceImages = [
  serviceAdminConsole,
  serviceGeocatalog,
  serviceSmartMap,
  serviceGeointelligence,
  serviceDataAnalytics,
  serviceCloud,
  serviceSpatialApi,
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
                className={`group relative rounded-2xl overflow-hidden ${service.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.08}s forwards` : 'none',
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden transition-transform duration-400 ease-out
                    hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    height: '380px',
                    boxShadow: '0 8px 32px hsla(210,20%,50%,0.12), 0 2px 8px hsla(210,20%,50%,0.06)',
                  }}
                >
                  {/* Image — 65% */}
                  <img
                    src={serviceImages[i % serviceImages.length]}
                    alt={service.title}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top-right light effect */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 100% 0%, hsla(0, 0%, 100%, 0.45) 0%, hsla(0, 0%, 100%, 0.15) 40%, transparent 70%)',
                    }}
                  />

                  {/* Glassy text overlay — bottom 35% */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                    style={{
                      height: '35%',
                      background: 'linear-gradient(to top, hsla(0,0%,100%,0.88) 0%, hsla(0,0%,100%,0.72) 60%, hsla(0,0%,100%,0) 100%)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <h3 className="font-display text-sm md:text-base font-semibold mb-1.5 text-primary-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover glow border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      border: '1px solid hsla(348, 83%, 40%, 0.25)',
                      boxShadow: '0 0 24px hsla(348, 83%, 40%, 0.08)',
                    }}
                  />
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
