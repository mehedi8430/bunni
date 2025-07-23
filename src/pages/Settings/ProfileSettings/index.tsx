import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileSettingForm from "./components/ProfileSettingForm";
import { useState } from "react";
import SuccessChange from "./components/SuccessChange";
import { Button } from "@/components/ui/button";
import ProfileInfo from "./components/ProfileInfo";

export default function ProfileSettingsPage() {

  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const handleFormSuccess = () => {
    setIsSuccessOpen(true);
  };

  const profileData = {
    personalInfo: {
      name: "Sarah Thompson",
      email: "sarah.thompson@example.com",
      phone: "+1 (555) 123-4567",
    },
    businessInfo: {
      logo: "https://img.daisyui.com/images/profile/demo/batman@192.webp",
      name: "Thompson Consulting Group",
      address: "456 Innovation Drive, New York, NY 10001",
      contact: "+1 (555) 987-6543",
      website: "www.thompsonconsulting.co",
    },
  };

  return (
    <section className="space-y-6 md:space-y-10">
      <div className="flex justify-between items-center gap-3">
        <h1 className="text-2xl font-semibold md:text-[32px]">Profile Settings</h1>
        <Button onClick={() => setEditProfile(true)} className="text-base font-normal border border-button-border">Edit Profile</Button>
      </div>
      {editProfile ? <ProfileSettingForm onSuccess={handleFormSuccess} profileData={profileData} /> : <ProfileInfo profileData={profileData} />}

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none [&>button]:hidden">
          <SuccessChange onClose={() => setIsSuccessOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
