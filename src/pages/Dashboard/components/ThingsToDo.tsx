import { FileText, PackageCheck, UserCircle } from "lucide-react";

const tasks = [
  {
    icon: <UserCircle className="text-primary w-6 h-6" />,
    title: "Finish Company Profile",
    description: "To do anything first completed your company profile.",
  },
  {
    icon: <FileText className="text-green-500 w-6 h-6" />,
    title: "Create Invoice Template",
    description:
      "To sent invoice you need to create invoice and choose the template.",
  },
  {
    icon: <PackageCheck className="text-purple-500 w-6 h-6" />,
    title: "Add Products",
    description: "To create invoice you need to add products.",
  },
];

export default function ThingsToDo() {
  return (
    <div className="space-y-4">
      <h2 className="text-[32px] font-semibold">Things To Do</h2>
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
        >
          <div className="p-2 rounded-full bg-white shadow">{task.icon}</div>
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
