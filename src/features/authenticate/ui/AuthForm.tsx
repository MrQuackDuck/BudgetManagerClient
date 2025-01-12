import { Card, CardContent } from "@/shared/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import CodeConfirmation from "./CodeConfirmation";
import { AuthService } from "../api/AuthService";
import { errorToast } from "@/shared/lib/errorToast";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAuthState } from "@/shared/lib/hooks/useAuthState";

type Stage = "tabs" | "enterCode";

function AuthForm() {
  const [stage, setStage] = useState<Stage>("tabs");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuthenticated = useAuthState((state) => state.setAuthenticated);

  function handleSignIn(data) {
    setIsLoading(true);
    setPhone(data.phone);
    AuthService.signIn(data.phone)
      .then(() => {
        setStage("enterCode");
      })
      .catch((error) => {
        if (error.response?.status == 500 || error.response?.status == 404) errorToast("User not found!", "Please sign up first.");
        else errorToast("An error occurred!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignUp(data) {
    setIsLoading(true);
    setPhone(data.phone);
    AuthService.signUp(data.phone, data.username)
      .then(() => {
        setStage("enterCode");
      })
      .catch((error) => {
        errorToast("An error occurred!", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleBack() {
    setStage("tabs");
  }

  function handleCodeSubmit(code) {
    setIsLoading(true);
    AuthService.confirmCode(phone, code)
      .then((response) => {
        console.log(response);
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
      <Card style={{ opacity: 0 }} className={cn("animate-smooth", isLoading && "absolute invisible pointer-events-none")}>
        <CardContent className="flex flex-col gap-2 py-5">
          {stage == "tabs" && (
            <Tabs defaultValue="signIn" className="w-[356px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signIn">Sign In</TabsTrigger>
                <TabsTrigger value="signUp">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signIn" className="flex flex-col gap-2">
                <SignInForm onSubmit={handleSignIn} />
              </TabsContent>
              <TabsContent value="signUp" className="flex flex-col gap-2">
                <SignUpForm onSubmit={handleSignUp} />
              </TabsContent>
            </Tabs>
          )}
          {stage == "enterCode" && <CodeConfirmation back={handleBack} onSubmit={handleCodeSubmit} />}
        </CardContent>
      </Card>

      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
    </>
  );
}

export default AuthForm;
