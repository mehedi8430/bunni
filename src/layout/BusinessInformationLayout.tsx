import AuthSlider from "@/components/authentication/AuthSlider";
import { Outlet, useNavigate } from "react-router";

interface User {
  role: string;
  businessInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export default function BusinessInformationLayout() {
  const navigate = useNavigate();

  const user: User = {
    role: "owner", // Example role, this should come from your auth context or state
    // businessInfo: {
    //   name: "Bunni",
    //   address: "123 Bunni St, Bunnytown",
    //   phone: "+1234567890",
    //   email: "info@bunni.com",
    // },
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (user.role !== "owner" || user.businessInfo) {
    navigate(-1);
    return null;
  }

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
          <AuthSlider
            isBusinessSetup={user.role === "owner" && !user.businessInfo}
          />
        </div>
      </section>
    </main>
  );
}
