import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import igaHeaderLogo from "@/assets/iga-header-logo.png";
import { useUiStore } from "@/stores/uiStore";
import { useContentStore } from "@/stores/contentStore";
import { useT } from "@/lib/i18n";
import { buildSearchIndex, searchHits } from "@/lib/searchIndex";

function LangToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useUiStore();
  return (
    <div className={`inline-flex items-center rounded-xl border border-border bg-background p-0.5 ${className}`}>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          language === "en" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={language === "en"}
      >EN</button>
      <button
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
          language === "ar" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={language === "ar"}
      >عربي</button>
    </div>
  );
}

const NAV_OFFSET = 80;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();
  const { language } = useUiStore();
  const store = useContentStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { label: t("nav.news"), href: "#news" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.map"), href: "#map-view" },
    { label: t("nav.layers"), href: "#layers" },
    { label: t("nav.bsdiProvides"), href: "#services" },
    { label: t("nav.vision"), href: "#vision" },
    { label: t("nav.whoCanUse"), href: "#who-can-use" },
    { label: t("nav.contact"), href: "#footer" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setDropdownOpen(false);
      if (!searchWrapRef.current?.contains(e.target as Node)) {
        if (!query.trim()) setSearchOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onEsc); };
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      // delay focus so width transition starts
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const allHits = useMemo(() => {
    if (!query.trim()) return [];
    const index = buildSearchIndex(store, language);
    return searchHits(index, query);
  }, [query, store, language]);

  const previewHits = allHits.slice(0, 5);

  const scrollToHash = (hash: string) => {
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    scrollToHash(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setDropdownOpen(false);
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const goToHit = (link: string) => {
    setDropdownOpen(false);
    setSearchOpen(false);
    setQuery("");
    if (link.startsWith("http")) window.open(link, "_blank", "noopener,noreferrer");
    else if (link.startsWith("/#")) navigate("/" + link.slice(1));
    else navigate(link);
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
      <div ref={containerRef} className="container mx-auto flex items-center gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={igaHeaderLogo} alt="Information & eGovernment Authority" className="h-9 md:h-11" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs xl:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Collapsible circular search */}
          <div ref={searchWrapRef} className="relative">
            <form
              onSubmit={handleSearch}
              className={`flex items-center h-10 rounded-full border border-border bg-secondary/50 transition-[width,background-color] duration-300 ease-out overflow-hidden ${
                searchOpen ? "w-64 bg-background" : "w-10"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  if (!searchOpen) setSearchOpen(true);
                  else if (!query.trim()) setSearchOpen(false);
                }}
                aria-label="Toggle search"
                className="flex items-center justify-center w-10 h-10 shrink-0 text-muted-foreground hover:text-foreground"
              >
                <Search size={16} />
              </button>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setDropdownOpen(true); }}
                onFocus={() => setDropdownOpen(true)}
                placeholder={t("search.placeholder")}
                tabIndex={searchOpen ? 0 : -1}
                className={`flex-1 h-full bg-transparent text-sm pr-3 focus:outline-none placeholder:text-muted-foreground ${
                  searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
              {searchOpen && query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="px-2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {searchOpen && dropdownOpen && query.trim() && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50">
                {previewHits.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">{t("search.noResults")}</div>
                ) : (
                  <ul className="max-h-80 overflow-y-auto">
                    {previewHits.map((h) => (
                      <li key={`${h.type}-${h.id}`}>
                        <button
                          type="button"
                          onClick={() => goToHit(h.link)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors text-left"
                        >
                          <img src={h.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{h.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{h.description}</p>
                          </div>
                          <span className="text-[10px] uppercase font-semibold text-primary shrink-0">{t(h.section)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={handleSearch as unknown as () => void}
                  className="w-full p-3 text-sm font-semibold text-primary hover:bg-primary/5 border-t border-border transition-colors"
                >
                  {t("search.seeAll")} "{query}"
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/admin-crm")}
            className="px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold bg-primary text-primary-foreground transition-all duration-200 hover:opacity-90 whitespace-nowrap"
          >
            {t("nav.admin")}
          </button>
          <LangToggle />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden ml-auto flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(0,0%,100%)] mt-2 mx-4 rounded-2xl p-6 shadow-lg space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholderShort")}
              className="w-full h-10 pl-9 pr-4 text-sm rounded-full border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </form>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate("/admin-crm"); }} className="block w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground">
            {t("nav.admin")}
          </button>
          <div className="flex justify-center"><LangToggle /></div>
        </div>
      )}
    </nav>
  );
}
