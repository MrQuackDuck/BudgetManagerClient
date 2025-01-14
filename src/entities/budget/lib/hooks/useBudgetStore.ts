import { create } from "zustand";
import { BudgetModel } from "../../model/BudgetModel";
import { devtools } from "zustand/middleware";

interface BudgetStore {
  budgets: BudgetModel[];
  setBudgets: (budgets: BudgetModel[]) => void;
  selectedBudget: BudgetModel | null;
  setSelectedBudget: (budget: BudgetModel | null) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  devtools((set) => ({
    budgets: [],
    setBudgets: (budgets: BudgetModel[]) => {
      set({ budgets });
    },
    selectedBudget: null,
    setSelectedBudget: (selectedBudget: BudgetModel | null) => {
      set({ selectedBudget });
    },
  }), { name: "BudgetStore" })
);