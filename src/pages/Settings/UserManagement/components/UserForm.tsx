import { Button } from "@/components/ui/button";
import useUser, { type UserFormProps } from "../hooks/use-user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/SelectInput";



export default function UserForm({ user, onClose, onSave }: UserFormProps) {

  const { form, onSubmit } = useUser({ user, onSave, onClose });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
          <div>
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter first name"
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
                <FormItem>
                  <FormLabel className="text-lg font-normal">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter last name"
                      {...field}
                      className="custom-focus"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel className="text-lg font-normal">Phone Number</FormLabel>
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
            {/* location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter location"
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
                <FormItem>
                  <FormLabel className="text-lg font-normal">Commission</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter commission"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      className="custom-focus"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* admin permissions */}
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-lg font-normal">Permissions</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={[
                        { value: "Admin", label: "Admin" },
                        { value: "Owner", label: "Owner" },
                      ]}
                      placeholder="Select type"
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

          <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
          {/* Buttons */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-lg font-normal">
              Cancel
            </Button>
            <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Save</Button>
          </div>
        </form>
      </Form >
    </>
  );
}
