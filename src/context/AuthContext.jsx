import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hash password function
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Load users from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create default admin user if no users exist
      const defaultUsers = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@votingsystem.com',
          password: hashPassword('admin123'),
          role: 'admin',
          voterId: 'ADMIN001',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'John Voter',
          email: 'john@example.com',
          password: hashPassword('voter123'),
          role: 'voter',
          voterId: 'VOTER001',
          hasVoted: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Sarah Voter',
          email: 'sarah@example.com',
          password: hashPassword('voter123'),
          role: 'voter',
          voterId: 'VOTER002',
          hasVoted: false,
          createdAt: new Date().toISOString()
        }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Get users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find user by email
      const foundUser = storedUsers.find(u => u.email === email);
      
      if (!foundUser) {
        toast.error('User not found!');
        return false;
      }
      
      // Check password
      const hashedInputPassword = hashPassword(password);
      if (foundUser.password !== hashedInputPassword) {
        toast.error('Invalid password!');
        return false;
      }
      
      // Remove password from user object before storing in state
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      
      // Redirect based on role
      if (userWithoutPassword.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email already exists
      if (storedUsers.some(u => u.email === userData.email)) {
        toast.error('Email already registered!');
        return false;
      }
      
      // Check if voter ID already exists
      if (storedUsers.some(u => u.voterId === userData.voterId)) {
        toast.error('Voter ID already exists!');
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: hashPassword(userData.password),
        voterId: userData.voterId,
        role: 'voter',
        hasVoted: false,
        createdAt: new Date().toISOString()
      };
      
      // Add to users array
      const updatedUsers = [...storedUsers, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
      return true;
      
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (userId, updates) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = storedUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        toast.error('User not found');
        return false;
      }
      
      // Update user
      storedUsers[userIndex] = { ...storedUsers[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Update current user if it's the same user
      if (user && user.id === userId) {
        const { password, ...updatedUser } = storedUsers[userIndex];
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast.success('Profile updated successfully');
      return true;
      
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  // Mark user as voted
  const markAsVoted = (userId) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      storedUsers[userIndex].hasVoted = true;
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Update current user if it's the same user
      if (user && user.id === userId) {
        setUser({ ...user, hasVoted: true });
        localStorage.setItem('user', JSON.stringify({ ...user, hasVoted: true }));
      }
    }
  };

  // Get user by ID
  const getUserById = (userId) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(u => u.id === userId);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      return userWithoutPassword;
    }
    return null;
  };

  // Get all voters (for admin)
  const getAllVoters = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return storedUsers
      .filter(u => u.role === 'voter')
      .map(({ password, ...user }) => user);
  };

  const value = {
    user,
    users,
    loading,
    login,
    register,
    logout,
    updateProfile,
    markAsVoted,
    getUserById,
    getAllVoters
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};