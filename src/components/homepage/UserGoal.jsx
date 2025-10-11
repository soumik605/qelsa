// pages/goals.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SchoolIcon from "@mui/icons-material/School";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import QuizIcon from "@mui/icons-material/Quiz";

const goalsData = [
  {
    key: "findJobs",
    label: "Find Jobs",
    description: "Discover opportunities that match your skills",
    icon: <FindInPageIcon fontSize="large" />,
    color: "primary",
  },
  {
    key: "explorePaths",
    label: "Explore Career Paths",
    description: "Plan your career journey with AI guidance",
    icon: <TravelExploreIcon fontSize="large" />,
    color: "secondary",
  },
  {
    key: "upskill",
    label: "Upskill & Learn",
    description: "Develop new skills for career growth",
    icon: <SchoolIcon fontSize="large" />,
    color: "default",
  },
  {
    key: "prepareInterviews",
    label: "Prepare for Interviews",
    description: "Practice and ace your next interview",
    icon: <QuizIcon fontSize="large" />,
    color: "info",
  },
];

const UserGoal = () => {
  const [selected, setSelected] = useState([]);
  const theme = useTheme();

  const handleCardClick = (key) => {
    setSelected(sel =>
      sel.includes(key) ? sel.filter(k => k !== key) : [...sel, key]
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #191e2e 60%, #181324 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 3, md: 8 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 1, color: "#fff", textAlign: "center" }}
      >
        What brings you to Qelsa?
      </Typography>
      <Typography
        sx={{
          color: "#b3b3b3",
          mb: 4,
          textAlign: "center",
        }}
      >
        Select your goals (you can choose multiple)
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: 750, mb: 5 }}
        justifyContent="center"
      >
        {goalsData.map(goal => (
          <Grid item xs={12} sm={6} key={goal.key}>
            <Card
              elevation={selected.includes(goal.key) ? 8 : 2}
              sx={{
                borderRadius: 3,
                border: selected.includes(goal.key)
                  ? `2px solid ${theme.palette[goal.color]?.main || "#6366f1"}`
                  : "1.5px solid #232134",
                background: "rgba(24, 19, 36, 0.8)",
                transition: "0.2s",
                boxShadow: selected.includes(goal.key)
                  ? "0 0 16px 2px #312e81"
                  : undefined,
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette[goal.color]?.main || "#6366f1",
                },
              }}
              onClick={() => handleCardClick(goal.key)}
            >
              <CardActionArea>
                <CardContent
                  sx={{
                    color: "#fff",
                    minHeight: 100,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    {goal.icon}
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette[goal.color]?.main || "#6366f1",
                        fontWeight: 600,
                      }}
                    >
                      {goal.label}
                    </Typography>
                    {selected.includes(goal.key) && (
                      <CheckBoxIcon
                        sx={{ color: theme.palette[goal.color]?.main || "#22d3ee", ml: 0.5 }}
                        fontSize="small"
                      />
                    )}
                  </Box>
                  <Typography sx={{ color: "#b3b3b3" }}>
                    {goal.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          width: { xs: "100%", sm: "70%", md: 400 },
          bgcolor: "rgba(38, 37, 46, 0.7)",
          borderRadius: 2,
          p: 2,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "#b3b3b3",
            fontSize: 13,
            mb: 1,
          }}
        >
          Selected Goals
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {selected.map(key => {
            const goal = goalsData.find(g => g.key === key);
            return (
              <Chip
                key={key}
                label={goal?.label}
                color={goal?.color === "default" ? "primary" : (goal?.color)}
                variant={goal?.color === "default" ? "outlined" : "filled"}
              />
            );
          })}
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          px: 7,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: 18,
          background: "linear-gradient(90deg,#8f37ff 40%,#b845e7 70%,#ff80ff 100%)",
          color: "#fff",
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(90deg,#7c32cc 40%,#8f37ff 100%)"
          }
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default UserGoal;
