import React, { useState } from 'react';
import { useVote } from '../../context/VoteContext';
import { FaPlus, FaTrash, FaUserPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageCandidates = () => {
  const { elections, addCandidate, removeCandidate } = useVote();
  const [selectedElection, setSelectedElection] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    symbol: '',
    bio: ''
  });

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!selectedElection) {
      toast.error('Please select an election');
      return;
    }

    addCandidate(parseInt(selectedElection), {
      id: Date.now(),
      ...formData
    });
    
    toast.success('Candidate added successfully');
    setShowForm(false);
    setFormData({
      name: '',
      party: '',
      symbol: '',
      bio: ''
    });
  };

  const handleRemoveCandidate = (electionId, candidateId) => {
    if (window.confirm('Are you sure you want to remove this candidate?')) {
      removeCandidate(electionId, candidateId);
      toast.success('Candidate removed successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Candidates</h1>

        {/* Election Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Election
          </label>
          <select
            value={selectedElection}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="input-field"
          >
            <option value="">Choose an election</option>
            {elections.map(election => (
              <option key={election.id} value={election.id}>
                {election.title}
              </option>
            ))}
          </select>
        </div>

        {selectedElection && (
          <>
            {/* Add Candidate Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Add Candidate
              </button>
            </div>

            {/* Add Candidate Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Candidate</h2>
                <form onSubmit={handleAddCandidate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="input-field"
                        placeholder="Enter candidate name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Party
                      </label>
                      <input
                        type="text"
                        value={formData.party}
                        onChange={(e) => setFormData({...formData, party: e.target.value})}
                        required
                        className="input-field"
                        placeholder="Enter party name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Symbol (Emoji)
                      </label>
                      <input
                        type="text"
                        value={formData.symbol}
                        onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                        required
                        className="input-field"
                        placeholder="Enter symbol emoji"
                        maxLength="2"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Biography
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        required
                        className="input-field"
                        rows="3"
                        placeholder="Enter candidate biography"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Add Candidate
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Candidates List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 p-6 border-b">
                Candidates List
              </h2>
              
              {elections
                .find(e => e.id === parseInt(selectedElection))
                ?.candidates.map(candidate => (
                  <div key={candidate.id} className="p-6 border-b last:border-0 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{candidate.symbol}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-600">{candidate.party}</p>
                        {candidate.bio && (
                          <p className="text-sm text-gray-500 mt-1">{candidate.bio}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCandidate(parseInt(selectedElection), candidate.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCandidates;