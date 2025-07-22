import {
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type Table as TableType,
  type VisibilityState,
  type Updater,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
} from "react";
import AppPagination from "../AppPagination.tsx";
import SelectInput, { type SelectOption } from "../SelectInput/index.tsx";

export interface DataTableHandle<TData> {
  table: TableType<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterColumn?: string;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isPagination?: boolean;
  actions?: (row: TData) => React.ReactNode;
  columnVisibility?: VisibilityState;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;
}

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    isLoading = false,
    page,
    limit,
    total,
    actions,
    onPageChange,
    isPagination = true,
    onLimitChange,
    columnVisibility,
    setColumnVisibility,
  }: DataTableProps<TData, TValue>,
  ref: ForwardedRef<DataTableHandle<TData>>,
) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: (updater) => setColumnVisibility(updater),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
  });

  useImperativeHandle(ref, () => ({ table }), [table]);

  const renderSkeleton = () =>
    [...Array(limit)].map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`}>
        {columns.map((_, colIndex) => (
          <TableCell key={`skeleton-cell-${colIndex}`} className="p-2 sm:p-4">
            <Skeleton className="h-4 w-full sm:h-6" />
          </TableCell>
        ))}
        {actions && (
          <TableCell className="flex items-center justify-end p-2 text-right sm:p-4">
            <Skeleton className="h-4 w-12 sm:h-6 sm:w-16" />
          </TableCell>
        )}
      </TableRow>
    ));

  const limitOptions: SelectOption[] = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
  ];

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Table Container with Horizontal Scroll */}
      <Table className="">
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-border/50 hover:bg-border/50"
            >
              {headerGroup.headers.map((header, i) => (
                <TableHead
                  key={i}
                  className={`text-foreground px-2 py-2 text-center sm:px-8 sm:py-3`}
                  style={{ width: header.column.getSize() }}
                >
                  <div className="truncate">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </TableHead>
              ))}
              {actions && (
                <TableHead className="sticky right-0 z-50 w-[60px] bg-gray-400 px-2 py-2 text-center font-semibold text-black sm:px-8">
                  <div className="truncate">Actions</div>
                </TableHead>
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeleton()
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted border-border/30 my-1 border-t text-center last:border-b sm:my-2"
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={i}
                    style={{ width: cell.column.getSize() }}
                    className={`px-2 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm`}
                  >
                    <div className="truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </TableCell>
                ))}

                {actions && (
                  <TableCell className="text-foreground sticky right-0 z-50 w-[60px] bg-gray-300 px-2 py-2 text-xs sm:px-8 sm:py-3 sm:text-sm">
                    <div className="flex justify-center">
                      {actions(row.original)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-muted-foreground h-16 px-2 py-4 text-center text-xs sm:h-24 sm:px-4 sm:py-6 sm:text-sm"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Section */}
      {isPagination && (
        <div className="flex flex-col items-center justify-between gap-3 px-2 sm:flex-row sm:gap-4 sm:px-4">
          <div className="order-2 flex items-center text-center text-xs text-[#54607A] sm:text-left sm:text-sm">
            <span className="block sm:inline">
              Showing 1 to {limit <= total ? limit : total}
            </span>
            <span className="mr-2 block sm:ml-1 sm:inline">
              of {total} entries
            </span>
            <SelectInput
              options={limitOptions}
              value={limit.toString()}
              onValueChange={(value) => onLimitChange(Number(value))}
              placeholder="Select limit"
              triggerClassName="bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
            />
          </div>
          <div className="order-1">
            <AppPagination
              total={total}
              limit={limit}
              page={page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const DataTable = forwardRef(DataTableInner) as <
  TData,
  TValue = unknown,
>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<DataTableHandle<TData>>;
  },
) => ReturnType<typeof DataTableInner>;
