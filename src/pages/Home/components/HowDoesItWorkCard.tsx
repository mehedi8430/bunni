
// Define the props interface for the Card component
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowDoesItWorkCard({ icon, title, description }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col mx-auto">
      {/* Icon Container */}
      <div className="bg-primary/10 p-4 rounded-full mb-7 w-fit">
        {icon}
      </div>
      {/* Title */}
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground01 mb-3">{title}</h3>
      {/* Description */}
      <p className="text-foreground01/70 lg:text-xl">{description}</p>
    </div>
  )
}
