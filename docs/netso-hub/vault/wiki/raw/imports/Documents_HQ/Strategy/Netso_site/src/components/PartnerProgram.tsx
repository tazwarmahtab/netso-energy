import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const PartnerProgram = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const cards = [
        {
            title: "For Developers",
            description: "Add solar lounges to your projects",
            delay: 0.1
        },
        {
            title: "For Installers",
            description: "Become a certified NETSO Pro",
            delay: 0.2
        },
        {
            title: "For Landlords",
            description: "Earn a new source of revenue",
            delay: 0.3
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full min-h-[800px] flex items-center overflow-hidden py-24">
            {/* Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/partner-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 leading-tight">
                            Partner with <br />
                            NETSO
                        </h2>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all flex items-center gap-2">
                            Join Partner Program <ArrowRight size={20} />
                        </button>
                    </motion.div>

                    {/* Right Content - Cards */}
                    <div className="flex flex-col gap-6">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: card.delay }}
                                className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer group"
                            >
                                <h3 className="text-2xl font-medium text-white mb-2">{card.title}</h3>
                                <p className="text-gray-300 text-lg group-hover:text-white transition-colors">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PartnerProgram;
