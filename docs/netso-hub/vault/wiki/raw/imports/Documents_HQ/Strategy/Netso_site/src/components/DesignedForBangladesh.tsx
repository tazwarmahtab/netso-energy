import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, TrendingUp, Home } from 'lucide-react';
import { useRef } from 'react';

const DesignedForBangladesh = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const features = [
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Frequent Power Cuts?",
            delay: 0.1
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            title: "Rising Bills?",
            delay: 0.2
        },
        {
            icon: <Home className="w-8 h-8 text-white" />,
            title: "Unused Rooftop Space?",
            delay: 0.3
        }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black text-white py-24">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 bg-[url('/assets/dhaka-rooftops.jpg')] bg-cover bg-center opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center min-h-[80vh]">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-5xl md:text-7xl font-medium mb-8 leading-tight">
                            Designed for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                Bangladesh
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-xl">
                            In a country with scorching heat, frequent load-shedding, and increasing electricity prices, we've built the perfect solution.
                        </p>
                    </motion.div>

                    {/* Right Content - Feature Cards */}
                    <div className="flex flex-col gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: feature.delay, ease: "easeOut" }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-6 hover:bg-white/10 transition-colors group cursor-default"
                            >
                                <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <span className="text-xl md:text-2xl font-medium text-gray-100">
                                    {feature.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DesignedForBangladesh;
