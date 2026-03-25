import { create } from "zustand";

export interface IRecommendAnswers {
  situation: string | null;
  preference: string[] | null; // 다중 선택 (최대 3개)
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

export const useRecommendStore = create<IRecommendStore>((set, get) => ({
  ...initialState,
  setAnswer: (key, value) => {
    if (key === "preference") {
      const current = get().preference ?? [];
      const exists = current.includes(value);
      if (exists) {
        // 이미 선택된 경우 제거
        const updated = current.filter((v) => v !== value);
        set({ preference: updated.length > 0 ? updated : null });
      } else {
        // 최대 3개 제한
        if (current.length >= 3) return;
        set({ preference: [...current, value] });
      }
    } else {
      set({ [key]: value });
    }
  },
  reset: () => set(initialState),
}));
