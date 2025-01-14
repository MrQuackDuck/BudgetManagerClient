import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { OperationService } from "@/entities/operation/api/OperationService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { Button } from "@/shared/ui/Button";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { errorToast } from "@/shared/lib/errorToast";

const formSchema = z.object({
  title: z.string().min(2, `Operation title must contain at least ${2} symbols!`).max(50, `Operation title must contain no more than ${50} symbols!`),
  amount: z
    .string()
    .min(1, `Amount must be provided!`)
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
});

interface NewIncomeOperationFormProps {
  onClosed: () => void;
}

function NewIncomeOperationForm({ onClosed }: NewIncomeOperationFormProps) {
  const queryClient = useQueryClient();
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      amount: "",
    },
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const title = data.title;
    const operationType = "ADD";
    const amount = data.amount;
    const relatedBudgetId = selectedBudget?.id ?? 0;

    // Send the operation data to the server
    OperationService.createOperation(title, operationType, +amount, null, relatedBudgetId).then(() => {
      queryClient.invalidateQueries("operations");
      onClosed();
    })
    .catch((error) => {
      return errorToast("An error occurred!", error.message);
    });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    onClosed();
    setTimeout(() => form.reset(), 200)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onDataSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation Title</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Title for the operation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Earned money ({selectedBudget?.related_currency.short_name})</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder={`99.99`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-1.5">
          <Button type="button" className="w-full" onClick={handleCancelClick} variant={"outline"}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewIncomeOperationForm