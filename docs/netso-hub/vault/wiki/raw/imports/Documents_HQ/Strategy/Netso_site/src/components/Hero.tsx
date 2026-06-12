import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden font-sans">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/assets/hero-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better text readability if needed, though the image looks dark enough at top/bottom? 
            The reference image has a gradient or natural darkening. 
            I'll add a subtle gradient overlay to match the reference's contrast.
        */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-medium text-white leading-[1.1] tracking-tight mb-6">
                            Solar Power.<br />
                            Smart Savings.<br />
                            Zero Hassle.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-lg leading-relaxed">
                            Transforming rooftops across Bangladesh for a greener future.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#1E88E5] hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                                Get a Free Proposal
                            </button>
                            <button className="bg-[#0F172A]/80 hover:bg-[#0F172A] backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium text-lg transition-all border border-white/10 flex items-center justify-center">
                                See Installations
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Content - Floating Card */}
                    <div className="relative hidden lg:block h-full min-h-[400px]">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="absolute top-0 right-0 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-80 shadow-2xl"
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-300 text-lg">Now</span>
                                <div className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1 text-sm text-white font-medium">
                                    <ArrowUpRight size={14} />
                                    3.62 kW
                                </div>
                            </div>

                            {/* Main Value */}
                            <div className="mb-8">
                                <span className="text-6xl font-normal text-white tracking-tight">3.62</span>
                                <span className="text-2xl text-gray-300 ml-2">kW</span>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Savings</div>
                                    <div className="text-white text-xl font-medium">৳5,400<span className="text-sm text-gray-400 font-normal">/month</span></div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Saving</div>
                                    <div className="text-white text-xl font-medium">314 <span className="text-sm text-gray-400 font-normal">kg/yr</span></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
