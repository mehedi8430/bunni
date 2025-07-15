
import React from 'react';

interface TopCardProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode;   
    title: string;
    value: string | number;
    iconBgColor?: string;
    valueColor?: string;
}

export default function TopCard({ icon, title, value, iconBgColor, valueColor }: TopCardProps) {
    return (
        <div className="card_container col-span-3 space-y-5 xl:col-span-1">
            {/* Icon and Title Section */}
            <div className="flex items-center gap-2">
                {/* Icon Container */}
                <div className={`flex items-center justify-center rounded-full bg-[#FFF8DF] p-2 ${iconBgColor}`}>
                    {/* Render the passed IconComponent */}
                    {typeof icon === 'function' ? React.createElement(icon) : icon}
                </div>
                {/* Title */}
                <h3 className="text-muted-foreground text-[16px] font-normal">{title}</h3>
            </div>
            {/* Value Section */}
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    )
}
