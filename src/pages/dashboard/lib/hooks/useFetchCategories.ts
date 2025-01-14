import { CategoryService } from "@/entities/category/api/CategoryService";
import { useCategoryStore } from "@/entities/category/lib/hooks/useCategoryStore";
import { errorToast } from "@/shared/lib/errorToast";
import { useLogout } from "@/shared/lib/useLogout";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useFetchCategories = () => {
  const logOut = useLogout();

  const setCategoris = useCategoryStore((state) => state.setCategories);
  const { data, isError, error } = useQuery("categories", async () => {
    return (await CategoryService.getCategoryList()).data.data;
  });

  useEffect(() => {
    if ((error as any)?.status === 401) return logOut();
    if (isError) return errorToast("Failed to fetch categories", "Please try again later");
    if (!data) return;
    setCategoris(data.items);
  }, [data, isError, error, logOut, setCategoris]);
}