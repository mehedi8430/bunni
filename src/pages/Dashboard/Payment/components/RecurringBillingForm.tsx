import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { RecurringBillingFormProps } from "../hooks/use-recurring-billing";
import useRecurringBilling from "../hooks/use-recurring-billing";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DialogModal } from "@/components/DialogModal";
import { CustomerForm } from "../../Customer/components/CustomerForm";


export default function RecurringBillingForm({ onClose }: RecurringBillingFormProps) {
    const { form, onSubmit, customers } = useRecurringBilling();
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

    const intervalOptions = [
        { value: "Monthly", label: "Monthly" },
        { value: "Quarterly", label: "Quarterly" },
        { value: "Annually", label: "Annually" },
        { value: "Weekly", label: "Weekly" },
        { value: "Daily", label: "Daily" },
    ];

    const paymentMethodOptions = [
        { value: "Card", label: "Card" },
        { value: "Bank Transfer", label: "Bank Transfer" },
        { value: "PayPal", label: "PayPal" },
        { value: "Other", label: "Other" },
    ];

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="space-y-5 px-4">
                        {/* Customer select */}
                        <FormField
                            control={form.control}
                            name="customer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Customer</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={customers.map((customer) => ({
                                                value: customer.id,
                                                label: customer.name,
                                            }))}
                                            placeholder="Select a customer"
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Add Customer button */}
                        <Button
                            type="button"
                            variant="link"
                            size="sm"
                            onClick={() => setIsAddCustomerOpen(true)}
                            className="text-primary px-2 py-1 w-full flex justify-end mb-0"
                        >
                            + Add Customer
                        </Button>

                        {/* Payment Amount */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Payment Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="$0.00"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(parseFloat(e.target.value))
                                            }
                                            className="custom-focus"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Billing Interval */}
                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Interval</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={intervalOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Payment Method */}
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Payment Method</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={paymentMethodOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-5"
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
                    {/* Buttons */}
                    <div className="flex justify-end gap-3 p-5">
                        <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-lg font-normal">
                            Cancel
                        </Button>
                        <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Save</Button>
                    </div>
                </form>
            </Form>

            <DialogModal
                isOpen={isAddCustomerOpen}
                onOpenChange={setIsAddCustomerOpen}
                title="Add New Customer"
            >
                <CustomerForm
                    onSave={() => console.log("Customer saved!")}
                    onClose={() => setIsAddCustomerOpen(false)}
                />
            </DialogModal>
        </>
    )
}
