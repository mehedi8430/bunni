import { useState, useRef } from "react";
import { Input } from "./input";
import { Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, className, disabled }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setIsUploading(true);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
            onChange(result);
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setPreview(null);
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        if (disabled) return;
        fileInputRef.current?.click();
    };

    return (
        <div className={cn("space-y-4", className)}>
            <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
                disabled={disabled}
            />

            {preview ? (
                <div className="relative">
                    <div className="relative w-20 h-20 ">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover overflow-hidden rounded-full "
                        />
                        {!disabled && (
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer"
                                onClick={handleRemove}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "w-20 h-20 rounded-full flex flex-col items-center justify-center",
                        disabled && "cursor-not-allowed opacity-50"
                    )}

                >
                    {isUploading ? (
                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center rounded-full h-20 w-20 mb-2">
                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="" className={`size-20 rounded-full`} />
                            <div onClick={handleClick} className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
                                <Pencil size={16} />
                            </div>
                        </div>

                    )}
                </div>
            )}
        </div>
    );
}
