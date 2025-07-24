import assets from "@/lib/imageProvider";
import type { TInvoiceTemplate } from "@/types";

export const templates: TInvoiceTemplate[] = [
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
