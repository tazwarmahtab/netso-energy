import { motion } from 'framer-motion';
import { MapPin, PenTool, Hammer, Smartphone } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Site Assessment",
            description: "We analyze your roof using satellite data and on-site checks."
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            title: "Custom Design & EMI Plan",
            description: "Get a tailored solar design and flexible payment options."
        },
        {
            icon: <Hammer className="w-8 h-8" />,
            title: "Premium Installation",
            description: "Expert installation with high-quality materials and safety standards."
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Smart Monitoring & Support",
            description: "Track your energy production 24/7 with our smart app."
        }
    ];

    return (
        <section className="w-full bg-gray-50 py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-medium text-center mb-16"
                >
                    How It Works
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
