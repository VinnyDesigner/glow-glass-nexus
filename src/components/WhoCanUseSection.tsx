import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useSectionStyles } from "@/lib/i18n";

import usersGovernment from "@/assets/users-government.jpg";
import usersUrbanPlanning from "@/assets/users-urban-planning.jpg";
import usersInfrastructure from "@/assets/users-infrastructure.jpg";
import usersEnvironment from "@/assets/users-environment.jpg";
import usersTransportation from "@/assets/users-transportation.jpg";
import usersSecurity from "@/assets/users-security.jpg";
import usersDevelopers from "@/assets/users-developers.jpg";
import usersResearch from "@/assets/users-research.jpg";

const userImages = [
  usersGovernment,
  usersUrbanPlanning,
  usersInfrastructure,
  usersEnvironment,
  usersTransportation,
  usersSecurity,
  usersDevelopers,
  usersResearch,
];

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();
  const L = useLocalized();
  const styles = useSectionStyles(users);

  return (
    <section id="who-can-use" className="relative overflow-hidden section-padding py-[80px]">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(348,83%,40%), transparent 70%)' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(210,20%,50%), transparent 70%)' }} />
      </div>

      <div ref={ref} className="container mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground" style={styles.heading}>
            {L(users.heading, users.heading_ar)}
          </h2>
          <p className="max-w-3xl mx-auto mt-5 text-muted-foreground text-base md:text-lg leading-relaxed" style={styles.description}>
            {L(users.description, users.description_ar)}
          </p>
        </div>

        {/* Cards grid — 70% image, 30% text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {users.cards.map((user, i) => (
            <div
              key={user.id}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.08}s forwards` : 'none',
              }}
            >
              <div
                className="relative h-[340px] md:h-[380px] rounded-2xl overflow-hidden transition-transform duration-400 ease-out
                  hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  boxShadow: '0 8px 32px hsla(210,20%,50%,0.12), 0 2px 8px hsla(210,20%,50%,0.06)',
                }}
              >
                {/* Image — 70% */}
                <img
                  src={userImages[i % userImages.length]}
                  alt={L(user.title, user.title_ar)}
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
                  <h3 className="font-display text-sm md:text-base font-semibold mb-1.5 text-secondary-foreground">
                    {L(user.title, user.title_ar)}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {L(user.description, user.description_ar)}
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
