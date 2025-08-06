"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";

const LoginDialog = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogTitle />
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog;