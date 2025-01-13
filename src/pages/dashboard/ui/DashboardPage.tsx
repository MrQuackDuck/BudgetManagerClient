import { CurrencyService } from "@/entities/currency/api/CurrencyService";
import { useCurrencyStore } from "@/entities/currency/lib/hooks/useCurrencyStore"
import { errorToast } from "@/shared/lib/errorToast";
import { Separator } from "@/shared/ui/Separator"
import Aside from "@/widgets/aside/ui/Aside"
import Header from "@/widgets/header/ui/Header"
import { useEffect } from "react";
import { useQuery } from "react-query";

function DashboardPage() {
  const setCurrencis = useCurrencyStore((state) => state.setCurrencies);
  const { data, isError } = useQuery("currencies", async () => {
    return (await CurrencyService.getCurrencyList()).data.data;
  });

  useEffect(() => {
    if (isError) return errorToast("Failed to fetch currencies", "Please try again later");
    if (!data) return;
    setCurrencis(data);
  }, [data, isError, setCurrencis]);

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