import React, { createContext, useContext, useState } from 'react';
import { encryptVote, hashVoterId } from '../utils/encryption';
import toast from 'react-hot-toast';

const VoteContext = createContext();

export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
};

export const VoteProvider = ({ children }) => {
  const [elections, setElections] = useState([
    {
      id: 1,
      title: 'Presidential Election 2026',
      description: 'Vote for the next president',
      startDate: '2026-03-01',
      endDate: '2026-03-15',
      status: 'active',
      candidates: [
        { id: 1, name: 'John Doe', party: 'Progressive Party', symbol: '🌿' },
        { id: 2, name: 'Jane Smith', party: 'Unity Party', symbol: '🤝' },
        { id: 3, name: 'Bob Johnson', party: 'People\'s Alliance', symbol: '👥' }
      ]
    },
    {
      id: 2,
      title: 'City Mayor Election',
      description: 'Choose your city mayor',
      startDate: '2026-04-01',
      endDate: '2026-04-15',
      status: 'upcoming',
      candidates: [
        { id: 4, name: 'Alice Brown', party: 'City First', symbol: '🏛️' },
        { id: 5, name: 'Charlie Wilson', party: 'Urban Development', symbol: '🏗️' }
      ]
    }
  ]);

  const [votes, setVotes] = useState([]);

  const castVote = async (electionId, candidateId, voterId) => {
    try {
      // Hash voter ID for anonymity
      const hashedVoterId = hashVoterId(voterId.toString());

      // Check if voter has already voted in this election
      const hasVoted = votes.some(
        v => v.electionId === electionId && v.voterHash === hashedVoterId
      );

      if (hasVoted) {
        toast.error('You have already voted in this election!');
        return false;
      }

      // Create vote object
      const voteData = {
        electionId,
        candidateId,
        timestamp: new Date().toISOString(),
        voterHash: hashedVoterId
      };

      // Encrypt the vote
      const encryptedVote = encryptVote(voteData);

      // Store encrypted vote (simulate API call)
      setVotes(prev => [...prev, {
        id: Date.now(),
        encryptedData: encryptedVote,
        electionId,
        candidateId,
        voterHash: hashedVoterId
      }]);

      toast.success('Your vote has been successfully cast!');
      return true;
    } catch (error) {
      toast.error('Failed to cast vote. Please try again.');
      console.error('Vote casting error:', error);
      return false;
    }
  };

  const getElectionResults = (electionId) => {
    const electionVotes = votes.filter(v => v.electionId === electionId);
    const election = elections.find(e => e.id === electionId);
    
    if (!election) return null;

    const results = election.candidates.map(candidate => ({
      ...candidate,
      votes: electionVotes.filter(v => v.candidateId === candidate.id).length
    }));

    const totalVotes = electionVotes.length;

    return {
      election,
      results,
      totalVotes,
      turnout: Math.floor(Math.random() * 100) // Simulated turnout percentage
    };
  };

  const value = {
    elections,
    votes,
    castVote,
    getElectionResults
  };

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
};