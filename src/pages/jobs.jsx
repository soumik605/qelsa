import React, { useState } from "react";
import fetchedJobs from "../../public/FetchedJobs.json";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
// import JobCard from "@/old-components/JobCard";
// import ChipCard from "@/components/Chip";

const Jobs = () => {
  // const [jobs, setJobs] = useState(fetchedJobs.results.slice(0, 10));
  const [jobs, setJobs] = useState(fetchedJobs.results);

  // let uniqueItems = [...new Set(jobs.map(j => j.title))]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0f, #0c0c12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" textAlign={'center'} mb={4} color="#E0E0E0" >Jobs</Typography>

        {/* <Stack direction={'row'} flexWrap={"wrap"}>
          {uniqueItems.map(t => <Box key={t} p={1}><ChipCard label={t} /></Box> )}
        </Stack> */}

        <Grid container spacing={4}>
          {jobs.map((job, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} >
              {/* <JobCard data={job}/> */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Jobs;
