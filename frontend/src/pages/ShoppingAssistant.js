import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../context/AuthContext';

const ShoppingAssistant = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      // Always use the enhanced endpoint as authentication is required
      const endpoint = 'http://localhost:3000/api/shopping/assist/enhanced';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setError('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          Shopping Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph align="center">
          Ask me anything about products you're interested in
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="e.g., What are some good options for a budget-friendly laptop?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                disabled={loading || !query.trim()}
              >
                {loading ? 'Processing...' : 'Send'}
              </Button>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {response && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom>
                Response:
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mb: 2, display: 'block' }}>
                Personalized response for {user.username}
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  backgroundColor: 'background.default',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <Typography>{response}</Typography>
              </Paper>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ShoppingAssistant; 