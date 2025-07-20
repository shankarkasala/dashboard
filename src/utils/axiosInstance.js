import axios from 'axios';

const baseURL = process.env.LOGIN_OAUTH;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Important: to send cookies!
});

// Function to attach token dynamically (to be used later)
export const attachAuthInterceptor = (getToken, logout) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Prevent infinite loop
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
          const newToken = res.data.accessToken;
          // Update token via context
          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            getToken(newToken, true); // update token in AuthContext
            return axiosInstance(originalRequest); // retry
          }
        } catch (refreshErr) {
          logout(); // refresh failed, force logout
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
