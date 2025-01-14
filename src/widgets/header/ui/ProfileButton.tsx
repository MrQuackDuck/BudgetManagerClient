import { Button } from "@/shared/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/DropdownMenu";
import { SettingsIcon, Undo2Icon, UserIcon } from "lucide-react";
import { useState } from "react";
import ProfileSettingsDialog from "./ProfileSettingsDialog";
import { useLogout } from "@/shared/lib/useLogout";

function ProfileButton() {
  const logOut = useLogout();
  const [areSettingsShown, setAreSettingsShown] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <UserIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Profile
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setAreSettingsShown(true)}>
              <SettingsIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logOut}>
              <Undo2Icon className="mr-2 h-4 w-4" strokeWidth={2} /> Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileSettingsDialog isOpen={areSettingsShown} onOpenChange={setAreSettingsShown} />
    </>
  );
}

export default ProfileButton;
