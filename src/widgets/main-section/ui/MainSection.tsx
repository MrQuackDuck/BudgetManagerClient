import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useOperationStore } from "@/entities/operation/lib/hooks/useOperationStore";
import { Button } from "@/shared/ui/Button";
import { Separator } from "@/shared/ui/Separator";
import { useState } from "react";
import Operation from "@/entities/operation/ui/Operation";
import NewOperationDialog from "@/entities/operation/ui/NewOperationDialog";
import { ScrollArea } from "@/shared/ui/ScrollArea";

function MainSection() {
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);
  const operations = useOperationStore((state) => state.operations);
  const filteredOperations = operations.filter((operation) => operation.related_budget.id === selectedBudget?.id);
  const [newOperationDialogOpen, setNewOperationDialogOpen] = useState(false);

  function countExpenses() {
    let sum: number = 0;
    filteredOperations.filter((o) => o.operation_type == "SUB").forEach((o) => (sum += +o.amount));
    return sum;
  }

  function countIncome() {
    let sum: number = 0;
    filteredOperations.filter((o) => o.operation_type == "ADD").forEach((o) => (sum += +o.amount));
    return sum;
  }

  if (!selectedBudget)
    return (
      <div className="w-full h-full flex justify-center">
        <h1 className="font-medium pt-4">Nothing here yet. Create a budget at first 🙂</h1>
      </div>
    );
  const currencySymbol = selectedBudget.related_currency.symbol;
  return (
    <>
      <div className="w-full h-full max-h-full flex flex-col gap-3 px-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <span className="text-xl pt-0.5 font-semibold text-muted-foreground select-none">{currencySymbol}</span>
            <span className="text-2xl font-semibold">{selectedBudget.title}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-lg font-semibold text-red-500">
              {countExpenses()} {currencySymbol} spent
            </span>
            <Separator className="h-8" orientation="vertical" />
            <span className="text-lg font-semibold text-lime-500">
              {countIncome()} {currencySymbol} earned
            </span>
            <Button onClick={() => setNewOperationDialogOpen(true)} className="ml-2">
              + New
            </Button>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 pr-4">
            {filteredOperations.map((operation) => (
              <Operation operation={operation} key={operation.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <NewOperationDialog isOpen={newOperationDialogOpen} onOpenChange={setNewOperationDialogOpen} />
    </>
  );
}

export default MainSection;
