import MyJobLayout from "@/components/job/MyJobLayout";
import { useGetAppliedJobsQuery } from "@/features/api/jobsApi";
import Layout from "@/layout";
import { Box } from "@mui/material";
import { Archive, ExternalLink, Eye, MessageSquare, MoreVertical, TrendingUp } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

const Applied = () => {
  const { data: appliedJobs, error, isLoading } = useGetAppliedJobsQuery();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-neon-green/30 text-neon-green bg-neon-green/10";
      case "paused":
        return "border-neon-yellow/30 text-neon-yellow bg-neon-yellow/10";
      case "closed":
        return "border-muted-foreground/30 text-muted-foreground bg-muted/10";
      case "draft":
        return "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10";
      case "interview-scheduled":
        return "border-neon-purple/30 text-neon-purple bg-neon-purple/10";
      case "viewed":
        return "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10";
      case "rejected":
        return "border-destructive/30 text-destructive bg-destructive/10";
      default:
        return "border-muted-foreground/30 text-muted-foreground bg-muted/10";
    }
  };

  return (
    <Layout activeSection={"jobs"}>
      <MyJobLayout>
        <Box className="space-y-4">
          {appliedJobs?.map((job) => (
            <Card key={job.id} className="glass border-glass-border p-6 hover:border-neon-green/50 transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    {/* <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                      {job.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(job.source.toLowerCase())}`}>
                      {job.source}
                    </Badge> */}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {job.page?.name || job.company_name}
                    {/* • Applied {job.appliedDate} */}
                  </p>

                  {/* Timeline */}
                  <div className="space-y-3 mb-4">
                    {/* {job.timeline.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          {idx === job.timeline.length - 1 ? (
                            <div className={`w-2 h-2 rounded-full ${job.status === "rejected" ? "bg-destructive" : "bg-neon-green"}`} />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{event.status}</p>
                            <span className="text-xs text-muted-foreground">{event.date}</span>
                          </div>
                          {event.note && <p className="text-xs text-muted-foreground mt-1">{event.note}</p>}
                        </div>
                      </div>
                    ))} */}
                  </div>

                  {/* Next nudge recommendation */}
                  {/* {job.nextNudgeDate && job.status !== "rejected" && (
                    <div className="glass-strong rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-neon-cyan">
                        <Bell className="w-4 h-4" />
                        <span className="text-sm">Recommended follow-up: {job.nextNudgeDate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Based on typical {job.responseTime}-day response window</p>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex gap-2">
                {/* {job.status === "interview-scheduled" && (
                  <Button className="gradient-animated">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Interview Details
                  </Button>
                )}
                {job.status === "viewed" && (
                  <Button variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Follow-up
                  </Button>
                )} */}
                <Button variant="outline" className="border-glass-border">
                  <Eye className="w-4 h-4 mr-2" />
                  View Application
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass border-glass-border">
                    <DropdownMenuItem>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Job Posting
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Note
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}

          {/* Source insights */}
          <Card className="glass border-neon-cyan/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-semibold">Source Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-strong rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Qelsa</p>
                <p className="text-2xl font-bold text-neon-green mb-1">42%</p>
                <p className="text-xs text-muted-foreground">Interview rate</p>
              </div>
              <div className="glass-strong rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
                <p className="text-2xl font-bold text-neon-cyan mb-1">28%</p>
                <p className="text-xs text-muted-foreground">Interview rate</p>
              </div>
              <div className="glass-strong rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Indeed</p>
                <p className="text-2xl font-bold text-neon-yellow mb-1">18%</p>
                <p className="text-xs text-muted-foreground">Interview rate</p>
              </div>
              <div className="glass-strong rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Average Response</p>
                <p className="text-2xl font-bold text-neon-purple mb-1">4.2 days</p>
                <p className="text-xs text-muted-foreground">Across all sources</p>
              </div>
            </div>
          </Card>
        </Box>
      </MyJobLayout>
    </Layout>
  );
};

export default Applied;
