import { Button } from "@/shared/ui/Button";
import { Separator } from "@/shared/ui/Separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import BudgetButton from "./BudgetButton";
import CategoryButton from "./CategoryButton";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";
import NewBudgetDialog from "./NewBudgetDialog";
import NewCategoryDialog from "./NewCategoryDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

function Aside() {
  const [selectedTab, setSelectedTab] = useState("budgets");
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);
  const setSelectedBudget = useBudgetStore((state) => state.setSelectedBudget);

  const [isNewBudgetDialogOpen, setIsNewBudgetDialogOpen] = useState(false);
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);

  const budgets = useBudgetStore((state) => state.budgets);
  const categories = useCategoryStore((state) => state.categories);

  function handlePlusClick() {
    if (selectedTab === "budgets") setIsNewBudgetDialogOpen(true);
    if (selectedTab === "categories") setIsNewCategoryDialogOpen(true);
  }

  useEffect(() => {
    if (!selectedBudget && budgets.length > 0) setSelectedBudget(budgets[0]);
  }, [selectedBudget, budgets, setSelectedBudget]);

  return (
    <aside className="flex flex-col px-[10px] gap-3 w-[320px]">
      <div className="flex gap-3 items-center">
        <Tabs className="w-full" defaultValue="budgets" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="budgets">
              Budgets
            </TabsTrigger>
            <TabsTrigger className="w-full" value="categories">
              Categories
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handlePlusClick} variant={"outline"} className="aspect-square rounded-full">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Add {selectedTab === "budgets" ? "budget" : "category"}
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-2">
        {selectedTab == "budgets" && (
          <>
            {budgets.map((budget) => (
              <BudgetButton key={budget.id} budget={budget} onPressed={setSelectedBudget} isSelected={budget.id === selectedBudget?.id} />
            ))}
          </>
        )}
        {selectedTab == "categories" && (
          <>
            {categories.map((category) => (
              <CategoryButton key={category.id} onPressed={() => {}} category={category} />
            ))}
          </>
        )}
      </div>

      <NewBudgetDialog isOpen={isNewBudgetDialogOpen} onOpenChange={setIsNewBudgetDialogOpen} />
      <NewCategoryDialog isOpen={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen} />
    </aside>
  );
}

export default Aside;
