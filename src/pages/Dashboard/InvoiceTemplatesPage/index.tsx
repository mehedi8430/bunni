import TemplateCard from "./components/TemplateCard";
import { Link } from "react-router";
import type { TInvoiceTemplate } from "@/types";
import assets from "@/lib/imageProvider";

const templates: TInvoiceTemplate[] = [
  {
    id: "1",
    name: "Invoice Template",
    type: "default",
    color: "blue",
    preview: "Default",
    image: assets.images.invoice_template,
  },
  {
    id: "2",
    name: "Budget Report",
    type: "professional",
    color: "orange",
    preview: "Default",
    image: assets.images.budget_report_template,
  },
  {
    id: "3",
    name: "Invoice Template",
    type: "modern",
    color: "blue",
    preview: "Professional",
    image: assets.images.invoice_template,
  },
  {
    id: "4",
    name: "Budget Report",
    type: "professional",
    color: "orange",
    preview: "New Invoice",
    image: assets.images.budget_report_template,
  },
];

export default function InvoiceTemplatesPage() {
  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">Invoices</h1>

      <div className="space-y-6">
        <h3 className="text-[20px] font-semibold">Use Template</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <Link
              key={template.id}
              to={`/dashboard/invoices/template/${template.id}`}
            >
              <TemplateCard template={template} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
