// components/OAuthSuccess.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // Save to localStorage for AuthContext
      // Optionally: also set cookie if needed for backend
      document.cookie = `token=${token}; path=/;`;
      // Reload the page to trigger AuthContext useEffect
      window.location.href = '/dashboard';
    } else {
      // Handle error: token missing
      navigate('/login');
    }
  }, [location, navigate]);

  return <p>Logging in...</p>;
};

export default OAuthSuccess;
