import { toast } from "sonner"

export const errorToast = (title, description) => {
  toast.error(title, {
    description,
    action: {
      label: "Close",
      onClick: () => {}
    }
  })
}