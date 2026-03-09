import { create } from "zustand";

export interface IRecommendAnswers {
  situation: string | null;
  preference: string | null;
  gender: string | null;
  budget: string | null;
}

interface IRecommendStore extends IRecommendAnswers {
  setAnswer: (key: keyof IRecommendAnswers, value: string) => void;
  reset: () => void;
}

const initialState: IRecommendAnswers = {
  situation: null,
  preference: null,
  gender: null,
  budget: null,
};

export const useRecommendStore = create<IRecommendStore>((set) => ({
  ...initialState,
  setAnswer: (key, value) => set({ [key]: value }),
  reset: () => set(initialState),
}));
