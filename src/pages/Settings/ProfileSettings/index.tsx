import ProfileSettingForm from "./components/ProfileSettingForm";

export default function ProfileSettingsPage() {
  
  return <section className="space-y-6 md:space-y-10">
    <h1 className="text-2xl font-semibold md:text-[32px]">Profile Settings</h1>
    <ProfileSettingForm />
  </section>;
}
