import { Button } from "@/shared/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/DropdownMenu";
import { SettingsIcon, Undo2Icon, UserIcon } from "lucide-react";

function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <UserIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuGroup>
              <DropdownMenuItem data-no-focus-lock>
                <SettingsIcon className="mr-2 h-4 w-4" strokeWidth={2} /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem data-no-focus-lock>
                <Undo2Icon className="mr-2 h-4 w-4" strokeWidth={2} /> Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
