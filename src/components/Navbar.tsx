import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import igaHeaderLogo from "@/assets/iga-header-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Who Can Use", href: "#who-can-use" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <img
            src={igaHeaderLogo}
            alt="Information & eGovernment Authority"
            className="h-10 md:h-12"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
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
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[hsl(0,0%,100%)] mt-2 mx-4 rounded-2xl p-6 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setMobileOpen(false); navigate("/admin-crm"); }} className="mt-4 block w-full text-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground">
            Admin
          </button>
        </div>
      )}
    </nav>
  );
}
