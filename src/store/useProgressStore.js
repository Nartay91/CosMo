import { create } from "zustand";

export const useProgressStore = create((set) => ({
  progress: 0,

  updateProgress: (score, total) => {
    const newProgress = Math.round((score / total) * 100);
    set({ progress: newProgress });
    localStorage.setItem("quizProgress", newProgress); // Сохраняем в localStorage
  },

  resetProgress: () => {
    set({ progress: 0 });
    localStorage.removeItem("quizProgress");
  },

  loadProgress: () => {
    const savedProgress = localStorage.getItem("quizProgress");
    if (savedProgress !== null) {
      set({ progress: parseInt(savedProgress, 10) });
    }
  }
}));