import { BudgetModel } from "@/entities/budget/model/BudgetModel";
import { Button } from "@/shared/ui/Button";
import { Separator } from "@/shared/ui/Separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import BudgetButton from "./BudgetButton";
import { CategoryModel } from "@/entities/category/model/CategoryModel";
import CategoryButton from "./CategoryButton";

function Aside() {
  const [selectedTab, setSelectedTab] = useState("budgets");
  const [selectedBudgetId, setSelectedBudgetId] = useState(1);

  const budgets: BudgetModel[] = [
    {
      id: 1,
      title: "Budget 1",
      created_at: "",
      updated_at: "",
      initial_amount: 0,
      related_user: "",
      related_currency: {
        id: 1,
        name: "US Dollar",
        short_name: "USD",
        symbol: "$"
      }
    },
    {
      id: 2,
      title: "Budget 2",
      created_at: "",
      updated_at: "",
      initial_amount: 0,
      related_user: "",
      related_currency: {
        id: 2,
        name: "Euro",
        short_name: "EUR",
        symbol: "€"
      }
    }
  ];

  const categories: CategoryModel[] = [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    }
  ];

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
        <Button variant={"outline"} className="aspect-square rounded-full">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-2">
        {selectedTab == "budgets" && (
          <>
            {budgets.map((budget) => (
              <BudgetButton key={budget.id} budget={budget} onPressed={(b) => setSelectedBudgetId(b.id)} isSelected={budget.id === selectedBudgetId} />
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
    </aside>
  );
}

export default Aside;
