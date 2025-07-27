import { Switch } from "@/components/ui/switch";
import { Mail, Megaphone, MonitorCheck } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function NotificationPage() {
  const { t } = useTranslation("notification");

  const [enableEmail, setEnableEmail] = useState(true);
  const [enableDesktop, setEnableDesktop] = useState(false);
  const [enableUpdate, setEnableUpdate] = useState(true);
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="mb-3 text-2xl font-semibold md:text-[26px]">
          {t("Notification")}
        </h1>
        <p className="text-foreground/40 text-lg font-normal">
          {t("Description")}
        </p>
      </div>
      <div className="rounded-md bg-white px-6 py-10">
        <div className="border-foreground/10 flex items-center justify-between rounded-md border px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <Mail strokeWidth={1.5} />
            <h3 className="text-base font-normal">
              {t("Email_Notifications")}
            </h3>
          </div>
          <Switch checked={enableEmail} onCheckedChange={setEnableEmail} />
        </div>
        <div className="border-foreground/10 flex items-center justify-between rounded-md border px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <MonitorCheck strokeWidth={1.5} />
            <h3 className="text-base font-normal">
              {t("Notification_on_desktop")}
            </h3>
          </div>
          <Switch checked={enableDesktop} onCheckedChange={setEnableDesktop} />
        </div>
        <div className="border-foreground/10 flex items-center justify-between rounded-md border px-6 py-4.5">
          <div className="flex items-center space-x-3">
            <Megaphone strokeWidth={1.5} />
            <h3 className="text-base font-normal">
              {t("New_update_notification")}
            </h3>
          </div>
          <Switch checked={enableUpdate} onCheckedChange={setEnableUpdate} />
        </div>
      </div>
    </section>
  );
}
