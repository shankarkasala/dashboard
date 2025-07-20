import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // includes role, email
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.get('/me', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(res => setUser(res.data))
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password }, { withCredentials: true });
      setToken(res.data.accessToken);
      localStorage.setItem('token', res.data.accessToken);
      const userInfo = await axios.get('/me', {
        headers: {
          Authorization: `Bearer ${res.data.accessToken}`,
        },
      });
      setUser(userInfo.data);
      navigate(userInfo.data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  const logout = async () => {
    await axios.post('/auth/logout', {}, { withCredentials: true });
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
