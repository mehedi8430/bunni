import Image from "@/components/shared/Image";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { icons } from "@/lib/imageProvider";
import { useState } from "react";
import { Link, useLocation } from "react-router";



export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '#features' },
        { name: 'How does it work', path: '#how-it-works' },
        { name: 'Contact', path: '#contact' },
    ];

    // Function to handle smooth scrolling to sections
    const handleSmoothScroll = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            const navbarHeight = 100; // Adjust based on your navbar height
            const elementPosition = element.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    // Function to handle mobile nav click
    const handleMobileNavClick = (e: React.MouseEvent, path: string) => {
        e.preventDefault(); // Prevent default anchor behavior
        
        if (path.startsWith('#')) {
            // Close mobile menu first
            setIsMobileMenuOpen(false);
            // Wait for menu to close, then scroll
            setTimeout(() => {
                const targetId = path.substring(1); // Remove the # symbol
                handleSmoothScroll(targetId);
            }, 300); // Small delay to ensure sheet closes smoothly
        } else {
            // For regular links, close menu and navigate
            setIsMobileMenuOpen(false);
        }
    };

    // Function to handle desktop nav click
    const handleDesktopNavClick = (e: React.MouseEvent, path: string) => {
        if (path.startsWith('#')) {
            e.preventDefault();
            const targetId = path.substring(1);
            handleSmoothScroll(targetId);
        }
    };

    return (
        <nav className="py-6 sticky top-0 bg-white z-50 shadow-sm">
            <div className="container mx-auto flex items-center justify-between max-md:px-5">
                {/* Logo Section */}
                <div className="flex items-center h-10">
                    <Link to="/">
                        <Image src={icons.navLogo} alt="Bunni Logo" className="h-20 w-20 rounded-md" />
                    </Link>
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
                                    <div key={link.name} className="w-full">
                                        <a
                                            href={link.path}
                                            onClick={(e) => handleMobileNavClick(e, link.path)}
                                            className={`block w-full px-4 py-2 text-sm cursor-pointer ${location.hash === link.path || location.pathname === link.path ? 'font-medium text-foreground' : 'text-description'
                                                }`}
                                        >
                                            {link.name}
                                        </a>
                                    </div>
                                ))}

                                <div className="w-full border-t border-gray-200 my-4"></div>

                                <div className="flex flex-col w-full space-y-5 px-4">
                                    <SheetClose asChild>
                                        <Link to={"/auth"}>
                                            <button className="w-full px-3 py-1.5 border border-primary text-foreground rounded-md">
                                                Log In
                                            </button>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to={"/auth/register"}>
                                            <button className="w-full px-6 py-2 bg-primary text-white rounded-md ">
                                                Registration
                                            </button>
                                        </Link>
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
                            onClick={(e) => handleDesktopNavClick(e, link.path)}
                            // isActive is a function that receives an object with isActive property
                            className={
                                ` text-xl cursor-pointer ${location.hash === link.path || location.pathname === link.path ? 'text-foreground' : 'text-description'
                                }`
                            }
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons (Desktop) */}
                <div className="hidden lg:flex items-center space-x-5">
                    <Link to={"/auth"}>
                        <button className="px-8 py-3.5 border border-primary text-foreground rounded-md text-xl cursor-pointer">
                            Log In
                        </button>
                    </Link>
                    <Link to={"/auth/register"}>
                        <button className="px-8 py-3.5 bg-primary text-white rounded-md text-xl cursor-pointer">
                            Registration
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
