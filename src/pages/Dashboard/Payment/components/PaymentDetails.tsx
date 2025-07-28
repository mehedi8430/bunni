import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { paymentApi, type Payment } from "@/mockApi/paymentApi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentDetailsProps {
  paymentInvoice: string;
  onClose: () => void;
}

export default function PaymentDetails({
  paymentInvoice,
  onClose
}: PaymentDetailsProps) {
  const { t } = useTranslation("view_payment_details_modal");
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

  if (isLoading) return <div>{t("loading")}</div>;
  if (!payment) return <div>{t("payment_not_found")}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("invoice")}
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.invoice}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("customer_name")}
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.customerName}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("date")}
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.date}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("amount")}
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.amount}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("status")}
        </Label>
        <span className="text-sm font-normal text-foreground"><span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.status}</span>
      </div>
      <div className="flex items-center">
        <Label htmlFor="name" className="text-lg font-semibold text-foreground01 w-3/6">
          {t("payment_method")}
        </Label>
        <span className="text-sm font-normal text-foreground"> <span className="text-lg font-semibold text-foreground01 mr-2">:</span>{payment.paymentMethod}</span>
      </div>
      <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-5" />
      <div className="flex justify-end gap-3">
        <Button onClick={onClose} variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border cursor-pointer">{t("done")}</Button>
      </div>
    </div>
  );
}
