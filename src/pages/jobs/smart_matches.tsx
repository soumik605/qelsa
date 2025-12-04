import { JobDiscoveryRails } from "@/components/job/JobDiscoveryRails";
import JobLayout from "@/components/job/layout";
import { useGetDiscoverJobsQuery } from "@/features/api/jobsApi";
import Layout from "../../layout";

const SmartMatches = () => {
  const { data: jobs } = useGetDiscoverJobsQuery();

  return (
    <Layout activeSection={"jobs"}>
      <JobLayout active_job_page="smart_matches">
        <JobDiscoveryRails jobs={jobs} />
      </JobLayout>
    </Layout>
  );
};

export default SmartMatches;
