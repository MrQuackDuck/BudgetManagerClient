import AuthPage from "@/pages/auth/ui/AuthPage";
import DashboardPage from "@/pages/dashboard/ui/DashboardPage";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import { Toaster } from "@/shared/ui/Sonner";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      {!isAuthenticated && <AuthPage />}
      {isAuthenticated && <DashboardPage />}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
