import { useScrollAnimation } from "./useScrollAnimation";
import { useContentStore } from "@/stores/contentStore";

export default function WhoCanUseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { users } = useContentStore();

  return (
    <section id="who-can-use" className="section-padding relative section-mesh">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsla(220,20%,95%,0.4)] to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container mx-auto relative z-10">
        <div className={`text-center mb-12`} style={{ opacity: isVisible ? 1 : 0, animation: isVisible ? 'fadeBlurUp 0.7s ease-out forwards' : 'none' }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight gradient-text-dark">{users.heading}</h2>
          <p className="max-w-2xl mx-auto mt-5 text-muted-foreground text-lg leading-relaxed">{users.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.cards.map((user, i) => {
            const Wrapper = user.link ? 'a' : 'div';
            const wrapperProps = user.link ? { href: user.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Wrapper
                key={user.id}
                {...wrapperProps as any}
                className={`glass-card-img relative block ${user.link ? "cursor-pointer" : ""}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  animation: isVisible ? `fadeBlurUp 0.6s ease-out ${i * 0.1}s forwards` : 'none',
                }}
              >
                <div className="card-image-wrapper relative" style={{ height: 220 }}>
                  <img src={user.image} alt={user.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsla(0,0%,0%,0.5)] via-[hsla(0,0%,0%,0.15)] to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-1.5 tracking-tight">{user.title}</h3>
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
