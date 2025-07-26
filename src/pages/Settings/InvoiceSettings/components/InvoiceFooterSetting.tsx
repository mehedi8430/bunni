import { DialogModal } from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invoiceFootersSelector, removeInvoiceFooter, } from "@/redux/slices/invoiceFooterSlice";
import InvoiceFooterForm from "./InvoiceFooterForm";
import type { TInvoiceFooter } from "@/types";


export default function InvoiceFooterSetting() {
  const [isEditInvoiceFooterOpen, setIsEditInvoiceFooterOpen] = useState(false);
  const [editInvoiceFooter, setEditInvoiceFooter] = useState<Partial<TInvoiceFooter>>({});
  const invoiceFooters = useSelector(invoiceFootersSelector);
  const dispatch = useDispatch();



  return (
    <section className="bg-white px-4 py-5 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-1 text-xl font-semibold">Invoice Footer Setting</h2>
        <Button
          onClick={() => {
            setEditInvoiceFooter({}); // Clear form for new footer
            setIsEditInvoiceFooterOpen(true);
          }}
          variant="primary"
          className="text-sm font-normal md:text-base"
        >
          <Plus />
          Configure Footer
        </Button>
      </div>

      <div className="space-y-4">
        {invoiceFooters.map((footer) => (
          <div key={footer.id} className="p-4 border rounded-lg">
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
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    dispatch(removeInvoiceFooter(footer.id));
                  }}
                  className="mt-2 text-sm font-normal md:text-base"
                >
                  delete
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
            ? "Edit Invoice"
            : "Create Invoice"
        }
      >
        <InvoiceFooterForm
          footer={editInvoiceFooter}
          onClose={() => setIsEditInvoiceFooterOpen(false)}
        />
      </DialogModal>
    </section>
  )
}
