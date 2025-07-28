import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import type { TProduct } from "@/types";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

type TaxRateTableActionsProps = {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setIsEditOpen: (open: boolean) => void;
  setEditProduct: (product: Partial<TProduct>) => void;
};

export default function TaxRateTableActions({
  searchTerm,
  handleFilterChange,
  setIsEditOpen,
  setEditProduct,
}: TaxRateTableActionsProps) {
  const { t } = useTranslation("invoice_settings");

  return (
    <div className="flex flex-col items-center justify-between p-4 max-md:gap-4 md:flex-row">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder={t("Search_Placeholder")}
          debounceDelay={300}
          className="w-[82vw] md:w-[443px]"
        />

        {/* <Button variant={"outline"} className="text-muted-foreground bg-white">
          <Funnel />
          Filter by
        </Button> */}
      </div>

      <Button
        variant="primary"
        className="text-sm font-normal md:text-base"
        onClick={() => {
          setIsEditOpen(true);
          setEditProduct({});
        }}
      >
        <Plus />
        {t("Add_Tax")}
      </Button>
    </div>
  );
}
