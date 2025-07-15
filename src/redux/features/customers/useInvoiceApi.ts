import { invoiceApi } from "@/mockApi";
import { useEffect, useState } from "react";


export function useInvoiceApi() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // Fetch invoices when page, limit, or filters change
    useEffect(() => {
        const fetchInvoices = async () => {
            setIsLoading(true);
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
        };

        fetchInvoices();
    }, []);
    return { invoices, isLoading };

}