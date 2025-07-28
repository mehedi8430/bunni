import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import type { TDiscount } from "@/types";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
// import { Funnel, Plus } from "lucide-react";

type DiscountTableActionsProps = {
  searchTerm: string;
  handleFilterChange: (search: string) => void;
  setIsEditOpen: (open: boolean) => void;
  setEditDiscount: (product: Partial<TDiscount>) => void;
};

export default function DiscountTableActions({
  searchTerm,
  handleFilterChange,
  setIsEditOpen,
  setEditDiscount,
}: DiscountTableActionsProps) {
  const { t } = useTranslation("invoice_settings");

  return (
    <div className="flex flex-col items-center justify-between p-4 max-md:gap-4 md:flex-row">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <SearchInput
          value={searchTerm}
          onChange={handleFilterChange}
          placeholder="Search by name, email, or company"
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
          setEditDiscount({});
        }}
      >
        <Plus />
        {t("Add_Discount")}
      </Button>
    </div>
  );
}
