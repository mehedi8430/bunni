
interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl xl:text-5xl font-semibold text-foreground01">{title}</h1>
      <p className={`md:text-xl lg:text-2xl mt-3 md:mt-5 text-foreground01/50 ${className}`}>{subtitle}</p>
    </div>
  )
}
