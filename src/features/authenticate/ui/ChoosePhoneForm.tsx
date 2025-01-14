import { Input } from "@/shared/ui/Input";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/shared/ui/Button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/Form";
import { Separator } from "@/shared/ui/Separator";

const formSchema = z.object({
  phone: z.string().min(9, `Phone number must contain at least ${9} symbols!`).max(20, `Phone number must contain no more than ${15} symbols!`),
})

interface ChoosePhoneFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export default function ChoosePhoneForm({ onSubmit }: ChoosePhoneFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onDataSubmit(data: z.infer<typeof formSchema>) {
    let phone = data.phone;
    
    // Extract only numbers from the phone number
    phone = phone.replace(/\D/g, "");

    // Send the phone number to the server
    onSubmit({ phone });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 animate-appearance opacity-50" onSubmit={form.handleSubmit(onDataSubmit)}>
        <div className="space-y-1">
          <div className='flex flex-row items-center justify-center'>
            <p className="text-xl font-medium">Authentication</p>
          </div>
          <Separator orientation="horizontal" />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input autoComplete="off" placeholder="+38 (012) 345 67 89" {...field} />
                </FormControl>
                <FormDescription>
                  This is your phone number you use
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full">Sign In</Button>
      </form>
    </Form>
  );
}
