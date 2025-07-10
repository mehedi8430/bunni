import { Headset, Menu } from "lucide-react";
import SelectInput from "./SelectInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";
import Notification from "./notification";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-sidebar border-border fixed top-0 z-50 w-full border-b">
      <div className="flex items-center max-md:justify-center">
        <div className="flex w-[328px] items-center justify-center">
          <div className="flex h-[78px] w-[109px] items-center justify-center">
            <ReactSVG src={icons.navLogo} />
          </div>
        </div>

        {/* Desktop View */}
        <div className="flex w-full items-center justify-between pr-14 pl-24 max-md:hidden">
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

              <Notification />
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

        {/* Mobile View */}
        <div className="hidden max-md:block max-md:pr-4">
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="flex items-center justify-between p-2">
              <Link
                to={`/dashboard/notifications`}
                className="border-border cursor-pointer rounded-full border p-1"
              >
                <ReactSVG src={icons.notification} />
              </Link>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mt-2 mr-4 w-56 p-2">
                <div className="flex flex-col gap-4">
                  {/* Support Section */}
                  <div className="flex items-center gap-2 p-2">
                    <Headset className="size-4" />
                    <SelectInput
                      options={[]}
                      placeholder="Support"
                      triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:border [&>svg]:border-border [&>svg]:rounded-full [&>svg]:opacity-80 [&>svg]:size-5 [&>svg]:stroke-black data-[placeholder]:text-foreground data-[placeholder]:text-lg data-[select-trigger]:text-foreground data-[select-trigger]:text-lg"
                    />
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm font-medium">Language</span>
                    <SelectInput
                      options={[
                        { value: "en", label: "En" },
                        { value: "bn", label: "Bn" },
                      ]}
                      placeholder="En"
                      triggerClassName="border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 [&>svg]:size-4 [&>svg]:stroke-black [&>svg]:opacity-80 data-[placeholder]:text-foreground data-[placeholder]:text-sm data-[select-trigger]:text-foreground data-[select-trigger]:text-sm text-foreground text-sm"
                    />
                  </div>

                  {/* Profile Section */}
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="object-cover"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Acme Inc.</span>
                      <span className="text-muted-foreground text-xs">
                        View profile
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
