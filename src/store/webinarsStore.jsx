import { create } from "zustand";
import { persist } from "zustand/middleware";
import user1 from "../assets/user1.svg";
import user2 from "../assets/user2.svg";
import user3 from "../assets/user3.svg";

const useWebinarsStore = create(
  persist(
    (set, get) => ({
      webinars: [
        { id: 1, date: "20.01.2025", progress: 70 },
        { id: 2, date: "23.02.2025", progress: 90 },
      ],
      students: [
        { id: 1, name: "Мурат Асанбек", score: 524, avatar: user1 },
        { id: 2, name: "Мадияр Турон", score: 524, avatar: user2 },
        { id: 3, name: "Асан Жекшенбек", score: 524, avatar: user3 },
        { id: 4, name: "Айжан Бекова", score: 524, avatar: user1 },
        { id: 5, name: "Руслан Сапар", score: 514, avatar: user2 },
      ],

      updateProgress: (id, newProgress) =>
        set((state) => ({
          webinars: state.webinars.map((webinar) =>
            webinar.id === id ? { ...webinar, progress: newProgress } : webinar
          ),
        })),

      getBestStudents: () => {
        return [...get().students]
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
      },

      getWorstStudents: () => {
        return [...get().students]
          .sort((a, b) => a.score - b.score)
          .slice(0, 3);
      },
    }),
    {
      name: "webinars-storage",
    }
  )
);

export default useWebinarsStore;