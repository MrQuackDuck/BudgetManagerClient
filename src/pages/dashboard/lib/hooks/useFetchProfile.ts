import { ProfileService } from "@/entities/user/api/ProfileService";
import { useProfileStore } from "@/entities/user/lib/hooks/useProfileStore";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

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