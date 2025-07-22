
interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold text-foreground01">{title}</h1>
      <p className={`md:text-lg lg:text-xl mt-3 md:mt-5 text-foreground01/50 ${className}`}>{subtitle}</p>
    </div>
  )
}
