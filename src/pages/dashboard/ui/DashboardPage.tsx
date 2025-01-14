import { Separator } from "@/shared/ui/Separator";
import Aside from "@/widgets/aside/ui/Aside";
import Header from "@/widgets/header/ui/Header";
import { useFetchCurrencies } from "../lib/hooks/useFetchCurrencies";
import { useFetchBudgets } from "../lib/hooks/useFetchBudgets";
import { useFetchCategories } from "../lib/hooks/useFetchCategories";
import { useFetchProfile } from "../lib/hooks/useFetchProfile";
import { useFetchOperations } from "../lib/hooks/useFetchOperations";
import MainSection from "@/widgets/main-section/ui/MainSection";
import { Button } from "@/shared/ui/Button";
import { PanelLeftOpen } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { useBudgetStore } from "@/entities/budget/lib/hooks/useBudgetStore";
import { useEffect, useState } from "react";

function DashboardPage() {
  useFetchCurrencies();
  useFetchBudgets();
  useFetchCategories();
  useFetchProfile();
  useFetchOperations();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const selectedBudget = useBudgetStore((state) => state.selectedBudget);
  useEffect(() => {
    if (selectedBudget) setIsSheetOpen(false);
  }, [selectedBudget]);

  return (
    <div className="flex flex-col gap-4 h-full max-h-full overflow-y-hidden px-[15vw] max-lg:px-[1vw] py-5 animate-appearance opacity-50">
      <Header />
      <div className="flex gap-4 h-full max-h-full overflow-hidden items-stretch">
        <Aside className="max-lg:hidden" />
        <div className="w-10 hidden max-lg:block">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant={"outline"} className="absolute h-full">
                <PanelLeftOpen className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-full">
              <SheetTitle className="hidden" />
              <SheetDescription className="hidden" />
              <Aside />
            </SheetContent>
          </Sheet>
        </div>
        <Separator className="h-[100vh] max-lg:hidden w-[1px]" orientation="vertical" />
        <MainSection />
      </div>
    </div>
  );
}

export default DashboardPage;
