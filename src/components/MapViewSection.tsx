import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

export default function MapViewSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { mapView } = useContentStore();
  const navigate = useNavigate();

  const handleCta = () => {
    if (mapView.ctaHref?.startsWith("http")) {
      window.open(mapView.ctaHref, "_blank", "noopener,noreferrer");
    } else {
      navigate(mapView.ctaHref || "/map");
    }
  };

  return (
    <section id="map-view" className="section-padding py-[80px]">
      <div ref={ref} className="container mx-auto">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? "fadeBlurUp 0.6s ease-out forwards" : "none" }}
        >
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <MapPin size={13} /> Interactive Map
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {mapView.heading}
            </h2>
            <p className="mt-5 text-muted-foreground text-base leading-relaxed max-w-xl">
              {mapView.description}
            </p>
            <Button
              onClick={handleCta}
              size="lg"
              className="mt-7 gap-2 btn-glow"
            >
              {mapView.ctaLabel} <ArrowRight size={16} />
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="clean-card overflow-hidden">
              <div className="card-image aspect-[16/10] !m-0 !rounded-none">
                <img
                  src={mapView.previewImage}
                  alt="Bahrain map preview"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
