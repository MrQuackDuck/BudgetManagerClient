import { create } from "zustand";
import { OperationModel } from "../../model/OperationModel";
import { devtools } from "zustand/middleware";

interface OperationStore {
  operations: OperationModel[];
  setOperations: (operations: OperationModel[]) => void;
}

export const useOperationStore = create<OperationStore>()(
  devtools((set) => ({
    operations: [],
    setOperations: (operations: OperationModel[]) => {
      set({ operations });
    },
  }), { name: "OperationStore" })
);