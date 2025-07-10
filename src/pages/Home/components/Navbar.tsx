import Image from "@/components/shared/Image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { icons } from "@/lib/imageProvider";
import {  useState } from "react";
import { useLocation } from "react-router";



export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '#features' },
        { name: 'How does it work', path: '#how-it-works' },
        { name: 'Contact', path: '#contact' },
    ];

    return (
        <nav className="py-6">
            <div className="container mx-auto flex items-center justify-between max-md:px-5">
                {/* Logo Section */}
                <div className="flex items-center h-10">
                    <Image src={icons.navLogo} alt="Bunni Logo" className="h-20 w-20 rounded-md" />
                </div>

                {/* Hamburger Menu Icon for Mobile using Shadcn DrawerTrigger */}
                <div className="lg:hidden flex items-center">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <button
                                className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2"
                                aria-label="Toggle mobile menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </button>
                        </SheetTrigger>

                        <SheetContent side="right" className="flex flex-col w-[90%]">
                            {/* Custom Header with Logo */}
                            <div className="flex items-center justify-between border-b border-foreground/8">
                                <div className="flex items-center">
                                    <Image src={icons.navLogo} alt="Bunni Logo" className="h-12 w-full rounded-md ml-2" />
                                </div>
                            </div>

                            {/* Nav links */}
                            <div className="flex flex-col items-start">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.name}>
                                        <a
                                            href={link.path}
                                            className={`block w-full px-4 py-2 text-sm ${location.hash === link.path || location.pathname === link.path ? 'font-medium text-foreground' : 'text-description'
                                                }`}
                                        >
                                            {link.name}
                                        </a>
                                    </SheetClose>
                                ))}

                                <div className="w-full border-t border-gray-200 my-4"></div>

                                <div className="flex flex-col w-full space-y-5 px-4">
                                    <SheetClose asChild>
                                        <button className="w-full px-3 py-1.5 border border-primary text-foreground rounded-md">
                                            Log In
                                        </button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <button className="w-full px-6 py-2 bg-primary text-white rounded-md ">
                                            Registration
                                        </button>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Navigation Links - Mapped and using NavLink (Desktop) */}
                <div className="hidden lg:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name} // Unique key for each mapped item
                            href={link.path}  // The path the link navigates to
                            // isActive is a function that receives an object with isActive property
                            className={
                                ` text-xl ${location.hash === link.path || location.pathname === link.path ? 'text-foreground' : 'text-description'
                                }`
                            }
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden lg:flex items-center space-x-5">
                    <button className="px-8 py-3.5 border border-primary text-foreground rounded-md text-xl">
                        Log In
                    </button>
                    <button className="px-8 py-3.5 bg-primary text-white rounded-md text-xl">
                        Registration
                    </button>
                </div>
            </div>
        </nav>
    )
}
