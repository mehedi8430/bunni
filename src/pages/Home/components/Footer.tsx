import { icons } from "@/lib/imageProvider";
import { Link } from "react-router";

// Define interfaces for better type checking
interface NavLink {
    name: string;
    url: string;
}

interface SocialMediaLink {
    name: string;
    url: string;
}

export default function Footer() {

    // Navigation links data
    const quickLinks: NavLink[] = [
        { name: 'Home', url: '/' },
        { name: 'Features', url: '#features' },
        { name: 'FAQs', url: '#faq' },
        { name: 'How Does It Works', url: '#how-it-works' },
    ];

    // Social media links data
    const socialMediaLinks: SocialMediaLink[] = [
        { name: 'Facebook', url: '#' },
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
    ];

    return (
        <footer className="bg-sidebar-foreground">
            <div className="container mx-auto px-4 pt-16 pb-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Logo Section */}
                    <div className="w-full md:w-3/5">
                        <div className="mb-10">
                            {/* Logo - Replace with your actual logo */}
                            <div className="flex items-center mb-4">
                                <Link to="/">
                                    <img
                                        src={icons.navLogo}
                                        alt="Bunni Logo"
                                        className="h-24 w-auto"
                                    />
                                </Link>
                            </div>
                            <p className="text-sm lg:text-lg font-normal leading-snug text-white">
                                We provide secure, smart, and easy-to-use Invoicing and payment solutions that help businesses get paid faster, manage clients effortlessly, and create impactful presentations. Whether you're a freelancer or a growing enterprise, our platform empowers you to streamline operations and scale with confidence.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-between space-y-4">
                            {/* Quick Links Section */}
                            <div>
                                <h3 className="text-lg md:text-xl text-white mb-5">Quick Links</h3>
                                <ul className="space-y-2">
                                    {quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.url} className="text-sm md:text-base text-description">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social Media & Hot Link Section */}
                            <div>
                                <h3 className="text-lg md:text-xl text-white mb-5">Social Media</h3>
                                <ul className="space-y-2 mb-6">
                                    {socialMediaLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.url} className="text-sm md:text-base text-description">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Hot links */}
                            <div>
                                <h3 className="text-lg md:text-xl text-white mb-5">Hot Link</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <p className="text-sm md:text-base text-description">
                                            Phone: +(1)(465) 035-1237
                                        </p>
                                    </li>
                                    <li>
                                        <p className="text-sm md:text-base text-description">
                                            Email: amnelson0121@gmail.com
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Contact Us Form Section */}
                    <div id="contact" className="w-full md:w-2/5">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-6">Contact Us</h3>
                        <div className="bg-footer-form-background pt-10 pb-7 px-7 rounded-md">
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full pt-3.5 pb-4 pl-4 bg-footer-input-background border border-description rounded-md focus:outline-none focus:ring focus:ring-ring text-white placeholder-description"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pt-3.5 pb-4 pl-4 bg-footer-input-background border border-description rounded-md focus:outline-none focus:ring focus:ring-ring text-white placeholder-description"
                                />
                                <textarea
                                    placeholder="Message"
                                    rows={3}
                                    className="w-full pt-3.5 pb-4 pl-4 bg-footer-input-background border border-description rounded-md focus:outline-none focus:ring focus:ring-ring text-white placeholder-description resize-y"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-white text-gray-900 rounded-md text-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom Section */}
                <div className="mt-12 pt-8 border-t border-footer-form-background text-center md:flex md:justify-between md:items-center text-white">
                    <p>Copyright &copy; construck all right reserved.</p>
                    <p className="mt-2 md:mt-0">16037 Road Demra, Dhaka, Bangladesh</p>
                </div>
            </div>
        </footer>
    )
}
