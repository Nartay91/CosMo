import { create } from "zustand";
import { useProgressStore } from "./useProgressStore";

export const useQuizStore = create((set) => ({
  questions: [],
  currentQuestion: 0,
  score: 0,
  answers: {},

  setQuestions: (questions) => set({ questions, currentQuestion: 0, score: 0, answers: {} }),

  handleAnswer: (selectedAnswer, correctAnswer) => {
    set((state) => {
      const isCorrect = selectedAnswer === correctAnswer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const nextQuestion = state.currentQuestion + 1;

      const progressStore = useProgressStore.getState();
      progressStore.updateProgress(newScore, state.questions.length);

      return {
        answers: { ...state.answers, [state.currentQuestion]: selectedAnswer },
        score: newScore,
        currentQuestion: nextQuestion,
      };
    });
  },

  restartQuiz: () => {
    set({ currentQuestion: 0, score: 0, answers: {} });
    useProgressStore.getState().resetProgress();
  }
}));