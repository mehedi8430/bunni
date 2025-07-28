import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import useUser, { type UserFormProps } from "../hooks/use-user";

export default function UserForm({ user, onClose, onSave }: UserFormProps) {
  const { t } = useTranslation("add_member_modal");

  const { form, onSubmit } = useUser({ user, onSave, onClose });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
          <div className="space-y-5">
            {/* name field */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("first_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_first_name")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("last_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_last_name")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email and Phone */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_email")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* phone number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("phone_number")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_phone_number")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Location and commission */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("location")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enter_location")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* commission */}
              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel className="text-base font-normal">
                      {t("commission")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("enter_commission")}
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
            </div>

            {/* admin permissions */}
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-base font-normal">
                    {t("permissions")}
                  </FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "Admin", label: t("admin") },
                        { value: "Owner", label: t("owner") },
                      ]}
                      placeholder={t("select_type")}
                      value={field.value}
                      onValueChange={field.onChange}
                      triggerClassName="custom-focus w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="mt-7 shadow-[0_-4px_6px_rgba(0,0,0,0.2)]" />
          {/* Buttons */}
          <div className="mb-5 flex items-center justify-center gap-3 md:justify-end">
            <Button
              variant={"primary"}
              type="submit"
              className="border-button-border border px-10 py-5 text-base font-normal shadow-2xl"
            >
              {t("send_invite")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
