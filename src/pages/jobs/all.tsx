import JobLayout from "@/components/job/layout";
import { Card } from "@mui/material";
import { Filter } from "lucide-react";
import Layout from "../../layout";

const All = () => {
  return (
    <Layout activeSection={"jobs"}>
      <JobLayout>
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
            {jobs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-neon-cyan" />
                  Recently Viewed ({jobs.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.slice(0, 3).map((jobId) => {
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
      </JobLayout>
    </Layout>
  );
};

export default All;
