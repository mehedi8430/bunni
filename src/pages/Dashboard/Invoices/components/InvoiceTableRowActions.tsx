import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Ban,
  BanknoteArrowDown,
  Copy,
  Download,
  Edit,
  Eye,
  MoreHorizontal,
  SendToBack,
  Trash,
} from "lucide-react";
import type { TInvoice } from "@/types";

type InvoiceTableRowActionsProps = {
  invoice: TInvoice;
  setSelectedInvoice: (invoice: TInvoice) => void;
  setIsViewOpen: (isOpen: boolean) => void;
  setEditInvoice: (invoice: Partial<TInvoice>) => void;
  setIsEditOpen: (isOpen: boolean) => void;
  setInvoiceToDelete: (invoiceId: string) => void;
  setIsDeleteOpen: (isOpen: boolean) => void;
};

export default function InvoiceTableRowActions({
  invoice,
  setSelectedInvoice,
  setIsViewOpen,
  setEditInvoice,
  setIsEditOpen,
  setInvoiceToDelete,
  setIsDeleteOpen,
}: InvoiceTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => {
            console.log("Download Invoice");
          }}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Copy Link");
          }}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setSelectedInvoice(invoice);
            setIsViewOpen(true);
          }}
        >
          <Eye className="mr-2 h-4 w-4" /> Preview
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Void Invoice");
          }}
        >
          <Ban className="mr-2 h-4 w-4" /> Void
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Refund Invoice");
          }}
        >
          <BanknoteArrowDown className="mr-2 h-4 w-4" /> Refund
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Resend Invoice");
          }}
        >
          <SendToBack className="mr-2 h-4 w-4" /> Resend
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setEditInvoice(invoice);
            setIsEditOpen(true);
          }}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setInvoiceToDelete(invoice.id);
            setIsDeleteOpen(true);
          }}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
