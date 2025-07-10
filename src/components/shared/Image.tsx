import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface ImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "srcSet" | "loading"
  > {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
  unoptimized?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  placeholder = "empty",
  blurDataURL,
  sizes,
  quality = 75,
  onLoad,
  onError,
  className,
  unoptimized = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    const currentRef = fill ? containerRef.current : imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [priority, fill]);

  // Generate responsive srcSet
  const generateSrcSet = (src: string, width?: number): string => {
    if (unoptimized || !width) return "";

    const sizes = [1, 2];
    return sizes
      .map((size) => `${src}?w=${width * size}&q=${quality} ${size}x`)
      .join(", ");
  };

  // Generate sizes attribute
  const getSizes = (sizes?: string, width?: number): string => {
    if (sizes) return sizes;
    if (fill) return "100vw";
    if (width) return `${width}px`;
    return "100vw";
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  const imageStyles: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: "cover",
        color: "transparent",
      }
    : {
        width: width || "auto",
        height: height || "auto",
        color: "transparent",
      };

  const shouldShowPlaceholder =
    !isLoaded && !isError && placeholder !== "empty";
  const shouldShowBlurPlaceholder =
    shouldShowPlaceholder && placeholder === "blur" && blurDataURL;

  // Loading placeholder component
  const LoadingPlaceholder = () => (
    <div
      style={imageStyles}
      className="bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  // Error state component
  const ErrorPlaceholder = () => (
    <div
      style={imageStyles}
      className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.694-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
  );

  // Blur placeholder component
  const BlurPlaceholder = () => (
    <img
      src={blurDataURL}
      alt=""
      style={{
        ...imageStyles,
        filter: "blur(20px)",
        transform: "scale(1.1)",
      }}
      className="object-cover"
      aria-hidden="true"
    />
  );

  if (fill) {
    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={{ position: "relative" }}>
        {/* Blur placeholder */}
        {shouldShowBlurPlaceholder && <BlurPlaceholder />}

        {/* Loading placeholder */}
        {!isLoaded && !isError && placeholder === "empty" && (
          <LoadingPlaceholder />
        )}

        {/* Error state */}
        {isError && <ErrorPlaceholder />}

        {/* Main image */}
        {isInView && (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            srcSet={!unoptimized ? generateSrcSet(src, width) : undefined}
            sizes={getSizes(sizes, width)}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              ...imageStyles,
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            className="object-cover"
            {...props}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Blur placeholder */}
      {shouldShowBlurPlaceholder && <BlurPlaceholder />}

      {/* Loading placeholder */}
      {!isLoaded && !isError && placeholder === "empty" && width && height && (
        <div
          style={{ width, height }}
          className="bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {isError && width && height && (
        <div
          style={{ width, height }}
          className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.694-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          srcSet={!unoptimized ? generateSrcSet(src, width) : undefined}
          sizes={getSizes(sizes, width)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default Image;
