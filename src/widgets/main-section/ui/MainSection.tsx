import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useOperationStore } from "@/entities/operation/lib/hooks/useOperationStore";
import { Button } from "@/shared/ui/Button";
import { Separator } from "@/shared/ui/Separator";
import { useState } from "react";
import Operation from "@/entities/operation/ui/Operation";
import NewOperationDialog from "@/entities/operation/ui/NewOperationDialog";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { cn } from "@/shared/lib/utils";

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

  function countBalance() {
    if (!selectedBudget) return 0;
    return +selectedBudget?.initial_amount + countIncome() + countExpenses();
  }
  const balance = countBalance();

  if (!selectedBudget)
    return (
      <div className="w-full h-full flex justify-center">
        <h1 className="font-medium pt-4">Nothing here yet. Create a budget at first 🙂</h1>
      </div>
    );
  const currencySymbol = selectedBudget.related_currency.symbol;
  return (
    <>
      <div className="w-full h-full max-w-full max-h-full flex flex-col gap-3 px-6 overflow-x-hidden">
        <div className="flex flex-row max-w-full max-lg:flex-col max-lg:gap-2 items-center justify-between">
          <div className="flex flex-row max-w-full max-lg:justify-between w-full items-center gap-2 overflow-hidden">
            <div className="flex flex-row max-w-full items-center gap-2 overflow-hidden">
              <span className="text-xl pt-0.5 font-semibold text-muted-foreground select-none">{currencySymbol}</span>
              <span className="text-2xl font-semibold text-ellipsis text-nowrap inline-block overflow-hidden">{selectedBudget.title}</span>
            </div>
            <Button onClick={() => setNewOperationDialogOpen(true)} className="ml-2 hidden max-lg:flex">
              + New operation
            </Button>
          </div>
          <Separator className="hidden max-lg:block" />
          <div className="flex flex-row w-full max-w-full justify-end max-lg:justify-between items-center gap-2">
            <span className="text-lg font-semibold text-red-500 text-nowrap">
              {countExpenses()} {currencySymbol} spent
            </span>
            <Separator className="h-8 max-lg:hidden" orientation="vertical" />
            <span className="text-slate-500 text-lg font-semibold text-nowrap">
              Balance: <span className={cn(balance > 0 && "text-lime-500", balance < 0 && "text-red-500")}>{balance} {currencySymbol}</span>
            </span>
            <Separator className="h-8 max-lg:hidden" orientation="vertical" />
            <span className="text-lg font-semibold text-lime-500 text-nowrap">
              {countIncome()} {currencySymbol} earned
            </span>
            <Button onClick={() => setNewOperationDialogOpen(true)} className="ml-2 max-lg:hidden">
              + New
            </Button>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 pr-4 max-w-full overflow-x-hidden">
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
