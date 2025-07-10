import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";
import { Button } from "../ui/button";

export default function AppleLogin() {
  return (
    <Button
      variant="outline"
      type="button"
      size="lg"
      className="py-8 cursor-pointer">
      <ReactSVG
        src={icons.apple}
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 32px; height: 32px;");
        }}
      />
    </Button>
  );
}
