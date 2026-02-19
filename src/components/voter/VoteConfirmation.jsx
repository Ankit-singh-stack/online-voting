import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaReceipt } from 'react-icons/fa';

const VoteConfirmation = () => {
  const navigate = useNavigate();
  const [receiptId, setReceiptId] = useState('');

  useEffect(() => {
    // Generate a random receipt ID
    const id = 'VOTE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setReceiptId(id);

    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <FaCheckCircle className="h-20 w-20 text-green-500 mx-auto" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Vote Cast Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your vote has been encrypted and securely recorded. Thank you for participating in the democratic process.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <FaReceipt className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Your Receipt ID</span>
          </div>
          <p className="font-mono text-lg font-bold text-gray-900">{receiptId}</p>
          <p className="text-xs text-gray-500 mt-2">
            Save this ID for verification purposes
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Redirecting to dashboard in 5 seconds...
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 btn-primary w-full"
        >
          Return to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default VoteConfirmation;