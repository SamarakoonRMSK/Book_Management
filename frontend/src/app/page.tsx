'use client';
import { useAuth } from '@/context/AuthContext';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Fade, 
  Zoom, 
} from '@mui/material';
import Link from 'next/link';
import { 
  Book, 
  Person, 
  Security,
} from '@mui/icons-material';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            my: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Zoom in={true} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Welcome to the Book Management System
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
                Your personal library, organized and accessible. Manage your book collection with ease.
              </Typography>
            </Box>
          </Zoom>

          <Fade in={true} timeout={1200}>
            <Paper 
              elevation={8}
              sx={{ 
                p: 6, 
                mt: 4, 
                mb: 6,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                maxWidth: 500,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                {isAuthenticated ? (
                  <Security sx={{ fontSize: 48, color: 'success.main', mr: 2 }} />
                ) : (
                  <Person sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
                )}
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {isAuthenticated ? 'Welcome Back!' : 'Get Started'}
                </Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
                {isAuthenticated
                  ? 'Manage your collection now!'
                  : 'Sign in to access your personal library.'}
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                component={Link}
                href={isAuthenticated ? '/books' : '/login'}
                startIcon={isAuthenticated ? <Book /> : <Person />}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                {isAuthenticated ? 'View My Books' : 'Login to Continue'}
              </Button>
            </Paper>
          </Fade>
        </Box>
      </Fade>
    </Container>
  );
}
