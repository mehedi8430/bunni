import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setColor } from "@/redux/slices/invoiceTemplateSlice";
import { Outlet, useSearchParams } from "react-router";
import TemplateForm from "./Components/TemplateForm";

export default function CreateInvoiceTemplatePage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <section className="flex flex-col items-start gap-6 md:flex-row">
      <div className="bg-sidebar rounded-lg py-5">
        <h2 className="px-6 text-2xl font-semibold">
          Create New {type === "estimate" ? "Estimate" : "Invoice"}
        </h2>
        <div className="border-border mt-5 border-t" />
        {/* Form Section */}
        <TemplateForm />
      </div>

      <div className="flex-1 space-y-0 md:space-y-6">
        {/* Preview Section */}
        <Outlet />
        <div className="flex flex-wrap justify-between gap-2">
          {colors.map((color) => (
            <Button
              key={color.hex}
              variant="ghost"
              className="h-14 w-14 cursor-pointer rounded-full"
              style={{ backgroundColor: color.hex }}
              onClick={() => dispatch(setColor(color.hex))}
            />
          ))}
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
