import { useState, useEffect } from 'react';
import { encryptVote, decryptVote, hashVoterId } from '../utils/encryption';
import toast from 'react-hot-toast';

export const useVote = () => {
  const [elections, setElections] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    loadElections();
    loadVotes();
  }, []);

  const loadElections = async () => {
    try {
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: 'Presidential Election 2026',
              description: 'Vote for the next president',
              startDate: '2026-03-01',
              endDate: '2026-03-15',
              status: 'active',
              candidates: [
                { id: 1, name: 'John Doe', party: 'Progressive Party', symbol: '🌿', bio: 'Experienced leader' },
                { id: 2, name: 'Jane Smith', party: 'Unity Party', symbol: '🤝', bio: 'Community organizer' },
                { id: 3, name: 'Bob Johnson', party: 'People\'s Alliance', symbol: '👥', bio: 'Business executive' }
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
                { id: 4, name: 'Alice Brown', party: 'City First', symbol: '🏛️', bio: 'Current council member' },
                { id: 5, name: 'Charlie Wilson', party: 'Urban Development', symbol: '🏗️', bio: 'Urban planner' }
              ]
            }
          ]);
        }, 500);
      });
      
      setElections(response);
    } catch (error) {
      toast.error('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const loadVotes = () => {
    const storedVotes = localStorage.getItem('votes');
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  };

  const saveVotes = (newVotes) => {
    localStorage.setItem('votes', JSON.stringify(newVotes));
    setVotes(newVotes);
  };

  const castVote = async (electionId, candidateId, voterId) => {
    try {
      const hashedVoterId = hashVoterId(voterId.toString());

      // Check for duplicate vote
      const hasVoted = votes.some(
        v => v.electionId === electionId && v.voterHash === hashedVoterId
      );

      if (hasVoted) {
        toast.error('You have already voted in this election!');
        return false;
      }

      const voteData = {
        electionId,
        candidateId,
        timestamp: new Date().toISOString(),
        voterHash: hashedVoterId
      };

      const encryptedVote = encryptVote(voteData);

      const newVote = {
        id: Date.now(),
        encryptedData: encryptedVote,
        electionId,
        candidateId,
        voterHash: hashedVoterId,
        timestamp: new Date().toISOString()
      };

      const updatedVotes = [...votes, newVote];
      saveVotes(updatedVotes);

      toast.success('Your vote has been successfully cast!');
      return true;
    } catch (error) {
      toast.error('Failed to cast vote. Please try again.');
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
    const turnout = Math.floor(Math.random() * 100); // Simulated

    const winner = results.reduce((max, candidate) => 
      candidate.votes > max.votes ? candidate : max
    );

    return {
      election,
      results,
      totalVotes,
      turnout,
      winner
    };
  };

  const addElection = (election) => {
    const updatedElections = [...elections, election];
    setElections(updatedElections);
    // In production, this would be an API call
    localStorage.setItem('elections', JSON.stringify(updatedElections));
  };

  const updateElection = (id, updatedData) => {
    const updatedElections = elections.map(e => 
      e.id === id ? { ...e, ...updatedData } : e
    );
    setElections(updatedElections);
    localStorage.setItem('elections', JSON.stringify(updatedElections));
  };

  const deleteElection = (id) => {
    const updatedElections = elections.filter(e => e.id !== id);
    setElections(updatedElections);
    localStorage.setItem('elections', JSON.stringify(updatedElections));
  };

  const addCandidate = (electionId, candidate) => {
    const updatedElections = elections.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          candidates: [...e.candidates, candidate]
        };
      }
      return e;
    });
    setElections(updatedElections);
    localStorage.setItem('elections', JSON.stringify(updatedElections));
  };

  const removeCandidate = (electionId, candidateId) => {
    const updatedElections = elections.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          candidates: e.candidates.filter(c => c.id !== candidateId)
        };
      }
      return e;
    });
    setElections(updatedElections);
    localStorage.setItem('elections', JSON.stringify(updatedElections));
  };

  return {
    elections,
    votes,
    loading,
    castVote,
    getElectionResults,
    addElection,
    updateElection,
    deleteElection,
    addCandidate,
    removeCandidate
  };
};