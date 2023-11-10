import { create } from 'zustand';

type ProgressState = {
  progress: number;
  updateProgress: (value: number) => void;
};

export const useStore = create<ProgressState>()((set) => ({
  progress: 0,
  updateProgress: (value) => set({ progress: Math.round(value) * 100 }),
}));
