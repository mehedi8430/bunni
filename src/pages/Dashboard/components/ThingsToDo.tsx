import { icons } from "@/lib/imageProvider";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

const tasks = [
  {
    icon: icons.taskIcon1,
    key: "profile",
    color: "bg-[#E5FAFF]",
  },
  {
    icon: icons.taskIcon2,
    key: "invoice_template",
    color: "bg-[#DAFFF2]",
  },
  {
    icon: icons.taskIcon3,
    key: "products",
    color: "bg-[#E6EAFF]",
  },
];

export default function ThingsToDo() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t("things_to_do_title")}</h2>
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="border-border flex items-center gap-3 rounded-lg border p-3"
        >
          <div
            className={`rounded-full p-3 ${task.color} flex items-center justify-center`}
          >
            <ReactSVG src={task.icon} />
          </div>
          <div>
            <p className="text-foreground/90 text-base font-normal">
              {t(`things_to_do_tasks.${task.key}.title`)}
            </p>
            <p className="text-foreground/70 text-sm font-normal">
              {t(`things_to_do_tasks.${task.key}.description`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
