import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import type { TProduct } from "@/types";
import { Funnel, Plus } from "lucide-react";

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

        <Button variant={"outline"} className="text-muted-foreground bg-white">
          <Funnel />
          Filter by
        </Button>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="text-sm font-normal md:text-lg"
        onClick={() => {
          setIsEditOpen(true);
          setEditProduct({});
        }}
      >
        <Plus />
        Add Tax Rate
      </Button>
    </div>
  );
}
