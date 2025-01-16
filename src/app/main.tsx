import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { TooltipProvider } from "@/shared/ui/Tooltip";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </QueryClientProvider>
);
