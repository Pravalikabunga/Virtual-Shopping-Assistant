import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          About Virtual Shopping Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph align="center">
          Your AI-powered shopping companion
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Our Mission
          </Typography>
          <Typography paragraph>
            The Virtual Shopping Assistant is designed to help you make informed shopping decisions
            by providing personalized recommendations and expert advice. We leverage advanced AI
            technology to understand your needs and preferences, ensuring you find the best products
            for your specific requirements.
          </Typography>
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Ask Questions
                </Typography>
                <Typography>
                  Simply ask questions about products you're interested in, such as
                  "What are some good options for a budget-friendly laptop?"
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Get Recommendations
                </Typography>
                <Typography>
                  Our AI analyzes your query and provides personalized recommendations
                  based on your needs, preferences, and budget.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Make Informed Decisions
                </Typography>
                <Typography>
                  Compare different options and make confident purchasing decisions
                  with the help of our expert shopping advice.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Technology
          </Typography>
          <Typography paragraph>
            The Virtual Shopping Assistant is powered by Google's Gemini AI, a state-of-the-art
            language model that understands natural language queries and provides detailed,
            context-aware responses. Our backend is built with Node.js and Express, while
            the frontend is developed using React and Material-UI for a modern, responsive
            user experience.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Privacy & Security
          </Typography>
          <Typography paragraph>
            We take your privacy seriously. We do not store your shopping queries or personal
            information. All interactions with the Virtual Shopping Assistant are anonymous
            and secure. For more information, please review our Privacy Policy.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 