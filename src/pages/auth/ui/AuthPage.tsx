import { cn } from "@/shared/lib/utils";
import classes from "./AuthPage.module.css";
import AuthForm from "@/features/authenticate/ui/AuthForm";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";

function AuthPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="flex h-full animate-appearance opacity-50">
      <div className={cn("w-full flex flex-col justify-center font-extrabold text-6xl text-center text-white max-lg:hidden", classes.coverScreen)}>
        <span>
          <u>Budget</u> manager,
        </span>
        <span>sign in to continue</span>
      </div>
      <div className={cn("w-full flex items-center justify-center", !isDesktop && classes.coverScreen)}>
        <AuthForm />
      </div>
    </div>
  );
}

export default AuthPage;
