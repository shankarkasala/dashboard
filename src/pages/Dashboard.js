import { Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Welcome, {user?.email}</Typography>
      <Typography>Your role: {user?.role}</Typography>
      <button onClick={logout}>Logout</button>
    </Container>
  );
}
