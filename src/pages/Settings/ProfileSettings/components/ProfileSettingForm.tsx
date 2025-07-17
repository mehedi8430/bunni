import { Button } from "@/components/ui/button";
import UseProfileForm from "../hooks/use-profile-setting";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";

interface ProfileSettingFormProps {
    onSuccess?: () => void;
}

export default function ProfileSettingForm({ onSuccess }: ProfileSettingFormProps) {

    const { form, onSubmit } = UseProfileForm({ onSuccess });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-16 md:items-center">
                        <div className="w-full md:w-1/2 space-y-6">
                            <h4 className="text-2xl font-semibold mb-5">Personal Info</h4>
                            {/* name field */}
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* First Name */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="w-full md:w-1/2">
                                            <FormLabel className="text-lg font-normal">First Name</FormLabel>
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
                                            <FormLabel className="text-lg font-normal">Last Name</FormLabel>
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
                                    <FormItem >
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
                            <div>
                                <h4 className="text-2xl font-semibold mb-5">Password Change</h4>
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel className="text-lg font-normal">Current Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter current password"
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
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-1/2">
                                                <FormLabel className="text-lg font-normal">New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter new password"
                                                        {...field}
                                                        className="custom-focus"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 w-full md:w-1/2">
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
                                        <FormLabel className="text-lg font-normal">Business Name</FormLabel>
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
                                        <FormLabel className="text-lg font-normal">Business Address</FormLabel>
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

                            
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="md:absolute right-1/2 gap-3 mt-5 md:mr-[32px] flex justify-center">
                        <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Change Password</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
