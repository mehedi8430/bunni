import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { Link, useSearchParams } from "react-router";
import { Button } from "../ui/button";

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
      <DialogOverlay className="z-[999] bg-black/5 backdrop-blur-sm" />
      <DialogContent className="z-[9999] sm:max-w-sm">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-7xl">🎉</DialogTitle>
          <DialogTitle className="text-center text-3xl leading-7">
            Account Create Successfully
          </DialogTitle>
          <DialogDescription className="text-description text-center text-lg leading-7">
            Answer some question about your business.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" asChild size="lg">
            <Link to="/onboarding">Answer some question</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
