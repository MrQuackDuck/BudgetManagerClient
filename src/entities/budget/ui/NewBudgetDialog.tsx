import { BudgetService } from "@/entities/budget/api/BudgetService";
import { useCurrencyStore } from "@/entities/currency/lib/hooks/useCurrencyStore";
import { Button } from "@/shared/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";
import { Separator } from "@/shared/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  budgetName: z.string().min(2, `Budget name must contain at least ${2} symbols!`).max(50, `Budget name must contain no more than ${50} symbols!`),
  initialAmount: z.string().regex(/^-?\d+(\.\d{1,2})?$/, "Invalid number format"),
  currencyShortName: z.string().min(1, `Currency must be provided!`)
});

interface NewBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function NewBudgetDialog({ isOpen, onOpenChange }: NewBudgetDialogProps) {
  const currencies = useCurrencyStore((state) => state.currencies);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetName: "",
      initialAmount: "",
      currencyShortName: ""
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const budgetName = data.budgetName;
    const initialAmount = data.initialAmount;
    const currencyShortName = data.currencyShortName;

    // Send the budget data to the server
    BudgetService.createBudget(budgetName, +initialAmount, currencyShortName)
      .then(() => {
        queryClient.invalidateQueries("budgets");
        onOpenChange(false);
      })
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
            <span className="text-xl text-center font-medium">New Budget</span>
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

            <FormField
              control={form.control}
              name="currencyShortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.short_name}>
                          {currency.symbol} - {currency.name} ({currency.short_name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default NewBudgetDialog;
