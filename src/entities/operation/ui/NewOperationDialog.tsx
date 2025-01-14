import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Separator } from "@/shared/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { useState } from "react";
import NewExpenseOperationForm from "./NewExpenseOperationForm";
import NewIncomeOperationForm from "./NewIncomeOperationForm";

interface NewOperationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type tabType = "expense" | "income";

function NewOperationDialog({ isOpen, onOpenChange }: NewOperationDialogProps) {
  const [activeTab, setActiveTab] = useState<tabType>("expense");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-2">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <span className="text-xl text-center font-medium">New Operation</span>
        <Separator orientation="horizontal" />
        <Tabs defaultValue={activeTab} onValueChange={newValue => setActiveTab(newValue as tabType)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="w-full" value="expense">
              Expense
            </TabsTrigger>
            <TabsTrigger className="w-full" value="income">
              Income
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <NewExpenseOperationForm onClosed={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="income">
            <NewIncomeOperationForm onClosed={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default NewOperationDialog;
