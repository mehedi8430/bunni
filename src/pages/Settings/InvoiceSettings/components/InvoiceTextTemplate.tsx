import { DialogModal } from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InvoiceFooterForm from "./InvoiceFooterForm";


type TInvoiceText = {
    id: string;
    footerContent: string;
};

export default function InvoiceTextTemplate() {
    const { t } = useTranslation("invoice_settings");
    const [isEditInvoiceTextOpen, setIsEditInvoiceTextOpen] = useState(false);
    const [editInvoiceText, setEditInvoiceText] = useState<
        Partial<TInvoiceText>
    >({});
    return (
        <section className="rounded-lg bg-white px-4 py-5 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="mb-1 text-xl font-semibold">
                    Invoice Text Template
                </h2>
                <Button
                    variant="primary"
                    className="text-sm font-normal md:text-base"
                    onClick={() => {
                        setEditInvoiceText({});
                        setIsEditInvoiceTextOpen(true);
                    }}
                >
                    <Plus />
                    Configure Text Template
                </Button>
            </div>

            <div className="space-y-4">
                {mockTextTemplate.map((footer) => (
                    <div key={footer.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between gap-4 md:gap-10">
                            <p className="text-base">{footer.footerContent}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="default"
                                    className="mt-2 text-sm font-normal md:text-base"
                                    onClick={() => {
                                        setEditInvoiceText(footer);
                                        setIsEditInvoiceTextOpen(true);
                                    }}
                                >
                                    {t("table:Edit")}
                                </Button>
                                <Button
                                    variant="destructive"
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
                isOpen={isEditInvoiceTextOpen}
                onOpenChange={setIsEditInvoiceTextOpen}
                title={
                    editInvoiceText.id
                        ? t("create_invoice_modal:editInvoice")
                        : t("create_invoice_modal:createInvoice")
                }
            >
                <InvoiceFooterForm
                    footer={editInvoiceText}
                    onClose={() => setIsEditInvoiceTextOpen(false)}
                />
            </DialogModal>
        </section>
    )
}


const mockTextTemplate = [
    {
        id: "FOOTER-0001",
        footerContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: "FOOTER-0002",
        footerContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: "FOOTER-0003",
        footerContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
];