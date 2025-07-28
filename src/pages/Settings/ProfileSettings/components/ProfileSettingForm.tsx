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

interface ProfileSettingFormProps {
  onSuccess?: () => void;
  profileData?: TProfileData;
}

export default function ProfileSettingForm({
  onSuccess,
  profileData,
}: ProfileSettingFormProps) {
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
              <h4 className="mb-5 text-2xl font-semibold">Personal Info</h4>
              {/* name field */}
              <div className="flex flex-col gap-4 md:flex-row">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="text-lg font-normal">
                        First Name
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
                        Last Name
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
                    <FormLabel className="text-lg font-normal">Email</FormLabel>
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
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
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
              <h4 className="text-2xl font-semibold">Business Info</h4>

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
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business name"
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
                      Business Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business address"
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
                      Business Contact
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter business contact"
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
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter website URL"
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
                      Choose your brand color
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          placeholder="Pick a color"
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
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
