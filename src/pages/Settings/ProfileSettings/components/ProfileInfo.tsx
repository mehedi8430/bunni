
interface ProfileInfoProps {
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
        };
    };
}

export default function ProfileInfo({profileData}: ProfileInfoProps) {
    return (
        <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full space-y-6 bg-white px-5 py-8 rounded-md">
                    <h4 className="text-2xl font-semibold mb-5">Personal Info</h4>
                    <div className="flex items-center gap-8">
                        <p className="text-lg font-normal text-foreground">Name:</p>
                        <span className="text-base text-foreground/60">{profileData?.personalInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-9.5">
                        <p className="text-lg font-normal text-foreground">Email:</p>
                        <span className="text-base text-foreground/60">{profileData?.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-7">
                        <p className="text-lg font-normal text-foreground">Phone:</p>
                        <span className="text-base text-foreground/60">{profileData?.personalInfo.phone}</span>
                    </div>

                    {/* Address */}
                </div>
                <div className="space-y-4 w-full bg-white px-5 py-8 rounded-md">
                    <h4 className="text-2xl font-semibold">Business Info</h4>

                    {/* Business Logo Upload */}
                    <div className="flex items-center justify-center rounded-full h-20 w-20 mb-2">
                        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="Business Logo" className={`size-20 rounded-full`} />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-normal text-foreground">Business Name:</p>
                        <span className="text-base text-foreground/60">{profileData?.businessInfo.name}</span>
                    </div>

                    {/* Business Address */}
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-normal text-foreground">Business Address:</p>
                        <span className="text-base text-foreground/60">{profileData?.businessInfo.address}</span>
                    </div>

                    {/* Business Contact */}
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-normal text-foreground">Business Contact:</p>
                        <span className="text-base text-foreground/60">{profileData?.businessInfo.contact}</span>
                    </div>

                    {/* website Url */}
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-normal text-foreground">Website:</p>
                        <span className="text-base text-foreground/60">{profileData?.businessInfo.website}</span>
                    </div>

                </div>
            </div>
        </section>
    )
}
