import { CategoryService } from "@/entities/category/api/CategoryService";
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
  name: z.string().min(2, `Category name must contain at least ${2} symbols!`).max(50, `Category name must contain no more than ${50} symbols!`),
});

interface NewCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function NewCategoryDialog({ isOpen, onOpenChange }: NewCategoryDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const name = data.name;

    // Send the category data to the server
    CategoryService.createCategory(name)
      .then(() => {
        queryClient.invalidateQueries("categories");
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
            <span className="text-xl text-center font-medium">New Category</span>
            <Separator orientation="horizontal" />
            <FormField
              control={form.control}
              name="name"
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

export default NewCategoryDialog;