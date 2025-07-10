import AuthSlider from "@/components/authentication/AuthSlider";
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
          <AuthSlider />
        </div>
      </section>
    </main>
  );
}
