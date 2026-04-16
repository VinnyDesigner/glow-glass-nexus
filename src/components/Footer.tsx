import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";
import bahrain2030 from "@/assets/bahrain-2030.png";
import igaLogo from "@/assets/iga-logo.png";
import bahrainSkyline from "@/assets/bahrain-skyline-footer.png";

const iconMap: Record<string, React.ElementType> = {
  Instagram, Twitter, Facebook, LinkedIn: Linkedin, YouTube: Youtube,
};

export default function Footer() {
  const { footer } = useContentStore();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-10 items-start">
          <div className="flex items-center justify-center">
            <img src={igaLogo} alt="Kingdom of Bahrain - Information & eGovernment Authority" className="h-24 object-contain" />
          </div>
          <div className="flex items-center justify-center">
            <img src={bahrain2030} alt="Bahrain 2030" className="h-20 object-contain" />
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-5">Quick links</h4>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-5">External links</h4>
            <ul className="space-y-3">
              {footer.externalLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50"><path d="M3.5 2h6.5v6.5M10 2L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-5">Follow us</h4>
            <div className="flex items-center gap-3">
              {footer.socialLinks.map((social) => {
                const Icon = iconMap[social.platform] || Instagram;
                return (
                  <a key={social.platform} href={social.href} aria-label={social.platform} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <img src={bahrainSkyline} alt="Bahrain Skyline" className="mt-4 h-12 object-contain opacity-50" />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bahrain Spatial Data Infrastructure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
