import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import DateTimePicker from "@/components/DateTimePicker";

interface InvoiceTableActionsProps {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setSelectedDate: (date: string | null) => void;
}

export function InvoiceTableActions({
  searchTerm,
  handleFilterChange,
  setSelectedDate,
}: InvoiceTableActionsProps) {
  return (
    <div className="flex items-start justify-between p-4 xl:items-center">
      <div className="flex flex-wrap items-center gap-6">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Search by name, email, or company"
          debounceDelay={300}
          className="w-full lg:w-[443px]"
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-3">
            <DateTimePicker
              onDateTimeChange={(dateTime) => {
                setSelectedDate(dateTime ? dateTime.toString() : null);
                console.log("Selected DateTime:", dateTime);
              }}
            />

            <Button
              variant="filter_button"
              onClick={() => {
                console.log("Add Phone");
              }}
            >
              <CirclePlus />
              amount
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
              order number
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
