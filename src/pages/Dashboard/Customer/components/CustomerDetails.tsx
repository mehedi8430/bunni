import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { customerApi, type Customer } from "@/mockApi/customerApi";

export default function CustomerDetails({
  customerId,
}: {
  customerId: string;
}) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      try {
        const fetchedCustomer = await customerApi.getCustomerById(customerId);
        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setCustomer(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    } else {
      setCustomer(null);
      setIsLoading(false);
    }
  }, [customerId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <span className="col-span-3">{customer.name}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <span className="col-span-3">{customer.email}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <span className="col-span-3">{customer.phone}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company" className="text-right">
          Company
        </Label>
        <span className="col-span-3">{customer.company}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="truncated_tokens" className="text-right">
          Truncated ACH Tokens
        </Label>
        <span className="col-span-3">{customer.truncated_tokens}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="achToken" className="text-right">
          ACH Token
        </Label>
        <span className="col-span-3">{customer.achToken}</span>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
          Billing Address
        </Label>
        <span className="col-span-3">{customer.address}</span>
      </div>
    </div>
  );
}
