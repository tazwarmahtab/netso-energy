import { motion } from 'framer-motion';
import { Sun, Armchair, Zap } from 'lucide-react';

const RooftopLounge = () => {
    const features = [
        {
            icon: <Sun className="w-6 h-6" />,
            text: "Stay Protected from the Sun"
        },
        {
            icon: <Armchair className="w-6 h-6" />,
            text: "Create a Rooftop Living Space"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            text: "Produce Your Own Clean Energy"
        }
    ];

    return (
        <section className="w-full bg-white py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-6xl font-medium text-gray-900 mb-12 leading-tight">
                            Transform Your <br />
                            Rooftop into a <br />
                            Solar Lounge
                        </h2>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-3 bg-gray-100 rounded-full text-gray-900 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <span className="text-xl md:text-2xl text-gray-800 font-light">
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Placeholder for the image - using a colored div or a generic solar image if available */}
                        <div
                            className="absolute inset-0 bg-gray-200"
                            style={{
                                backgroundImage: "url('/assets/rooftop-lounge.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        {/* Fallback/Overlay if image is missing or for style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default RooftopLounge;
