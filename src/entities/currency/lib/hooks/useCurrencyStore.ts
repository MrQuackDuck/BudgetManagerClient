import { create } from "zustand";
import { CurrencyModel } from "../../model/CurrencyModel";
import { devtools } from 'zustand/middleware';

interface CurrencyStore {
  currencies: CurrencyModel[];
  setCurrencies: (currencies: CurrencyModel[]) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  devtools((set) => ({
    currencies: [],
    setCurrencies: (currencies: CurrencyModel[]) => {
      set({ currencies });
    },
  }), { name: "CurrencyStore" })
);
