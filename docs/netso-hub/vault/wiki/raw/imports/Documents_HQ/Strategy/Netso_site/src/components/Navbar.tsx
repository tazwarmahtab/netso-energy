import { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-black' : 'text-black'}`}>NETSO</span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'How it Works', 'Solutions', 'Savings Calculator', 'Partner Program', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                    Get Solar <ArrowRight size={16} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
