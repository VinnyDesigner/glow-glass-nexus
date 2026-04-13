import { useScrollAnimation } from "./useScrollAnimation";

const entities = [
  { name: "Information & eGovernment Authority", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f605a5e591189376365a30f4b95cd45df42b30e8.png" },
  { name: "Survey and Land Registration Bureau", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/727daca89e21026342142442add6c9766c555cbb.png" },
  { name: "Social Insurance Organization", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f1c6e9c2249bcaeb1e3018078696afc3cfcf52d0.png" },
  { name: "Tender Board", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/01f965fdea88f9f7d0cced4e43fd8e495d4ffef2.png" },
  { name: "Ministry of Foreign Affairs", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/f19352d4f262cdb0f5fc7260253177e0bfaae583.png" },
  { name: "Ministry of Industry and Commerce", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d0a3949086d392f40ff1edc155daf8aa8b1bcd3b.png" },
  { name: "Ministry of Transportation and Telecommunications", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/d6aa7287fb342a673e97a0e070843e01698abdc2.png" },
  { name: "Ministry of Interior", logo: "https://shush-bubble-84673240.figma.site/_assets/v11/8f93324345cc3e00b8122973bbc8251a16de98d9.png" },
];

export default function DataServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="section-padding relative noise-bg">
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Partners</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">Data Services Provided by</h2>
          <p className="max-w-2xl mx-auto mt-6 text-muted-foreground text-lg">
            Find Data Services by their providing entities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {entities.map((entity, i) => (
            <a
              key={entity.name}
              href="https://services.bahrain.bh/wps/portal/en/BSP/GSX-UI-MultipleEntitiesByEService/GSX-UI-EServicesByEntity"
              target="_blank"
              rel="noopener noreferrer"
              className={`glass rounded-2xl p-6 flex flex-col items-center gap-4 card-hover group text-center transition-all duration-700 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center p-2 transition-all duration-300 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_hsla(0,78%,55%,0.15)]">
                <img
                  src={entity.logo}
                  alt={entity.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {entity.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
