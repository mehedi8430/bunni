import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { templateSelector } from "@/redux/slices/invoiceTemplateSlice";
import type { TInvoice } from "@/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import DownloadGamma from "../../components/pdf-template/DownloadGamma";

type InvoiceTableRowActionsProps = {
  invoice: TInvoice;
  setSelectedInvoice: (invoice: TInvoice) => void;
  setIsViewOpen: (isOpen: boolean) => void;
  setInvoiceToDelete: (invoiceId: string) => void;
  setIsDeleteOpen: (isOpen: boolean) => void;
  type?: string;
};

export default function InvoiceTableRowActions({
  invoice,
  setSelectedInvoice,
  setIsViewOpen,
  setInvoiceToDelete,
  setIsDeleteOpen,
  type,
}: InvoiceTableRowActionsProps) {
  const { t } = useTranslation("table");

  const navigate = useNavigate();
  const invoiceData = useAppSelector(templateSelector);

  // Transform the data to match InvoiceTemplate requirements
  const transformedInvoiceData = {
    color: invoiceData?.color || "#000000",
    footerTerms: invoiceData?.footerTerms || "",
    invoiceNumber: invoiceData?.invoiceNumber || invoice.orderNumber,
    invoiceDate: invoiceData?.invoiceDate || invoice.date,
    billTo: {
      name: invoice.customerName || "Customer Name",
      address: "Customer Address", // This should come from customer data
      phone: "Customer Phone", // This should come from customer data
    },
    paymentDetails: {
      accountType: "Business Account", // This should come from settings
      accountNumber: "****1234", // This should come from settings
      paymentMethod: invoice.tenderType || "Credit Card",
      bankName: "Bank Name", // This should come from settings
    },
    items:
      invoiceData?.items?.map((item) => ({
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        amount: item.amount || item.price * item.quantity,
      })) || [],
    subtotal: invoiceData?.subtotal || 0,
    totalTax: invoiceData?.totalTax || 0,
    total: invoiceData?.total || Number(invoice.amount),
  };

  const templateNameMapping = {
    "1": "invoice-alpha",
    "2": "invoice-beta",
    "3": "invoice-gamma",
    "4": "invoice-delta",
  };

  type TemplateId = keyof typeof templateNameMapping;

  const getTemplateNameById =
    invoice?.templateId &&
    templateNameMapping[invoice.templateId as TemplateId];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer p-0 hover:bg-transparent"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-border border p-0">
        <DropdownMenuItem className="border-border flex cursor-pointer items-center justify-center rounded-none border-b py-3 text-base">
          <PDFDownloadLink
            document={
              // <InvoiceTemplate invoice={transformedInvoiceData} />
              // <DownloadBeta invoice={transformedInvoiceData} />
              <DownloadGamma invoice={transformedInvoiceData} />
            }
            fileName={`invoice-${transformedInvoiceData.invoiceNumber}.pdf`}
          >
            {t("Download")}
          </PDFDownloadLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Copy Link");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Copy className="h-4 w-4" />  */}
          {t("Copy Link")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setSelectedInvoice(invoice);
            setIsViewOpen(true);
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Eye className="h-4 w-4" />  */}
          {t("Preview")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Void Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Ban className="h-4 w-4" />  */}
          {t("Void")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Refund Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <BanknoteArrowDown className="h-4 w-4" />  */}
          {t("Refund")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            console.log("Resend Invoice");
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <SendToBack className="h-4 w-4" />  */}
          {t("Resend")}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            if (type) {
              navigate(
                `/dashboard/template/${getTemplateNameById}?type=${type}`,
                {
                  state: invoice.id,
                },
              );
            } else {
              navigate(`/dashboard/template/${getTemplateNameById}`, {
                state: invoice.id,
              });
            }
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Edit className="h-4 w-4" />  */}
          {t("Edit")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setInvoiceToDelete(invoice.id);
            setIsDeleteOpen(true);
          }}
          className="border-border flex cursor-pointer items-center justify-center rounded-none border-b bg-gradient-to-b from-[#f3f8f7] to-transparent py-3 text-base hover:bg-transparent"
        >
          {/* <Trash className="h-4 w-4" />  */}
          {t("Delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
