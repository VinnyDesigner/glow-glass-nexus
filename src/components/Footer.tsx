import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";
import { useLocalized, useT } from "@/lib/i18n";
import bahrain2030 from "@/assets/bahrain-2030.png";

const iconMap: Record<string, React.ElementType> = {
  Instagram, Twitter, Facebook, LinkedIn: Linkedin, YouTube: Youtube,
};

export default function Footer() {
  const { footer } = useContentStore();
  const L = useLocalized();
  const t = useT();

  // Split quick links into 3 columns for IGA-style grid
  const cols: typeof footer.quickLinks[] = [[], [], []];
  footer.quickLinks.forEach((l, i) => cols[i % 3].push(l));

  return (
    <footer id="footer" className="bg-[hsl(215,15%,32%)] text-white">
      <div className="container mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,340px)_1fr] gap-12">
          {/* Authority info */}
          <div>
            <h3 className="font-display text-2xl md:text-[26px] leading-tight font-medium mb-6">
              {L(footer.authorityTitle || "", footer.authorityTitle_ar || "")}
            </h3>
            <p className="text-sm text-white/80 whitespace-pre-line leading-relaxed mb-6">
              {L(footer.address || "", footer.address_ar || "")}
            </p>
            {footer.phone && (
              <>
                <div className="text-3xl md:text-4xl font-display font-bold tracking-wide mb-2">
                  {footer.phone}
                </div>
                <p className="text-xs text-white/70">
                  {L(footer.phoneCaption || "", footer.phoneCaption_ar || "")}
                </p>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] text-white mb-5">
              {t("footer.quickLinks").toUpperCase()}
            </h4>
            <div className="h-px bg-white/20 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {cols.map((col, ci) => (
                <ul key={ci} className="space-y-4">
                  {col.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="text-sm text-white/85 hover:text-white transition-colors">
                        {L(link.label, link.label_ar)}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-white/15 mt-12 mb-6" />

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-xs text-white/80 space-y-1">
            <p>{L(footer.copyrightText || "", footer.copyrightText_ar || "")}</p>
            <p className="text-white/70">
              {(footer.legalLinks || []).map((l, i, arr) => (
                <span key={l.id}>
                  <a href={l.href} className="hover:text-white transition-colors">{L(l.label, l.label_ar)}</a>
                  {i < arr.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))}
            </p>
          </div>

          <div className="flex justify-center">
            <img src={bahrain2030} alt="Bahrain 2030" className="h-14 object-contain brightness-0 invert opacity-90" />
          </div>

          <div className="flex md:justify-end items-center gap-4 flex-wrap">
            <span className="text-xs tracking-[0.15em] text-white/80">{t("footer.followUs").toUpperCase()} :</span>
            <div className="flex items-center gap-2">
              {footer.socialLinks.map((social) => {
                const Icon = iconMap[social.platform] || Instagram;
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.platform}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
