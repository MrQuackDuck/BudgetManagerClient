import { toast } from "sonner"

export const infoToast = (title, description) => {
  toast.info(title, {
    description,
    action: {
      label: "Close",
      onClick: () => {}
    }
  })
}