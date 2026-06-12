import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
    const [activeTab, setActiveTab] = useState('Home');

    return (
        <section className="w-full bg-gradient-to-b from-white to-blue-50 py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-medium text-gray-900 mb-6"
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 font-light"
                    >
                        All inclusive from the premium Bangladeshi solar brand NETSO.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Standard Plan Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-3xl font-medium text-gray-900 mb-2">NETSO Standard</h3>
                            <p className="text-gray-500 mb-8">3.5 kW System (ideal for apartments)</p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Flat pergola installation",
                                    "Smart battery (optional)",
                                    "Monitoring app included",
                                    "Netso Pro installation warranty"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="mb-2">
                                <span className="text-blue-600 font-medium text-2xl">BDT 3,499</span>
                                <span className="text-gray-500"> / month (EMI)</span>
                            </div>
                            <div className="text-gray-400 text-sm mb-8">or BDT 3,30,000 cash price</div>

                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                                Get Pricing <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Decorative Image/Gradient at bottom right */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
                    </motion.div>

                    {/* EMI Plans Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-3xl font-medium text-gray-900">EMI Plans</h3>
                            <div className="bg-gray-100 px-4 py-2 rounded-xl text-right">
                                <div className="text-xs text-gray-500">Recommended system:</div>
                                <div className="text-xl font-semibold text-gray-900">3.5 kW</div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-xl w-fit mb-10">
                            {['Apartment', 'Home', 'Commercial'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 mb-8">
                            <div className="mb-6 pb-6 border-b border-blue-100">
                                <div className="text-gray-900 font-medium mb-2">Estimated EMI</div>
                                <div className="text-4xl font-medium text-gray-900">
                                    BDT 3,499 <span className="text-lg text-gray-500 font-normal">/ month</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-gray-900 font-medium mb-2">Estimated Savings</div>
                                <div className="text-3xl font-medium text-blue-700">
                                    BDT 1,20,000 <span className="text-lg text-gray-500 font-normal">over 10 years</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-[#1e293b] hover:bg-black text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                            Book a Free Roof Assessment <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" /> NESCO / DESCO compatible
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" /> Rajuk friendly rooftop design
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" /> Safety certified Netso Pro installers
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gray-400" /> Load-shedding resistant systems
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
