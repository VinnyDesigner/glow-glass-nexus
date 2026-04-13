export default function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://shush-bubble-84673240.figma.site/_assets/v11/abaadf30c853725a08348b6d391e9ff1a5b88f42.png"
              alt="BSDI Logo"
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-8">
            {["About", "Services", "Who Can Use", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BSDI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
