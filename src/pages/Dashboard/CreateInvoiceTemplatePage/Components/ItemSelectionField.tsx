import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import { Input } from "@/components/ui/input";

export default function ItemSelectionField() {
  return (
    <div className="flex items-center gap-2">
      <Select>
        <SelectTrigger className="data-[placeholder]:text-foreground data-[select-trigger]:text-foreground w-[20px] border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-lg data-[select-trigger]:text-lg [&>svg]:hidden">
          {/* <SelectValue placeholder="Theme" /> */}
          <button type="button" className="h-8 w-8">
            <ReactSVG src={assets.icons.addIcon} />
          </button>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Type or click to select a item.."
        onChange={(e) => console.log("Input value changed:", e.target.value)}
        className="text-muted-foreground border-0 text-[16px] shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
      />
    </div>
  );
}
