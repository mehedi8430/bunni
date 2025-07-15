import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

      <DropdownMenuContent align="end" className="p-0 border border-border">

        <DropdownMenuItem
          onClick={() => {
            console.log("Download Invoice");
          }}
          className="cursor-pointer text-base border-b border-border rounded-none py-3 flex justify-center items-center"
        >
          <Download className="h-4 w-4" />
          Download
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Copy Link");
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <Copy className="h-4 w-4" /> Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setSelectedInvoice(invoice);
            setIsViewOpen(true);
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <Eye className="h-4 w-4" /> Preview
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Void Invoice");
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <Ban className="h-4 w-4" /> Void
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Refund Invoice");
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <BanknoteArrowDown className="h-4 w-4" /> Refund
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Resend Invoice");
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <SendToBack className="h-4 w-4" /> Resend
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setEditInvoice(invoice);
            setIsEditOpen(true);
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <Edit className="h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setInvoiceToDelete(invoice.id);
            setIsDeleteOpen(true);
          }}
          className="border-b border-border rounded-none bg-gradient-to-b from-[#f3f8f7] to-transparent hover:bg-transparent cursor-pointer text-base py-3 flex justify-center items-center"
        >
          <Trash className="h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
