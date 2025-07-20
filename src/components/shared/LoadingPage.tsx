interface LoadingPageProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function LoadingPage({ 
  title = "Preparing your plan", 
  subtitle = "Setting up your nutrition plan and analyzing your goals...",
  className = ""
}: LoadingPageProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f3f2] to-white ${className}`}>
      <div className="flex flex-col items-center space-y-8">
        {/* Circular Progress Loader */}
        <div className="relative">
          {/* Outer ring */}
          {/* <div className="w-24 h-24 rounded-full border-4 border-gray-200"></div> */}
          
          {/* Progress ring */}
          {/* <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-primary animate-spin duration-1000"></div> */}
          
          {/* Inner circle with icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-18 rounded-full flex items-center justify-center bg-primary shadow-md">
            <div className="loader"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2 mt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-md text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
