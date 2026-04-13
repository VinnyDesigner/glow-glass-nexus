import { useScrollAnimation } from "./useScrollAnimation";

const users = [
  {
    title: "Government Authorities",
    description: "Empowering national and local government bodies with comprehensive GIS infrastructure for policy making, urban development, and citizen services.",
    image: "https://images.unsplash.com/photo-1612165469953-69b4bc7eedbf?w=500&q=80",
  },
  {
    title: "Urban Planning Departments",
    description: "Strategic tools for city planners to visualize growth, manage land use, and create sustainable urban environments with data-driven insights.",
    image: "https://images.unsplash.com/photo-1760553120324-d3d2bf53852b?w=500&q=80",
  },
  {
    title: "Infrastructure & Utilities",
    description: "Manage critical infrastructure networks including water, electricity, telecommunications, and transportation with real-time spatial monitoring.",
    image: "https://images.unsplash.com/photo-1765028994202-abd7b1649971?w=500&q=80",
  },
  {
    title: "Environmental Agencies",
    description: "Monitor environmental changes, track natural resources, and implement conservation strategies using advanced geospatial analysis tools.",
    image: "https://images.unsplash.com/photo-1641392945935-194a6251804a?w=500&q=80",
  },
  {
    title: "Transportation & Smart Cities",
    description: "Optimize traffic flow, plan public transit routes, and build intelligent city systems with integrated transportation data and analytics.",
    image: "https://images.unsplash.com/photo-1699602050604-698045645108?w=500&q=80",
  },
  {
    title: "National Security & Emergency Services",
    description: "Enhance response times and coordination during emergencies with real-time location intelligence and secure communication channels.",
    image: "https://images.unsplash.com/photo-1763888709576-71022f7b2658?w=500&q=80",
  },
  {
    title: "Developers & Private Enterprises",
    description: "Build innovative location-based applications and services using our comprehensive APIs and developer-friendly spatial data infrastructure.",
    image: "https://images.unsplash.com/photo-1514591792873-8862494066d2?w=500&q=80",
  },
  {
    title: "Research & Academia",
    description: "Access high-quality spatial datasets for academic research, geographic studies, and educational programs in GIS and spatial sciences.",
    image: "https://images.unsplash.com/photo-1623632306901-e509641e7191?w=500&q=80",
  },
];

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="who-can-use" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Users</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">Who Can Use BSDI?</h2>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">
            BSDI is designed for organizations that rely on accurate spatial data, secure collaboration, and intelligent insights.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {users.map((user, i) => (
            <div
              key={user.title}
              className={`glass rounded-2xl overflow-hidden card-hover group transition-all duration-700 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={user.image}
                  alt={user.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm font-semibold text-foreground mb-2">{user.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{user.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
