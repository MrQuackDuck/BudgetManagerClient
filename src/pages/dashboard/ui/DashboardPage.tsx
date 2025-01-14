import { Separator } from "@/shared/ui/Separator"
import Aside from "@/widgets/aside/ui/Aside"
import Header from "@/widgets/header/ui/Header"
import { useFetchCurrencies } from "../lib/hooks/useFetchCurrencies";
import { useFetchBudgets } from "../lib/hooks/useFetchBudgets";
import { useFetchCategories } from "../lib/hooks/useFetchCategories";
import { useFetchProfile } from "../lib/hooks/useFetchProfile";
import { useFetchOperations } from "../lib/hooks/useFetchOperations";
import MainSection from "@/widgets/main-section/ui/MainSection";

function DashboardPage() {
  useFetchCurrencies();
  useFetchBudgets();
  useFetchCategories();
  useFetchProfile();
  useFetchOperations();

  return (
    <div className="flex flex-col gap-4 max-h-full overflow-y-hidden px-[15vw] py-5 animate-appearance opacity-50">
      <Header />
      <div className="flex gap-4 h-full max-h-full overflow-hidden">
        <Aside />
        <Separator className="h-[100vh] w-[1px]" orientation="vertical" />
        <MainSection />
      </div>
    </div>
  )
}

export default DashboardPage;