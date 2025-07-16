import { Card, CardContent } from "@/components/ui/card";
import type { TInvoiceTemplate } from "@/types";

export default function TemplateCard({
  template,
}: {
  template: TInvoiceTemplate;
}) {
  return (
    <Card className="bg-sidebar transition-shadow hover:shadow-lg">
      <CardContent className="p-[16px]">
        <div className="space-y-4">
          {/* Template Preview */}
          <div
            className={`h-32 rounded-lg border-2 p-4 ${
              template.color === "blue"
                ? "border-blue-200 bg-blue-50"
                : template.color === "orange"
                  ? "border-orange-200 bg-orange-50"
                  : template.color === "green"
                    ? "border-green-200 bg-green-50"
                    : "border-purple-200 bg-purple-50"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-semibold text-gray-600">INVOICE</div>
              <div
                className={`h-8 w-8 rounded ${
                  template.color === "blue"
                    ? "bg-blue-600"
                    : template.color === "orange"
                      ? "bg-orange-500"
                      : template.color === "green"
                        ? "bg-green-500"
                        : "bg-purple-500"
                }`}
              ></div>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-3/4 rounded bg-gray-200"></div>
              <div className="h-2 w-1/2 rounded bg-gray-200"></div>
              <div className="h-2 w-2/3 rounded bg-gray-200"></div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="space-y-1">
                <div className="h-1 w-8 rounded bg-gray-200"></div>
                <div className="h-1 w-12 rounded bg-gray-200"></div>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-8 rounded bg-gray-200"></div>
                <div className="h-1 w-10 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Template Info */}
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500">{template.preview}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
