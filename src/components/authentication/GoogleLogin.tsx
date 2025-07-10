import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";
import { Button } from "../ui/button";

export default function GoogleLogin() {
  return (
    <Button
      variant="outline"
      type="button"
      size="lg"
      className="cursor-pointer py-8"
    >
      <ReactSVG
        src={icons.google}
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 32px; height: 32px;");
        }}
      />
    </Button>
  );
}
