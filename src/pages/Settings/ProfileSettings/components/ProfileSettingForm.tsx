import { Button } from "@/components/ui/button";
import UseProfileForm from "../hooks/use-profile-setting";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";

interface ProfileSettingFormProps {
    onSuccess?: () => void;
    profileData?: {
        personalInfo: {
            name: string;
            email: string;
            phone: string;
        };
        businessInfo: {
            logo: string;
            name: string;
            address: string;
            contact: string;
            website: string;
            brandColor: string;
        };
    };
}

export default function ProfileSettingForm({ onSuccess, profileData }: ProfileSettingFormProps) {

    const { form, onSubmit } = UseProfileForm({ onSuccess, profileData });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white px-5 py-8 rounded-md">
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
                            {/* Business Contact */}
                            <FormField
                                control={form.control}
                                name="businessContact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-normal">Business Contact</FormLabel>
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
                                        <FormLabel className="text-lg font-normal">Website URL</FormLabel>
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

                            <div className="flex items-center gap-2 justify-between mt-8">
                                <p className="text-lg font-normal">Choose your brand color</p>
                                <FormField
                                    control={form.control}
                                    name="brandColor"
                                    render={({ field }) => (
                                        <FormItem className="h-10 w-16 overflow-hidden">
                                            <FormControl>
                                                <Input
                                                    type="color"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    className="h-full w-full cursor-pointer appearance-none border-none bg-transparent p-0 rounded-full"
                                                    style={{ transform: "scale(1.5)" }}
                                                    title={`Pick a brand color`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                    </div>
                    {/* Buttons */}
                    <div className="gap-3 flex justify-center md:justify-end mt-10">
                        <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-lg font-normal border border-button-border">Save Changes</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
