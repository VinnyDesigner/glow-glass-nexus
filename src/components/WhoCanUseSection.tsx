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
                <div className="card-image" style={{ aspectRatio: '4/3' }}>
                  <img src={user.image} alt={user.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1.5">{user.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">{user.description}</p>
                  <div className="border-t border-border pt-3 mt-auto">
                    <span className="view-details-link justify-end w-full text-xs">
                      View Details
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
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
