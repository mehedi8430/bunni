import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import { useEffect, useState } from "react";

interface PaymentDetailsProps {
  paymentInvoice: string;
  onClose: () => void;
}

export default function PaymentDetails({
  paymentInvoice,
  onClose
}: PaymentDetailsProps) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      setIsLoading(true);
      try {
        const data = await paymentApi.getPaymentByInvoice(paymentInvoice);
        setPayment(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setPayment(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [paymentInvoice]);

  if (isLoading) return <div>Loading...</div>;
  if (!payment) return <div>Payment not found</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Invoice
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.invoice}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Customer Name
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.customerName}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Date
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.date}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Amount
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.amount}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Status
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.status}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          Payment Method
        </Label>
        <span className="text-sm font-normal text-foreground"> <span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.paymentMethod}</span>
      </div>
      <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-5" />
      <div className="flex justify-end gap-3">
        <Button onClick={onClose} variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border cursor-pointer">Done</Button>
      </div>
    </div>
  );
}
