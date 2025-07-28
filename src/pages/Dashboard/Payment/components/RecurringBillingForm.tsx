import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { RecurringBillingFormProps } from "../hooks/use-recurring-billing";
import useRecurringBilling from "../hooks/use-recurring-billing";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DialogModal } from "@/components/DialogModal";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import { CustomDatePicker } from "@/components/customeDatePicker/CustomDatePicker";
import { useTranslation } from "react-i18next";


export default function RecurringBillingForm({ onClose }: RecurringBillingFormProps) {
    const { t } = useTranslation("payment_schedule_modal");
    const { form, onSubmit, customers } = useRecurringBilling();
    const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const intervalOptions = [
        { value: "Monthly", label: "Monthly" },
        { value: "Weekly", label: "Weekly" },
        { value: "Daily", label: "Daily" },
    ];

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
                                    <FormLabel className="text-base font-normal">{t("customer")}</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={customers.map((customer) => ({
                                                value: customer.id,
                                                label: customer.name,
                                            }))}
                                            placeholder={t("select_a_customer")}
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
                            <span onClick={() => setIsAddCustomerOpen(true)}>
                                {t("add_customer")}
                            </span>
                        </Button>


                        {/* start and end date */}
                        <div className="flex items-center gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <CustomDatePicker
                                                label={t("start_date")}
                                                onDateChange={(date) =>
                                                    field.onChange(date)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <CustomDatePicker
                                                label={t("end_date")}
                                                onDateChange={(date) =>
                                                    field.onChange(date)
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-normal">{t("payment_amount")}</FormLabel>
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
                                    <FormLabel className="text-base font-normal">{t("interval")}</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={intervalOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            triggerClassName="w-full py-3"
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
                                    <FormLabel className="text-base font-normal">{t("payment_method")}</FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            options={paymentMethodOptions.map((option) => ({
                                                value: option.value,
                                                label: option.label,
                                            }))}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setPaymentMethod(value);
                                            }}
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
                                            <FormLabel className="text-base font-normal">{t("card_number")}</FormLabel>
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
                                                <FormLabel className="text-base font-normal">{t("card_expiry")}</FormLabel>
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
                                                <FormLabel className="text-base font-normal">{t("card_cvc")}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder={t("card_cvc")}
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
                            {t("cancel")}
                        </Button>
                        <Button variant={"primary"} type="submit" className="px-8 py-4 shadow-2xl text-base font-normal border border-button-border">{t("save")}</Button>
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
