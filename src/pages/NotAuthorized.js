// src/pages/NotAuthorized.jsx
import { Typography, Container } from '@mui/material';

export default function NotAuthorized() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" color="error">403 - Not Authorized</Typography>
      <Typography>You do not have permission to access this page.</Typography>
    </Container>
  );
}
