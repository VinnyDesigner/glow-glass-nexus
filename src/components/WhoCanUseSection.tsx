import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();

  return (
    <section id="who-can-use" className="section-padding">
      <div ref={ref} className="container mx-auto">
        <div className="text-center mb-14" style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.6s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">{users.heading}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-base leading-relaxed">{users.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.cards.map((user, i) => {
            const Wrapper = user.link ? 'a' : 'div';
            const wrapperProps = user.link ? { href: user.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={user.id}
                {...wrapperProps as any}
                className={`clean-card block ${user.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.5s ease-out ${i * 0.06}s forwards` : 'none',
                }}
              >
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img src={user.image} alt={user.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1.5">{user.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{user.description}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
