import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  language: null, // Язык пока не выбран
  setLanguage: (lang) => set({ language: lang }),
}));
