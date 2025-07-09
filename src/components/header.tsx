import { Bell, Headset } from "lucide-react";
import SelectInput from "./SelectInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-sidebar border-b border-border">
      <div className="flex items-center">
        <div className="w-[328px] flex items-center justify-center">
          <div className="w-[109px] h-[78px] flex items-center justify-center">
            <ReactSVG src={icons.navLogo} />
          </div>
        </div>

        <div className="pl-24 pr-14 flex items-center justify-between w-full">
          <div className="flex items-center">
            <Headset className="size-4" />
            <SelectInput
              options={[]}
              placeholder="Support"
              triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:border [&>svg]:border-border [&>svg]:rounded-full [&>svg]:opacity-80 [&>svg]:size-5 [&>svg]:stroke-black data-[placeholder]:text-foreground data-[placeholder]:text-lg data-[select-trigger]:text-foreground data-[select-trigger]:text-lg"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <SelectInput
                options={[
                  { value: "en", label: "En" },
                  { value: "bn", label: "Bn" },
                ]}
                placeholder="En"
                triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:size-5 [&>svg]:stroke-black [&>svg]:opacity-80 [&>svg]:ml-[-8px] data-[placeholder]:text-foreground data-[placeholder]:text-lg data-[select-trigger]:text-foreground data-[select-trigger]:text-lg text-foreground text-lg"
              />
              <button className="p-1 rounded-full border border-border">
                {/* <Bell className="size-4" /> */}
                <ReactSVG src={icons.notification} />
              </button>
            </div>

            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="object-cover"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>

              <SelectInput
                options={[]}
                placeholder="Acme Inc."
                triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:border [&>svg]:border-border [&>svg]:rounded-full [&>svg]:opacity-80 [&>svg]:size-5 [&>svg]:stroke-black data-[placeholder]:text-foreground data-[placeholder]:text-[16px] data-[select-trigger]:text-foreground data-[select-trigger]:text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
