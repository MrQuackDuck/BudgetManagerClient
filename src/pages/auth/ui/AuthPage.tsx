import { cn } from "@/shared/lib/utils";
import classes from "./AuthPage.module.css";
import AuthForm from "@/features/authenticate/ui/AuthForm";

function AuthPage() {
  return (
    <div className="flex h-full">
      <div className={cn("w-full flex flex-col justify-center font-extrabold text-6xl text-center text-white", classes.coverScreen)}>
        <span>
          <u>Budget</u> manager,
        </span>
        <span>sign in to continue</span>
      </div>
      <div className="w-full flex items-center justify-center">
        <AuthForm />
      </div>
    </div>
  );
}

export default AuthPage;
