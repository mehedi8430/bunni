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
        <button className="p-1 rounded-full border border-border cursor-pointer">
          <ReactSVG src={icons.notification} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-94 border border-border shadow-2xl py-8 px-6 max-h-[80vh] overflow-y-auto">
        <div className="z-50 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Notifications & Alerts</h2>
            <p className="text-[20px] font-normal text-foreground/50">
              You have 3 new updates
            </p>
          </div>

          <button className="text-[16px] font-normal text-primary flex items-center gap-2">
            <CheckCircle size={18} />
            Mark all as read
          </button>

          <div className="space-y-6">
            {notifications.map((notif, idx) => (
              <div
                key={idx}
                className="border border-border/30 p-6 rounded-lg flex items-start gap-6"
              >
                <div className="p-4 bg-primary/30 rounded-full">
                  <BellRing size={24} className="" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-[20px] font-semibold">{notif.title}</h3>
                  <p className="text-lg font-noraml text-foreground/70">
                    {notif.subtitle}
                  </p>
                  <p className="text-sm font-normal text-foreground/50 flex items-start gap-2">
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
