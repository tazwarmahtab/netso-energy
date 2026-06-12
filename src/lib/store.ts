import { create } from "zustand";

interface CalculatorState {
  bill: number;
  area: number;
  setBill: (bill: number) => void;
  setArea: (area: number) => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  bill: 12000,
  area: 1200,
  setBill: (bill) => set({ bill }),
  setArea: (area) => set({ area }),
}));
