import { useGetCitiesQuery, useGetJobsQuery, useGetJobTypesQuery } from "@/features/api/jobsApi";
import { Bookmark, BookmarkCheck, Briefcase, Building2, Eye, Filter, Globe, Home, MapPin, Plus, Search, Sparkles, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MyJobsPage } from "../MyJobsPage";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { JobAIAssistantDrawer } from "./JobAIAssistantDrawer";
import { JobDiscoveryRails } from "./JobDiscoveryRails";
import { JobSearchSuggestions } from "./JobSearchSuggestions";

export function JobListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [viewedJobs, setViewedJobs] = useState<number[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantJob, setAiAssistantJob] = useState(null);
  const [viewMode, setViewMode] = useState<"discover" | "all" | "my-jobs">("discover");
  const [myJobsActiveTab, setMyJobsActiveTab] = useState<string>("saved");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const router = useRouter();

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

  // const filteredJobs = jobs.filter((job) => {
  //   const matchesSearch =
  //     job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

  //   const matchesLocation = !locationFilter || locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
  //   const matchesExperience = !experienceFilter || experienceFilter === "all" || job.experience.includes(experienceFilter);
  //   const matchesWorkType = !workTypeFilter || workTypeFilter === "all" || job.workType === workTypeFilter;

  //   return matchesSearch && matchesLocation && matchesExperience && matchesWorkType;
  // });

  const filteredJobs = [];

  const handleJobClick = (job) => {
    router.push(`/jobs/${job.id}`);
    // Add to viewed jobs if not already viewed
    if (!viewedJobs.includes(job.id)) {
      setViewedJobs((prev) => [job.id, ...prev.slice(0, 4)]); // Keep last 5 viewed
    }

    // Update AI assistant context
    setAiAssistantJob(job);

    // Call the job click handler if provided
    // onJobClick?.(job);
  };

  const handleSaveJob = (jobId: number) => {};

  const handleSelectJob = (jobId: number) => {
    setSelectedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
  };

  const handleQuickApply = (jobId: string) => {
    console.log("Quick applying to job:", jobId);
    // Implementation for quick apply
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case "Remote":
        return <Globe className="w-4 h-4" />;
      case "Hybrid":
        return <Home className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getSourceIcon = (platform: string) => {
    switch (platform) {
      case "Qelsa":
        return <div className="w-4 h-4 rounded bg-neon-cyan flex items-center justify-center text-black text-xs font-bold">Q</div>;
      case "LinkedIn":
        return <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs">in</div>;
      case "Indeed":
        return <div className="w-4 h-4 rounded bg-blue-700 flex items-center justify-center text-white text-xs">I</div>;
      case "Naukri":
        return <div className="w-4 h-4 rounded bg-purple-600 flex items-center justify-center text-white text-xs">N</div>;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

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
                onClick={() => router.push("/jobs/create-job")}
                className="gradient-animated text-white font-bold shadow-lg hover:shadow-xl hover:shadow-neon-purple/30 transition-all duration-300 hover:scale-105 border-0"
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
                    handleJobClick(job);
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
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "discover" | "all" | "my-jobs")}>
              <TabsList className="glass-strong border-glass-border">
                <TabsTrigger value="discover" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Filter className="w-4 h-4 mr-2" />
                  All Jobs
                </TabsTrigger>
                <TabsTrigger value="my-jobs" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple relative">
                  <Briefcase className="w-4 h-4 mr-2" />
                  My Jobs
                  {/* Attention Badge - items needing attention */}
                  {(savedJobs.length > 0 || viewedJobs.length > 0) && (
                    <Badge variant="outline" className="ml-2 h-5 min-w-[20px] px-1.5 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30 text-xs">
                      {savedJobs.length + Math.min(viewedJobs.length, 3)}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === "discover" ? (
          /* Discovery Rails View - Full Width */
          <JobDiscoveryRails onJobClick={handleJobClick} jobs={jobs} />
        ) : viewMode === "my-jobs" ? (
          /* My Jobs Dashboard - Full Width */
          <div className="mt-[-2rem]">
            <MyJobsPage />
          </div>
        ) : (
          /* Traditional All Jobs View - Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filters Summary */}
              <Card className="p-4 glass border-glass-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-neon-cyan" />
                  Active Filters
                </h3>
                <div className="space-y-2 text-sm">
                  <div>Results: {filteredJobs.length} jobs</div>
                  {searchQuery && <div>Search: &quot;{searchQuery}&quot;</div>}
                  {locationFilter && locationFilter !== "all" && <div>Location: {locationFilter}</div>}
                  {workTypeFilter && workTypeFilter !== "all" && <div>Type: {workTypeFilter}</div>}
                  {experienceFilter && experienceFilter !== "all" && <div>Experience: {experienceFilter}</div>}
                </div>
              </Card>

              {/* Saved Jobs */}
              {savedJobs.length > 0 && (
                <Card className="p-4 glass border-glass-border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookmarkCheck className="w-4 h-4 text-neon-cyan" />
                    Saved Jobs ({savedJobs.length})
                  </h3>
                  <div className="space-y-2">
                    {savedJobs.slice(0, 3).map((jobId) => {
                      const job = jobs.find((j) => j.id === Number(jobId));
                      if (!job) return null;
                      return (
                        <div key={job.id} className="text-sm p-2 rounded glass-strong border border-glass-border">
                          <div className="font-medium line-clamp-1">{job.title}</div>
                          <div className="text-muted-foreground text-xs">{job.company_name}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-2">
              {/* Recently Viewed Jobs */}
              {viewedJobs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-neon-cyan" />
                    Recently Viewed ({viewedJobs.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewedJobs.slice(0, 3).map((jobId) => {
                      const job = jobs.find((j) => j.id === Number(jobId));
                      if (!job) return null;
                      return (
                        <Card
                          key={job.id}
                          className="p-4 glass border-glass-border cursor-pointer hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 hover:-translate-y-0.5 transition-all rounded-xl flex flex-col justify-between"
                          onClick={() => handleJobClick(job)}
                          style={{ minHeight: "140px" }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {job.company_logo && <img src={job.company_logo} alt={job.company_name} className="w-10 h-10 rounded-lg object-cover border border-glass-border flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 mb-1">{job.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">{job.company_name}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs px-2.5 py-1 rounded-full">
                              {job.work_type}
                            </Badge>
                            {/* {job.fitScore && (
                              <div className="flex items-center gap-1">
                                <Target className="w-3 h-3 text-neon-cyan" />
                                <span className="text-xs font-semibold text-neon-cyan">{job.fitScore}%</span>
                              </div>
                            )} */}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Job Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`glass border-glass-border cursor-pointer transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 hover:-translate-y-1 flex flex-col overflow-hidden rounded-xl group h-full ${
                      selectedJobs.includes(job.id) ? "border-neon-purple/50 bg-neon-purple/5" : ""
                    }`}
                    onClick={() => handleJobClick(job)}
                  >
                    <div className="p-5 flex flex-col flex-1">
                      {/* Header - Company Logo, Title, Company Name */}
                      <div className="flex items-start gap-3 mb-4">
                        {job.company_logo && (
                          <div className="flex-shrink-0">
                            <img src={job.company_logo} alt={job.company_name} className="w-12 h-12 rounded-xl object-cover border border-glass-border shadow-sm" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-neon-cyan transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{job.company_name}</p>
                        </div>
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          {/* {onToggleCompare && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCompare(job);
                              }}
                              disabled={!comparedJobs.some((j) => j.id === job.id) && comparedJobs.length >= 4}
                              className={`p-1.5 h-7 w-7 hover:text-neon-purple hover:bg-neon-purple/10 transition-colors ${
                                comparedJobs.some((j) => j.id === job.id) ? "text-neon-purple bg-neon-purple/10" : ""
                              }`}
                              title={comparedJobs.length >= 4 && !comparedJobs.some((j) => j.id === job.id) ? "Max 4 jobs can be compared" : "Add to compare"}
                            >
                              {comparedJobs.some((j) => j.id === job.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </Button>
                          )} */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveJob(job.id);
                            }}
                            className="p-1.5 h-7 w-7 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                          >
                            {job.isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-neon-cyan" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </Button>
                        </div>
                      </div>

                      {/* Location, Source, and Match */}
                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="line-clamp-1">{job.location}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {getSourceIcon(job.source.platform)}
                            <span className="text-sm text-muted-foreground">{job.source.platform}</span>
                          </div>

                          {job.fitScore && (
                            <div className="flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-neon-purple" />
                              <span className="text-sm font-semibold text-neon-purple">{job.fitScore}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 2 && (
                          <Badge variant="secondary" className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                            +{job.skills.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Footer - Views, Work Type */}
                      <div className="pt-3 border-t border-glass-border/50">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{job.views} views</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {getWorkTypeIcon(job.workType)}
                            <span>{job.workType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-glass flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters to find more opportunities.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setLocationFilter("all");
                      setWorkTypeFilter("all");
                      setExperienceFilter("all");
                    }}
                    className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Compare Jobs Tray */}
      {/* {onCompare && onRemoveFromCompare && onClearCompare && <CompareJobsTray jobs={comparedJobs} onRemoveJob={onRemoveFromCompare} onCompare={onCompare} onClear={onClearCompare} />} */}

      {/* AI Assistant Drawer */}
      <JobAIAssistantDrawer isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} selectedJob={aiAssistantJob} jobs={jobs} />
    </div>
  );
}
