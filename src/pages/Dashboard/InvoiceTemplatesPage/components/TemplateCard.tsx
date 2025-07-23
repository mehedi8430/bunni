import type { TInvoiceTemplate } from "@/types";
// import { ReactSVG } from "react-svg";

export default function TemplateCard({
  template,
}: {
  template: TInvoiceTemplate;
}) {
  return (
    <article className="bg-sidebar hover:border-border rounded-xl p-[16px] shadow-md transition-all duration-200 hover:border">
      <div className="space-y-4">
        {/* Template Preview */}
        <div className="flex h-full w-full justify-center rounded-xl">
          <img src={template.image} alt="Template Image" className="h-52" />
        </div>

        {/* Template Info */}
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">{template.name}</h3>
          {/* <p className="text-muted-foreground text-sm">{template.preview}</p> */}
        </div>
      </div>
    </article>
  );
}
