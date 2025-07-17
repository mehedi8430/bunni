import PreviewTemplate from "./Components/PreviewTemplate";
import TemplateForm from "./Components/TemplateForm";

export default function CreateInvoiceTemplatePage() {
  return (
    <section className="flex items-start gap-6">
      <div className="bg-sidebar rounded-lg py-5">
        <h2 className="px-6 text-2xl font-semibold">Create New Invoice</h2>
        <div className="border-border mt-5 border-t" />
        {/* Form Section */}
        <TemplateForm />
      </div>

      {/* Preview Section */}
      <PreviewTemplate />
    </section>
  );
}
