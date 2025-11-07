import React from "react";
import Layout from "../layout";
import { JobListingPage } from "../components/JobListingPage";
import { useGetJobsQuery } from "../features/api/jobsApi";
import { Provider } from "react-redux";
import { store } from "../store";

const Jobs = () => {
  const { data: jobs, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;
  if (!jobs) return <>No jobs</>;

  const normalizedJobs = jobs["data"]?.map((job) => ({
    ...job,
    data: typeof job.data === "string" ? JSON.parse(job.data) : job.data,
  }));

  return (
    <Layout activeSection={"qelsa-ai"}>
      <JobListingPage jobs={normalizedJobs} />
    </Layout>
  );
};

export default Jobs;
