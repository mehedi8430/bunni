import { AlertTriangle, Home, MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e8f3f2] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* 404 Number + Oops */}
      <div className="relative">
        <h1 className="text-9xl md:text-[220px] font-bold text-gray-300 leading-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="  -rotate-10">
            <p className="relative inline-block text-lg">
              <span className="relative z-10 block px-3 md:px-7 py-1.5 md:py-3 overflow-hidden font-medium leading-tight text-foreground transition-colors duration-300 ease-out border-2 border-border rounded-lg ">
                <span className="absolute inset-0 w-full h-full px-3 md:px-7 py-1.5 md:py-3 rounded-lg bg-primary"></span>
                <span className="relative text-lg font-bold text-white">
                    Oops!
                </span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-[44px] md:h-14 -mb-2 -mr-2 transition-all duration-200 ease-linear bg-gray-900 rounded-lg"
                data-rounded="rounded-lg"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-black mt-2">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 mt-4 max-w-xl">
        Looks like this page decided to take a vacation! Don’t worry, even the best websites have pages that wander off sometimes. Let’s get you back on track.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <button
          onClick={() => navigate(-1)}
          className="relative inline-block text-lg group cursor-pointer">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary01 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-[#e8f3f2]"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <p className="flex items-center gap-2">
              <MoveLeft className="relative " />
              <span className="relative ">
                Go Back
              </span>
            </p>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"></span>
        </button>
        <Link
          to="/"
          className="relative inline-block text-lg group cursor-pointer">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-foreground transition-colors duration-300 ease-out border-2 border-primary01 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-[#e8f3f2]"></span>
            <span className="absolute left-0 w-52 h-52 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <p className="flex items-center gap-2">
              <Home className="relative " />
              <span className="relative ">
                Back to Home
              </span>
            </p>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"></span>
        </Link>
      </div>

      {/* Error Code */}
      <div className="absolute bottom-4 left-4 rotate-[-6deg]">
        <span className="inline-block bg-red-400 text-white px-3 py-1 rounded-md font-bold shadow-lg border-primary border">
          Error Code: LOST_IN_SPACE
        </span>
      </div>

      {/* Decorative Icons */}
      <AlertTriangle
        className="absolute top-1/2 left-5 md:left-10 text-red-300 opacity-40"
        size={32}
      />
      <AlertTriangle
        className="absolute top-[40%] right-5 md:right-10 text-primary opacity-40"
        size={32}
      />
      <div className="absolute top-28 left-20 text-yellow-400 text-xl animate-pulse">
        ✨
      </div>
      <div className="absolute bottom-20 right-10 text-gray-500 text-xl animate-pulse">
        ✨
      </div>
    </div>
  );
}

export default ErrorPage;
