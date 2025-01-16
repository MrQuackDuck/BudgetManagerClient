import { Button } from "@/shared/ui/Button";
import { Separator } from "@/shared/ui/Separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryButton from "../../../entities/category/ui/CategoryButton";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";
import NewCategoryDialog from "../../../entities/category/ui/NewCategoryDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import NewBudgetDialog from "@/entities/budget/ui/NewBudgetDialog";
import BudgetButton from "@/entities/budget/ui/BudgetButton";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { cn } from "@/shared/lib/utils";

interface AsideProps {
  className?: string;
}

function Aside({ className }: AsideProps) {
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
    <aside className={cn("flex flex-col px-[10px] gap-3 w-full max-lg:max-w-none max-w-[300px]", className)}>
      <div className="flex max-lg:flex-col gap-3 items-center">
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
            <Button onClick={handlePlusClick} variant={"outline"} className="aspect-square rounded-full max-lg:w-full">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add {selectedTab === "budgets" ? "budget" : "category"}</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="horizontal" />

      <ScrollArea className="h-full">
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
      </ScrollArea>

      <NewBudgetDialog isOpen={isNewBudgetDialogOpen} onOpenChange={setIsNewBudgetDialogOpen} />
      <NewCategoryDialog isOpen={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen} />
    </aside>
  );
}

export default Aside;
