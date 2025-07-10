import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactSVG } from "react-svg";
import { icons } from "@/lib/imageProvider";
import { BellRing, CheckCircle, ClockFading } from "lucide-react";

const notifications = [
  {
    title: "Charli Paid $50",
    subtitle: "Some kind of sub text what you want",
    time: "Tomorrow At 10:00 AM",
  },
  {
    title: "Apurbo Accept Your Admin Invite.",
    subtitle: "Some kind of sub text what you want",
    time: "Monday At 3:00 PM",
  },
  {
    title: "Your subscription is end in 10 day",
    subtitle: "Some kind of sub text what you want",
    time: "Tomorrow At 10:00 AM",
  },
  {
    title: "Your subscription is end in 10 day",
    subtitle: "Some kind of sub text what you want",
    time: "Tomorrow At 10:00 AM",
  },
  {
    title: "Your subscription is end in 10 day",
    subtitle: "Some kind of sub text what you want",
    time: "Tomorrow At 10:00 AM",
  },
  {
    title: "Your subscription is end in 10 day",
    subtitle: "Some kind of sub text what you want",
    time: "Tomorrow At 10:00 AM",
  },
];

export default function Notification() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="border-border cursor-pointer rounded-full border p-1">
          <ReactSVG src={icons.notification} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="border-border max-h-[80vh] w-80 overflow-y-auto border px-6 py-8 shadow-2xl md:w-120">
        <div className="z-50 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Notifications & Alerts</h2>
            <p className="text-foreground/50 text-[20px] font-normal">
              You have 3 new updates
            </p>
          </div>

          <button className="text-primary flex items-center gap-2 text-[16px] font-normal">
            <CheckCircle size={18} />
            Mark all as read
          </button>

          <div className="space-y-6">
            {notifications.map((notif, idx) => (
              <div
                key={idx}
                className="border-border/30 flex items-start gap-6 rounded-lg border p-6"
              >
                <div className="bg-primary/30 rounded-full p-4">
                  <BellRing size={24} className="" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[20px] font-semibold">{notif.title}</h3>
                  <p className="font-noraml text-foreground/70 text-lg">
                    {notif.subtitle}
                  </p>
                  <p className="text-foreground/50 flex items-start gap-2 text-sm font-normal">
                    <ClockFading size={18} />
                    {notif.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
