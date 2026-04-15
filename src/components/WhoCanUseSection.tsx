import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

/* Abstract SVG icons per user type */
const userVisuals: Record<number, () => JSX.Element> = {
  // Government — governance nodes
  0: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <rect x="25" y="15" width="30" height="6" rx="1" stroke="hsl(348,83%,40%)" strokeOpacity="0.3" strokeWidth="0.8" fill="hsla(348,83%,40%,0.06)" />
      <rect x="20" y="24" width="40" height="36" rx="2" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="0.8" fill="hsla(348,83%,40%,0.04)" />
      <line x1="30" y1="24" x2="30" y2="60" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="40" y1="24" x2="40" y2="60" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="50" y1="24" x2="50" y2="60" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="20" y="60" width="40" height="5" rx="1" fill="hsla(348,83%,40%,0.08)" />
      <circle cx="40" cy="42" r="6" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="0.6" fill="none" />
      <circle cx="40" cy="42" r="2" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
    </svg>
  ),
  // Urban Planning — map grid
  1: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {[20, 32, 44, 56].map(y => <line key={`h${y}`} x1="15" y1={y} x2="65" y2={y} stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.5" />)}
      {[20, 32, 44, 56].map(x => <line key={`v${x}`} x1={x} y1="15" x2={x} y2="65" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.5" />)}
      <rect x="20" y="20" width="12" height="12" rx="1" fill="hsl(348,83%,40%)" fillOpacity="0.12" />
      <rect x="44" y="32" width="12" height="24" rx="1" fill="hsl(348,83%,40%)" fillOpacity="0.08" />
      <rect x="20" y="44" width="24" height="12" rx="1" fill="hsl(210,20%,50%)" fillOpacity="0.08" />
      <circle cx="50" cy="26" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
    </svg>
  ),
  // Infrastructure — network pipelines
  2: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M15 40 H30 L38 25 H55 L60 40 H65" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="1" fill="none" />
      <path d="M15 50 H25 L32 60 H50 L58 50 H65" stroke="hsl(210,20%,50%)" strokeOpacity="0.18" strokeWidth="0.8" fill="none" />
      <circle cx="30" cy="40" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
      <circle cx="55" cy="25" r="2.5" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
      <circle cx="60" cy="40" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
      <circle cx="50" cy="60" r="2.5" fill="hsl(210,20%,50%)" fillOpacity="0.2" />
      <line x1="38" y1="25" x2="38" y2="60" stroke="hsl(348,83%,40%)" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  ),
  // Environment — nature + data
  3: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M40 18 C30 28 20 35 20 48 C20 58 28 65 40 65 C52 65 60 58 60 48 C60 35 50 28 40 18Z" fill="hsl(348,83%,40%)" fillOpacity="0.06" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.8" />
      <path d="M40 30 L40 55" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.6" />
      <path d="M40 38 L50 32" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <path d="M40 45 L30 40" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <circle cx="40" cy="50" r="4" stroke="hsl(210,20%,50%)" strokeOpacity="0.15" strokeWidth="0.5" fill="none" />
      <circle cx="40" cy="50" r="8" stroke="hsl(210,20%,50%)" strokeOpacity="0.08" strokeWidth="0.5" fill="none" />
    </svg>
  ),
  // Transportation — routes
  4: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="40" r="22" stroke="hsl(210,20%,50%)" strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
      <circle cx="40" cy="40" r="14" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" fill="none" />
      <path d="M20 40 H60" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.6" />
      <path d="M40 20 V60" stroke="hsl(348,83%,40%)" strokeOpacity="0.15" strokeWidth="0.6" />
      <path d="M25 25 L55 55" stroke="hsl(210,20%,50%)" strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="3 3" />
      <circle cx="40" cy="40" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.3" />
      <circle cx="55" cy="40" r="2" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
      <circle cx="40" cy="25" r="2" fill="hsl(210,20%,50%)" fillOpacity="0.2" />
    </svg>
  ),
  // Security — shield
  5: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M40 15 L58 25 V45 C58 55 50 62 40 67 C30 62 22 55 22 45 V25 Z" fill="hsl(348,83%,40%)" fillOpacity="0.05" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="0.8" />
      <path d="M40 28 L48 33 V42 C48 47 44 50 40 52 C36 50 32 47 32 42 V33 Z" fill="hsl(348,83%,40%)" fillOpacity="0.08" stroke="hsl(348,83%,40%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="3" fill="hsl(348,83%,40%)" fillOpacity="0.25" />
    </svg>
  ),
  // Developers — code brackets
  6: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M30 25 L18 40 L30 55" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M50 25 L62 40 L50 55" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <line x1="44" y1="22" x2="36" y2="58" stroke="hsl(210,20%,50%)" strokeOpacity="0.2" strokeWidth="0.8" />
      <circle cx="25" cy="40" r="2" fill="hsl(348,83%,40%)" fillOpacity="0.15" />
      <circle cx="55" cy="40" r="2" fill="hsl(348,83%,40%)" fillOpacity="0.15" />
    </svg>
  ),
  // Research — data lens
  7: () => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="36" cy="38" r="16" stroke="hsl(348,83%,40%)" strokeOpacity="0.2" strokeWidth="0.8" fill="hsl(348,83%,40%)" fillOpacity="0.04" />
      <line x1="48" y1="50" x2="62" y2="64" stroke="hsl(348,83%,40%)" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="28" y1="32" x2="44" y2="32" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="28" y1="38" x2="44" y2="38" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="28" y1="44" x2="40" y2="44" stroke="hsl(210,20%,50%)" strokeOpacity="0.12" strokeWidth="0.5" />
      <circle cx="42" cy="35" r="2" fill="hsl(348,83%,40%)" fillOpacity="0.2" />
    </svg>
  ),
};

