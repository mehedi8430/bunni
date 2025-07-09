import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  useState } from "react";
import { NavLink, useLocation } from "react-router";



export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' },
        { name: 'How does it work', path: '/how-it-works' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    {/* Replace with your actual logo image */}
                    <img
                        src="https://placehold.co/100x40/E0F2F7/000000?text=BUNNI"
                        alt="Bunni Logo"
                        className="h-10 mr-4 rounded-md"
                    />
                </div>

                {/* Hamburger Menu Icon for Mobile using Shadcn DrawerTrigger */}
                <div className="md:hidden flex items-center">
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

                        <SheetContent side="right" className="flex flex-col p-0 w-[90%]">
                            {/* Custom Header with Logo */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center">
                                    <img
                                        src="https://placehold.co/100x40/E0F2F7/000000?text=BUNNI"
                                        alt="Bunni Logo"
                                        className="h-10 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Nav links */}
                            <div className="flex flex-col items-start">
                                {navLinks.map((link) => (
                                    <SheetClose asChild key={link.name}>
                                        <NavLink
                                            to={link.path}
                                            className={`block w-full px-4 py-2 text-sm ${location.pathname === link.path ? 'font-medium text-foreground' : 'text-description'
                                                }`}
                                        >
                                            {link.name}
                                        </NavLink>
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
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name} // Unique key for each mapped item
                            to={link.path}  // The path the link navigates to
                            // isActive is a function that receives an object with isActive property
                            className={({ isActive }) =>
                                ` text-xl ${isActive ? 'text-foreground' : 'text-description'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-5">
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
