import { useAppDispatch } from "@/redux/hooks";
import { setColor } from "@/redux/slices/invoiceTemplateSlice";
import { Link, Outlet, useLocation, useSearchParams } from "react-router";
import TemplateForm from "./Components/TemplateForm";
import { templates } from "./templates";
import TemplateCard from "../InvoiceTemplatesPage/components/TemplateCard";

export default function CreateInvoiceTemplatePage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <section className="flex flex-col items-start gap-6 md:flex-row">
      <div className="bg-sidebar rounded-lg py-5">
        <h2 className="px-6 text-xl font-semibold">
          {location.state ? "Edit" : "New"}{" "}
          {type === "estimate" ? "Estimate" : "Invoice"}
        </h2>
        <div className="border-border mt-5 border-t" />
        {/* Form Section */}
        <TemplateForm />
      </div>

      <div className="flex-1 space-y-0 md:space-y-6">
        {/* Preview Section */}
        <Outlet />

        {/* Colors Section */}
        <div className="flex flex-wrap justify-between gap-2">
          {colors.map((color) => (
            <div key={color.hex} className="flex flex-col items-center gap-2">
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => dispatch(setColor(e.target.value))}
                  className="h-full w-full cursor-pointer appearance-none border-none bg-transparent p-0"
                  style={{ transform: "scale(1.5)" }}
                  title={`Pick a color (current: ${color.colorName})`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Templates Section */}
        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold">Available Templates</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {templates.map((template) => (
              <Link
                key={template.id}
                to={type ? `${template.link}?type=${type}` : template.link}
              >
                <TemplateCard template={template} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const colors = [
  {
    colorName: "Reddish Brown",
    hex: "#8B2B2B",
  },
  {
    colorName: "Dark Blue",
    hex: "#1A3A69",
  },
  {
    colorName: "Teal",
    hex: "#3E8B83",
  },
  {
    colorName: "Orange",
    hex: "#EA721F",
  },
  {
    colorName: "Purple",
    hex: "#9E419E",
  },
  {
    colorName: "Brown/Gold",
    hex: "#A2782F",
  },
];
