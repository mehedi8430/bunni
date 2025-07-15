import { customerApi, type Customer } from "@/mockApi/customerApi";
import { useEffect, useState } from "react";

export function useCustomerApi() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // Fetch customers when page, limit, or filters change
    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
            try {
                const customers = await customerApi.getCustomers();
                console.log({ customers });

                setCustomers(customers?.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
                setCustomers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, []);
    return { customers, isLoading };

}