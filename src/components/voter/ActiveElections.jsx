import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVote } from '../../context/VoteContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FaVoteYea, FaClock, FaCalendarAlt, FaUsers, 
  FaSearch, FaFilter, FaSort, FaCheckCircle,
  FaHourglassHalf 
} from 'react-icons/fa';

const ActiveElections = () => {
  const { elections } = useVote();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('endDate');

  const getActiveElections = () => {
    const now = new Date();
    return elections.filter(election => {
      const start = new Date(election.startDate);
      const end = new Date(election.endDate);
      return now >= start && now <= end;
    });
  };

  const filteredElections = getActiveElections()
    .filter(election => 
      election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      election.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'endDate') {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      return a.title.localeCompare(b.title);
    });

  const getTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else {
      return 'Ending soon';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Active Elections</h1>
          <p className="text-xl text-gray-600">Cast your vote in ongoing elections</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search elections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Elections</option>
                <option value="participating">I'm Participating</option>
                <option value="available">Available to Vote</option>
              </select>
            </div>

            <div className="relative">
              <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="endDate">Ending Soon</option>
                <option value="title">Alphabetical</option>
                <option value="candidates">Most Candidates</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Elections Grid */}
        {filteredElections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Elections</h3>
            <p className="text-gray-600">Check back later for upcoming elections</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredElections.map((election, index) => (
                <motion.div
                  key={election.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <FaHourglassHalf className="mr-1" />
                        Active
                      </span>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{election.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{election.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2 text-blue-500" />
                          <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaUsers className="mr-2 text-green-500" />
                          <span>{election.candidates.length} Candidates</span>
                        </div>
                        <div className="flex items-center text-sm font-medium text-orange-500">
                          <FaClock className="mr-2" />
                          <span>{getTimeRemaining(election.endDate)}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex -space-x-2 overflow-hidden">
                          {election.candidates.slice(0, 4).map((candidate, idx) => (
                            <div
                              key={candidate.id}
                              className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold border-2 border-white"
                              style={{ zIndex: election.candidates.length - idx }}
                            >
                              {candidate.symbol}
                            </div>
                          ))}
                          {election.candidates.length > 4 && (
                            <div className="inline-block w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold border-2 border-white">
                              +{election.candidates.length - 4}
                            </div>
                          )}
                        </div>

                        <Link
                          to={`/vote/${election.id}`}
                          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          Cast Your Vote
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{filteredElections.length}</div>
              <div className="text-blue-100">Active Elections</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {filteredElections.reduce((acc, e) => acc + e.candidates.length, 0)}
              </div>
              <div className="text-blue-100">Total Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Secure Voting</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveElections;