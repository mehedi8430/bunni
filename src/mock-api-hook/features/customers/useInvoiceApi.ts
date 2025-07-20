import { invoiceApi } from "@/mockApi/invoiceApi";
import type { TInvoice } from "@/types";
import { useEffect, useState } from "react";

export function useInvoiceApi(invoiceId?: string) {
  const [invoices, setInvoices] = useState<TInvoice[]>([]);
  const [invoice, setInvoice] = useState<TInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch invoices when page, limit, or filters change
  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);

      if (invoiceId) {
        try {
          const invoice = await invoiceApi.getInvoiceById(invoiceId);
          console.log(invoice);
          setInvoice(invoice);
        } catch (error) {
          console.error("Error fetching invoice:", error);
          setInvoice(null);
        } finally {
          setIsLoading(false);
        }
        return;
      } else {
        try {
          const invoices = await invoiceApi.getInvoices();
          console.log({ invoices });

          setInvoices(invoices?.data);
        } catch (error) {
          console.error("Error fetching invoices:", error);
          setInvoices([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInvoices();
  }, [invoiceId]);

  return { invoices, isLoading, invoice };
}
