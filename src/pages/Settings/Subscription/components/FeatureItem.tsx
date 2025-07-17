import { icons } from "@/lib/imageProvider";

interface FeatureItemProps {
  text: string;
  isIncluded: boolean;
}

export default function FeatureItem({ text, isIncluded }: FeatureItemProps) {
  return (
    <div className="flex items-center mb-3 gap-3">
    {isIncluded ? (
      <img src={icons.checkIcon} alt="Check Icon" />
    ) : (
      <img src={icons.crossIcon} alt="Cross Icon" />
    )}
    <span className="text-foreground/40 text-base font-normal">{text}</span>
  </div>
  )
}
