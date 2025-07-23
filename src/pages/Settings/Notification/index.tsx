import { Switch } from "@/components/ui/switch";
import { Mail, Megaphone, MonitorCheck } from "lucide-react";
import { useState } from "react";

export default function NotificationPage() {
  const [enableEmail, setEnableEmail] = useState(true);
  const [enableDesktop, setEnableDesktop] = useState(false);
  const [enableUpdate, setEnableUpdate] = useState(true);
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="text-2xl font-semibold md:text-[26px] mb-3">
          Notification
        </h1>
        <p className="text-lg font-normal text-foreground/40">This information will be displayed publicity so be careful what you share</p>
      </div>
      <div className="bg-white px-6 py-10 rounded-md">
        <div className="flex items-center justify-between border border-foreground/10 rounded-md px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <Mail strokeWidth={1.5} />
            <h3 className="text-base font-normal">Email Notifications</h3>
          </div>
          <Switch checked={enableEmail} onCheckedChange={setEnableEmail} />
        </div>
        <div className="flex items-center justify-between border border-foreground/10 rounded-md px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <MonitorCheck strokeWidth={1.5} />
            <h3 className="text-base font-normal">Notification on desktop</h3>
          </div>
          <Switch checked={enableDesktop} onCheckedChange={setEnableDesktop} />
        </div>
        <div className="flex items-center justify-between border border-foreground/10 rounded-md px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <Megaphone strokeWidth={1.5} />
            <h3 className="text-base font-normal">New update notification</h3>
          </div>
          <Switch checked={enableUpdate} onCheckedChange={setEnableUpdate} />
        </div>
      </div>
    </section>
  );
}
