import { CategoryModel } from "@/entities/category/model/CategoryModel";
import { Button } from "@/shared/ui/Button";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "@/shared/ui/ContextMenu";
import { PencilIcon, Trash2Icon } from "lucide-react";
import EditCategoryDialog from "./EditCategoryDialog";
import { useState } from "react";
import DeleteConfirmationDialog from "@/shared/ui/DeleteConfirmationDialog";
import { CategoryService } from "@/entities/category/api/CategoryService";
import { useQueryClient } from "react-query";

interface CategoryButtonProps {
  category: CategoryModel;
  onPressed: (category: CategoryModel) => void;
}

function CategoryButton({ category, onPressed }: CategoryButtonProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const onDeleteConfirmed = () => {
    CategoryService.deleteCategory(category.id).then(() => {
      setIsDeleteDialogOpen(false);
      setTimeout(() => queryClient.invalidateQueries("categories"), 80);
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button variant={"outline"} className="flex flex-row transition-all justify-between border-none gap-1.5 select-none cursor-pointer py-1 px-3" onClick={() => onPressed(category)}>
            <span className="text-sm font-medium text-ellipsis text-nowrap inline-block overflow-hidden">{category.name}</span>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem onClick={() => setIsEditDialogOpen(true)}>
              <PencilIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Edit category
            </ContextMenuItem>
            <ContextMenuItem className="text-red-500" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2Icon className="mr-2 h-4 w-4" strokeWidth={2} /> Delete category
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <EditCategoryDialog isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} category={category} />
      <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={onDeleteConfirmed} />
    </>
  );
}

export default CategoryButton;
