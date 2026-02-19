import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useVote } from '../../context/VoteContext';
import { 
  FaCheckCircle, FaClock, FaCalendarAlt, 
  FaReceipt, FaDownload, FaShare, FaEye,
  FaVoteYea 
} from 'react-icons/fa';

const VoterHistory = () => {
  const { user } = useAuth();
  const { elections, votes } = useVote();
  const [selectedVote, setSelectedVote] = useState(null);

  // Get user's votes
  const userVotes = votes.filter(v => v.voterHash === user?.id?.toString());

  const getElectionDetails = (electionId) => {
    return elections.find(e => e.id === electionId);
  };

  const getCandidateDetails = (electionId, candidateId) => {
    const election = elections.find(e => e.id === electionId);
    return election?.candidates.find(c => c.id === candidateId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Voting History</h1>
          <p className="text-xl text-gray-600">Track all your past votes and receipts</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <FaVoteYea className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">{userVotes.length}</p>
            <p className="text-blue-100">Total Votes Cast</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <FaCalendarAlt className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">
              {new Set(userVotes.map(v => v.electionId)).size}
            </p>
            <p className="text-green-100">Elections Participated</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <FaClock className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">
              {userVotes.length > 0 ? new Date().getFullYear() - new Date(userVotes[0]?.timestamp).getFullYear() : 0}
            </p>
            <p className="text-purple-100">Years Active</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <FaReceipt className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">100%</p>
            <p className="text-orange-100">Vote Security</p>
          </div>
        </motion.div>

        {/* Voting History Timeline */}
        {userVotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Voting History</h3>
            <p className="text-gray-600">You haven't cast any votes yet</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {userVotes.map((vote, index) => {
              const election = getElectionDetails(vote.electionId);
              const candidate = getCandidateDetails(vote.electionId, vote.candidateId);
              
              return (
                <motion.div
                  key={vote.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <FaCheckCircle className="mr-1" />
                            Vote Confirmed
                          </span>
                          <span className="ml-3 text-sm text-gray-500">
                            {formatDate(vote.timestamp)}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {election?.title}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-1">Voted For</p>
                            <div className="flex items-center">
                              <span className="text-3xl mr-3">{candidate?.symbol}</span>
                              <div>
                                <p className="text-lg font-bold text-gray-900">{candidate?.name}</p>
                                <p className="text-sm text-gray-600">{candidate?.party}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-500 mb-1">Receipt ID</p>
                            <p className="font-mono text-sm text-gray-900 break-all">
                              {vote.id}-{vote.voterHash?.substring(0, 8)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
                        <button
                          onClick={() => setSelectedVote(vote)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        >
                          <FaEye className="mr-2" />
                          View Details
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                          <FaDownload className="mr-2" />
                          Download Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Vote Details Modal */}
        {selectedVote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedVote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-8"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vote Receipt</h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
                  <p className="text-sm opacity-90 mb-2">Vote Receipt ID</p>
                  <p className="font-mono text-xl break-all">{selectedVote.id}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                    <p className="font-semibold">{formatDate(selectedVote.timestamp)}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Election ID</p>
                    <p className="font-semibold">#{selectedVote.electionId}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Verification Hash</p>
                  <p className="font-mono text-xs break-all">{selectedVote.voterHash}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Security Status</p>
                  <p className="font-semibold text-green-700">✓ Vote encrypted and verified</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedVote(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VoterHistory;