/* Organic layout offsets for desktop – gives non-rigid feel */
const layoutOffsets = [
  { marginTop: '0px' },
  { marginTop: '24px' },
  { marginTop: '8px' },
  { marginTop: '32px' },
  { marginTop: '16px' },
  { marginTop: '4px' },
  { marginTop: '28px' },
  { marginTop: '12px' },
];

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();

  return (
    <section id="who-can-use" className="relative overflow-hidden py-20 md:py-32 lg:py-40 px-4 md:px-6">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(348,83%,40%), transparent 70%)' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(210,20%,50%), transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(348,83%,40%), transparent 60%)' }} />

        {/* Subtle GIS grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="users-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(210,20%,50%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#users-grid)" />
        </svg>
      </div>

      <div ref={ref} className="container mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {users.heading}
          </h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {users.description}
          </p>
        </div>

        {/* Ecosystem grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {users.cards.map((user, i) => {
            const Visual = userVisuals[i % Object.keys(userVisuals).length];
            const offset = layoutOffsets[i % layoutOffsets.length];
            return (
              <div
                key={user.id}
                className="group relative lg:first:col-span-1"
                style={{
                  ...(window.innerWidth >= 1024 ? offset : {}),
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.08}s forwards` : 'none',
                }}
              >
                <div
                  className="relative rounded-2xl p-5 h-full transition-all duration-400 ease-out
                    hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    background: 'hsla(0, 0%, 100%, 0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid hsla(0, 0%, 100%, 0.22)',
                    boxShadow: `
                      inset 0 1px 1px hsla(0,0%,100%,0.25),
                      0 8px 32px hsla(210,20%,50%,0.07),
                      0 2px 8px hsla(210,20%,50%,0.04)
                    `,
                    animation: `users-float 7s ease-in-out ${i * 0.9}s infinite`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      border: '1px solid hsla(348, 83%, 40%, 0.18)',
                      boxShadow: '0 0 24px hsla(348, 83%, 40%, 0.06), inset 0 0 16px hsla(348, 83%, 40%, 0.02)',
                    }}
                  />

                  {/* Icon */}
                  <div className="w-16 h-16 mb-4 mx-auto rounded-xl overflow-hidden flex items-center justify-center"
                    style={{
                      background: 'hsla(210, 20%, 95%, 0.35)',
                      border: '1px solid hsla(210, 20%, 88%, 0.25)',
                    }}
                  >
                    <Visual />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-2 text-center">
                    {user.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs leading-relaxed text-center line-clamp-3">
                    {user.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Network connection lines (desktop) */}
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" fill="none">
          <line x1="25%" y1="55%" x2="50%" y2="50%" stroke="hsl(348,83%,40%)" strokeWidth="0.8" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="50%" x2="75%" y2="55%" stroke="hsl(348,83%,40%)" strokeWidth="0.8" strokeDasharray="5 5">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="25%" y1="75%" x2="50%" y2="70%" stroke="hsl(210,20%,50%)" strokeWidth="0.6" strokeDasharray="4 6">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="70%" x2="75%" y2="75%" stroke="hsl(210,20%,50%)" strokeWidth="0.6" strokeDasharray="4 6">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <style>{`
        @keyframes users-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}
