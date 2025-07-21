import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/bunny.json';

interface LoadingPageProps {
  title?: string;
  className?: string;
}

export default function LoadingAnimation({ 
  title = "Preparing your plan", 
  className = ""
}: LoadingPageProps) {
    return (
        <div className={`h-[calc(100vh-110px)] justify-center items-center flex flex-col ${className}`}>
            <div className=''>
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                    className='h-20 w-20'
                />
            </div>
            {/* Loading Text */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                    {title}...
                </h2>
            </div>

        </div>
    )
}
