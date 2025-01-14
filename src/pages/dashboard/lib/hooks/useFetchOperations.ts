import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { OperationService } from "@/entities/operation/api/OperationService";
import { useOperationStore } from "@/entities/operation/lib/hooks/useOperationStore";
import { errorToast } from "@/shared/lib/errorToast";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useFetchOperations = () => {
  const logOut = useAuthStore(state => state.setUnauthenticated);
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);

  const setOperations = useOperationStore((state) => state.setOperations);
  const { data, isError, error } = useQuery(["operations", selectedBudget?.id], async () => {
    if (!selectedBudget) return (await OperationService.getOperationList()).data.data;
    return { items: (await OperationService.getOperationsForBudget(selectedBudget.id)).data.data.items.map(item => item.related_operations).flat() };
  });

  useEffect(() => {
    if ((error as any)?.status === 401) return logOut();
    if (isError) return errorToast("Failed to fetch operations", "Please try again later");
    if (!data) return;
    setOperations(data.items);
  }, [data, isError, error, logOut, setOperations]);
}