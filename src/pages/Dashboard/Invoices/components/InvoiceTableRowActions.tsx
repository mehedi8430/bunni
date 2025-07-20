import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TInvoice } from "@/types";
import { MoreHorizontal } from "lucide-react";

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

      <DropdownMenuContent align="end" className="border-border border p-0">
        <DropdownMenuItem
          onClick={() => {
            console.log("Download Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b py-3 text-base"
        >
          {/* <PDFDownloadLink
            document={<InvoiceTemplate />}
            fileName="invoice.pdf"
          >
            {({ loading }) => (loading ? "Preparing document..." : "Download")}
          </PDFDownloadLink> */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Copy Link");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Copy className="h-4 w-4" />  */}
          Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setSelectedInvoice(invoice);
            setIsViewOpen(true);
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Eye className="h-4 w-4" />  */}
          Preview
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Void Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Ban className="h-4 w-4" />  */}
          Void
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Refund Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <BanknoteArrowDown className="h-4 w-4" />  */}
          Refund
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Resend Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <SendToBack className="h-4 w-4" />  */}
          Resend
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setEditInvoice(invoice);
            setIsEditOpen(true);
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Edit className="h-4 w-4" />  */}
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setInvoiceToDelete(invoice.id);
            setIsDeleteOpen(true);
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Trash className="h-4 w-4" />  */}
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
