import React from 'react';
import { useVote } from '../../context/VoteContext';
import { Link } from 'react-router-dom';
import { FaUsers, FaVoteYea, FaChartBar, FaPlusCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const { elections, votes } = useVote();

  const stats = {
    totalElections: elections.length,
    activeElections: elections.filter(e => {
      const now = new Date();
      const start = new Date(e.startDate);
      const end = new Date(e.endDate);
      return now >= start && now <= end;
    }).length,
    totalVotes: votes.length,
    totalCandidates: elections.reduce((acc, e) => acc + e.candidates.length, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link to="/admin/elections/new" className="btn-primary flex items-center">
            <FaPlusCircle className="mr-2" />
            New Election
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Elections</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalElections}</p>
              </div>
              <FaVoteYea className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Elections</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeElections}</p>
              </div>
              <FaChartBar className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Votes Cast</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalVotes}</p>
              </div>
              <FaUsers className="h-10 w-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Candidates</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCandidates}</p>
              </div>
              <FaUsers className="h-10 w-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Recent Elections */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Elections</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Election
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {elections.map(election => (
                  <tr key={election.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{election.title}</div>
                      <div className="text-sm text-gray-500">{election.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        new Date() > new Date(election.endDate)
                          ? 'bg-red-100 text-red-800'
                          : new Date() < new Date(election.startDate)
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {new Date() > new Date(election.endDate)
                          ? 'Ended'
                          : new Date() < new Date(election.startDate)
                          ? 'Upcoming'
                          : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(election.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(election.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/admin/elections/${election.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin/results/${election.id}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Results
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;