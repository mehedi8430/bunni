import { Button } from "@/components/ui/button";
import { CirclePlus, CircleMinus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import DateTimePicker from "@/components/DateTimePicker";
import type { Table, VisibilityState } from "@tanstack/react-table";

interface ColumnDef {
  id: string;
  displayName: string;
  canHide?: boolean;
}

interface TableHeaderActionsProps<T> {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setSelectedDate?: (date: string | null) => void;
  table: Table<T>;
  columns: ColumnDef[];
  searchPlaceholder?: string;
  showDatePicker?: boolean;
  showExportButton?: boolean;
  exportButtonText?: string;
  onExportClick?: () => void;
  searchInputClassName?: string;
  columnVisibility?: VisibilityState;
}

export function TableHeaderActions<T>({
  searchTerm,
  handleFilterChange,
  setSelectedDate,
  table,
  columns,
  searchPlaceholder = "Search...",
  showDatePicker = true,
  showExportButton = true,
  exportButtonText = "Export",
  onExportClick,
  searchInputClassName = "w-full lg:w-[443px]",
  columnVisibility,
}: TableHeaderActionsProps<T>) {
  console.log({ columnVisibility });
  // Get filterable columns (exclude select and actions columns if present)
  const getFilterableColumns = () => {
    return columns.filter(
      (col) =>
        (col.canHide ?? true) && col.id !== "select" && col.id !== "actions",
    );
  };

  const toggleColumnVisibility = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (column) {
      column.toggleVisibility();
    }
  };

  const filterableColumns = getFilterableColumns();

  return (
    <div className="flex items-start justify-between p-4 xl:items-center">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={searchTerm}
            onChange={handleFilterChange}
            placeholder={searchPlaceholder}
            debounceDelay={300}
            className={searchInputClassName}
          />
          {showDatePicker && setSelectedDate && (
            <DateTimePicker
              onDateTimeChange={(dateTime) => {
                setSelectedDate(dateTime ? dateTime.toString() : null);
                console.log("Selected DateTime:", dateTime);
              }}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Dynamic Column Filter Buttons */}
            {filterableColumns.map((column) => {
              const isVisible = columnVisibility?.[column.id] ?? true;

              return (
                <Button
                  key={column.id}
                  variant="filter_button"
                  onClick={() => toggleColumnVisibility(column.id)}
                  className="flex items-center gap-2 truncate"
                >
                  {isVisible ? (
                    <CircleMinus className="h-4 w-4" />
                  ) : (
                    <CirclePlus className="h-4 w-4" />
                  )}
                  {column.displayName}
                </Button>
              );
            })}

            {showExportButton && (
              <Button
                variant="filter_button"
                className="rounded-lg lg:hidden"
                onClick={onExportClick}
              >
                <ReactSVG
                  src={assets.icons.export_icon}
                  className="text-muted-foreground"
                />
                {exportButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {showExportButton && (
        <Button
          variant="filter_button"
          className="hidden rounded-lg lg:flex lg:self-end"
          onClick={onExportClick}
        >
          <ReactSVG
            src={assets.icons.export_icon}
            className="text-muted-foreground"
          />
          {exportButtonText}
        </Button>
      )}
    </div>
  );
}
