import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SmartMonitoring = () => {
    const features = [
        "Live generation",
        "Smart alerts",
        "Performance tracking"
    ];

    return (
        <section className="w-full bg-black text-white py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative mx-auto lg:mx-0"
                    >
                        {/* Phone Body */}
                        <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden mx-auto">
                            {/* Dynamic Island */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-b-2xl z-20" />

                            {/* Screen Content */}
                            <div className="w-full h-full bg-gray-950 p-6 pt-12 relative">
                                {/* App Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-sm font-medium text-gray-400">NETSO</span>
                                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    </div>
                                </div>

                                {/* Graph Area */}
                                <div className="mb-8">
                                    <div className="text-xs text-gray-500 mb-2">Today's Power Curve</div>
                                    <div className="h-32 w-full bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl border-b border-blue-500/30 relative">
                                        {/* Simulated Graph Line */}
                                        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M0 100 Q 20 80 40 40 T 80 20 T 100 60 V 100 H 0 Z" fill="url(#gradient)" opacity="0.4" />
                                            <path d="M0 100 Q 20 80 40 40 T 80 20 T 100 60" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Today's Generation</div>
                                        <div className="text-3xl font-medium text-white">18.4 <span className="text-lg text-gray-500">kWh</span></div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">This Month's Savings</div>
                                        <div className="text-3xl font-medium text-white">৳5,400</div>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="mt-8 space-y-3">
                                    <div className="text-sm text-gray-500 mb-2">Notifications</div>
                                    <div className="bg-gray-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <span className="text-sm text-gray-300">Peak generation at 1:28 PM</span>
                                    </div>
                                    <div className="bg-gray-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-sm text-gray-300">System on and producing</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Glow behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[500px] bg-blue-600/20 blur-[100px] -z-10" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-6xl font-medium mb-6 leading-tight">
                            Smart Monitoring, <br />
                            From Anywhere
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                            Our app lets you track your solar performance and savings in real time, giving you full control over your energy.
                        </p>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="text-blue-500 w-6 h-6" />
                                    <span className="text-xl text-gray-200">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SmartMonitoring;
