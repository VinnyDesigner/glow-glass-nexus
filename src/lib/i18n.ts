import { useUiStore } from "@/stores/uiStore";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.about": "About",
  "nav.services": "Services",
  "nav.whoCanUse": "Who Can Use",
  "nav.contact": "Contact",
  "nav.admin": "Admin",
  "search.placeholder": "Search datasets, services, layers...",
  "search.placeholderShort": "Search...",
  "search.seeAll": "See all results for",
  "search.noResults": "No results found",
  "search.resultsFor": "Results for",
  "search.totalFound": "results found",
  "search.section.layers": "Layers",
  "search.section.services": "Services",
  "search.section.news": "News",
  "search.section.users": "Users",
  "search.section.vision": "Vision",
  "news.readMore": "Read more",
  "mapView.badge": "Interactive Map",
  "mapView.back": "Back to Home",
  "common.openExternal": "Open",
  "footer.quickLinks": "Quick Links",
  "footer.externalLinks": "External Links",
  "footer.followUs": "Follow Us",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
};

const ar: Dict = {
  "nav.about": "حول",
  "nav.services": "الخدمات",
  "nav.whoCanUse": "من يمكنه الاستخدام",
  "nav.contact": "اتصل بنا",
  "nav.admin": "المشرف",
  "search.placeholder": "ابحث عن البيانات والخدمات والطبقات...",
  "search.placeholderShort": "بحث...",
  "search.seeAll": "عرض جميع النتائج لـ",
  "search.noResults": "لم يتم العثور على نتائج",
  "search.resultsFor": "نتائج البحث عن",
  "search.totalFound": "نتيجة",
  "search.section.layers": "الطبقات",
  "search.section.services": "الخدمات",
  "search.section.news": "الأخبار",
  "search.section.users": "المستخدمون",
  "search.section.vision": "الرؤية",
  "news.readMore": "اقرأ المزيد",
  "mapView.badge": "الخريطة التفاعلية",
  "mapView.back": "العودة للرئيسية",
  "common.openExternal": "فتح",
  "footer.quickLinks": "روابط سريعة",
  "footer.externalLinks": "روابط خارجية",
  "footer.followUs": "تابعنا",
  "footer.contact": "اتصل بنا",
  "footer.rights": "جميع الحقوق محفوظة.",
};

const dictionaries: Record<string, Dict> = { en, ar };

export function useT() {
  const { language } = useUiStore();
  const dict = dictionaries[language] || en;
  return (key: string, fallback?: string) => dict[key] ?? fallback ?? key;
}

/** Pick localized field: returns ar variant when lang is ar and value exists, else en value */
export function pickLocalized<T extends string | undefined>(en: T, ar: T | undefined, lang: string): T {
  if (lang === "ar" && ar) return ar;
  return en;
}

export function useLocalized() {
  const { language } = useUiStore();
  return <T extends string | undefined>(en: T, ar?: T) => pickLocalized(en, ar, language);
}
