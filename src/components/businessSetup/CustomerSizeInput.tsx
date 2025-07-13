import type { formSchema } from "@/hooks/use-detail-company-name";
import { cn } from "@/lib/utils";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import type { ControllerRenderProps } from "react-hook-form";
import type z from "zod";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";

type Props = {
  field: ControllerRenderProps<z.infer<typeof formSchema>, "customerSize">;
  options: string[];
};
export default function CustomerSizeInput({ field, options }: Props) {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className="border-border flex items-center gap-0 rounded-sm border"
    >
      {options.map((option: string) => (
        <FormItem className={cn("flex-1 border-r last:border-r-0")}>
          <FormControl>
            <RadioGroupItem
              value={option}
              className="invisible absolute h-0 w-0"
            />
          </FormControl>
          <FormLabel
            className={cn(
              "flex h-full w-full cursor-pointer items-center justify-center p-3 font-normal",
              {
                "bg-[#CFFFF8]": field.value === option,
              },
            )}
          >
            {option}
          </FormLabel>
        </FormItem>
      ))}

      <FormItem className="flex flex-1 items-center justify-center border-r last:border-r-0">
        <FormControl>
          <RadioGroupItem
            value={field.value}
            className="invisible absolute h-0 w-0"
          />
        </FormControl>
        <FormLabel className={cn("cursor-pointer font-normal")}>
          <Input
            type="text"
            placeholder="_"
            onChange={(e) => field.onChange(e.target.value)}
            className="placeholder:text-muted-foreground my-0 h-full w-full rounded-none border-none p-0 px-3 shadow-none ring-0 ring-offset-0 outline-none placeholder:text-center focus:border-none focus:shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 active:border-none active:shadow-none active:ring-0 active:ring-offset-0 active:outline-none"
          />
        </FormLabel>
      </FormItem>
    </RadioGroup>
  );
}
