import { Card, CardContent } from "@/shared/ui/Card";
import ChoosePhoneForm from "./ChoosePhoneForm";
import { useState } from "react";
import CodeConfirmation from "./CodeConfirmation";
import { AuthService } from "../api/AuthService";
import { errorToast } from "@/shared/lib/errorToast";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/shared/lib/hooks/useAuthStore";
import ChooseUsernameForm from "./ChooseUsernameForm";

type Stage = "phone" | "username" | "enterCode";

function AuthForm() {
  const [previousStage, setPreviousStage] = useState<Stage>("phone");
  const [stage, setStage] = useState<Stage>("phone");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  function handleSignIn(data) {
    setIsLoading(true);
    setPhone(data.phone);
    AuthService.signIn(data.phone)
      .then(() => {
        setPreviousStage("phone");
        setStage("enterCode");
      })
      .catch((error) => {
        if (error.response?.status == 500 || error.response?.status == 404) setStage("username");
        else errorToast("An error occurred!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUsernameSubmit(data) {
    setIsLoading(true);
    AuthService.signUp(phone, data.username)
      .then(() => {
        setUsername(data.username);
        setPreviousStage("username");
        setStage("enterCode");
      })
      .catch((error) => {
        errorToast("An error occurred!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  }

  function handleCodeSubmit(code) {
    setIsLoading(true);
    AuthService.confirmCode(phone, code)
      .then((response) => {
        if (!response.data.data.token) throw new Error("Token not found in the response!");
        setAuthenticated(response.data.data.token);
      })
      .catch((error) => {
        if (error.response?.status == 400) errorToast("Wrong code!", "Please enter the correct code sent to your phone.");
        else errorToast("An error occurred!", error.message);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Card className={cn("animate-smooth w-full max-w-[380px]", isLoading && "absolute invisible pointer-events-none")}>
        <CardContent className="flex flex-col gap-2 py-5">
          {stage == "phone" && <ChoosePhoneForm onSubmit={handleSignIn} />}
          {stage == "username" && <ChooseUsernameForm defaultUsername={username} back={() => setStage(previousStage)} onSubmit={handleUsernameSubmit} />}
          {stage == "enterCode" && <CodeConfirmation back={() => setStage(previousStage)} onSubmit={handleCodeSubmit} />}
        </CardContent>
      </Card>

      {isLoading && <Loader2 className="w-5 h-5 animate-spin max-lg:text-white" />}
    </>
  );
}

export default AuthForm;
