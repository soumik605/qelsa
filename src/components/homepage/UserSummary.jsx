// pages/summary.tsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  Link,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const userProfile = {
  name: "s",
  type: "Career Switcher",
  goals: [
    { label: "Find Jobs" },
    { label: "Prepare for Interviews" },
    { label: "Explore Career Paths" },
  ],
};

export default function UserSummary() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 3, md: 8 },
        background: "linear-gradient(120deg, #191e2e 60%, #181324 100%)",
      }}
    >
      {/* Stepper */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 4, md: 5 },
        }}
      >
        {[1, 2].map((item) => (
          <Box
            key={item}
            sx={{
              width: 15,
              height: 15,
              background: "#202238",
              borderRadius: "50%",
              mx: 0.7,
            }}
          />
        ))}
        <Box
          sx={{
            width: 15,
            height: 15,
            background: "linear-gradient(135deg,#8f37ff 40%, #b845e7 80%, #22d3ee 100%)",
            borderRadius: "50%",
            mx: 0.7,
            boxShadow: "0 0 8px #8f37ff",
          }}
        />
        <Typography
          sx={{
            color: "#cdd1e0",
            fontSize: 15,
            ml: 2,
            letterSpacing: 0.1,
            mt: "-2px",
          }}
        >
          Step 3 of 3
        </Typography>
      </Box>

      {/* Gradient Icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            background: "linear-gradient(135deg, #8f37ff 40%, #b845e7 85%, #22d3ee 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px #7c42ea",
          }}
        >
          <CheckCircleIcon sx={{ color: "#fff", fontSize: 44 }} />
        </Box>
      </Box>

      {/* Heading and Subtitle */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          color: "#fff",
          mb: 1,
        }}
      >
        All set, <Box component="span" sx={{ color: "#38b6ff" }}>@s!</Box>
      </Typography>
      <Typography
        sx={{
          color: "#b3b3b3",
          mb: 3,
          textAlign: "center",
        }}
      >
        Let's get started on your career journey.
      </Typography>

      {/* Profile Summary Card */}
      <Card
        sx={{
          minWidth: { xs: "90%", sm: 420 },
          borderRadius: 4,
          background: "rgba(39,38,46,0.94)",
          mb: 4,
          color: "#fff",
          boxShadow: "0 0 24px 3px #181324",
        }}
      >
        <CardContent>
          <Typography sx={{ fontWeight: 600, mb: 1.5, color: "#fff" }}>
            Your Profile Summary
          </Typography>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography sx={{ color: "#b3b3b3", minWidth: 60 }}>
              Name:
            </Typography>
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>{userProfile.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography sx={{ color: "#b3b3b3", minWidth: 60 }}>
              Type:
            </Typography>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#38b6ff",
                fontWeight: 500,
              }}
            >
              {userProfile.type}
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
            <Typography sx={{ color: "#b3b3b3", minWidth: 60, mt: "4px" }}>
              Goals:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {userProfile.goals.map((goal, i) => (
                <Chip
                  key={goal.label}
                  label={goal.label}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: "#22d3ee",
                    borderColor: "#22d3ee",
                    fontWeight: 500,
                    bgcolor: "rgba(34,211,238,0.07)",
                  }}
                />
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Next Button */}
      <Button
        variant="contained"
        sx={{
          px: 7,
          py: 1.3,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: 19,
          background: "linear-gradient(90deg,#8f37ff 40%,#b845e7 70%,#22d3ee 100%)",
          color: "#fff",
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(90deg,#7c32cc 40%,#8f37ff 100%)",
          },
          boxShadow: "0 0 12px #22d3ee",
        }}
      >
        Go to AI Chat
      </Button>
    </Box>
  );
}
