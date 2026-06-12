import { motion } from 'framer-motion';

const PassiveIncome = () => {
    return (
        <section className="w-full bg-gradient-to-b from-[#fdfbf7] to-white py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block bg-[#8B5E3C] text-white px-4 py-2 rounded-lg text-sm font-medium mb-6 uppercase tracking-wider">
                            Passive Income
                        </div>
                        <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-8 leading-tight">
                            Earn from Your <br />
                            Rooftop
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-light">
                            Connect your solar system to the national grid. Any excess energy you produce is sold back, earning you credits or cash.
                        </p>

                        <button className="text-blue-600 font-medium text-lg hover:gap-2 transition-all flex items-center gap-1">
                            Learn about Net Metering <span className="text-xl">→</span>
                        </button>
                    </motion.div>

                    {/* Right Content - Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/assets/passive-income-bg.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Floating Coins Animation */}
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                                className={`absolute w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200
                        ${i === 1 ? 'top-1/4 right-1/4' : i === 2 ? 'top-1/2 right-1/3' : 'bottom-1/3 right-1/4'}
                    `}
                            >
                                <span className="text-2xl font-bold text-yellow-800">৳</span>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PassiveIncome;
