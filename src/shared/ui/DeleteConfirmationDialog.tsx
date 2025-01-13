import { Dialog, DialogContent, DialogDescription, DialogTitle } from './Dialog';;
import { Button } from './Button';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

function DeleteConfirmationDialog({ isOpen, onOpenChange, onConfirm }: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='flex flex-col gap-2 w-[320px]'>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>You are about to perform delete action</DialogDescription>
        <span>This action <u>can’t be undone.</u></span>
        <div className='flex flex-row gap-1.5'>
          <Button className='w-full' onClick={() => onOpenChange(false)} variant={'outline'}>Cancel</Button>
          <Button className='w-full' onClick={onConfirm} variant={'destructive'}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationDialog