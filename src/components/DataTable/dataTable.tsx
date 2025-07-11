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
  actions?: (row: TData) => React.ReactNode;
  isPagination?: boolean;
}

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    isLoading = false,
    page,
    limit,
    total,
    onPageChange,
    actions,
    isPagination = true,
  }: DataTableProps<TData, TValue>,
  ref: ForwardedRef<DataTableHandle<TData>>,
) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onSortingChange: setSorting,
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

  return (
    <div className="flex w-full flex-col space-y-4">
      {/* Table Container with Horizontal Scroll */}
      <Table className="border-separate border-spacing-y-1 sm:border-spacing-y-2">
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header, i) => (
                <TableHead
                  key={i}
                  className={`text-muted-foreground min-w-[80px] px-2 py-2 text-xs sm:min-w-[120px] sm:px-4 sm:py-3 sm:text-sm ${
                    !actions && headerGroup.headers.length - 1 === i
                      ? "text-center"
                      : ""
                  } `}
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
                <TableHead className="text-muted-foreground min-w-[80px] px-2 py-2 text-center text-xs sm:min-w-[120px] sm:px-4 sm:py-3 sm:text-sm">
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
                className="bg-muted/50 hover:bg-muted my-1 rounded-md border-0 sm:my-2"
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={i}
                    style={{ width: cell.column.getSize() }}
                    className={`min-w-[80px] px-2 py-2 text-xs sm:min-w-[120px] sm:px-4 sm:py-3 sm:text-sm ${i === 0 ? "rounded-l-lg sm:rounded-l-2xl" : ""} ${
                      row.getVisibleCells().length - 1 === i && !actions
                        ? "rounded-r-lg sm:rounded-r-2xl"
                        : ""
                    } `}
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
                  <TableCell className="min-w-[80px] rounded-r-lg px-2 py-2 sm:min-w-[120px] sm:rounded-r-2xl sm:px-4 sm:py-3">
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
                colSpan={columns.length + (actions ? 1 : 0)}
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
          <div className="order-2 text-center text-xs text-[#54607A] sm:order-1 sm:text-left sm:text-sm">
            <span className="block sm:inline">
              Showing {limit <= total ? limit : total} Results
            </span>
            <span className="block sm:ml-1 sm:inline">from {total} Total</span>
          </div>
          <div className="order-1 sm:order-2">
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
