'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

export default function UserDetails() {
  const [profileType, setProfileType] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const profiles = [
    {
      value: 'student',
      title: 'Student',
      desc: 'Currently studying or recent graduate',
      icon: <SchoolIcon fontSize="large" />,
    },
    {
      value: 'professional',
      title: 'Professional',
      desc: 'Experienced working professional',
      icon: <BusinessIcon fontSize="large" />,
    },
    {
      value: 'career-switcher',
      title: 'Career Switcher',
      desc: 'Looking to change career paths',
      icon: <AutorenewIcon fontSize="large" />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f, #0c0c12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        {/* Stepper */}
        <Box textAlign="center" mb={4}>
          <Stepper
            activeStep={0}
            alternativeLabel={!isMobile}
            sx={{
              '& .MuiStepLabel-label': { color: 'rgba(255,255,255,0.6)' },
              '& .MuiStepIcon-root': { color: 'rgba(255,255,255,0.2)' },
              '& .MuiStepIcon-active': {
                color: '#7C3AED',
              },
            }}
          >
            {[1, 2, 3].map((_, i) => (
              <Step key={i}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <Typography variant="body2" color="rgba(255,255,255,0.6)">
            Step 1 of 3
          </Typography>
        </Box>

        {/* Heading */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(90deg, #7C3AED, #9333EA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Tell us about yourself
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)">
            Let's personalize your Qelsa experience
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box component="form" noValidate autoComplete="off" mb={5}>
          <TextField
            fullWidth
            label="Full Name"
            placeholder="Enter your full name"
            variant="outlined"
            margin="normal"
            InputProps={{
              style: {
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
              },
            }}
            InputLabelProps={{
              style: { color: 'rgba(255,255,255,0.6)' },
            }}
          />

          <TextField
            fullWidth
            label="Username"
            placeholder="username"
            variant="outlined"
            margin="normal"
            InputProps={{
              style: {
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
              },
            }}
            InputLabelProps={{
              style: { color: 'rgba(255,255,255,0.6)' },
            }}
          />
        </Box>

        {/* Profile Type Selection */}
        <Box mb={5}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="rgba(255,255,255,0.9)"
            mb={2}
          >
            Profile Type
          </Typography>
          <Grid container spacing={2} width={"100%"}>
            {profiles.map((p) => {
              const selected = p.value === profileType;
              return (
                <Grid item xs={12} key={p.value} width={"100%"}>
                  <Box
                    onClick={() => setProfileType(p.value)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: "100%",
                      border: selected
                        ? '1px solid #3B82F6'
                        : '1px solid transparent',
                      boxShadow: selected
                        ? '0 0 15px rgba(59,130,246,0.2)'
                        : 'none',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box color={selected ? '#3B82F6' : '#9CA3AF'}>
                          {p.icon}
                        </Box>
                        <Box textAlign="left">
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={selected ? '#3B82F6' : '#fff'}
                          >
                            {p.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.6)"
                          >
                            {p.desc}
                          </Typography>
                        </Box>
                      </Box>
                      {selected && (
                        <CheckCircleIcon sx={{ color: '#3B82F6' }} />
                      )}
                    </CardContent>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Continue Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #3B82F6, #9333EA)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
