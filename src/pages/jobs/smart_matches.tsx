import { JobDiscoveryRails } from "@/components/job/JobDiscoveryRails";
import JobLayout from "@/components/job/layout";
import { useLazyGetDiscoverJobsQuery } from "@/features/api/jobsApi";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Layout from "../../layout";
import { JobComparisonPage } from "@/components/job/JobComparisonPage";

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
  const [comparedJobs, setComparedJobs] = useState<Job[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

  const onToggleCompare = (job: Job) => {
    setComparedJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      if (exists) {
        toast.success(`Removed ${job.title} from comparison`);
        return prev.filter((j) => j.id !== job.id);
      } else {
        if (prev.length >= 4) {
          toast.error("You can only compare up to 4 jobs at a time");
          return prev;
        }
        toast.success(`Added ${job.title} to comparison`);
        return [...prev, job];
      }
    });
  };

  const onRemoveFromCompare = (jobId: number) => {
    setComparedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const onCompare = () => {
    console.log(comparedJobs);

    if (comparedJobs.length < 2) {
      toast.error("Please select at least 2 jobs to compare");
      return;
    }
    setShowComparison(true);
  };

  const onClearCompare = () => {
    setComparedJobs([]);
    toast.success("Comparison cleared");
  };

  if (showComparison) {
    return (
      <Layout activeSection={"jobs"}>
        <JobComparisonPage jobs={comparedJobs} onBack={() => setShowComparison(false)} onRemoveJob={onRemoveFromCompare} />
      </Layout>
    );
  }

  return (
    <Layout activeSection={"jobs"}>
      <JobLayout
        active_job_page="smart_matches"
        {...{ jobs, filters, setFilters, query, setQuery, onSearch, comparedJobs, onToggleCompare, onCompare, onClearCompare, onRemoveFromCompare, showComparison }}
      >
        <JobDiscoveryRails jobs={jobs} onJobClick={setSelectedJob} onToggleCompare={onToggleCompare} comparedJobs={comparedJobs} onToggleBookmark={() => {}} bookmarkedJobs={[]} />
      </JobLayout>
    </Layout>
  );
};

export default SmartMatches;
