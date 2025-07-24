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
    const { form, onSubmit, customers, } = useVirtualTerminal();
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const paymentMethodOptions = [
        { value: "Credit Card", label: "Credit Card" },
        { value: "ACH", label: "ACH" },
        { value: "Cash", label: "Cash" },
    ];


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="space-y-3 px-4">
                        {/* Customer select */}
                        <FormField
                            control={form.control}
                            name="customer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Customer</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={customers.map((customer) => ({
                                                value: customer.id,
                                                label: customer.name,
                                            }))}
                                            placeholder="Select a customer"
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-3"
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
                            className="text-primary px-2 py-1 w-full flex justify-end mb-0"
                        >
                            <span onClick={() => setIsAddCustomerOpen(true)}>+ Add Customer</span>
                        </Button>

                        {/* Payment Amount */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Payment Amount</FormLabel>
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

                        {/* Payment Method */}
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">Payment Method</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={paymentMethodOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            onValueChange={
                                                (value) => {
                                                    field.onChange(value);
                                                    setPaymentMethod(value);
                                                }
                                            }
                                            triggerClassName="w-full py-3"
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {paymentMethod === "Credit Card" && (
                            <div>
                                {/* card number */}
                                <FormField
                                    control={form.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-normal">Card Number</FormLabel>
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
                                <div className="flex items-center gap-4 mt-3">
                                    {/* expiry date */}
                                    <FormField
                                        control={form.control}
                                        name="cardExpiry"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-base font-normal">Card Expiry</FormLabel>
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
                                                <FormLabel className="text-base font-normal">Card CVC</FormLabel>
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
                            </div>
                        )}
                    </div>

                    <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
                    {/* Buttons */}
                    <div className="flex items-center justify-center md:justify-end gap-3 p-5">
                        <Button type="button" variant="outline" onClick={onClose} className="px-8 py-4 text-base font-normal">
                            Cancel
                        </Button>
                        <Button variant={"primary"} type="submit" className="px-4 md:px-8 py-4 shadow-2xl text-base font-normal border border-button-border">Process Payment</Button>
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
