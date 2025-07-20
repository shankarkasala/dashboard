import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotAuthorized from './pages/NotAuthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import OAuthSuccess from './components/OAuthSuccess';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Moved inside Router */}
        <Routes>
          {["/", "/login"].map((path) => (
            <Route key={path} path={path} element={<Login />} />
          ))}
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<NotAuthorized />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
