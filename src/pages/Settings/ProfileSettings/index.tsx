import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileSettingForm from "./components/ProfileSettingForm";
import { useState } from "react";
import SuccessChange from "./components/SuccessChange";

export default function ProfileSettingsPage() {

  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  const handleFormSuccess = () => {
    setIsSuccessOpen(true);
  };

  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">Profile Settings</h1>
      <ProfileSettingForm onSuccess={handleFormSuccess} />

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="max-w-2xl p-0 bg-transparent border-none shadow-none">
          <SuccessChange onClose={() => setIsSuccessOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
