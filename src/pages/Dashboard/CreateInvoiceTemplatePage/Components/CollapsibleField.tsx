import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleFieldProps {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleField({
  label,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleFieldProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`flex w-full flex-col gap-2 ${className}`}
    >
      <CollapsibleTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between">
          <Label className="custom-label cursor-pointer">{label}</Label>
          <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex w-full flex-col gap-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
