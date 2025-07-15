import { useState } from "react";
import type { VirtualTerminalFormProps } from "../hooks/use-virtual-terminal";
import useVirtualTerminal from "../hooks/use-virtual-terminal";
import { DialogModal } from "@/components/DialogModal";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectInput from "@/components/SelectInput";


export default function VirtualTerminalForm({ onClose }: VirtualTerminalFormProps) {
    const { form, onSubmit, customers } = useVirtualTerminal();
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

    const discountOrTaxOptions = [
        { value: "discount_10", label: "10% Off" },
        { value: "discount_5", label: "$5 Off" },
        { value: "tax_vat_15", label: "VAT 15%" },
        { value: "tax_gst_5", label: "GST 5%" },
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
                        {/* card number */}
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Card Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                            className="custom-focus"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4">
                            {/* expiry date */}
                            <FormField
                                control={form.control}
                                name="cardExpiry"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="text-lg font-normal">Card Expiry</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="MM/YY or MM/YYYY"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value)
                                                }
                                                className="custom-focus"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* card CVC */}
                            <FormField
                                control={form.control}
                                name="cardCVC"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel className="text-lg font-normal">Card CVC</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="CVC"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value)
                                                }
                                                className="custom-focus"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Card Holder Name */}
                        <FormField
                            control={form.control}
                            name="cardHolderName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Cardholder Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Cardholder Name"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                            className="custom-focus"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Discount or Tax */}
                        <FormField
                            control={form.control}
                            name="discountOrTax"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-normal">Discount or Tax</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={discountOrTaxOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            placeholder="Select discount or tax"
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-5"
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
                        <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Process Payment</Button>
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
