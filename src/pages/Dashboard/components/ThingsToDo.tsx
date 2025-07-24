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
      <h2 className="text-xl font-semibold">{t("things_to_do_title")}</h2>
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-3 rounded-lg border border-border"
        >
          <div
            className={`p-4 rounded-full ${task.color} flex items-center justify-center w-[54px] h-[54px]`}
          >
            <ReactSVG src={task.icon} className="size-8" />
          </div>
          <div>
            <p className="font-normal text-lg text-foreground/90">
              {t(`things_to_do_tasks.${task.key}.title`)}
            </p>
            <p className="text-base font-normal text-foreground/70">
              {t(`things_to_do_tasks.${task.key}.description`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
