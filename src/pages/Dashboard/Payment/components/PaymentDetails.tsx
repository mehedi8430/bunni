import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import { useEffect, useState } from "react";

interface PaymentDetailsProps {
  paymentInvoice: string;
}

export default function PaymentDetails({
  paymentInvoice,
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
      <p>
        <strong>Invoice:</strong> {payment.invoice}
      </p>
      <p>
        <strong>Customer Name:</strong> {payment.customerName}
      </p>
      <p>
        <strong>Date:</strong> {payment.date}
      </p>
      <p>
        <strong>Amount:</strong> ${payment.amount}
      </p>
      <p>
        <strong>Status:</strong> {payment.status}
      </p>
      <p>
        <strong>Payment Method:</strong> {payment.paymentMethod}
      </p>
    </div>
  );
}
