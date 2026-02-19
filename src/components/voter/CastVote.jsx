import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import { useAuth } from '../../context/AuthContext';
import { FaCheck, FaShieldAlt } from 'react-icons/fa';

const CastVote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { elections, castVote } = useVote();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const election = elections.find(e => e.id === parseInt(id));

  if (!election) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Election not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 btn-primary"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    setIsSubmitting(true);
    const success = await castVote(election.id, selectedCandidate, user.id);
    setIsSubmitting(false);

    if (success) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
          <div className="flex items-center">
            <FaShieldAlt className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-blue-700">
                Your vote is encrypted and anonymous. No one can see how you voted.
              </p>
            </div>
          </div>
        </div>

        {/* Election Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
          <p className="text-gray-600">{election.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Ends: {new Date(election.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Candidates */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Candidate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {election.candidates.map(candidate => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 ${
                  selectedCandidate === candidate.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{candidate.symbol}</span>
                  {selectedCandidate === candidate.id && (
                    <FaCheck className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedCandidate || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Casting Vote...' : 'Cast Your Vote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CastVote;