import { icons, images } from "@/lib/imageProvider";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { ReactSVG } from "react-svg";
import { Button } from "../ui/button";

export default function SlideCard({
  isBusiness = false,
  steps = [],
}: {
  isBusiness?: boolean;
  steps?: Array<{ title: string; describe: string }>;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const active = parseInt(searchParams.get("active") || "0", 10);
  const prevActive = parseInt(searchParams.get("prevActive") || "0", 10);

  const totalCards = 4;

  // Calculate position for each card based on active index
  const getCardPosition = (index: number, activeIndex: number) => {
    let position = index - activeIndex;

    // Normalize position to be between 0 and totalCards-1
    if (position < 0) position += totalCards;

    return position;
  };

  // Check if card is transitioning to back
  const isTransitioningToBack = (index: number) => {
    return index === prevActive && index !== active;
  };

  return (
    <div className="space-y-10">
      <h2 className="text-primary-foreground text-center text-4xl leading-14 font-bold">
        {steps[active]?.title || "Take Control of Your Business Finances"}
      </h2>
      <p className="text-muted-foreground mt-4 text-center text-xl leading-8">
        {steps[active]?.describe ||
          "Create invoices, request payments, and track every transaction—all in one secure, powerful platform."}
      </p>

      <div className="relative flex h-[400px]">
        {Array.from({ length: totalCards }).map((_, index) => {
          const position = getCardPosition(index, active);
          const isActive = position === 0;
          const isGoingToBack = isTransitioningToBack(index);

          return (
            <div
              key={index}
              className={cn(
                `absolute flex cursor-pointer items-center justify-center transition-all duration-700 ease-in-out`,
                isGoingToBack && "animate-[swipeToBack_0.7s_ease-in-out]",
              )}
              style={{
                width: isActive ? "100%" : `${100 - (position + 1) * 8}%`,
                height: isActive ? "100%" : `${100 - (position + 1) * 5}%`,
                zIndex: isActive ? 50 : isGoingToBack ? 45 : 40 - position,
                opacity: isActive ? 1 : Math.max(0.3, 0.8 - position * 0.2),
                left: "50%",
                top: "50%",
                transform: isGoingToBack
                  ? `translate(-50%, -50%) translateY(-50px) scale(0.8)`
                  : `translate(-50%, -50%) translateY(${
                      isActive
                        ? 0
                        : position === 1
                          ? 45
                          : position === 2
                            ? 75
                            : position * 35
                    }px)`,
                transition: `all 0.7s ease-in-out ${isActive ? "0.2s" : "0s"}`,
              }}
              onClick={() => {
                searchParams.set("active", index.toString());
                searchParams.set("prevActive", active.toString());
                setSearchParams(searchParams);
              }}
            >
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "class",
                    "h-full w-full object-cover object-center",
                  );
                }}
                src={images.chartCard}
              />
            </div>
          );
        })}
      </div>

      {/* Optional: Add dots indicator */}
      {!isBusiness && (
        <div className="mx-auto mt-20 flex w-fit items-center justify-between">
          <Button
            variant="ghost"
            className="hover:bg-primary cursor-pointer p-2"
            onClick={() => {
              searchParams.set("prevActive", active.toString());
              searchParams.set(
                "active",
                ((active - 1 + totalCards) % totalCards) + "",
              );
              setSearchParams(searchParams);
            }}
            disabled={active === 0}
          >
            <ReactSVG src={icons.arrowLeft} className="text-muted" />
          </Button>
          <div className="mx-8 flex gap-2">
            {Array.from({ length: totalCards }).map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                className="hover:bg-primary cursor-pointer p-2"
              >
                <span
                  className={cn(
                    "bg-background block h-2.5 w-7 rounded-2xl transition-all duration-300",
                    {
                      "bg-background": index === active,
                      "bg-muted-foreground/30 hover:bg-muted-foreground/50":
                        index !== active,
                    },
                  )}
                />
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="hover:bg-primary cursor-pointer p-2"
            onClick={() => {
              searchParams.set("prevActive", active.toString());
              searchParams.set("active", ((active + 1) % totalCards) + "");
              setSearchParams(searchParams);
            }}
            disabled={active === totalCards - 1}
          >
            <ReactSVG src={icons.arrowRight} className="text-muted" />
          </Button>
        </div>
      )}

      {/* Add custom CSS for swipe animation */}
      <style>{`
  @keyframes swipeToBack {
    0% {
      transform: translate(-50%, -50%) translateY(0px) scale(1);
      opacity: 1;
      z-index: 50;
    }
    50% {
      transform: translate(-50%, -50%) translateY(-80px) scale(0.7);
      opacity: 0.6;
      z-index: 45;
    }
    100% {
      transform: translate(-50%, -50%) translateY(105px) scale(0.76);
      opacity: 0.5;
      z-index: 35;
    }
  }

  @keyframes fadeInToActive {
    0% {
      opacity: 0.6;
      transform: translate(-50%, -50%) translateY(35px) scale(0.92);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(0px) scale(1);
    }
  }
`}</style>
    </div>
  );
}
