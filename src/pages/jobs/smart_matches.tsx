import { JobDiscoveryRails } from "@/components/job/JobDiscoveryRails";
import JobLayout from "@/components/job/layout";
import { useLazyGetDiscoverJobsQuery } from "@/features/api/jobsApi";
import { useEffect, useState } from "react";
import Layout from "../../layout";
export interface SearchFilters {
  cities: string[];
  job_types: string[];
  experience_levels: string[];
  departments: string[];
  salary_min?: number;
  salary_max?: number;
  remote: boolean;
  sort_by: "relevance" | "date" | "salary";
}

const SmartMatches = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState<SearchFilters>({
    cities: [],
    job_types: [],
    experience_levels: [],
    departments: [],
    remote: false,
    sort_by: "relevance",
  });

  const [triggerGetJobs, { data: jobsList, error, isLoading }] = useLazyGetDiscoverJobsQuery();

  useEffect(() => {
    if (jobsList) {
      setJobs(jobsList);
    }
  }, [jobsList]);

  useEffect(() => {
    triggerGetJobs(
      {
        ...filters,
        search: query,
      },
      false
    );
  }, []);

  const onSearch = async () => {
    console.log({
      ...filters,
      search: query,
    });

    await triggerGetJobs(
      {
        ...filters,
        search: query,
      },
      false
    ).unwrap();
  };

  return (
    <Layout activeSection={"jobs"}>
      <JobLayout active_job_page="smart_matches" {...{ jobs, filters, setFilters, query, setQuery, onSearch }}>
        <JobDiscoveryRails jobs={jobs} />
      </JobLayout>
    </Layout>
  );
};

export default SmartMatches;
