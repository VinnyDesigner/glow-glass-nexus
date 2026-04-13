import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Dataset Request", href: "#" },
  { label: "Open Data Policy", href: "#" },
];

const externalLinks = [
  { label: "GCC Statistical Center", href: "https://gccstat.org", external: true },
  { label: "SHAREKNA", href: "https://www.sharekna.bh", external: true },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-10 items-start">
          {/* Logo 1 - iGA */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="https://shush-bubble-84673240.figma.site/_assets/v11/abaadf30c853725a08348b6d391e9ff1a5b88f42.png"
              alt="Information & eGovernment Authority"
              className="h-20 object-contain"
            />
            <div className="text-center">
              <p className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Kingdom of Bahrain</p>
              <p className="text-xs font-semibold text-foreground">Information & eGovernment Authority</p>
            </div>
          </div>

          {/* Logo 2 - Bahrain 2030 */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <span className="font-display text-4xl font-bold gradient-text italic">2030</span>
              <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase">Bahrain</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-4">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-4">External links</h4>
            <ul className="space-y-3">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50">
                      <path d="M3.5 2h6.5v6.5M10 2L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-4">Follow us</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
