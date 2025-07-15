import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import { useEffect, useState } from "react";


export function usePaymentApi(){
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch payments when component mounts
    useEffect(() => {
        const fetchPayments = async () => {
            setIsLoading(true);
            try {
                const response = await paymentApi.getPayments();
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
                setPayments([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return { payments, isLoading };
}