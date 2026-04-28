import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import igaHeaderLogo from "@/assets/iga-header-logo.png";
import { useUiStore } from "@/stores/uiStore";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Who Can Use", href: "#who-can-use" },
  { label: "Contact", href: "#contact" },
];

function LangToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useUiStore();
  return (
    <div className={`inline-flex items-center rounded-xl border border-border bg-background p-0.5 ${className}`}>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          language === "ar"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={language === "ar"}
      >
        عربي
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search wiring placeholder
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[hsl(0,0%,100%)] ${
        scrolled ? "shadow-[0_2px_12px_hsla(210,20%,50%,0.1)]" : ""
      }`}
      style={{
        paddingTop: scrolled ? '0.5rem' : '0.75rem',
        paddingBottom: scrolled ? '0.5rem' : '0.75rem',
      }}
    >
      <div className="container mx-auto flex items-center gap-4 px-4 md:px-8">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img
            src={igaHeaderLogo}
            alt="Information & eGovernment Authority"
            className="h-10 md:h-12"
          />
        </a>

        {/* Center search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 justify-center"
        >
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search datasets, services, layers..."
              className="w-full h-10 pl-9 pr-4 text-sm rounded-full border border-border bg-secondary/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
            />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => navigate("/admin-crm")}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90"
          >
            Admin
          </button>
          <LangToggle />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[hsl(0,0%,100%)] mt-2 mx-4 rounded-2xl p-6 shadow-lg space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-4 text-sm rounded-full border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </form>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate("/admin-crm"); }} className="block w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground">
            Admin
          </button>
          <div className="flex justify-center">
            <LangToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
