import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { OperationService } from "@/entities/operation/api/OperationService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { Button } from "@/shared/ui/Button";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { errorToast } from "@/shared/lib/errorToast";
import { OperationModel } from "../model/OperationModel";
import { Separator } from "@/shared/ui/Separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";
import { useEffect } from "react";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";
import { Trash2Icon } from "lucide-react";

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

interface EditExpenseOperationDialogProps {
  operation: OperationModel;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteClicked: () => void;
}

function EditExpenseOperationDialog({ operation, isOpen, onOpenChange, deleteClicked }: EditExpenseOperationDialogProps) {
  const queryClient = useQueryClient();
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);
  const categories = useCategoryStore((state) => state.categories);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: operation.title,
      amount: operation.amount.toString(),
      relatedCategoryId: operation.related_category.id.toString()
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const title = data.title;
    const operationType = "SUB";
    const amount = data.amount;

    // Send the operation data to the server
    OperationService.updateOperation(operation.id, title, operationType, +amount, null)
      .then(() => {
        queryClient.invalidateQueries("operations");
        onOpenChange(false);
      })
      .catch((error) => {
        return errorToast("An error occurred!", error.message);
      });
  }

  function handleDelete() {
    deleteClicked();
    onOpenChange(false);
  }

  useEffect(() => {
    if (!isOpen) setTimeout(() => form.reset(), 200);
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-2">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <span className="text-xl text-center font-medium">Edit Operation</span>
        <Separator orientation="horizontal" />
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
            
            <Button onClick={handleDelete} type="button" variant={"destructive"}>
              <Trash2Icon className="w-4 h-4 mr-2" /> Delete operation
            </Button>
            <div className="flex flex-row gap-1.5">
              <Button type="button" className="w-full" onClick={() => onOpenChange(false)} variant={"outline"}>
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpenseOperationDialog;
