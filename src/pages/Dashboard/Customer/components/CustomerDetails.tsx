import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { customerApi, type Customer } from "@/mockApi/customerApi";
import { Button } from "@/components/ui/button";

export default function CustomerDetails({
  customerId,
  onClose
}: {
  customerId: string;
  onClose: () => void;
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
    <section>
      <div className="space-y-6 px-5">
        <div className="">
          <Label htmlFor="name" className="text-sm font-normal text-foreground/40 mb-3">
            Name
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.name}</span>
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-normal text-foreground/40 mb-3">
            Email
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.email}</span>
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-normal text-foreground/40 mb-3">
            Phone
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.phone}</span>
        </div>
        <div>
          <Label htmlFor="company" className="text-sm font-normal text-foreground/40 mb-3">
            Company
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.company}</span>
        </div>
        <div>
          <Label htmlFor="truncated_tokens" className="text-sm font-normal text-foreground/40 mb-3">
            Truncated ACH Tokens
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.truncated_tokens}</span>
        </div>
        <div>
          <Label htmlFor="achToken" className="text-sm font-normal text-foreground/40 mb-3">
            ACH Token
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.achToken}</span>
        </div>
        <div>
          <Label htmlFor="address" className="text-sm font-normal text-foreground/40 mb-3">
            Billing Address
          </Label>
          <span className="text-lg font-normal text-foreground">{customer.address}</span>
        </div>
      </div>
      <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
      <div className="flex justify-end gap-3 p-5">
        <Button onClick={onClose} variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border cursor-pointer">Done</Button>
      </div>
    </section>
  );
}
