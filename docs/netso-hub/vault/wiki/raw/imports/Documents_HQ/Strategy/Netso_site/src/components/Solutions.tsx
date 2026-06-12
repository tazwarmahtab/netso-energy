import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Solutions = () => {
    const solutions = [
        {
            title: "Premium Apartments",
            description: "Transform your rooftop rooftop into a solar lounge.",
            image: "/assets/solution-apartment.jpg"
        },
        {
            title: "Family Homes",
            description: "Install solar panels to power your home and shade your rooftop.",
            image: "/assets/solution-home.jpg"
        },
        {
            title: "Cafés & Rooftop Restaurants",
            description: "Create a unique dining experience with sustainable energy.",
            image: "/assets/solution-cafe.jpg"
        },
        {
            title: "Offices & SMEs",
            description: "Cut costs and secure your energy independence.",
            image: "/assets/solution-office.jpg"
        }
    ];

    return (
        <section className="w-full bg-white py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-medium text-center mb-16"
                >
                    Solutions
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-80 rounded-3xl overflow-hidden mb-6">
                                <div
                                    className="absolute inset-0 bg-gray-200 transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url('${solution.image}')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-medium mb-3 text-gray-900">
                                {solution.title}
                            </h3>
                            <p className="text-gray-600 text-lg mb-4 font-light leading-relaxed">
                                {solution.description}
                            </p>

                            <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                                Learn More <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
