import { Separator } from "@/shared/ui/Separator"
import Aside from "@/widgets/aside/ui/Aside"
import Header from "@/widgets/header/ui/Header"
import { useFetchCurrencies } from "../lib/hooks/useFetchCurrencies";
import { useFetchBudgets } from "../lib/hooks/useFetchBudgets";
import { useFetchCategories } from "../lib/hooks/useFetchCategories";
import { useFetchProfile } from "../lib/hooks/useFetchProfile";

function DashboardPage() {
  useFetchCurrencies();
  useFetchBudgets();
  useFetchCategories();
  useFetchProfile();

  return (
    <div className="flex flex-col h-full gap-4 px-[15vw] py-5">
      <Header />
      <div className="flex gap-4 h-full">
        <Aside />
        <Separator className="h-full w-[1px]" orientation="vertical" />
        <div>Main part here</div>
      </div>
    </div>
  )
}

export default DashboardPage