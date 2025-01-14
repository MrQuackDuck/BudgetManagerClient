import { Button } from "@/shared/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Separator } from "@/shared/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";
import { CategoryService } from '@/entities/category/api/CategoryService';
import { CategoryModel } from '@/entities/category/model/CategoryModel';

const formSchema = z.object({
  categoryName: z.string().min(2, `Category name must contain at least ${2} symbols!`).max(50, `Category name must contain no more than ${50} symbols!`),
});

interface EditCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  category: CategoryModel;
}

function EditCategoryDialog({ isOpen, onOpenChange, category }: EditCategoryDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      categoryName: category.name,
    }
  });

  function onDataSubmit(data) {
    const categoryName = data.categoryName;

    // Send the category data to the server
    CategoryService.updateCategory(category.id, categoryName)
      .then(() => {
        onOpenChange(false);
        setTimeout(() => {
          queryClient.invalidateQueries("categories");
          queryClient.invalidateQueries("operations");
        }, 70);
      });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <Form {...form}>
          <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onDataSubmit)}>
            <span className="text-xl text-center font-medium">Edit Category</span>
            <Separator orientation="horizontal" />
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Name for a new category" {...field} />
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

export default EditCategoryDialog;