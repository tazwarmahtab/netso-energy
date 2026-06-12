import { motion } from 'framer-motion';

const RecentInstallations = () => {
    const installations = [
        {
            title: "Premium Ahaka",
            location: "Preinium, Dhaka",
            system: "5.2 kW system",
            image: "/assets/install-1.jpg"
        },
        {
            title: "Family Home",
            location: "Banani, Dhaka",
            system: "3.8 kW system",
            image: "/assets/install-2.jpg"
        },
        {
            title: "Family Homendi",
            location: "Dhanmondi, Dhaka",
            system: "4.5 kW system",
            image: "/assets/install-3.jpg"
        },
        {
            title: "Premium Apartments",
            location: "Uttara, Dhaka",
            system: "6 kW system",
            image: "/assets/install-4.jpg"
        }
    ];

    return (
        <section className="w-full bg-white py-24">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-medium text-center mb-20 text-gray-900"
                >
                    Recent Installations
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {installations.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-gray-200 transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url('${item.image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-2xl font-medium text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300 text-lg">{item.location}</p>
                                <p className="text-gray-400 mt-1">{item.system}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentInstallations;
