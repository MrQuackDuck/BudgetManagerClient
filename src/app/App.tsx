import AuthPage from "@/pages/auth/ui/AuthPage";
import DashboardPage from "@/pages/dashboard/ui/DashboardPage";
import { errorToast } from "@/shared/lib/errorToast";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { Toaster } from "@/shared/ui/Sonner";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { $api } from "@/shared/api";
import { SERVER_URL } from "@/shared/lib/globals";

const pingServer = async (): Promise<AxiosResponse> => {
  return await $api.get("/api/ping", { baseURL: SERVER_URL });
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { error, isError } = useQuery("ping", pingServer);
  useEffect(() => {
    if (isError) errorToast("Failed to connect to the server", "Please try again later");
  }, [error, isError]);

  return (
    <>
      {!isAuthenticated && <AuthPage />}
      {isAuthenticated && <DashboardPage />}
      <Toaster />
    </>
  );
}

export default App;
