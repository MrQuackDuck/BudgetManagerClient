import { CurrencyService } from "@/entities/currency/api/CurrencyService";
import { useCurrencyStore } from "@/entities/currency/lib/hooks/useCurrencyStore";
import { errorToast } from "@/shared/lib/errorToast";
import { useLogout } from "@/shared/lib/useLogout";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useFetchCurrencies = () => {
  const logOut = useLogout();

  const setCurrencis = useCurrencyStore((state) => state.setCurrencies);
  const { data, isError, error } = useQuery("currencies", async () => {
    return (await CurrencyService.getCurrencyList()).data.data;
  });

  useEffect(() => {
    if ((error as any)?.status === 401) return logOut();
    if (isError) return errorToast("Failed to fetch currencies", "Please try again later");
    if (!data) return;
    setCurrencis(data.items);
  }, [data, isError, error, logOut, setCurrencis]);
}