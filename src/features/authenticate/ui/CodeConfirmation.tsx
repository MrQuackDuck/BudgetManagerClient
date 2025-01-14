import { Button } from '@/shared/ui/Button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/shared/ui/InputOTP'
import { Separator } from '@/shared/ui/Separator'
import { ArrowLeftIcon } from 'lucide-react'
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useEffect, useRef } from 'react'

interface CodeConfirmationProps {
  back: () => void;
  onSubmit: (code: string) => void;
}

function CodeConfirmation({ back, onSubmit }: CodeConfirmationProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChange(value: string) {
    if (value.length !== 6) return;
    onSubmit(value);
  }

  return (
    <div className='flex flex-col gap-2 animate-appearance opacity-50'>
      <div className='flex flex-row items-center justify-between'>
        <Button onClick={back} variant={"outline"} className="w-9 h-9" size={"icon"}>
          <ArrowLeftIcon strokeWidth={2.5} className="h-4 w-4" />
        </Button>
        <p className="text-xl font-medium">Confirm number</p>
        <Button className='invisible w-9 h-9' size={'icon'}></Button>
      </div>
      <Separator />
      <InputOTP ref={inputRef} onChange={onChange} pattern={REGEXP_ONLY_DIGITS} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export default CodeConfirmation