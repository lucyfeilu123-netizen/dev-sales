import { create } from "zustand";
import type { Deal, DealStage } from "@/types/database";

interface DealsState {
  deals: Deal[];
  selectedDeal: Deal | null;
  setDeals: (deals: Deal[]) => void;
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  moveDeal: (id: string, stage: DealStage) => void;
  deleteDeal: (id: string) => void;
  selectDeal: (deal: Deal | null) => void;
}

export const useDealsStore = create<DealsState>((set) => ({
  deals: [],
  selectedDeal: null,
  setDeals: (deals) => set({ deals }),
  addDeal: (deal) => set((state) => ({ deals: [deal, ...state.deals] })),
  updateDeal: (id, updates) =>
    set((state) => ({
      deals: state.deals.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    })),
  moveDeal: (id, stage) =>
    set((state) => ({
      deals: state.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
    })),
  deleteDeal: (id) =>
    set((state) => ({ deals: state.deals.filter((d) => d.id !== id) })),
  selectDeal: (deal) => set({ selectedDeal: deal }),
}));
