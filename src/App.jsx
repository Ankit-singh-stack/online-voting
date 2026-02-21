import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { VoteProvider } from './context/VoteContext';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

// Home Components
import LandingPage from './components/home/LandingPage';
import Contact from './components/home/Contact';

// Voter Components
import VoterDashboard from './components/voter/VoterDashboard';
import ActiveElections from './components/voter/ActiveElections';
import UpcomingElections from './components/voter/UpcomingElections';
import PastElections from './components/voter/PastElections';
import CastVote from './components/voter/CastVote';
import VoteConfirmation from './components/voter/VoteConfirmation';
import VoterHistory from './components/voter/VoterHistory';
import VoterStats from './components/voter/VoterStats';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageElections from './components/admin/ManageElections';
import CreateElection from './components/admin/CreateElection';
import ManageCandidates from './components/admin/ManageCandidates';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Styles
import './styles/animations.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <VoteProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    borderRadius: '12px',
                  },
                }}
              />

              <AnimatePresence mode="wait">
                <Routes>

                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Voter Routes */}
                  <Route path="/dashboard" element={
                    <PrivateRoute>
                      <VoterDashboard />
                    </PrivateRoute>
                  } />

                  <Route path="/elections/active" element={
                    <PrivateRoute>
                      <ActiveElections />
                    </PrivateRoute>
                  } />

                  <Route path="/elections/upcoming" element={
                    <PrivateRoute>
                      <UpcomingElections />
                    </PrivateRoute>
                  } />

                  <Route path="/elections/past" element={
                    <PrivateRoute>
                      <PastElections />
                    </PrivateRoute>
                  } />

                  <Route path="/vote/:id" element={
                    <PrivateRoute>
                      <CastVote />
                    </PrivateRoute>
                  } />

                  <Route path="/vote-confirmation" element={
                    <PrivateRoute>
                      <VoteConfirmation />
                    </PrivateRoute>
                  } />

                  <Route path="/history" element={
                    <PrivateRoute>
                      <VoterHistory />
                    </PrivateRoute>
                  } />

                  <Route path="/stats" element={
                    <PrivateRoute>
                      <VoterStats />
                    </PrivateRoute>
                  } />

                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={
                    <PrivateRoute adminOnly>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />

                  <Route path="/admin/elections" element={
                    <PrivateRoute adminOnly>
                      <ManageElections />
                    </PrivateRoute>
                  } />

                  <Route path="/admin/elections/create" element={
                    <PrivateRoute adminOnly>
                      <CreateElection />
                    </PrivateRoute>
                  } />

                  <Route path="/admin/candidates" element={
                    <PrivateRoute adminOnly>
                      <ManageCandidates />
                    </PrivateRoute>
                  } />

                  {/* 404 Route */}
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Page not found</p>
                        <button 
                          onClick={() => window.history.back()}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Go Back
                        </button>
                      </div>
                    </div>
                  } />

                </Routes>
              </AnimatePresence>
            </div>
            <Footer />
          </div>
        </VoteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
