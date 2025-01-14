import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { OperationService } from "@/entities/operation/api/OperationService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";
import { Button } from "@/shared/ui/Button";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";
import { errorToast } from "@/shared/lib/errorToast";

const formSchema = z.object({
  title: z.string().min(2, `Operation title must contain at least ${2} symbols!`).max(50, `Operation title must contain no more than ${50} symbols!`),
  amount: z
    .string()
    .min(1, `Amount must be provided!`)
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  relatedCategoryId: z
    .string()
    .min(1, `Category must be provided!`)
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid ID format")
});

interface NewExpenseOperationFormProps {
  onClosed: () => void;
}

function NewExpenseOperationForm({ onClosed }: NewExpenseOperationFormProps) {
  const queryClient = useQueryClient();
  const categories = useCategoryStore((state) => state.categories);
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      amount: "",
      relatedCategoryId: ""
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const title = data.title;
    const operationType = "SUB";
    const amount = data.amount;
    const relatedCategoryId = data.relatedCategoryId;
    const relatedBudgetId = selectedBudget?.id ?? 0;

    // Send the operation data to the server
    OperationService.createOperation(title, operationType, +amount, +relatedCategoryId, relatedBudgetId)
      .then(() => {
        queryClient.invalidateQueries("operations");
        onClosed();
      })
      .catch((error) => {
        return errorToast("An error occurred!", error.message);
      });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    form.reset();
    onClosed();
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
              <FormLabel>Spent money ({selectedBudget?.related_currency.short_name})</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder={`99.99`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relatedCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default NewExpenseOperationForm;
