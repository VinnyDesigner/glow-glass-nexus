import { useScrollAnimation } from "./useScrollAnimation";

const visionCards = [
  {
    title: "Digital Transformation",
    description: "Leveraging cutting-edge technologies to modernize Bahrain's infrastructure and drive innovation across all government sectors.",
    image: "https://images.unsplash.com/photo-1768224656445-33d078c250b7?w=600&q=80",
  },
  {
    title: "Geospatial Intelligence",
    description: "Advanced GIS and GeoAI capabilities enable data-driven insights for strategic planning and resource management.",
    image: "https://images.unsplash.com/photo-1744968777188-3e1b2ef23339?w=600&q=80",
  },
  {
    title: "Smart Cities",
    description: "Building sustainable, connected urban environments through intelligent spatial planning and 3D visualization.",
    image: "https://images.unsplash.com/photo-1760553120312-2821bf54e767?w=600&q=80",
  },
];

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="vision" className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">BSDI Vision</h2>
          <p className="max-w-3xl mx-auto mt-6 text-muted-foreground text-lg leading-relaxed">
            Empowering Bahrain through a unified geospatial ecosystem. Creating a secure, scalable, and collaborative national geospatial infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visionCards.map((card, i) => (
            <div
              key={card.title}
              className={`glass-neu rounded-2xl overflow-hidden card-hover group transition-all duration-700 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
