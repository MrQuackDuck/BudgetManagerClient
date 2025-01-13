import { toast } from "sonner"

export const successToast = (title, description) => {
  toast.success(title, {
    description,
    action: {
      label: "Close",
      onClick: () => {}
    }
  })
}