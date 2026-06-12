import { motion } from 'framer-motion';

const SmartStorage = () => {
    return (
        <section className="w-full bg-[#f8f5f2] py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] rounded-3xl overflow-hidden"
                    >
                        {/* Placeholder for the 3D character walking scene */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/assets/smart-storage-bg.jpg')" }}
                        />
                        {/* Fallback visual if image missing */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-white opacity-50" />

                        {/* Battery Unit Mockup (CSS only) */}
                        <div className="absolute top-1/2 right-20 -translate-y-1/2 w-48 h-64 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-gray-100">
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full border-4 border-green-100 flex items-center justify-center relative">
                                    <div className="absolute inset-0 border-4 border-green-400 rounded-full border-t-transparent animate-spin-slow" />
                                    <span className="text-3xl font-bold text-gray-800">85%</span>
                                </div>
                            </div>

                            {/* Label */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#4a4a4a] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider whitespace-nowrap">
                                Smart Storage
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 leading-tight">
                            Store Energy for <br />
                            Later Use
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-light">
                            With our smart battery solutions, you can store excess solar energy generated during the day and use it at night or during power cuts.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-medium text-gray-900">24/7</span>
                                <span className="text-gray-500">Power backup</span>
                            </div>
                            <div className="w-px bg-gray-300 mx-4" />
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-medium text-gray-900">100%</span>
                                <span className="text-gray-500">Energy independence</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SmartStorage;
