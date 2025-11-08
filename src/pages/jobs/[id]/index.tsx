"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetJobByIdQuery } from "../../../features/api/jobsApi";
import { JobDetailPage } from "../../../components/job/JobDetailPage";

const JobDetails: React.FC = () => {


  return (
    <JobDetailPage />
  );
};

export default JobDetails;
