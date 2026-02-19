import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, FaVoteYea, FaChartBar, FaUsers, 
  FaLock, FaGlobe, FaMobile, FaCheckCircle,
  FaArrowRight, FaPlayCircle 
} from 'react-icons/fa';
import HeroSection from '../common/HeroSection';
import Features from '../common/Features';
import Testimonials from '../common/Testimonials';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <Features />
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and transparent voting process in three easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register',
                description: 'Create your account with your voter ID and verify your identity',
                icon: '📝',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Verify & Login',
                description: 'Secure login with encrypted credentials and two-factor authentication',
                icon: '🔐',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Cast Your Vote',
                description: 'Choose your candidate and submit your encrypted vote securely',
                icon: '🗳️',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow`}>
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold opacity-20 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Voters', icon: '👥' },
              { number: '50+', label: 'Elections Held', icon: '🗳️' },
              { number: '100%', label: 'Secure', icon: '🔒' },
              { number: '24/7', label: 'Support', icon: '📞' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Make Your Voice Heard?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of voters who trust our secure platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                Get Started Now
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
              <button
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                <FaPlayCircle className="mr-2" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;