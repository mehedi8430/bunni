import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";

interface ProductTableActionsProps {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
}

export function ProductTableActions({
  searchTerm,
  handleFilterChange,
}: ProductTableActionsProps) {
  return (
    <div className="flex items-center md:items-start justify-between p-4">
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Search by name, email, or company"
          debounceDelay={300}
          className="w-full md:w-[443px]"
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add Phone");
              }}
            >
              <CirclePlus />
              Name
            </Button>
            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add Phone");
              }}
            >
              <CirclePlus />
              Price
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
              Status
            </Button>
            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add Phone");
              }}
            >
              <CirclePlus />
              Customer Name
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
              Payment Method
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

      <Button variant="filter_button" className="rounded-lg hidden lg:flex">
        <ReactSVG
          src={assets.icons.export_icon}
          className="text-muted-foreground"
        />
        Export
      </Button>
    </div>
  );
}
