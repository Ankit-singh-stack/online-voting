import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useVote } from '../../context/VoteContext';
import { Link } from 'react-router-dom';
import { FaVoteYea, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const VoterDashboard = () => {
  const { user } = useAuth();
  const { elections } = useVote();

  const getElectionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return { status: 'upcoming', color: 'yellow', icon: FaClock };
    if (now > end) return { status: 'ended', color: 'red', icon: FaCheckCircle };
    return { status: 'active', color: 'green', icon: FaVoteYea };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Your voter ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user?.id}</span>
          </p>
        </div>

        {/* Active Elections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Elections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections
              .filter(e => getElectionStatus(e.startDate, e.endDate).status === 'active')
              .map(election => {
                const { icon: Icon, color } = getElectionStatus(election.startDate, election.endDate);
                return (
                  <div key={election.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{election.title}</h3>
                        <Icon className={`h-6 w-6 text-${color}-500`} />
                      </div>
                      <p className="text-gray-600 mb-4">{election.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FaCalendarAlt className="h-4 w-4 mr-2" />
                        <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
                      </div>
                      <Link
                        to={`/vote/${election.id}`}
                        className="btn-primary w-full text-center block"
                      >
                        Cast Your Vote
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Upcoming Elections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Elections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections
              .filter(e => getElectionStatus(e.startDate, e.endDate).status === 'upcoming')
              .map(election => (
                <div key={election.id} className="bg-white rounded-lg shadow-lg opacity-75">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-4">{election.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="h-4 w-4 mr-2" />
                      <span>Starts: {new Date(election.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;