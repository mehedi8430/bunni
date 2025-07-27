import DownloadBeta from './pdf-template/DownloadBeta'
import { useAppSelector } from '@/redux/hooks';
import { templateSelector } from '@/redux/slices/invoiceTemplateSlice';
import {
PDFViewer
} from "@react-pdf/renderer";
import DownloadGamma from './pdf-template/DownloadGamma';

export default function ForView() {

      const invoiceData = useAppSelector(templateSelector);

     // Transform the data to match InvoiceTemplate requirements
  const transformedInvoiceData = {
    color: invoiceData?.color || "#000000",
    footerTerms: invoiceData?.footerTerms || "jkkljhgfdsaSDFK",
    invoiceNumber: invoiceData?.invoiceNumber || "ma854615",
    invoiceDate: invoiceData?.invoiceDate || "2023-10-01",
    billTo: {
      name:  "Customer Name",
      address: "Customer Address", // This should come from customer data
      phone: "Customer Phone", // This should come from customer data
    },
    paymentDetails: {
      accountType: "Business Account", // This should come from settings
      accountNumber: "****1234", // This should come from settings
      paymentMethod:  "Credit Card",
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
    total: invoiceData?.total || 500,
  };

  return (
    <div>
        <PDFViewer width={1280} height={720}>
          <DownloadGamma invoice={transformedInvoiceData} />
        </PDFViewer>
    </div>
  )
}
