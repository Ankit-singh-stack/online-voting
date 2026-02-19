import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaRocket, FaChartBar, FaUsers, 
  FaLock, FaGlobe, FaMobile, FaCheckCircle 
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Bank-Grade Security',
      description: 'End-to-end encryption ensures your vote remains confidential and tamper-proof.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Cast your vote in seconds with our optimized and responsive platform.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FaChartBar className="w-8 h-8" />,
      title: 'Real-time Results',
      description: 'Watch election results unfold in real-time with interactive charts.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Voter Management',
      description: 'Easy voter registration and verification system with unique IDs.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: 'Duplicate Prevention',
      description: 'Advanced algorithms prevent duplicate voting and ensure fairness.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: 'Remote Access',
      description: 'Vote from anywhere in the world with our global accessibility.',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with user-friendly design to create 
            the most secure and accessible voting platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              <div className={`inline-block p-4 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;