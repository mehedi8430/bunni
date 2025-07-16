import { templates } from "@/mockApi/invoiceApi";
import TemplateCard from "./components/TemplateCard";
import { Link } from "react-router";

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
