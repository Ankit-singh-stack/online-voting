import React from 'react';
import { useParams } from 'react-router-dom';
import { useVote } from '../../context/VoteContext';
import { FaChartBar, FaUsers, FaPercentage } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Results = () => {
  const { id } = useParams();
  const { getElectionResults } = useVote();
  
  const results = getElectionResults(parseInt(id));

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Results not found</h2>
        </div>
      </div>
    );
  }

  const { election, results: candidateResults, totalVotes, turnout } = results;

  const chartData = {
    labels: candidateResults.map(c => c.name),
    datasets: [
      {
        label: 'Votes Received',
        data: candidateResults.map(c => c.votes),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Election Results Visualization'
      }
    }
  };

  const winner = candidateResults.reduce((max, candidate) => 
    candidate.votes > max.votes ? candidate : max
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
          <p className="text-gray-600">Election Results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Votes Cast</p>
                <p className="text-3xl font-bold text-gray-900">{totalVotes}</p>
              </div>
              <FaUsers className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Voter Turnout</p>
                <p className="text-3xl font-bold text-green-600">{turnout}%</p>
              </div>
              <FaPercentage className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Winner</p>
                <p className="text-xl font-bold text-purple-600">{winner.name}</p>
                <p className="text-sm text-gray-500">{winner.party}</p>
              </div>
              <FaChartBar className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Results</h2>
          <div className="space-y-4">
            {candidateResults.map((candidate, index) => {
              const percentage = totalVotes > 0 
                ? ((candidate.votes / totalVotes) * 100).toFixed(1)
                : 0;
              
              return (
                <div key={candidate.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{candidate.symbol}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.party}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">{candidate.votes}</p>
                      <p className="text-sm text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;