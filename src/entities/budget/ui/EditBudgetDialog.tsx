import { BudgetService } from "@/entities/budget/api/BudgetService";
import { Button } from "@/shared/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Separator } from "@/shared/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  budgetName: z.string().min(2, `Budget name must contain at least ${2} symbols!`).max(50, `Budget name must contain no more than ${50} symbols!`),
  initialAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid number format"),
});

interface EditBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  budget: any;
}

function EditBudgetDialog({ isOpen, onOpenChange, budget }: EditBudgetDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      budgetName: budget.title,
      initialAmount: budget.initial_amount.toString(),
    }
  });

  function onDataSubmit(data) {
    const budgetName = data.budgetName;
    const initialAmount = data.initialAmount;

    // Send the budget data to the server
    BudgetService.updateBudget(budget.id, budgetName, +initialAmount)
      .then(() => {
        onOpenChange(false);
        setTimeout(() => queryClient.invalidateQueries("budgets"), 70);
      });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    onOpenChange(false);
  }

  useEffect(() => {
    if (!isOpen) setTimeout(() => form.reset(), 200);
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <Form {...form}>
          <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onDataSubmit)}>
            <span className="text-xl text-center font-medium">Edit Budget</span>
            <Separator orientation="horizontal" />
            <FormField
              control={form.control}
              name="budgetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Name for a new budget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial amount</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Amount of money you have from the start" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-1.5">
              <Button type="button" className="w-full" onClick={handleCancelClick} variant={"outline"}>Cancel</Button>
              <Button type="submit" className="w-full">Confirm</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudgetDialog;