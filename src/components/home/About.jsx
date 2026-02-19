import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaHeart, FaHandsHelping, FaUsers, 
  FaGlobe, FaRocket, FaAward, FaLeaf, FaBullseye,
  FaEye, FaFlag, FaHandshake, FaChartLine
} from 'react-icons/fa';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: '👩‍💼',
      bio: 'Former election commissioner with 15+ years of experience in democratic processes.',
      social: ['🐦', '💼', '📧']
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Security Lead',
      image: '👨‍💻',
      bio: 'Cybersecurity expert specializing in blockchain and encryption technologies.',
      social: ['🐦', '💻', '📧']
    },
    {
      name: 'Dr. Emily Williams',
      role: 'Head of Policy',
      image: '👩‍⚖️',
      bio: 'Political scientist focused on electoral reform and voter accessibility.',
      social: ['📚', '🐦', '📧']
    },
    {
      name: 'James Rodriguez',
      role: 'Community Manager',
      image: '👨‍💼',
      bio: 'Passionate about voter engagement and community building.',
      social: ['💬', '🐦', '📧']
    }
  ];

  const milestones = [
    { year: '2020', event: 'Platform Founded', icon: '🚀' },
    { year: '2021', event: 'First Major Election', icon: '🗳️' },
    { year: '2022', event: 'Reached 10K Voters', icon: '🎯' },
    { year: '2023', event: 'International Expansion', icon: '🌍' },
    { year: '2024', event: 'Blockchain Integration', icon: '🔗' },
    { year: '2025', event: 'AI Security Upgrade', icon: '🤖' }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Security First',
      description: 'Bank-grade encryption ensures every vote remains confidential and tamper-proof.'
    },
    {
      icon: <FaEye className="text-4xl" />,
      title: 'Transparency',
      description: 'Open-source technology allows public verification of our voting system.'
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'Accessibility',
      description: 'Designed for everyone, regardless of technical expertise or physical ability.'
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: 'Integrity',
      description: 'Unwavering commitment to fair and honest democratic processes.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Our Mission
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              We're on a mission to transform democracy through secure, accessible, 
              and transparent digital voting solutions for the modern world.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50K+', label: 'Active Voters', icon: '👥' },
              { number: '100+', label: 'Elections Held', icon: '🗳️' },
              { number: '15+', label: 'Countries', icon: '🌍' },
              { number: '99.9%', label: 'Uptime', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, our platform emerged from a simple observation: 
                traditional voting systems were struggling to keep pace with our 
                digital world. Long lines, paper waste, accessibility issues, and 
                security concerns were preventing millions from exercising their 
                democratic rights.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We assembled a team of cybersecurity experts, election officials, 
                and user experience designers to create a solution that would make 
                voting as easy as online banking, while maintaining the highest 
                security standards.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we've facilitated over 100 elections across 15 countries, 
                helping organizations and governments conduct secure, transparent, 
                and accessible digital votes.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-900">50+ team members</span> worldwide
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Timeline</h3>
                <div className="space-y-4">
                  {milestones.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-sm opacity-80">{item.year}</span>
                        <p className="font-semibold">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 flex items-center justify-center text-4xl">
                🎯
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-2xl -rotate-12 flex items-center justify-center text-3xl">
                ⭐
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6">
                <FaBullseye />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower every eligible voter with a secure, accessible, and 
                user-friendly platform that ensures their voice is heard and their 
                vote counts. We believe that technology can strengthen democracy 
                by removing barriers to participation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-3xl mb-6">
                <FaEye />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every citizen can participate in democracy effortlessly, 
                where elections are transparent and trustworthy, and where technology 
                serves to unite rather than divide. We envision a future where voting 
                is as simple as sending a message.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate experts dedicated to protecting democracy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                  <div className="text-7xl mb-2 transform group-hover:scale-110 transition-transform">
                    {member.image}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.map((icon, i) => (
                      <button
                        key={i}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <span>{icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted By</h2>
            <p className="text-gray-600">Leading organizations worldwide</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
              >
                <span className="text-2xl font-bold opacity-50">LOGO {i}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Us in Shaping the Future of Democracy
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you're an organization looking to run secure elections or a voter 
              wanting to make your voice heard, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Start Voting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;