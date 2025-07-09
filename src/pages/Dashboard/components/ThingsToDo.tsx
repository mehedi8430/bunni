import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";

const tasks = [
  {
    icon: icons.taskIcon1,
    title: "Finish Company Profile",
    description: "To do anything first completed your company profile.",
    color: "bg-[#E5FAFF]",
  },
  {
    icon: icons.taskIcon2,
    title: "Create Invoice Template",
    description:
      "To sent invoice you need to create invoice and choose the template.",
    color: "bg-[#DAFFF2]",
  },
  {
    icon: icons.taskIcon3,
    title: "Add Products",
    description: "To create invoice you need to add products.",
    color: "bg-[#E6EAFF]",
  },
];

export default function ThingsToDo() {
  return (
    <div className="space-y-4">
      <h2 className="text-[32px] font-semibold">Things To Do</h2>
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
            <p className="font-normal text-[20px] text-foreground/90">
              {task.title}
            </p>
            <p className="text-lg font-normal text-foreground/70">
              {task.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
