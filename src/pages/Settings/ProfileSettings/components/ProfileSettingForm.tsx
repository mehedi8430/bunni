import { Button } from "@/components/ui/button";
import UseProfileForm from "../hooks/use-profile-setting";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import type { TProfileData } from "@/types";
import { useTranslation } from "react-i18next";

interface ProfileSettingFormProps {
  onSuccess?: () => void;
  profileData?: TProfileData;
}

export default function ProfileSettingForm({
  onSuccess,
  profileData,
}: ProfileSettingFormProps) {
  const { t } = useTranslation("profile_settings");
  const { form, onSubmit } = UseProfileForm({ onSuccess, profileData });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-md bg-white px-5 py-8"
        >
          <div className="flex flex-col gap-16 md:flex-row md:items-center">
            <div className="w-full space-y-6 md:w-1/2">
              <h4 className="mb-5 text-2xl font-semibold">{t("personal_info")}</h4>
              {/* name field */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="text-lg font-normal">
                        {t("first_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="here"
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
                      <FormLabel className="text-lg font-normal">
                        {t("last_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="here"
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
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
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
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("phone_number")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("phone_number")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full space-y-4 md:w-1/2">
              <h4 className="text-2xl font-semibold">{t("business_info")}</h4>

              {/* Business Logo Upload */}
              <FormField
                control={form.control}
                name="businessLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("business_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("business_name")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Address */}
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("business_address")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("business_address")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Business Contact */}
              <FormField
                control={form.control}
                name="businessContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("business_contact")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("business_contact")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Business Contact */}
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("website_url")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("website_url")}
                        {...field}
                        className="custom-focus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal">
                      {t("pick_color")}
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          placeholder={t("pick_color")}
                          {...field}
                          className="custom-focus"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        <Input
                          type="color"
                          value={field.value}
                          onChange={field.onChange}
                          className="mr-2 h-8 w-14 cursor-pointer appearance-none rounded-xl border-none p-0"
                          style={{ transform: "scale(1.4)" }}
                          title={`Pick a brand color`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-3 md:justify-end">
            <Button
              variant={"primary"}
              type="submit"
              className="border-button-border border px-10 py-5 text-lg font-normal shadow-2xl"
            >
              {t("save_changes")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
