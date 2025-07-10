import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "react-router";
import { ReactSVG } from "react-svg";

export default function LoginSuccessModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSuccess = Boolean(searchParams.get("success"));
  return (
    <Dialog
      open={isSuccess}
      onOpenChange={() => {
        // Reset the search params when the dialog is closed
        searchParams.delete("success");
        setSearchParams(searchParams);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <ReactSVG src="/path/to/success-icon.svg" />
          </DialogTitle>
          <DialogDescription>
            You have successfully logged in to your account. account and remove
            your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
