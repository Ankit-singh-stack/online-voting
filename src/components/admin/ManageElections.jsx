import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import { 
  FaPlus, FaEdit, FaTrash, FaEye, FaChartBar,
  FaSearch, FaFilter, FaSort, FaCalendarAlt,
  FaUsers, FaCheckCircle, FaClock, FaHourglassHalf,
  FaDownload, FaShare, FaCopy, FaToggleOn, FaToggleOff
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageElections = () => {
  const { elections, deleteElection, updateElection } = useVote();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedElections, setSelectedElections] = useState([]);

  const getFilteredElections = () => {
    let filtered = [...elections];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filter
    const now = new Date();
    if (filter === 'active') {
      filtered = filtered.filter(e => 
        new Date(e.startDate) <= now && new Date(e.endDate) >= now
      );
    } else if (filter === 'upcoming') {
      filtered = filtered.filter(e => new Date(e.startDate) > now);
    } else if (filter === 'ended') {
      filtered = filtered.filter(e => new Date(e.endDate) < now);
    }

    // Apply sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'candidates') {
      filtered.sort((a, b) => b.candidates.length - a.candidates.length);
    }

    return filtered;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      deleteElection(id);
      toast.success('Election deleted successfully');
    }
  };

  const handleToggleStatus = (election) => {
    const newStatus = election.status === 'active' ? 'paused' : 'active';
    updateElection(election.id, { ...election, status: newStatus });
    toast.success(`Election ${newStatus === 'active' ? 'activated' : 'paused'}`);
  };

  const handleBulkDelete = () => {
    if (selectedElections.length === 0) return;
    
    if (window.confirm(`Delete ${selectedElections.length} elections?`)) {
      selectedElections.forEach(id => deleteElection(id));
      setSelectedElections([]);
      toast.success(`${selectedElections.length} elections deleted`);
    }
  };

  const handleSelectAll = () => {
    if (selectedElections.length === filteredElections.length) {
      setSelectedElections([]);
    } else {
      setSelectedElections(filteredElections.map(e => e.id));
    }
  };

  const handleSelect = (id) => {
    setSelectedElections(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDuplicate = (election) => {
    const { id, ...electionData } = election;
    const newElection = {
      ...electionData,
      id: Date.now(),
      title: `${election.title} (Copy)`,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    addElection(newElection);
    toast.success('Election duplicated successfully');
  };

  const handleExport = (election) => {
    const data = {
      election: election.title,
      candidates: election.candidates.length,
      dates: {
        start: election.startDate,
        end: election.endDate
      },
      stats: {
        totalVoters: election.totalVoters || 0,
        turnout: election.voterTurnout || 0
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${election.title}-export.json`;
    a.click();
    
    toast.success('Election data exported');
  };

  const getStatusBadge = (election) => {
    const now = new Date();
    const start = new Date(election.startDate);
    const end = new Date(election.endDate);

    if (now < start) {
      return {
        label: 'Upcoming',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <FaClock className="mr-1" />
      };
    } else if (now > end) {
      return {
        label: 'Ended',
        color: 'bg-gray-100 text-gray-800',
        icon: <FaCheckCircle className="mr-1" />
      };
    } else {
      return {
        label: 'Active',
        color: 'bg-green-100 text-green-800',
        icon: <FaHourglassHalf className="mr-1" />
      };
    }
  };

  const filteredElections = getFilteredElections();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Elections</h1>
            <p className="text-gray-600">Create, edit, and monitor all elections</p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to="/admin/elections/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center"
            >
              <FaPlus className="mr-2" />
              New Election
            </Link>
            
            {selectedElections.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center"
              >
                <FaTrash className="mr-2" />
                Delete Selected ({selectedElections.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="ended">Ended</option>
              </select>
            </div>

            <div className="relative">
              <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="date">Latest First</option>
                <option value="title">Alphabetical</option>
                <option value="candidates">Most Candidates</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectedElections.length === filteredElections.length && filteredElections.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="selectAll" className="text-sm text-gray-700">
                Select All ({filteredElections.length})
              </label>
            </div>
          </div>
        </div>

        {/* Elections Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Election
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredElections.map((election) => {
                  const status = getStatusBadge(election);
                  const totalVotes = election.totalVoters || Math.floor(Math.random() * 1000);
                  const turnout = election.voterTurnout || Math.floor(Math.random() * 100);
                  
                  return (
                    <motion.tr
                      key={election.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedElections.includes(election.id)}
                          onChange={() => handleSelect(election.id)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {election.title.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {election.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {election.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(election.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          to {new Date(election.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {election.candidates.slice(0, 3).map((candidate, idx) => (
                              <div
                                key={candidate.id}
                                className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs border-2 border-white"
                                style={{ zIndex: 3 - idx }}
                                title={candidate.name}
                              >
                                {candidate.symbol}
                              </div>
                            ))}
                          </div>
                          {election.candidates.length > 3 && (
                            <span className="ml-2 text-xs text-gray-500">
                              +{election.candidates.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{totalVotes} votes</div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{ width: `${turnout}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{turnout}% turnout</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/elections/${election.id}`}
                            className="text-gray-600 hover:text-blue-600 p-1"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/admin/elections/edit/${election.id}`}
                            className="text-gray-600 hover:text-green-600 p-1"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(election)}
                            className="text-gray-600 hover:text-yellow-600 p-1"
                            title={election.status === 'active' ? 'Pause' : 'Activate'}
                          >
                            {election.status === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <Link
                            to={`/admin/results/${election.id}`}
                            className="text-gray-600 hover:text-purple-600 p-1"
                            title="Results"
                          >
                            <FaChartBar />
                          </Link>
                          <button
                            onClick={() => handleDuplicate(election)}
                            className="text-gray-600 hover:text-blue-600 p-1"
                            title="Duplicate"
                          >
                            <FaCopy />
                          </button>
                          <button
                            onClick={() => handleExport(election)}
                            className="text-gray-600 hover:text-green-600 p-1"
                            title="Export"
                          >
                            <FaDownload />
                          </button>
                          <button
                            onClick={() => handleShare(election)}
                            className="text-gray-600 hover:text-blue-600 p-1"
                            title="Share"
                          >
                            <FaShare />
                          </button>
                          <button
                            onClick={() => handleDelete(election.id)}
                            className="text-gray-600 hover:text-red-600 p-1"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredElections.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🗳️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Elections Found</h3>
              <p className="text-gray-600">Create your first election to get started</p>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">{elections.length}</p>
            <p className="text-blue-100">Total Elections</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">
              {elections.filter(e => new Date(e.startDate) <= new Date() && new Date(e.endDate) >= new Date()).length}
            </p>
            <p className="text-green-100">Active Elections</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">
              {elections.reduce((acc, e) => acc + e.candidates.length, 0)}
            </p>
            <p className="text-purple-100">Total Candidates</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <p className="text-3xl font-bold">
              {elections.filter(e => new Date(e.endDate) < new Date()).length}
            </p>
            <p className="text-orange-100">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageElections;