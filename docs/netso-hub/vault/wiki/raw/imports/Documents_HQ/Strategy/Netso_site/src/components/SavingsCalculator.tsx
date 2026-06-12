import { useState } from 'react';
import { motion } from 'framer-motion';

const SavingsCalculator = () => {
    const [bill, setBill] = useState(2000);

    // Simple calculation logic for demo purposes
    const systemSize = (bill / 1500).toFixed(1); // Approx 1.5kW per 2000tk bill
    const emi = Math.round(bill * 0.8).toLocaleString(); // EMI slightly less than bill
    const savings = (bill * 12 * 10 * 0.9).toLocaleString(); // 10 year savings approx

    return (
        <section className="w-full bg-gradient-to-br from-blue-50 to-white py-24 flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-medium text-gray-900 mb-6"
                >
                    See Your Savings
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto font-light"
                >
                    Adjust your monthly electricity bill to estimate potential savings with a solar installation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center"
                >
                    {/* Left: Input */}
                    <div className="flex-1 w-full text-left">
                        <label className="text-2xl font-medium text-gray-900 mb-8 block">
                            Monthly Bill
                        </label>

                        <div className="relative mb-4 pt-6">
                            <input
                                type="range"
                                min="2000"
                                max="20000"
                                step="500"
                                value={bill}
                                onChange={(e) => setBill(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        <div className="flex justify-between text-gray-500 font-medium mt-4">
                            <span>৳2,000</span>
                            <span>20,000</span>
                        </div>

                        <div className="mt-10 flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                            <button className="px-6 py-2 rounded-lg bg-white shadow-sm text-gray-900 font-medium text-sm">Home</button>
                            <button className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-200/50 transition-colors font-medium text-sm">Apartment</button>
                            <button className="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-200/50 transition-colors font-medium text-sm">Commercial</button>
                        </div>
                    </div>

                    {/* Right: Result Card */}
                    <div className="w-full md:w-80 bg-[#1e293b] text-white rounded-3xl p-8 text-left shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mb-8">
                                <div className="text-gray-400 text-sm mb-1">Recommended System</div>
                                <div className="text-4xl font-medium">{systemSize} kW</div>
                            </div>

                            <div className="mb-8">
                                <div className="text-gray-400 text-sm mb-1">Estimated EMI</div>
                                <div className="text-2xl font-medium">৳ {emi} <span className="text-sm text-gray-400 font-normal">/ month</span></div>
                            </div>

                            <div>
                                <div className="text-gray-400 text-sm mb-1">Estimated Savings</div>
                                <div className="text-3xl font-medium">৳ {savings}</div>
                                <div className="text-sm text-gray-400 mt-1">over 10 years</div>
                            </div>
                        </div>

                        {/* Decorative gradient blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default SavingsCalculator;
