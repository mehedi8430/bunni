import Image from "@/components/shared/Image";
import { images } from "@/lib/imageProvider";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main>
      <section>
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xl">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <Image
              src={images.authBackground}
              alt="Authentication background"
              fill
              priority
              className="dark:brightness-[0.2] dark:grayscale h-full w-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
