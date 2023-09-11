import { create } from "zustand";
import { type Question } from "../types/types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();

          const question = json.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ questions: question });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const questions = get().questions;
          // Aqui se va usar el structuredClone para clonar el obj
          const newQuestions = structuredClone(questions);
          // Obtenemos el indice de la pregunta
          const questionIndex = questions.findIndex((q) => q.id === questionId);
          // Obtenemos la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // Averiguamos si el usuario ha seleccionado la respuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              zIndex: 999,
              colors: ["#00ff00", "#ff0000", "#ffff00", "#0000ff"],
            });
          }
          // actualizamos la respuesta de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // actualizamos el state
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = questions[currentQuestion + 1];
          set({
            currentQuestion: nextQuestion
              ? currentQuestion + 1
              : currentQuestion,
          });
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = get().questions[currentQuestion - 1];

          const newCurrentQuestion = previousQuestion
            ? currentQuestion - 1
            : currentQuestion;
          set({
            currentQuestion: newCurrentQuestion,
          });
        },

        reset: () => {
          set({ currentQuestion: 0, questions: [] });
        },
      };
    },
    {
      name: "questions",
      getStorage: () => localStorage,
    }
  )
);
