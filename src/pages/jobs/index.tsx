import { useState } from "react";
import { JobListingPage } from "../../components/job/JobListingPage";
import { useGetJobsQuery } from "../../features/api/jobsApi";
import Layout from "../../layout";

const Jobs = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    company: "",
  });

  const { data: jobs, error, isLoading } = useGetJobsQuery(filters);
  console.log("🚀 ~ Jobs ~ jobs:", jobs)

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;
  if (!jobs) return <>No jobs</>;

  const normalizedJobs = jobs["data"]?.map((job) => ({
    ...job,
    data: typeof job.data === "string" ? JSON.parse(job.data) : job.data,
  }));

  return (
    <Layout activeSection={"qelsa-ai"}>
      <JobListingPage jobs={normalizedJobs} filters={filters} setFilters={setFilters} />
    </Layout>
  );
};

export default Jobs;
