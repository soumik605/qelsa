import { useGetCitiesQuery, useGetJobsQuery, useGetJobTypesQuery } from "@/features/api/jobsApi";
import { Briefcase, Filter, Plus, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { JobAIAssistantDrawer } from "./JobAIAssistantDrawer";
import { JobSearchSuggestions } from "./JobSearchSuggestions";

const Layout = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantJob, setAiAssistantJob] = useState(null);
  const [viewMode, setViewMode] = useState<"discover" | "all" | "my-jobs">("discover");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const {
    data: jobs,
    error,
    isLoading,
  } = useGetJobsQuery({
    search: searchQuery,
    city: locationFilter,
    // company: "",
  });

  const { data: cities, error: cityError, isLoading: cityLoading } = useGetCitiesQuery();
  const { data: jobTypes, error: typeError, isLoading: typeLoading } = useGetJobTypesQuery();

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;
  if (!jobs) return <>No jobs</>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-strong border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Job Opportunities</h1>
              <p className="text-muted-foreground mt-1">Discover your next career move</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAIAssistant(true)}
                className="glass-strong border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 mr-2 text-neon-cyan" />
                <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">AI Assistant</span>
              </Button>

              <Button
                onClick={() => router.push("/jobs/posted")}
                variant="outline"
                className="glass border-muted/30 hover:border-muted/50 hover:bg-white/5 hover:shadow-md transition-all duration-200 rounded-xl px-4 py-2"
              >
                <span className="font-medium text-foreground">Posted Jobs</span>
              </Button>

              <Button
                className="gradient-animated text-white font-bold shadow-lg hover:shadow-xl hover:shadow-neon-purple/30 transition-all duration-300 hover:scale-105 border-0"
                onClick={() => router.push("/jobs/create-job")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative search-container z-[9999]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search for jobs, companies, or skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 glass border-glass-border" />
              </div>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchQuery.length >= 2 && (
                <JobSearchSuggestions
                  query={searchQuery}
                  allJobs={jobs}
                  onSelectSuggestion={(suggestion) => {
                    if (Search) {
                      // onSearch(suggestion, jobs);
                      setShowSearchSuggestions(false);
                      setSearchQuery("");
                    }
                  }}
                  onSelectJob={(job) => {
                    // handleJobClick(job);
                    setShowSearchSuggestions(false);
                  }}
                />
              )}
            </div>

            <div className="flex gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40 glass border-glass-border">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-glass-border z-50">
                  <SelectItem value="all">All Locations</SelectItem>
                  {cities?.map((city: string) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                <SelectTrigger className="w-32 glass border-glass-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-glass-border z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  {jobTypes?.map((type: string) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-32 glass border-glass-border">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-glass-border z-50">
                  <SelectItem value="all">All Experience Levels</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5-7 years">5-7 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="mt-6">
            <div className="glass-strong border-glass-border w-fit p-0.5 rounded-2xl flex space-x-1">
              <Button onClick={() => router.push("/jobs/smart_matches")} variant="outline" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                <Sparkles className="w-4 h-4 mr-2" />
                Smart Matches
              </Button>
              <Button onClick={() => router.push("/jobs/all")} variant="outline" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                <Filter className="w-4 h-4 mr-2" />
                All Jobs
              </Button>
              <Button onClick={() => router.push("/jobs/my-jobs/saved")} variant="outline" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple relative">
                <Briefcase className="w-4 h-4 mr-2" />
                My Jobs
                <Badge variant="outline" className="ml-2 h-5 min-w-[20px] px-1.5 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30 text-xs">
                  5
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>

      {/* Compare Jobs Tray */}
      {/* {onCompare && onRemoveFromCompare && onClearCompare && <CompareJobsTray jobs={comparedJobs} onRemoveJob={onRemoveFromCompare} onCompare={onCompare} onClear={onClearCompare} />} */}

      {/* AI Assistant Drawer */}
      <JobAIAssistantDrawer isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} selectedJob={aiAssistantJob} jobs={jobs} />
    </div>
  );
};

export default Layout;
