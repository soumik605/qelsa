import { Box, Drawer, Stack, Link, Typography, Button } from "@mui/material";
import React from "react";

const JobDetails = (props) => {
  const { data, open, handleClose } = props;
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{ width: 650, bgcolor: "#121212", height: "100vh", overflowY: "auto", p: 4 }}
        role="presentation"
        // onClick={handleClose}
        // onKeyDown={handleClose}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <img
            src={data.company.logo}
            alt={data.company.name}
            style={{ height: "50px" }}
          />

          <Link
            href={data.company.website_url}
            sx={{ color: "#E0E0E0", textDecoration: "none", fontSize: 20 }}
          >
            {data.company.name}
          </Link>

          {data.company.is_agency && <Chip label={"Agency"} />}
        </Stack>

        <Box py={2}>
          <Typography color="#E0E0E0" variant="h5">
            {data.title}
          </Typography>
          <Typography color="#E0E0E0" variant="caption">
            {data.location}
          </Typography>
        </Box>

        <Box color="#E0E0E0" fontSize={14} py={4} dangerouslySetInnerHTML={{__html: data.description}}></Box>


        {data.salary_max && (
          <>
            <Typography color="#E0E0E0" variant="caption">
              Maximum Salary: {data.salary_max}
            </Typography>
            <br />
          </>
        )}
        {data.salary_min && (
          <Typography color="#E0E0E0" variant="caption">
            Minimum Salary: {data.salary_min}
          </Typography>
        )}

        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Link href={data.application_url}>
            <Button variant="contained">Apply</Button>
          </Link>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default JobDetails;
