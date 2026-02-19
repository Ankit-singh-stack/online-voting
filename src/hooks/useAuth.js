import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: {
              id: Date.now(),
              email,
              role: email.includes('admin') ? 'admin' : 'voter',
              name: email.split('@')[0],
              hasVoted: false,
              createdAt: new Date().toISOString()
            }
          });
        }, 1000);
      });

      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success(`Welcome back, ${response.user.name}!`);
        navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
        return true;
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
};