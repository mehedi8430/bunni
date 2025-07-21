import { customerApi, type Customer } from "@/mockApi/customerApi";
import { useEffect, useState } from "react";

export function useCustomerApi(id: string | null = null) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch customers when page, limit, or filters change
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const customer = await customerApi.getCustomerById(id);
          console.log(customer);
          setCustomer(customer);
        } catch (error) {
          console.error("Error fetching customer:", error);
          setCustomer(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }
      try {
        const customers = await customerApi.getCustomers();

        setCustomers(customers?.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [id]);
  return { customers, customer, isLoading };
}
