import { useGetPostedJobsQuery } from "@/features/api/jobsApi";
import Layout from "@/layout";
import { ArrowLeft, Briefcase, Calendar, Edit2, ExternalLink, Eye, MapPin, MoreVertical, PauseCircle, PlayCircle, Plus, Search, Star, Trash2, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

interface PostedJob {
  id: string;
  title: string;
  location: string;
  work_type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";
  salary?: string;
  postedDate: string;
  status: "active" | "paused" | "closed";
  views: number;
  applications: number;
  shortlisted: number;
  interviewed: number;
  hired: number;
  skills: string[];
  experience: string;
  department?: string;
}

export default function Posted() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"active" | "paused" | "closed">("active");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const { data: postedJobs = [] } = useGetPostedJobsQuery();

  const filteredJobs = postedJobs.filter((job) => {
    // const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    // const matchesStatus = job.status === statusFilter;
    // return matchesSearch && matchesStatus;

    return job;
  });

  const activeJobs = postedJobs.filter((job) => job.status === "active");
  const pausedJobs = postedJobs.filter((job) => job.status === "paused");
  const closedJobs = postedJobs.filter((job) => job.status === "closed");

  // const totalViews = postedJobs.reduce((sum, job) => sum + job.views, 0);
  // const totalApplications = postedJobs.reduce((sum, job) => sum + job.applications, 0);
  // const totalHired = postedJobs.reduce((sum, job) => sum + job.hired, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-neon-green/20 text-neon-green border-neon-green/30";
      case "paused":
        return "bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30";
      case "closed":
        return "bg-muted/20 text-muted-foreground border-muted/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const handleTogglePause = (jobId: number) => {
    console.log("Toggle pause for job:", jobId);
    // Implementation for pausing/resuming job
  };

  const handleDeleteJob = (jobId: number) => {
    console.log("Delete job:", jobId);
    // Implementation for deleting job
  };

  return (
    <Layout activeSection={"jobs"}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
        {/* Header */}
        <div className="glass-strong border-b border-glass-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()} className="hover:bg-white/5">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Posted Jobs</h1>
                  <p className="text-muted-foreground mt-1">Manage and track your job postings</p>
                </div>
              </div>

              <Button
                onClick={() => router.push("/jobs/create-job")}
                className="gradient-animated text-white font-bold shadow-lg hover:shadow-xl hover:shadow-neon-purple/30 transition-all duration-300 hover:scale-105 border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="glass border-glass-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
                    <p className="text-2xl font-bold text-neon-green">{activeJobs.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-neon-green" />
                  </div>
                </div>
              </Card>

              <Card className="glass border-glass-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                    {/* <p className="text-2xl font-bold text-neon-cyan">{totalViews.toLocaleString()}</p> */}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-neon-cyan" />
                  </div>
                </div>
              </Card>

              <Card className="glass border-glass-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Applications</p>
                    {/* <p className="text-2xl font-bold text-neon-purple">{totalApplications}</p> */}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-neon-purple" />
                  </div>
                </div>
              </Card>

              <Card className="glass border-glass-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hired</p>
                    {/* <p className="text-2xl font-bold text-neon-pink">{totalHired}</p> */}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-neon-pink" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posted jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass border-glass-border focus:border-neon-cyan"
                />
              </div>

              <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-auto">
                <TabsList className="glass-strong border-glass-border">
                  <TabsTrigger value="active" className="data-[state=active]:text-neon-green">
                    Active ({activeJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="paused" className="data-[state=active]:text-neon-yellow">
                    Paused ({pausedJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="data-[state=active]:text-muted-foreground">
                    Closed ({closedJobs.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="glass border-glass-border hover:border-neon-cyan/30 transition-all group">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-neon-cyan transition-colors">{job.title}</h3>
                          <Badge variant="outline" className={getStatusColor(job.status)}>
                            {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.work_type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {/* {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/10">
                            {skill}
                          </Badge>
                        ))} */}
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-neon-cyan" />
                          <span className="text-sm">
                            {/* <span className="font-semibold text-foreground">{job.views}</span> */}
                            <span className="text-muted-foreground ml-1">views</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-neon-purple" />
                          <span className="text-sm">
                            {/* <span className="font-semibold text-foreground">{job.applications}</span> */}
                            <span className="text-muted-foreground ml-1">applications</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-neon-green" />
                          <span className="text-sm">
                            {/* <span className="font-semibold text-foreground">{job.shortlisted}</span> */}
                            <span className="text-muted-foreground ml-1">shortlisted</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-neon-yellow" />
                          <span className="text-sm">
                            {/* <span className="font-semibold text-foreground">{job.interviewed}</span> */}
                            <span className="text-muted-foreground ml-1">interviewed</span>
                          </span>
                        </div>
                        {/* {job.hired > 0 && (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-neon-pink" />
                            <span className="text-sm">
                              <span className="font-semibold text-foreground">{job.hired}</span>
                              <span className="text-muted-foreground ml-1">hired</span>
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="glass border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10" onClick={() => router.push(`/jobs/${job.id}/applications`)}>
                        <Users className="w-4 h-4 mr-2" />
                        View Applications
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-white/5">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-strong border-glass-border">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => window.open(`/jobs/${job.id}`, "_blank")} className="cursor-pointer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Public Page
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          {job.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleTogglePause(job.id)} className="cursor-pointer text-neon-yellow">
                              <PauseCircle className="w-4 h-4 mr-2" />
                              Pause Job
                            </DropdownMenuItem>
                          ) : job.status === "paused" ? (
                            <DropdownMenuItem onClick={() => handleTogglePause(job.id)} className="cursor-pointer text-neon-green">
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Resume Job
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem onClick={() => handleDeleteJob(job.id)} className="cursor-pointer text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-glass flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">{searchQuery ? "Try adjusting your search criteria" : "Start by posting your first job"}</p>
                {!searchQuery && (
                  <Button onClick={() => router.push("/jobs/create-job")} className="gradient-animated text-white font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Job
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
