import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();

  return (
    <section id="who-can-use" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 gradient-text-dark">{users.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">{users.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.cards.map((user, i) => {
            const Wrapper = user.link ? 'a' : 'div';
            const wrapperProps = user.link ? { href: user.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={user.id}
                {...wrapperProps as any}
                className={`rounded-2xl overflow-hidden card-hover group transition-all duration-500 relative block ${isVisible ? "animate-fade-up" : "opacity-0"} ${user.link ? "cursor-pointer" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-[200px] overflow-hidden rounded-2xl">
                  <img src={user.image} alt={user.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'hsla(0,0%,0%,0.25)', backdropFilter: 'blur(10px)' }}>
                    <h3 className="font-display text-sm font-semibold text-white mb-1">{user.title}</h3>
                    <p className="text-white/80 text-xs leading-relaxed line-clamp-2">{user.description}</p>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
