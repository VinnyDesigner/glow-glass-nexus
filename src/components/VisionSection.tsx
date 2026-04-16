import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

import visionDigitalTransformation from "@/assets/vision-digital-transformation.jpg";
import visionGeospatial from "@/assets/vision-geospatial.jpg";
import visionSmartCities from "@/assets/vision-smart-cities.jpg";
import visionDataGovernance from "@/assets/vision-data-governance.jpg";

const visionImages = [
  visionDigitalTransformation,
  visionGeospatial,
  visionSmartCities,
  visionDataGovernance,
];

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();

  return (
    <section id="vision" className="relative overflow-hidden py-20 md:py-32 px-4 md:px-6 lg:py-[160px]">
      {/* Background blurred blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(348,83%,40%), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(210,20%,50%), transparent 70%)' }}
        />
      </div>

      <div ref={ref} className="container mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {vision.heading}
          </h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {vision.description}
          </p>
        </div>

        {/* Cards grid — 70% image, 30% text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {vision.cards.map((card, i) => (
            <div
              key={card.id}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.12}s forwards` : 'none',
              }}
            >
              <div
                className="relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden transition-transform duration-400 ease-out
                  hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  boxShadow: '0 8px 32px hsla(210,20%,50%,0.12), 0 2px 8px hsla(210,20%,50%,0.06)',
                }}
              >
                {/* Image — 70% */}
                <img
                  src={visionImages[i % visionImages.length]}
                  alt={card.title}
                  loading="lazy"
                  width={800}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Glassy text overlay — bottom 30% */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{
                    background: 'linear-gradient(to top, hsla(0,0%,100%,0.85) 0%, hsla(0,0%,100%,0.7) 60%, hsla(0,0%,100%,0) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <h3 className="font-display text-base md:text-lg font-semibold mb-1.5 text-secondary-foreground">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {card.description}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
