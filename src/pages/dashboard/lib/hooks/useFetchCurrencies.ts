import { CurrencyService } from "@/entities/currency/api/CurrencyService";
import { useCurrencyStore } from "@/entities/currency/lib/hooks/useCurrencyStore";
import { errorToast } from "@/shared/lib/errorToast";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useFetchCurrencies = () => {
  const logOut = useAuthStore(state => state.setUnauthenticated);

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