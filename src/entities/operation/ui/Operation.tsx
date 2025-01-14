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
          <div className="flex flex-row gap-1.5 items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
            <div className={cn("flex flex-row px-3 justify-between items-center w-full h-11 rounded-md border border-border/50", isHovered && "bg-muted")}>
              <div className="flex flex-row gap-1.5">
                <span className="text-base font-medium">{operation.title}</span>
                {operation.related_category && (
                  <>
                    <Separator className="h-6" orientation="vertical" />
                    <span className="text-muted-foreground">{operation.related_category.name}</span>
                  </>
                )}
              </div>
              <div className="flex gap-1.5">
                <span className="text-slate-500 font-medium">{formatDateTime(operation.created_at)}</span>
                <Separator className="h-6" orientation="vertical" />
                {operation.operation_type == "ADD" && (
                  <span className="text-lime-500 font-medium">
                    +{operation.amount} {operation.related_budget.related_currency.symbol}
                  </span>
                )}
                {operation.operation_type == "SUB" && (
                  <span className="text-red-500 font-medium">
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
