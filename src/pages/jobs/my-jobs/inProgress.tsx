import MyJobLayout from "@/components/job/MyJobLayout";
import { useGetPostedJobsQuery } from "@/features/api/jobsApi";
import Layout from "@/layout";
import { Box } from "@mui/material";
import { Archive, Calendar, Clock, Eye, MoreVertical, Play, Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

const InProgress = () => {
  const { data: inProgressJobs, error, isLoading } = useGetPostedJobsQuery();
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
          {inProgressJobs?.map((job) => (
            <Card key={job.id} className="glass border-glass-border p-6 hover:border-neon-purple/50 transition-all">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                  <p className="text-muted-foreground mb-3">{job.page?.name || job.company_name}</p>

                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{/* Step {job.stepsCompleted} of {job.totalSteps}: {job.currentStep} */}</span>
                      {/* <span className="text-sm font-semibold text-neon-purple">{job.progress}%</span> */}
                    </div>
                    {/* <Progress value={job.progress} className="h-2" /> */}
                  </div>

                  {/* Deadline guardrails */}
                  <div className="flex items-center gap-4 mb-4">
                    {/* <div className={`flex items-center gap-2 text-sm ${job.daysUntilDeadline <= 3 ? "text-destructive" : "text-neon-yellow"}`}>
                      <Calendar className="w-4 h-4" />
                      <span>
                        Deadline: {job.deadline} ({job.daysUntilDeadline} days)
                      </span>
                    </div> */}
                    <Badge variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                      <Clock className="w-3 h-3 mr-1" />
                      {/* Saved {job.lastSaved} */}
                    </Badge>
                  </div>

                  {/* Blockers surfaced */}
                  {/* {job.blockers.length > 0 && (
                    <div className="glass-strong rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Blockers ({job.blockers.length})</span>
                      </div>
                      <ul className="space-y-1">
                        {job.blockers.map((blocker, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <XCircle className="w-3 h-3 mt-0.5 text-destructive flex-shrink-0" />
                            {blocker}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="gradient-animated flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Resume Application
                </Button>
                <Button variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass border-glass-border">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Job Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Save as Draft
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Discard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </Box>
      </MyJobLayout>
    </Layout>
  );
};

export default InProgress;
