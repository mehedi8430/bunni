import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import YearPicker from "@/components/YearPicker";

interface CustomerTableActionsProps {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
}

export function CustomerTableActions({
  searchTerm,
  handleFilterChange,
}: CustomerTableActionsProps) {
  return (
    <div className="flex justify-center p-4 lg:justify-between">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Search by name, email, or company"
          debounceDelay={300}
          className="w-[80%] lg:w-[443px]"
        />

        <div className="flex flex-col items-center gap-3 lg:flex-row">
          <div className="flex items-center gap-3">
            <YearPicker onYearChange={(year) => console.log(year)} />

            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add customer");
              }}
            >
              <CirclePlus />
              Customer name
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add Phone");
              }}
            >
              <CirclePlus />
              Phone
            </Button>
            <Button variant="filter_button" className="rounded-lg lg:hidden">
              <ReactSVG
                src={assets.icons.export_icon}
                className="text-muted-foreground"
              />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Button variant="filter_button" className="hidden rounded-lg lg:flex">
        <ReactSVG
          src={assets.icons.export_icon}
          className="text-muted-foreground"
        />
        Export
      </Button>
    </div>
  );
}
