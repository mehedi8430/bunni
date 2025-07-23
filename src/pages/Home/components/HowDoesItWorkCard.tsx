
// Define the props interface for the Card component
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  classNameForIcon?: string;
  classNameForTitle?: string;
  classNameForDescription?: string;
  className?: string;
}

export default function HowDoesItWorkCard({ icon, title, description, classNameForIcon, classNameForTitle, classNameForDescription, className }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col mx-auto ${className}`}>
      {/* Icon Container */}
      <div className={`mb-5 ${classNameForIcon}`}>
        {icon}
      </div>
      {/* Title */}
      <h3 className={`text-lg md:text-lg lg:text-xl font-bold text-foreground01 mb-3 ${classNameForTitle}`}>{title}</h3>
      {/* Description */}
      <p className={`lg:text-base ${classNameForDescription}`}>{description}</p>
    </div>
  )
}
