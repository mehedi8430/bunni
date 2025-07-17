import { icons } from "@/lib/imageProvider";

interface SuccessChangeProps {
    onClose?: () => void;
}

export default function SuccessChange({ onClose }: SuccessChangeProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 text-center relative">
            {/* Close Button */}
            <div 
                className="absolute top-4 right-4 bg-blue-50 rounded-full p-2 cursor-pointer flex items-center justify-center w-10 h-10 transition-colors duration-200 hover:bg-blue-100"
                onClick={onClose}
            >
                <svg className="text-teal-700 text-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">
                Profile Updated Successfully!
            </h1>

            {/* Subtitle */}
            <p className="text-base text-gray-600 mb-8">
                Your profile settings have been saved successfully
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
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                    className="py-3 px-6 rounded-xl font-medium transition-colors duration-200 w-full
                             bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={onClose}
                >
                    Close
                </button>
                <button 
                    className="py-3 px-6 rounded-xl font-medium transition-colors duration-200 w-full
                             bg-green-500 text-white border border-green-500 hover:bg-green-600"
                    onClick={onClose}
                >
                    Continue
                </button>
            </div>

            {/* Footer Text */}
            <p className="text-sm text-gray-400">
                Your profile changes have been saved successfully
            </p>
        </div>
    )
}
