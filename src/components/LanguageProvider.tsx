import { useEffect } from "react";
import { useUiStore } from "@/stores/uiStore";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language } = useUiStore();
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  return <>{children}</>;
}
