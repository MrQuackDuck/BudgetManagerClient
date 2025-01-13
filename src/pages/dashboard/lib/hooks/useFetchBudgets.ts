import { BudgetService } from "@/entities/budget/api/BudgetService";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { errorToast } from "@/shared/lib/errorToast";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useFetchBudgets = () => {
  const logOut = useAuthStore(state => state.setUnauthenticated);
  
  const setBudgets = useBudgetStore((state) => state.setBudgets);
  const { data, isError, error } = useQuery("budgets", async () => {
    return (await BudgetService.getBudgetList()).data.data.items;
  });

  useEffect(() => {
    if ((error as any)?.status === 401) return logOut();
    if (isError) return errorToast("Failed to fetch budgets", "Please try again later");
    if (!data) return;
    setBudgets(data);
  }, [data, isError, error, logOut, setBudgets]);
}