import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

type StatusFilterHeaderProps = {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  statusOptions: string[]; // Array of status values to display
};

const StatusFilterHeader = ({
  statusFilter,
  onStatusFilterChange,
  statusOptions,
}: StatusFilterHeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>Status</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0"
        >
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <Filter className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => onStatusFilterChange("")}
            className={`cursor-pointer ${statusFilter === "" ? "bg-accent" : ""}`}
          >
            All Status
          </DropdownMenuItem>
          {statusOptions.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => onStatusFilterChange(status)}
              className={`cursor-pointer ${statusFilter === status ? "bg-accent" : ""}`}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatusFilterHeader;
