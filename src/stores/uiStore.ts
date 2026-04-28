import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "ar";

interface UiStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    { name: "bsdi-ui" }
  )
);
