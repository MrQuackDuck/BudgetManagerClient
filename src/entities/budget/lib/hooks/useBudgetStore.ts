import { create } from "zustand";
import { BudgetModel } from "../../model/BudgetModel";
import { devtools } from "zustand/middleware";

interface BudgetStore {
  budgets: BudgetModel[];
  setBudgets: (budgets: BudgetModel[]) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  devtools((set) => ({
    budgets: [],
    setBudgets: (budgets: BudgetModel[]) => {
      set({ budgets });
    },
  }), { name: "BudgetStore" })
);