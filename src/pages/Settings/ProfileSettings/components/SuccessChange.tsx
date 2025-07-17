import { icons } from "@/lib/imageProvider";
import { CircleX } from "lucide-react";
import { Link } from "react-router";

interface SuccessChangeProps {
    onClose?: () => void;
}

export default function SuccessChange({ onClose }: SuccessChangeProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl p-8  text-center relative">
            {/* Close Button */}
            <div
                className="absolute top-5 right-5 text-primary flex items-center justify-center"
                onClick={onClose}
            >
                <CircleX strokeWidth={1.5} size={28} className="cursor-pointer" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-normal text-foreground leading-12 mt-4 mb-2">
                Password Changed <br /> Successfully!
            </h1>

            {/* Subtitle */}
            <p className="text-lg font-normal text-foreground/40 mb-8">
                You can now sign in with your new password
            </p>

            {/* Image */}
            <div className="mb-8 flex justify-center">
                <img
                    src={icons.successIcon}
                    alt="Success Illustration"
                    className="w-64 h-64 object-contain"
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <Link to={"/dashboard"} className="w-full">
                    <button
                        className="py-3 px-8 rounded-md text-lg font-normal w-full
                             bg-white border border-primary text-foreground text-nowrap cursor-pointer"
                    >
                        Back to Dashboard
                    </button>
                </Link>
                <Link to={"/auth/login"} className="w-full">
                    <button
                        className="py-3 px-8 rounded-md text-lg font-medium w-full
                             bg-primary text-white text-nowrap cursor-pointer"
                    >
                        Sign in Now
                    </button>
                </Link>
            </div>

            {/* Footer Text */}
            <p className="text-sm text-foreground/40 font-normal md:text-nowrap">
                Remember to keep your password secure and never share it with anyone
            </p>
        </div>
    )
}
