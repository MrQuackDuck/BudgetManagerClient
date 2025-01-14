import { ProfileService } from "@/entities/user/api/ProfileService";
import { useProfileStore } from "@/entities/user/lib/hooks/useProfileStore";
import { successToast } from "@/shared/lib/successToast";
import { Button } from "@/shared/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/ui/Dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, `Username must contain at least ${2} symbols!`).max(50, `Username must contain no more than ${50} symbols!`)
});

interface ProfileSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function ProfileSettingsDialog({ isOpen, onOpenChange }: ProfileSettingsDialogProps) {
  const queryClient = useQueryClient();
  const profile = useProfileStore((state) => state.profile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      username: profile ? profile.username : ""
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    ProfileService.updateProfile(data.username)
      .then(() => {
        queryClient.invalidateQueries("profile");
        onOpenChange(false);
        successToast("Success!", "Your profile updated successfully!");
      });
  }

  function handleCancelClick(e) {
    e.preventDefault();
    onOpenChange(false);
  }

  useEffect(() => {
    if (!isOpen) setTimeout(() => form.reset(), 200);
  }, [isOpen, form]);

  if (!profile) return <></>;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-2">
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogDescription>Here you can change your profile settings</DialogDescription>
        <Form {...form}>
          <form className="flex flex-col gap-1.5" onSubmit={form.handleSubmit(onDataSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormDescription>The name that is displayed to you</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-1.5">
              <Button onClick={handleCancelClick} className="w-full" type="button" variant={"outline"}>
                Cancel
              </Button>
              <Button disabled={!form.formState.isDirty} className="w-full" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileSettingsDialog;
