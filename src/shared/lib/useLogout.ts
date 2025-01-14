import { useQueryClient } from "react-query";
import { useAuthStore } from "./hooks/useAuthStore";
import { useOperationStore } from "@/entities/operation/lib/hooks/useOperationStore";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useProfileStore } from "@/entities/user/lib/hooks/useProfileStore";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";

export const useLogout = () => {
  const setUnauthenticated = useAuthStore(state => state.setUnauthenticated);
  const setOperations = useOperationStore(state => state.setOperations);
  const setBudgets = useBudgetStore(state => state.setBudgets);
  const setSelectedBudget = useBudgetStore(state => state.setSelectedBudget);
  const setCategories = useCategoryStore(state => state.setCategories);
  const setProfile = useProfileStore(state => state.setProfile);
  const queryClient = useQueryClient();
  
  const logOut = () => {
    setUnauthenticated();
    queryClient.clear();
    queryClient.removeQueries();
    setOperations([]);
    setBudgets([]);
    setSelectedBudget(null);
    setCategories([]);
    setProfile(null);
  }

  return logOut;
}