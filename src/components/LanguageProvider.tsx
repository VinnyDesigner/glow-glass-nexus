import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUiStore } from "@/stores/uiStore";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language } = useUiStore();
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin = pathname.startsWith("/admin-crm");
    if (isAdmin) {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      return;
    }
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language, pathname]);

  return <>{children}</>;
}
