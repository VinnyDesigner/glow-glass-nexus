import { useScrollAnimation } from "./useScrollAnimation";

const services = [
  {
    title: "BSDI Admin Console",
    description: "To ensure secure, transparent, and efficient management of geospatial services across all government entities.",
    image: "https://images.unsplash.com/photo-1621421770492-272ae6d7882a?w=600&q=80",
    tags: ["2D & 3D Maps", "Secure Access"],
  },
  {
    title: "National GeoCatalog Bahrain",
    description: "To provide standardized metadata management aligned with SDI best practices and international standards.",
    image: "https://images.unsplash.com/photo-1620662892011-f5c2d523fae2?w=600&q=80",
    tags: ["AI-Powered", "Spatial Analysis"],
  },
  {
    title: "BSDI Smart Map",
    description: "To provide a user-friendly interface for viewing and analyzing government geospatial datasets.",
    image: "https://images.unsplash.com/photo-1760801802787-86f7958c439e?w=600&q=80",
    tags: ["3D Visualization", "Infrastructure"],
  },
  {
    title: "GeoIntelligence Bahrain",
    description: "To transform geospatial data into actionable intelligence through spatial modelling.",
    image: "https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?w=600&q=80",
    tags: ["Role-Based Access", "Audit Logging"],
  },
  {
    title: "Data Analytics",
    description: "Advanced insights through visual dashboards and data-driven decision making.",
    image: "https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?w=600&q=80",
    tags: ["Visual Dashboards", "Data-Driven"],
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable platform with high availability and disaster recovery capabilities.",
    image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=600&q=80",
    tags: ["High Availability", "Disaster Recovery"],
  },
];

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding relative noise-bg">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-white">What BSDI Provides</h2>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">
            Comprehensive spatial intelligence solutions for modern government operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`glass rounded-2xl overflow-hidden card-hover group transition-all duration-700 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
