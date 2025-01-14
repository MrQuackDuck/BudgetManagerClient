import { Input } from "@/shared/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/Button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { ArrowLeftIcon } from "lucide-react";
import { Separator } from "@/shared/ui/Separator";

const formSchema = z.object({
  username: z.string().min(2, `Username must contain at least ${2} symbols!`).max(50, `Username must contain no more than ${50} symbols!`),
});

interface ChooseUsernameFormProps {
  back: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultUsername?: string;
}

export default function ChooseUsernameForm({ back, onSubmit, defaultUsername }: ChooseUsernameFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      "username": defaultUsername ?? "",
    }
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    const username = data.username;

    onSubmit({ username });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 animate-appearance opacity-50" onSubmit={form.handleSubmit(onDataSubmit)}>
        <div className='flex flex-row items-center justify-between'>
          <Button type="button" onClick={back} variant={"outline"} className="w-9 h-9" size={"icon"}>
            <ArrowLeftIcon strokeWidth={2.5} className="h-4 w-4" />
          </Button>
          <p className="text-xl font-medium">Choose Username</p>
          <Button className='invisible w-9 h-9' size={'icon'}></Button>
        </div>
        <Separator orientation="horizontal" />
        <div className="space-y-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="Your display name" {...field} />
                </FormControl>
                <FormDescription>The name that will be displayed to you</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full">Continue</Button>
      </form>
    </Form>
  );
}
