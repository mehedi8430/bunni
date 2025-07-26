import TemplateCard from "./components/TemplateCard";
import { Link, useSearchParams } from "react-router";
import { useAppDispatch } from "@/redux/hooks";
import { clearInvoice } from "@/redux/slices/invoiceTemplateSlice";
import { templates } from "../CreateInvoiceTemplatePage/templates";

export default function InvoiceTemplatesPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const dispatch = useAppDispatch();

  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">Invoices</h1>

      <div className="space-y-6">
        <h3 className="text-[20px] font-semibold">Use Template</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {templates.slice(0, 1).map((template) => (
            <Link
              key={template.id}
              to={type ? `${template.link}?type=${type}` : template.link}
              onClick={() => {
                dispatch(clearInvoice());
              }}
            >
              <TemplateCard template={template} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
