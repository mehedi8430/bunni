import TemplateCard from "./components/TemplateCard";
import { Link, useSearchParams } from "react-router";
import type { TInvoiceTemplate } from "@/types";
import assets from "@/lib/imageProvider";
import { useAppDispatch } from "@/redux/hooks";
import { clearInvoice } from "@/redux/slices/invoiceTemplateSlice";

const templates: TInvoiceTemplate[] = [
  {
    id: "1",
    name: "Invoice Alpha",
    type: "default",
    color: "blue",
    preview: "Default",
    image: assets.images.invoice_alpha,
    link: "/dashboard/template/invoice-alpha",
  },
  {
    id: "2",
    name: "Invoice Beta",
    type: "professional",
    color: "orange",
    preview: "Default",
    image: assets.images.invoice_beta,
    link: "/dashboard/template/invoice-beta",
  },
  {
    id: "3",
    name: "Invoice Gamma",
    type: "modern",
    color: "blue",
    preview: "Professional",
    image: assets.images.invoice_gamma,
    link: "/dashboard/template/invoice-gamma",
  },
  {
    id: "4",
    name: "Invoice Delta",
    type: "professional",
    color: "orange",
    preview: "New Invoice",
    image: assets.images.invoice_delta,
    link: "/dashboard/template/invoice-delta",
  },
];

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
          {templates.map((template) => (
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
