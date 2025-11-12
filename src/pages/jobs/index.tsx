import { JobListingPage } from "../../components/job/JobListingPage";
import Layout from "../../layout";

const Jobs = () => {
  return (
    <Layout activeSection={"jobs"}>
      <JobListingPage />
    </Layout>
  );
};

export default Jobs;
