import AuthPage from "@/pages/auth/ui/AuthPage";
import DashboardPage from "@/pages/dashboard/ui/DashboardPage";
import { useAuthState } from "@/shared/lib/hooks/useAuthState";
import { Toaster } from "@/shared/ui/Sonner";

function App() {
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);

  return (
    <>
      {!isAuthenticated && <AuthPage />}
      {isAuthenticated && <DashboardPage />}
      <Toaster />
    </>
  );
}

export default App;
