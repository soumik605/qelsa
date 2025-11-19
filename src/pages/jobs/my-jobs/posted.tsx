import { ApplicationsManagementPage } from "@/components/ApplicationsManagementPage";
import MyJobLayout from "@/components/job/MyJobLayout";
import { Box } from "@mui/material";
import { Archive, Copy, Edit3, Eye, MoreVertical, Pause, Play, Share2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { useGetPostedJobsQuery } from "@/features/api/jobsApi";

interface PostedJob {
  id: string;
  title: string;
  location: string;
  status: "active" | "paused" | "closed" | "draft";
  postedDate: string;
  expiresDate: string;
  views: number;
  applications: number;
  applicationsStarted: number;
  completionRate: number;
  interviewRate: number;
  budget?: number;
  spend?: number;
  daysActive: number;
  health: "excellent" | "good" | "fair" | "poor";
  lastUpdated: string;
}

const Posted = () => {
  const [viewingApplications, setViewingApplications] = useState<PostedJob | null>(null);
  const { data: postedJobs, error, isLoading } = useGetPostedJobsQuery()

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
    <MyJobLayout>
      <Box className="space-y-4">
        {viewingApplications ? (
          <ApplicationsManagementPage
            jobPosting={{
              id: viewingApplications.id,
              title: viewingApplications.title,
              location: viewingApplications.location,
              mustHaves: ["3+ years React experience", "TypeScript proficiency", "Team leadership", "Agile methodology", "Testing frameworks", "CI/CD experience"],
            }}
            onBack={() => setViewingApplications(null)}
          />
        ) : (
          <Card className="glass border-glass-border">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-40 glass border-glass-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-glass-border">
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-locations">
                  <SelectTrigger className="w-48 glass border-glass-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-glass-border">
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="sf">San Francisco</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-dates">
                  <SelectTrigger className="w-44 glass border-glass-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-glass-border">
                    <SelectItem value="all-dates">All Time</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-glass-border">
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Age</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Apply Starts</TableHead>
                      <TableHead className="text-right">Apps</TableHead>
                      <TableHead className="text-right">Completion</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {postedJobs.map((job) => (
                      <TableRow key={job.id} className="border-glass-border hover:bg-white/5">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {job.title}
                            {/* {job.health === "fair" && (
                              <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                                Low apply rate
                              </Badge>
                            )}
                            {job.completionRate < 40 && (
                              <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                                High drop-off
                              </Badge>
                            )} */}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{job.location}</TableCell>
                        <TableCell>
                          {/* <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                            {job.status}
                          </Badge> */}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">{job.daysActive}d</TableCell>
                        <TableCell className="text-right text-sm">{job.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{job.applicationsStarted}</TableCell>
                        <TableCell className="text-right text-sm font-medium">{job.applications}</TableCell>
                        <TableCell className="text-right text-sm">
                          <span className={job.completionRate < 40 ? "text-neon-yellow" : job.completionRate > 60 ? "text-neon-green" : ""}>{job.completionRate}%</span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{job.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setViewingApplications(job)} className="h-8 text-xs text-neon-cyan hover:text-neon-cyan">
                              <Eye className="w-3 h-3 mr-1" />
                              View Apps
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass border-glass-border">
                                <DropdownMenuItem>
                                  <Edit3 className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {job.status === "active" ? (
                                    <>
                                      <Pause className="w-4 h-4 mr-2" />
                                      Pause
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Resume
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share Link
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        )}
      </Box>
    </MyJobLayout>
  );
};

export default Posted;
