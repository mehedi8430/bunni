import { Badge } from "@/components/ui/badge";
import type { TProfileData } from "@/types";

export default function ProfileInfo({
  profileData,
}: {
  profileData: TProfileData;
}) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="w-full space-y-6 rounded-md bg-white px-5 py-8">
          <h4 className="mb-5 text-2xl font-semibold">Personal Info</h4>
          <div className="flex items-center gap-8">
            <p className="text-foreground text-lg font-normal">Name:</p>
            <span className="text-foreground/60 text-base">
              {profileData?.personalInfo.name}
            </span>
          </div>
          <div className="flex items-center gap-9.5">
            <p className="text-foreground text-lg font-normal">Email:</p>
            <span className="text-foreground/60 text-base">
              {profileData?.personalInfo.email}
            </span>
          </div>
          <div className="flex items-center gap-7">
            <p className="text-foreground text-lg font-normal">Phone:</p>
            <span className="text-foreground/60 text-base">
              {profileData?.personalInfo.phone}
            </span>
          </div>

          {/* Address */}
        </div>
        <div className="w-full space-y-4 rounded-md bg-white px-5 py-8">
          <h4 className="text-2xl font-semibold">Business Info</h4>

          {/* Business Logo Upload */}
          <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
              alt="Business Logo"
              className={`size-20 rounded-full`}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-foreground text-lg font-normal">
              Business Name:
            </p>
            <span className="text-foreground/60 text-base">
              {profileData?.businessInfo.name}
            </span>
          </div>

          {/* Business Address */}
          <div className="space-y-2">
            <p className="text-foreground text-lg font-normal">
              Business Addresses
            </p>
            {profileData?.businessInfo.addresses.map((address) => (
              <p className="text-foreground/60 flex items-center gap-2 text-base">
                {address?.address}{" "}
                {address?.isDefault && <Badge>Default</Badge>}
              </p>
            ))}
          </div>

          {/* Business Contact */}
          <div className="flex items-center gap-2">
            <p className="text-foreground text-lg font-normal">
              Business Contact:
            </p>
            <span className="text-foreground/60 text-base">
              {profileData?.businessInfo.contact}
            </span>
          </div>

          {/* website Url */}
          <div className="flex items-center gap-2">
            <p className="text-foreground text-lg font-normal">Website:</p>
            <span className="text-foreground/60 text-base">
              {profileData?.businessInfo.website}
            </span>
          </div>

          {/* brand color */}
          <div className="flex items-center gap-2">
            <p className="text-foreground text-lg font-normal">Brand Color:</p>
            <span className="text-foreground/60 text-base">
              {profileData?.businessInfo.brandColor}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
