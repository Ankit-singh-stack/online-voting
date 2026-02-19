import React from 'react';
import { motion } from 'framer-motion';
import { useVote } from '../../context/VoteContext';
import { FaCalendarAlt, FaClock, FaBell } from 'react-icons/fa';

const UpcomingElections = () => {
  const { elections } = useVote();

  const getUpcomingElections = () => {
    const now = new Date();
    return elections
      .filter(election => new Date(election.startDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  const upcomingElections = getUpcomingElections();

  const getTimeUntil = (date) => {
    const target = new Date(date);
    const now = new Date();
    const diff = target - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `Starts in ${days} day${days > 1 ? 's' : ''}`;
    } else {
      return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Elections</h1>
          <p className="text-xl text-gray-600">Prepare for future elections</p>
        </motion.div>

        {upcomingElections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Elections</h3>
            <p className="text-gray-600">Check back later for new elections</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {upcomingElections.map((election, index) => (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <FaClock className="mr-1" />
                        {getTimeUntil(election.startDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-4">{election.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>Starts: {new Date(election.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2 text-red-500" />
                        <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="font-semibold text-gray-900">{election.candidates.length}</span>
                        <span className="ml-1">Candidates</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center">
                      <FaBell className="mr-2" />
                      Remind Me
                    </button>
                  </div>
                </div>

                {/* Candidates Preview */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {election.candidates.slice(0, 5).map((candidate, idx) => (
                        <div
                          key={candidate.id}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-lg border-2 border-white"
                          style={{ zIndex: election.candidates.length - idx }}
                          title={candidate.name}
                        >
                          {candidate.symbol}
                        </div>
                      ))}
                      {election.candidates.length > 5 && (
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold border-2 border-white">
                          +{election.candidates.length - 5}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {election.candidates.length} candidates registered
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingElections;