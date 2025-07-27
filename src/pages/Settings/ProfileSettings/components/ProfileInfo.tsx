import { DialogModal } from "@/components/DialogModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { templateSelector } from "@/redux/slices/invoiceTemplateSlice";
import type { TProfileData } from "@/types";
import { Plus, RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import AddressForm from "./AddressForm";

export default function ProfileInfo({
  profileData,
}: {
  profileData: TProfileData;
}) {
  const { color } = useAppSelector(templateSelector);
  const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<
    | {
        streetAddress?: string;
        country?: string;
        district?: string;
        zip?: string;
        isDefault: boolean;
        index?: number;
      }
    | undefined
  >(undefined);

  const handleAddressSubmit = (data: {
    address: string;
    isDefault: boolean;
    index?: number;
  }) => {
    const updatedAddresses = [...profileData.businessInfo.addresses];
    if (data.index !== undefined) {
      updatedAddresses[data.index] = {
        address: data.address,
        isDefault: data.isDefault,
      };
    } else {
      updatedAddresses.push({
        address: data.address,
        isDefault: data.isDefault,
      });
    }
    if (data.isDefault) {
      updatedAddresses.forEach((addr, i) => {
        addr.isDefault = i === (data.index ?? updatedAddresses.length - 1);
      });
    }
    setIsAddressOpen(false);
  };

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
            <div className="flex items-center justify-between">
              <p className="text-foreground text-lg font-normal">
                Business Addresses
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-6 text-sm"
                onClick={() => setIsAddressOpen(true)}
              >
                <Plus />
                Add Address
              </Button>
            </div>
            {profileData?.businessInfo.addresses.map((address, index) => (
              <p className="text-foreground/60 flex items-center gap-2 text-base">
                {address?.address}{" "}
                {address?.isDefault && <Badge>Default</Badge>}
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0">
                    <button>
                      <RectangleEllipsis />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Set as Default</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsAddressOpen(true);
                        setInitialData({
                          streetAddress: address.address,
                          isDefault: address.isDefault,
                          index,
                        });
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <div
              style={{
                backgroundColor: color || profileData?.businessInfo.brandColor,
                color: color || profileData?.businessInfo.brandColor,
                opacity: 1.5,
              }}
              className="rounded-md px-2 py-1"
            >
              <span className="text-foreground/60 text-base">
                {profileData?.businessInfo.brandColor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <DialogModal
        isOpen={isAddressOpen}
        onOpenChange={setIsAddressOpen}
        title={
          initialData?.index !== undefined ? "Edit Address" : "Add Address"
        }
      >
        <AddressForm
          initialData={initialData}
          onSubmit={handleAddressSubmit}
          onCancel={() => setIsAddressOpen(false)}
        />
      </DialogModal>
    </section>
  );
}
