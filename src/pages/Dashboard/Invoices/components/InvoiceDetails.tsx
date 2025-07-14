import { useEffect, useState } from "react";
import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TInvoice } from "@/types";

interface InvoiceDetailsProps {
  invoiceId: string;
}

export default function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  const [invoice, setInvoice] = useState<TInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      setIsLoading(true);
      try {
        const data = await invoiceApi.getInvoiceById(invoiceId);
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setInvoice(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  if (isLoading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Invoice Details</h2>
      <p>
        <strong>Invoice ID:</strong> {invoice.id}
      </p>
      <p>
        <strong>Customer Name:</strong> {invoice.customerName}
      </p>
      <p>
        <strong>Date:</strong> {invoice.date}
      </p>
      <p>
        <strong>Amount:</strong> ${invoice.amount}
      </p>
      <p>
        <strong>Status:</strong> {invoice.status}
      </p>
      <p>
        <strong>Tender Type:</strong> {invoice.tenderType}
      </p>
      <p>
        <strong>Order Number:</strong> {invoice.orderNumber}
      </p>
    </div>
  );
}
