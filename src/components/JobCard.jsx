import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import Chip from "./Chip";
import JobDetails from "./JobDetails";

const JobCard = (props) => {
  const { data } = props;
  const [openDetails, setOpenDetails] = useState(false)

  console.log("🚀 ~ JobCard ~ data:", data);

  const handleClose = () => {
    setOpenDetails(false)
  }

  return (
    <>
      <Card
        onClick={() => setOpenDetails(true)}
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "100%",
          border: "1px solid transparent",
          boxShadow: "none",
          color: "#E0E0E0",
          height: "100%",
          p: 3,
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          },
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <img
            src={data.company.logo}
            alt={data.company.name}
            style={{ height: "40px" }}
          />

          <Link
            href={data.company.website_url}
            sx={{ color: "#E0E0E0", textDecoration: "none" }}
          >
            {data.company.name}
          </Link>

          {data.company.is_agency && <Chip label={"Agency"} />}
        </Stack>

        <Box py={2}>
          <Typography variant="h6" color="#E0E0E0">{data.title}</Typography>
          <Typography variant="caption" color="#E0E0E0">{data.location}</Typography>
        </Box>

        <Stack>{data.has_remote && <Chip label={"Remote"} />}</Stack>

        {data.types.length && (
          <Stack direction={"row"} spacing={2}>
            {data.types.map((t, ind) => (
              <Box key={ind}>
                <Chip label={t.name} />
              </Box>
            ))}
          </Stack>
        )}

       
      </Card>

      {openDetails && <JobDetails open={openDetails} handleClose={handleClose} data={data} /> }
    </>
  );
};

export default JobCard;
