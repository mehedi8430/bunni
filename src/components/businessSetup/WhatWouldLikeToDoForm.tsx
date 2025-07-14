import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useWhatWouldLikeToDo from "@/hooks/use-what-like-to-do";
import { icons } from "@/lib/imageProvider";
import { cn } from "@/lib/utils";
import { ReactSVG } from "react-svg";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function WhatWouldLikeToDoForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { form, onSubmit } = useWhatWouldLikeToDo();

  const options = [
    {
      value: "send_good_looking_invoices",
      title: "Send good - looking  invoices",
      icon: icons.doc,
    },
    {
      value: "run_easy_payroll",
      title: "Run easy payroll",
      icon: icons.payroll,
    },
    {
      value: "organize_your_books",
      title: "Organize your books",
      icon: icons.doc,
    },
    {
      value: "not_sure_yet",
      title: "Not sure yet",
      icon: icons.notSure,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-description text-sm text-balance">Step 3 of 3</p>
          <h1 className="text-2xl font-bold">
            What would you like to do in Bunny ?
          </h1>
          <p className="text-description text-sm text-balance">
            select all the apply
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="likeToDo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      {options.map((option) => (
                        <FormItem key={option.value}>
                          <FormControl>
                            <RadioGroupItem
                              value={option.value}
                              className="invisible absolute h-0 w-0"
                            />
                          </FormControl>
                          <FormLabel
                            className={cn(
                              "shadow-card flex cursor-pointer flex-col items-center justify-between gap-2 rounded-md border border-white bg-white p-4 text-center",
                              {
                                "border border-[#A0D6D2] bg-[#E2F8F0]":
                                  option.value === field.value,
                              },
                            )}
                          >
                            <ReactSVG src={option.icon} />
                            <h2 className="text-2xl font-medium">
                              {option.title}
                            </h2>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="disabled:bg-disabled w-full cursor-pointer md:col-span-full"
            size={"lg"}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Continue to bunny
          </Button>
        </div>
      </form>
      <style>{`
      .shadow-card {
          box-shadow: 10px -12px 89px 0px rgba(0, 0, 0, 0.05);
}
      `}</style>
    </Form>
  );
}
