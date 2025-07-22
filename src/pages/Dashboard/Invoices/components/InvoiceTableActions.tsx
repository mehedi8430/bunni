/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CirclePlus, CircleMinus } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { ReactSVG } from "react-svg";
import assets from "@/lib/imageProvider";
import DateTimePicker from "@/components/DateTimePicker";
import type { DataTableHandle } from "@/components/DataTable/dataTable";
import { useEffect, useState } from "react";
import type { Table } from "@tanstack/react-table";

interface InvoiceTableActionsProps {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setSelectedDate: (date: string | null) => void;
  tableRef: React.RefObject<DataTableHandle<any> | null>;
}

export function InvoiceTableActions({
  searchTerm,
  handleFilterChange,
  setSelectedDate,
  tableRef,
}: InvoiceTableActionsProps) {
  const [table, setTable] = useState<Table<any> | null>(null);

  useEffect(() => {
    if (tableRef.current?.table) {
      setTable(tableRef.current.table);
    }
  }, [tableRef]);

  // Get filterable columns (exclude select and actions columns)
  const getFilterableColumns = () => {
    if (!table) return [];

    return table
      .getAllColumns()
      .filter(
        (column) =>
          column.getCanHide() &&
          column.id !== "select" &&
          column.id !== "actions",
      );
  };

  const toggleColumnVisibility = (columnId: string) => {
    if (!table) return;

    const column = table.getColumn(columnId);
    if (column) {
      column.toggleVisibility();
    }
  };

  const getColumnDisplayName = (columnId: string) => {
    const displayNames: Record<string, string> = {
      id: "Invoice",
      customerName: "Customer Name",
      status: "Status",
      orderNumber: "Order Number",
      amount: "Amount",
      tenderType: "Tender Type",
      date: "Date",
    };

    return displayNames[columnId] || columnId;
  };

  const filterableColumns = getFilterableColumns();

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

            {/* Dynamic Column Filter Buttons */}
            {filterableColumns.map((column) => {
              const isVisible = column.getIsVisible();
              const displayName = getColumnDisplayName(column.id);

              return (
                <Button
                  key={column.id}
                  variant="filter_button"
                  onClick={() => toggleColumnVisibility(column.id)}
                  className="flex items-center gap-2"
                >
                  {isVisible ? (
                    <CircleMinus className="h-4 w-4" />
                  ) : (
                    <CirclePlus className="h-4 w-4" />
                  )}
                  {displayName}
                </Button>
              );
            })}

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
