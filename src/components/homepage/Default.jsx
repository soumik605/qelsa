'use client';
import { Box, Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Default() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f, #0c0c12)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* Logo */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
            width: 80,
            height: 80,
            borderRadius: '20px',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            boxShadow: '0 0 30px rgba(147,51,234,0.3)',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Q
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(90deg, #7C3AED, #9333EA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Welcome to Qelsa AI
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" sx={{ mb: 6, color: 'rgba(255,255,255,0.7)' }}>
          Your AI-powered career co-pilot. Explore jobs, grow your skills, and plan your career.
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={3} justifyContent="center" mb={6}>
          {[
            {
              icon: <SmartToyIcon sx={{ fontSize: 40, color: '#3B82F6' }} />,
              title: 'Smart Job Matching',
              desc: 'AI-powered recommendations tailored to your skills',
            },
            {
              icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#A855F7' }} />,
              title: 'Career Guidance',
              desc: 'Personalized career path recommendations',
            },
            {
              icon: <MenuBookIcon sx={{ fontSize: 40, color: '#10B981' }} />,
              title: 'Skill Development',
              desc: 'Learn and grow with curated resources',
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  p: 2,
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box mb={2}>{item.icon}</Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom color='white'>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Button */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 4,
            py: 1.5,
            background: 'linear-gradient(90deg, #3B82F6, #9333EA)',
            color: '#fff',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
            },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
