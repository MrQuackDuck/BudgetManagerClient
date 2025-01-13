import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CategoryModel } from "../../model/CategoryModel";

interface CategoryStore {
  categories: CategoryModel[];
  setCategories: (categories: CategoryModel[]) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  devtools((set) => ({
    categories: [],
    setCategories: (categories: CategoryModel[]) => {
      set({ categories });
    },
  }), { name: "CategoryStore" })
);