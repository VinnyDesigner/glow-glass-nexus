import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";

export default function MapViewPage() {
  const navigate = useNavigate();
  const { mapView } = useContentStore();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" className="mb-4 gap-2" onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Back to Home
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <MapPin size={13} /> Map View
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {mapView.heading}
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            {mapView.description}
          </p>

          <div className="clean-card overflow-hidden">
            <div className="card-image aspect-[16/9] !m-0 !rounded-none">
              <img
                src={mapView.previewImage}
                alt="Bahrain interactive map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-sm text-muted-foreground">
              Interactive map integration will be available here. This is a preview placeholder.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
