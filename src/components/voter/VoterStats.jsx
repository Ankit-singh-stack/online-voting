import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useVote } from '../../context/VoteContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  FaChartLine, FaChartPie, FaChartBar, 
  FaCalendarAlt, FaVoteYea, FaUsers,
  FaTrophy, FaPercentage 
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const VoterStats = () => {
  const { user } = useAuth();
  const { elections, votes } = useVote();

  // Get user's voting statistics
  const userVotes = votes.filter(v => v.voterHash === user?.id?.toString());
  const participatedElections = new Set(userVotes.map(v => v.electionId));
  
  // Calculate stats
  const totalElections = elections.length;
  const participationRate = totalElections > 0 
    ? (participatedElections.size / totalElections * 100).toFixed(1) 
    : 0;

  // Monthly activity data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyVotes = months.map((_, index) => {
    return userVotes.filter(v => new Date(v.timestamp).getMonth() === index).length;
  });

  // Party preference data
  const partyVotes = {};
  userVotes.forEach(vote => {
    const election = elections.find(e => e.id === vote.electionId);
    const candidate = election?.candidates.find(c => c.id === vote.candidateId);
    if (candidate) {
      partyVotes[candidate.party] = (partyVotes[candidate.party] || 0) + 1;
    }
  });

  const chartData = {
    monthlyActivity: {
      labels: months,
      datasets: [
        {
          label: 'Votes Cast',
          data: monthlyVotes,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    partyPreference: {
      labels: Object.keys(partyVotes),
      datasets: [
        {
          data: Object.values(partyVotes),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderWidth: 0
        }
      ]
    },
    participation: {
      labels: ['Participated', 'Not Participated'],
      datasets: [
        {
          data: [participatedElections.size, totalElections - participatedElections.size],
          backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(229, 231, 235, 0.8)'],
          borderWidth: 0
        }
      ]
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Voting Statistics</h1>
          <p className="text-xl text-gray-600">Track your voting patterns and engagement</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white"
          >
            <FaVoteYea className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">{userVotes.length}</p>
            <p className="text-blue-100">Total Votes Cast</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white"
          >
            <FaUsers className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">{participatedElections.size}</p>
            <p className="text-green-100">Elections Participated</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
          >
            <FaPercentage className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">{participationRate}%</p>
            <p className="text-purple-100">Participation Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white"
          >
            <FaTrophy className="text-3xl mb-3" />
            <p className="text-4xl font-bold mb-1">
              {userVotes.length > 0 
                ? Object.values(partyVotes).reduce((a, b) => Math.max(a, b), 0)
                : 0}
            </p>
            <p className="text-orange-100">Most Voted Party</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <FaChartLine className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Monthly Voting Activity</h2>
            </div>
            <div className="h-80">
              <Line data={chartData.monthlyActivity} options={chartOptions} />
            </div>
          </motion.div>

          {/* Party Preference Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <FaChartPie className="text-2xl text-purple-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Party Preference</h2>
            </div>
            <div className="h-80">
              <Pie data={chartData.partyPreference} options={chartOptions} />
            </div>
          </motion.div>

          {/* Participation Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <FaChartBar className="text-2xl text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Election Participation</h2>
            </div>
            <div className="h-80">
              <Pie data={chartData.participation} options={chartOptions} />
            </div>
          </motion.div>

          {/* Voting Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <FaCalendarAlt className="text-2xl text-orange-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Voting Insights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Average Votes per Election</p>
                <p className="text-2xl font-bold text-gray-900">
                  {participatedElections.size > 0 
                    ? (userVotes.length / participatedElections.size).toFixed(1)
                    : 0}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">First Vote</p>
                <p className="text-lg font-semibold text-gray-900">
                  {userVotes.length > 0 
                    ? new Date(userVotes[0].timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">Most Active Month</p>
                <p className="text-lg font-semibold text-gray-900">
                  {monthlyVotes.indexOf(Math.max(...monthlyVotes)) !== -1
                    ? months[monthlyVotes.indexOf(Math.max(...monthlyVotes))]
                    : 'N/A'}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                <p className="text-sm opacity-90 mb-1">Voting Streak</p>
                <p className="text-2xl font-bold">
                  {userVotes.length} consecutive votes
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🗳️', title: 'First Vote', achieved: userVotes.length > 0 },
              { icon: '🌟', title: 'Active Voter', achieved: userVotes.length >= 5 },
              { icon: '🏆', title: 'Election Master', achieved: participatedElections.size >= 3 },
              { icon: '📊', title: 'Data Contributor', achieved: userVotes.length > 0 },
            ].map((badge, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-xl ${
                  badge.achieved 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-sm font-semibold">{badge.title}</p>
                {badge.achieved && (
                  <p className="text-xs mt-1 opacity-80">✓ Unlocked</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterStats;