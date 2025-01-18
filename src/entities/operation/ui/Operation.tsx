import { Button } from "@/shared/ui/Button";
import { OperationModel } from "../model/OperationModel";
import { ChevronsDownIcon, ChevronsUpIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Separator } from "@/shared/ui/Separator";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import EditIncomeOperationDialog from "./EditIncomeOperationDialog";
import EditExpenseOperationDialog from "./EditExpenseOperationDialog";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "@/shared/ui/ContextMenu";
import DeleteConfirmationDialog from "@/shared/ui/DeleteConfirmationDialog";
import { OperationService } from "../api/OperationService";
import { useQueryClient } from "react-query";

interface OperationProps {
  operation: OperationModel;
}

function Operation({ operation }: OperationProps) {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDateTime = (date: Date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const onDeleteConfirmed = () => {
    OperationService.deleteOperation(operation.id).then(() => {
      setIsDeleteDialogOpen(false);
      setTimeout(() => queryClient.invalidateQueries("operations"), 80);
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex flex-row gap-1.5 items-center max-w-full overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Button onClick={() => setIsEditDialogOpen(true)} className={cn("aspect-square")} variant={"ghost"}>
              {!isHovered && (
                <>
                  {operation.operation_type == "ADD" ? (
                    <ChevronsUpIcon className="text-lime-500 animate-appearance opacity-50" />
                  ) : (
                    <ChevronsDownIcon className="text-red-500 animate-appearance opacity-50" />
                  )}
                </>
              )}
              {isHovered && <PencilIcon className="animate-appearance opacity-50 text-orange-500" />}
            </Button>
            <div className={cn("flex flex-row max-sm:flex-col overflow-x-hidden px-3 justify-between max-sm:items-start max-sm:py-2 items-center w-full max-sm:gap-2 gap-4 h-11 max-sm:h-fit rounded-md border border-border/50", isHovered && "bg-muted")}>
              <div className="flex flex-row max-sm:flex-col gap-1.5 overflow-hidden">
                <span className="text-base font-medium shrink-0 text-popover-foreground text-ellipsis text-nowrap inline-block overflow-hidden">{operation.title}</span>
                {operation.related_category && (
                  <>
                    <Separator className="h-6 max-sm:hidden" orientation="vertical" />
                    <span className="text-muted-foreground text-ellipsis text-nowrap inline-block overflow-hidden shrink-0">{operation.related_category.name}</span>
                  </>
                )}
              </div>
              <div className="w-fit flex max-sm:flex-row-reverse gap-1.5 shrink-0">
                <span className="text-slate-500 font-medium">{formatDateTime(operation.created_at)}</span>
                <Separator className="h-6" orientation="vertical" />
                {operation.operation_type == "ADD" && (
                  <span className="text-lime-500 font-medium text-ellipsis text-nowrap inline-block">
                    +{operation.amount} {operation.related_budget.related_currency.symbol}
                  </span>
                )}
                {operation.operation_type == "SUB" && (
                  <span className="text-red-500 font-medium text-ellipsis text-nowrap inline-block">
                    -{operation.amount} {operation.related_budget.related_currency.symbol}
                  </span>
                )}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <PencilIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Edit operation
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-500">
              <Trash2Icon className="mr-2 h-4 w-4" strokeWidth={2} /> Delete operation
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>

      {operation.operation_type == "ADD" && <EditIncomeOperationDialog deleteClicked={() => setIsDeleteDialogOpen(true)} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} operation={operation} />}
      {operation.operation_type == "SUB" && <EditExpenseOperationDialog deleteClicked={() => setIsDeleteDialogOpen(true)} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} operation={operation} />}
      <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={onDeleteConfirmed} />
    </>
  );
}

export default Operation;
