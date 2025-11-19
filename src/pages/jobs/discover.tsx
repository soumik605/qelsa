import { JobDiscoveryRails } from "@/components/job/JobDiscoveryRails";
import JobLayout from "@/components/job/layout";
import { useGetDiscoverJobsQuery } from "@/features/api/jobsApi";
import Layout from "../../layout";

const Discover = () => {
  const { data: jobs } = useGetDiscoverJobsQuery();

  return (
    <Layout activeSection={"jobs"}>
      <JobLayout>
        <JobDiscoveryRails jobs={jobs} />
      </JobLayout>
    </Layout>
  );
};

export default Discover;
