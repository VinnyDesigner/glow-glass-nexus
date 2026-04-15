import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

/* Abstract SVG visuals for each card — GIS grids, network nodes, digital maps, city wireframes */
const abstractVisuals = [
  // GIS Grid Lines
  () => (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="grid-grad" x1="0" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(348,83%,40%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(210,20%,60%)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Horizontal grid */}
      {[20, 40, 60, 80, 100, 120].map(y => (
        <line key={`h${y}`} x1="10" y1={y} x2="190" y2={y} stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      ))}
      {/* Vertical grid */}
      {[30, 60, 90, 120, 150, 170].map(x => (
        <line key={`v${x}`} x1={x} y1="10" x2={x} y2="130" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      ))}
      {/* Data points */}
      <circle cx="60" cy="40" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.3" />
      <circle cx="120" cy="80" r="4" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
      <circle cx="90" cy="60" r="2.5" fill="hsl(348,83%,40%)" fillOpacity="0.35" />
      <circle cx="150" cy="40" r="2" fill="hsl(210,20%,50%)" fillOpacity="0.3" />
      <circle cx="30" cy="100" r="3.5" fill="hsl(210,20%,50%)" fillOpacity="0.2" />
      {/* Connection lines */}
      <path d="M60 40 L90 60 L120 80" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M90 60 L150 40" stroke="hsl(210,20%,50%)" strokeOpacity="0.15" strokeWidth="0.8" strokeDasharray="3 4" />
      {/* Polygon overlay */}
      <polygon points="60,40 120,80 150,40" fill="url(#grid-grad)" />
    </svg>
  ),
  // Network Nodes
  () => (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(348,83%,40%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(348,83%,40%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Connection lines */}
      <line x1="50" y1="35" x2="100" y2="70" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="100" y1="70" x2="155" y2="45" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="100" y1="70" x2="70" y2="110" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.8" />
      <line x1="100" y1="70" x2="145" y2="105" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.8" />
      <line x1="50" y1="35" x2="70" y2="110" stroke="hsl(348,83%,40%)" strokeOpacity="0.08" strokeWidth="0.6" />
      <line x1="155" y1="45" x2="145" y2="105" stroke="hsl(348,83%,40%)" strokeOpacity="0.08" strokeWidth="0.6" />
      {/* Glow */}
      <circle cx="100" cy="70" r="30" fill="url(#node-glow)" />
      {/* Nodes */}
      <circle cx="100" cy="70" r="6" fill="hsl(348,83%,40%)" fillOpacity="0.3" />
      <circle cx="100" cy="70" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.5" />
      <circle cx="50" cy="35" r="4" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
      <circle cx="155" cy="45" r="4" fill="hsl(210,20%,50%)" fillOpacity="0.25" />
      <circle cx="70" cy="110" r="3.5" fill="hsl(210,20%,50%)" fillOpacity="0.2" />
      <circle cx="145" cy="105" r="3.5" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
      {/* Orbiting rings */}
      <circle cx="100" cy="70" r="18" stroke="hsl(348,83%,40%)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="70" r="40" stroke="hsl(210,20%,50%)" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
    </svg>
  ),
  // Digital Map Pattern
  () => (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="map-grad" x1="0" y1="0" x2="200" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(210,20%,50%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(348,83%,40%)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Terrain contours */}
      <path d="M10 100 Q50 60 90 80 T170 50 L190 60" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.8" fill="none" />
      <path d="M10 110 Q60 70 100 90 T180 55 L190 70" stroke="hsl(348,83%,40%)" strokeOpacity="0.1" strokeWidth="0.6" fill="none" />
      <path d="M10 90 Q40 55 80 70 T160 45 L190 50" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.7" fill="none" />
      {/* Location markers */}
      <g transform="translate(70,55)">
        <path d="M0-8 C-4.4-8-8-4.4-8 0 C-8 6 0 12 0 12 S8 6 8 0 C8-4.4 4.4-8 0-8Z" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="2.5" fill="hsl(348,83%,40%)" fillOpacity="0.4" />
      </g>
      <g transform="translate(140,40)">
        <path d="M0-6 C-3.3-6-6-3.3-6 0 C-6 4.5 0 9 0 9 S6 4.5 6 0 C6-3.3 3.3-6 0-6Z" fill="hsl(210,20%,50%)" fillOpacity="0.25" />
        <circle cx="0" cy="0" r="2" fill="hsl(210,20%,50%)" fillOpacity="0.4" />
      </g>
      {/* Area fill */}
      <path d="M30 85 Q60 65 90 75 Q120 85 150 60 L170 70 L170 120 L30 120 Z" fill="url(#map-grad)" />
      {/* Scale bar */}
      <line x1="140" y1="120" x2="185" y2="120" stroke="hsl(210,20%,50%)" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="140" y1="117" x2="140" y2="123" stroke="hsl(210,20%,50%)" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="185" y1="117" x2="185" y2="123" stroke="hsl(210,20%,50%)" strokeOpacity="0.2" strokeWidth="0.8" />
    </svg>
  ),
  // City Wireframe
  () => (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="city-grad" x1="0" y1="140" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(348,83%,40%)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(348,83%,40%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Ground plane grid */}
      <line x1="10" y1="115" x2="190" y2="115" stroke="hsl(210,20%,50%)" strokeOpacity="0.1" strokeWidth="0.5" />
      <line x1="20" y1="125" x2="180" y2="125" stroke="hsl(210,20%,50%)" strokeOpacity="0.06" strokeWidth="0.5" />
      {/* Buildings wireframe */}
      <rect x="25" y="65" width="22" height="50" rx="1" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="0.8" fill="url(#city-grad)" />
      <rect x="55" y="40" width="18" height="75" rx="1" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="0.8" fill="url(#city-grad)" />
      <rect x="80" y="25" width="24" height="90" rx="1" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="0.8" fill="url(#city-grad)" />
      <rect x="112" y="50" width="20" height="65" rx="1" stroke="hsl(210,20%,50%)" strokeOpacity="0.18" strokeWidth="0.8" fill="url(#city-grad)" />
      <rect x="140" y="35" width="16" height="80" rx="1" stroke="hsl(210,20%,50%)" strokeOpacity="0.18" strokeWidth="0.8" fill="url(#city-grad)" />
      <rect x="163" y="55" width="22" height="60" rx="1" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.8" fill="url(#city-grad)" />
      {/* Window dots */}
      {[30, 36, 42].map(x => [72, 82, 92, 102].map(y => (
        <rect key={`w${x}${y}`} x={x} y={y} width="2" height="2" rx="0.5" fill="hsl(348,83%,40%)" fillOpacity="0.15" />
      )))}
      {[86, 94].map(x => [35, 45, 55, 65, 75, 85, 95].map(y => (
        <rect key={`w${x}${y}`} x={x} y={y} width="2.5" height="2.5" rx="0.5" fill="hsl(348,83%,40%)" fillOpacity="0.12" />
      )))}
      {/* Signal wave from tallest */}
      <circle cx="92" cy="20" r="8" stroke="hsl(348,83%,40%)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
      <circle cx="92" cy="20" r="15" stroke="hsl(348,83%,40%)" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />
    </svg>
  ),
];

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { vision } = useContentStore();

  return (
    <section id="vision" className="relative overflow-hidden py-20 md:py-32 lg:py-40 px-4 md:px-6">
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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(348,83%,40%), transparent 60%)' }}
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

        {/* Glass tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {vision.cards.map((card, i) => {
            const Visual = abstractVisuals[i % abstractVisuals.length];
            return (
              <div
                key={card.id}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.12}s forwards` : 'none',
                }}
              >
                {/* Floating glass tile */}
                <div
                  className="relative rounded-2xl p-6 h-full transition-all duration-400 ease-out
                    hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'hsla(0, 0%, 100%, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid hsla(0, 0%, 100%, 0.25)',
                    boxShadow: `
                      inset 0 1px 1px hsla(0,0%,100%,0.3),
                      0 8px 32px hsla(210,20%,50%,0.08),
                      0 2px 8px hsla(210,20%,50%,0.04)
                    `,
                    animation: `vision-float 6s ease-in-out ${i * 1.5}s infinite`,
                  }}
                >
                  {/* Hover glow border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      border: '1px solid hsla(348, 83%, 40%, 0.2)',
                      boxShadow: '0 0 20px hsla(348, 83%, 40%, 0.06), inset 0 0 20px hsla(348, 83%, 40%, 0.03)',
                    }}
                  />

                  {/* Abstract visual */}
                  <div className="w-full h-28 mb-5 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{
                      background: 'hsla(210, 20%, 95%, 0.4)',
                      border: '1px solid hsla(210, 20%, 88%, 0.3)',
                    }}
                  >
                    <Visual />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-2.5">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting lines between tiles (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl pointer-events-none">
          <svg className="w-full h-4 opacity-[0.08]" viewBox="0 0 1200 16" fill="none" preserveAspectRatio="none">
            <line x1="150" y1="8" x2="450" y2="8" stroke="hsl(348,83%,40%)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="450" y1="8" x2="750" y2="8" stroke="hsl(348,83%,40%)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="750" y1="8" x2="1050" y2="8" stroke="hsl(348,83%,40%)" strokeWidth="1" strokeDasharray="6 6" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes vision-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
