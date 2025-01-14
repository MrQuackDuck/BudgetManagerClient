import { BudgetService } from "@/entities/budget/api/BudgetService";
import { BudgetModel } from "@/entities/budget/model/BudgetModel";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "@/shared/ui/ContextMenu";
import DeleteConfirmationDialog from "@/shared/ui/DeleteConfirmationDialog";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import EditBudgetDialog from "./EditBudgetDialog";

interface BudgetButtonProps {
  budget: BudgetModel;
  onPressed: (budget: BudgetModel) => void;
  isSelected?: boolean;
}

function BudgetButton({ budget, onPressed, isSelected }: BudgetButtonProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onDeleteConfirmed = () => {
    BudgetService.deleteBudget(budget.id).then(() => {
      setIsDeleteDialogOpen(false);
      setTimeout(() => queryClient.invalidateQueries("budgets"), 80);
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("flex flex-row transition-all justify-start border-none gap-1.5 select-none cursor-pointer py-1 px-3", isSelected && "bg-muted")}
            onClick={() => onPressed(budget)}
          >
            <span className="text-muted-foreground font-semibold text-sm">{budget.related_currency.symbol}</span>
            <span className="text-sm font-medium">{budget.title}</span>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <PencilIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Edit budget
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-500">
              <Trash2Icon className="mr-2 h-4 w-4" strokeWidth={2} /> Delete budget
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <EditBudgetDialog isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} budget={budget} />
      <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={onDeleteConfirmed} />
    </>
  );
}

export default BudgetButton;
