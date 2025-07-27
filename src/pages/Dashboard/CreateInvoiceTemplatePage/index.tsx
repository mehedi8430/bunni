import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setColor,
  templateSelector,
} from "@/redux/slices/invoiceTemplateSlice";
import { Link, Outlet, useLocation, useSearchParams } from "react-router";
import TemplateForm from "./Components/TemplateForm";
import { templates } from "./templates";
import TemplateCard from "../InvoiceTemplatesPage/components/TemplateCard";
import { cn } from "@/lib/utils";

export default function CreateInvoiceTemplatePage() {
  const dispatch = useAppDispatch();
  const { color } = useAppSelector(templateSelector);

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
          <div className="flex w-full flex-col items-center gap-2">
            <div className="relative h-10 w-full overflow-hidden">
              <input
                title="Select your favorite color"
                type="color"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="h-full w-full cursor-pointer appearance-none border-none bg-transparent p-0"
                style={{ transform: "scale(1.5)" }}
              />
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold">Available Templates</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {templates.map((template) => {
              const isActive = template.link === location.pathname;
              console.log({ isActive });

              return (
                <Link
                  key={template.id}
                  to={type ? `${template.link}?type=${type}` : template.link}
                  className={cn({
                    "border-border rounded-xl border": isActive,
                  })}
                >
                  <TemplateCard template={template} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
