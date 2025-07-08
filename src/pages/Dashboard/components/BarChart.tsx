import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function BarChart() {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">Title</h4>
      <h2 className="text-[32px] font-bold text-black">$8,527,224</h2>
      <div className="flex items-center gap-4">
        <Button disabled className="bg-[#D6FBE6] text-primary-2">
          <ArrowUpRight /> +3.12%
        </Button>
        <p className="text-[16px] font-normal">VS This Month</p>
      </div>
    </div>
  );
}
