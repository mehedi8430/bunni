// components/CustomerTableActions.tsx
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";

interface CustomerTableActionsProps {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
}

export function CustomerTableActions({
  searchTerm,
  handleFilterChange,
}: CustomerTableActionsProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Search by name, email, or company"
          debounceDelay={300}
          className="w-[443px]"
        />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="border-border text-muted-foreground rounded-full bg-white p-3 text-sm font-normal"
            onClick={() => {
              console.log("Add customer");
            }}
          >
            <CirclePlus />
            Customer name
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border text-muted-foreground rounded-full bg-white p-3 text-sm font-normal"
            onClick={() => {
              console.log("Add Phone");
            }}
          >
            <CirclePlus />
            Phone
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="border-border text-muted-foreground rounded-xl bg-white p-3 text-sm font-normal"
      >
        <ReactSVG
          src={assets.icons.export_icon}
          className="text-muted-foreground"
        />
        Export
      </Button>
    </div>
  );
}
