// import { CurrencyService } from "@/entities/currency/api/CurrencyService";
// import { useCurrencyStore } from "@/entities/currency/lib/hooks/useCurrencyStore";
// import { errorToast } from "@/shared/lib/errorToast";
// import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
// import { useEffect } from "react";
// import { useQuery } from "react-query";

import { ProfileService } from "@/entities/user/api/ProfileService";
import { useProfileStore } from "@/entities/user/lib/hooks/useProfileStore";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

// export const useFetchCurrencies = () => {
//   const logOut = useAuthStore(state => state.setUnauthenticated);

//   const setCurrencis = useCurrencyStore((state) => state.setCurrencies);
//   const { data, isError, error } = useQuery("currencies", async () => {
//     return (await CurrencyService.getCurrencyList()).data.data;
//   });

//   useEffect(() => {
//     if ((error as any)?.status === 401) return logOut();
//     if (isError) return errorToast("Failed to fetch currencies", "Please try again later");
//     if (!data) return;
//     setCurrencis(data.items);
//   }, [data, isError, error, logOut, setCurrencis]);
// }

export const useFetchProfile = () => {
  const logOut = useAuthStore(state => state.setUnauthenticated);

  const setProfile = useProfileStore((state) => state.setProfile);
  const { data, isError, error } = useQuery("profile", async () => {
    return (await ProfileService.getProfile()).data.data.item;
  });

  useEffect(() => {
    if ((error as any)?.status === 401) return logOut();
    if (isError) return;
    if (!data) return;
    setProfile(data);
  }, [data, isError, error, logOut, setProfile]);
}