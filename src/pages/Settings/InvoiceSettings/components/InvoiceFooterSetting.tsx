import { DialogModal } from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import {
  invoiceFootersSelector,
  removeInvoiceFooter,
} from "@/redux/slices/invoiceFooterSlice";
import type { TInvoiceFooter } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import InvoiceFooterForm from "./InvoiceFooterForm";

export default function InvoiceFooterSetting() {
  const { t } = useTranslation("invoice_settings");
  const [isEditInvoiceFooterOpen, setIsEditInvoiceFooterOpen] = useState(false);
  const [editInvoiceFooter, setEditInvoiceFooter] = useState<
    Partial<TInvoiceFooter>
  >({});
  const invoiceFooters = useSelector(invoiceFootersSelector);
  const dispatch = useDispatch();

  return (
    <section className="rounded-lg bg-white px-4 py-5 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-1 text-xl font-semibold">
          {t("Invoice_Footer_Setting")}
        </h2>
        <Button
          onClick={() => {
            setEditInvoiceFooter({});
            setIsEditInvoiceFooterOpen(true);
          }}
          variant="primary"
          className="text-sm font-normal md:text-base"
        >
          <Plus />
          {t("Configure_Footer")}
        </Button>
      </div>

      <div className="space-y-4">
        {invoiceFooters.map((footer) => (
          <div key={footer.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-base">{footer.footerContent}</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={() => {
                    setEditInvoiceFooter(footer);
                    setIsEditInvoiceFooterOpen(true);
                  }}
                  className="mt-2 text-sm font-normal md:text-base"
                >
                  {t("table:Edit")}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    dispatch(removeInvoiceFooter(footer.id));
                  }}
                  className="mt-2 text-sm font-normal md:text-base"
                >
                  {t("table:Delete")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for editing footer */}
      <DialogModal
        isOpen={isEditInvoiceFooterOpen}
        onOpenChange={setIsEditInvoiceFooterOpen}
        title={
          editInvoiceFooter.id
            ? t("create_invoice_modal:editInvoice")
            : t("create_invoice_modal:createInvoice")
        }
      >
        <InvoiceFooterForm
          footer={editInvoiceFooter}
          onClose={() => setIsEditInvoiceFooterOpen(false)}
        />
      </DialogModal>
    </section>
  );
}
