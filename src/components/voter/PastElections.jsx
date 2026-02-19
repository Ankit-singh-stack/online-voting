import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useVote } from '../../context/VoteContext';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, FaChartBar, FaCalendarCheck, 
  FaDownload, FaShare, FaEye 
} from 'react-icons/fa';

const PastElections = () => {
  const { elections, votes, getElectionResults } = useVote();
  const [selectedYear, setSelectedYear] = useState('all');

  const getPastElections = () => {
    const now = new Date();
    return elections
      .filter(election => new Date(election.endDate) < now)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  };

  const pastElections = getPastElections();
  const years = ['all', ...new Set(pastElections.map(e => new Date(e.endDate).getFullYear()))];

  const filteredElections = selectedYear === 'all' 
    ? pastElections 
    : pastElections.filter(e => new Date(e.endDate).getFullYear() === parseInt(selectedYear));

  const getVoteCount = (electionId) => {
    return votes.filter(v => v.electionId === electionId).length;
  };

  const getWinner = (electionId) => {
    const results = getElectionResults(electionId);
    if (results && results.results.length > 0) {
      return results.results.reduce((max, c) => c.votes > max.votes ? c : max);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Past Elections</h1>
          <p className="text-xl text-gray-600">View historical election results</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year === 'all' ? 'All Years' : year}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Elections Grid */}
        {filteredElections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Past Elections</h3>
            <p className="text-gray-600">Historical data will appear here</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredElections.map((election, index) => {
              const winner = getWinner(election.id);
              const voteCount = getVoteCount(election.id);
              
              return (
                <motion.div
                  key={election.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <FaCalendarCheck className="mr-1" />
                            Ended {new Date(election.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{election.title}</h3>
                        <p className="text-gray-600 mb-4">{election.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-blue-50 rounded-xl p-3">
                            <p className="text-sm text-blue-600 mb-1">Total Votes</p>
                            <p className="text-2xl font-bold text-blue-700">{voteCount}</p>
                          </div>
                          <div className="bg-green-50 rounded-xl p-3">
                            <p className="text-sm text-green-600 mb-1">Voter Turnout</p>
                            <p className="text-2xl font-bold text-green-700">
                              {Math.floor((voteCount / 1000) * 100)}%
                            </p>
                          </div>
                          {winner && (
                            <div className="bg-purple-50 rounded-xl p-3">
                              <p className="text-sm text-purple-600 mb-1">Winner</p>
                              <p className="text-lg font-bold text-purple-700">
                                {winner.name} {winner.symbol}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
                        <Link
                          to={`/results/${election.id}`}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        >
                          <FaChartBar className="mr-2" />
                          View Results
                        </Link>
                        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                          <FaDownload className="mr-2" />
                          Download Report
                        </button>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{election.candidates.length}</div>
                          <div className="text-sm text-gray-500">Candidates</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {Math.floor(voteCount / election.candidates.length)}
                          </div>
                          <div className="text-sm text-gray-500">Avg Votes/Candidate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {winner?.votes || 0}
                          </div>
                          <div className="text-sm text-gray-500">Winner's Votes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {Math.floor((voteCount / (voteCount + 100)) * 100)}%
                          </div>
                          <div className="text-sm text-gray-500">Participation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastElections;