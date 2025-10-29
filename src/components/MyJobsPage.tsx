import { useState, useMemo } from 'react';
import {
  Briefcase,
  Bookmark,
  FileText,
  Send,
  Search,
  Filter,
  Calendar,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
  Users,
  Star,
  Bell,
  MessageSquare,
  Edit3,
  Play,
  Pause,
  Copy,
  UserPlus,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  Kanban,
  Plus,
  ArrowUpRight,
  DollarSign,
  Target,
  Zap,
  ChevronRight,
  MoreVertical,
  Trash2,
  Archive,
  Share2,
  ExternalLink,
  AlertTriangle,
  Flag
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { ApplicationsManagementPage } from './ApplicationsManagementPage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  workType: string;
  postedDate: string;
  deadline?: string;
  matchScore: number;
  skills: string[];
  priority: 'high' | 'medium' | 'low';
  hasReminder: boolean;
  notes?: string;
  source: 'Qelsa' | 'LinkedIn' | 'Indeed' | 'Naukri';
}

interface InProgressJob {
  id: string;
  title: string;
  company: string;
  deadline: string;
  progress: number;
  currentStep: string;
  blockers: string[];
  lastSaved: string;
  stepsCompleted: number;
  totalSteps: number;
  daysUntilDeadline: number;
}

interface AppliedJob {
  id: string;
  title: string;
  company: string;
  appliedDate: string;
  status: 'submitted' | 'viewed' | 'interview-scheduled' | 'interview-completed' | 'offer' | 'rejected';
  timeline: {
    status: string;
    date: string;
    note?: string;
  }[];
  nextNudgeDate?: string;
  source: 'Qelsa' | 'LinkedIn' | 'Indeed' | 'Naukri';
  responseTime?: number; // days
}

interface PostedJob {
  id: string;
  title: string;
  location: string;
  status: 'active' | 'paused' | 'closed' | 'draft';
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
  health: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: string;
}

interface MyJobsPageProps {
  onNavigate?: (section: string) => void;
  onJobClick?: (jobId: string) => void;
  onPostJob?: () => void;
  initialTab?: 'saved' | 'in-progress' | 'applied' | 'posted';
}

export function MyJobsPage({ onNavigate, onJobClick, onPostJob, initialTab = 'saved' }: MyJobsPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingApplications, setViewingApplications] = useState<PostedJob | null>(null);
  const [sortBy, setSortBy] = useState('recent');

  // Mock data - would come from API/state management
  const savedJobs: SavedJob[] = [
    {
      id: '1',
      title: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA (Remote)',
      salary: '$140k - $180k',
      workType: 'Remote',
      postedDate: '2 days ago',
      deadline: 'Dec 15, 2025',
      matchScore: 94,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      priority: 'high',
      hasReminder: true,
      notes: 'Great culture fit, reach out to Sarah for referral',
      source: 'Qelsa'
    },
    {
      id: '2',
      title: 'Product Designer',
      company: 'DesignHub',
      location: 'New York, NY',
      salary: '$120k - $150k',
      workType: 'Hybrid',
      postedDate: '1 week ago',
      deadline: 'Dec 20, 2025',
      matchScore: 87,
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      priority: 'medium',
      hasReminder: false,
      source: 'LinkedIn'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      salary: '$130k - $160k',
      workType: 'On-site',
      postedDate: '3 days ago',
      matchScore: 82,
      skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
      priority: 'low',
      hasReminder: false,
      source: 'Indeed'
    }
  ];

  const inProgressJobs: InProgressJob[] = [
    {
      id: '1',
      title: 'Senior Backend Engineer',
      company: 'CloudSystems',
      deadline: 'Dec 12, 2025',
      progress: 75,
      currentStep: 'Complete screening questions',
      blockers: ['Portfolio link required'],
      lastSaved: '2 hours ago',
      stepsCompleted: 3,
      totalSteps: 4,
      daysUntilDeadline: 5
    },
    {
      id: '2',
      title: 'DevOps Engineer',
      company: 'InfraTech',
      deadline: 'Dec 18, 2025',
      progress: 40,
      currentStep: 'Upload resume',
      blockers: ['Missing cover letter', 'References needed'],
      lastSaved: '1 day ago',
      stepsCompleted: 2,
      totalSteps: 5,
      daysUntilDeadline: 11
    }
  ];

  const appliedJobs: AppliedJob[] = [
    {
      id: '1',
      title: 'Staff Engineer',
      company: 'MegaCorp',
      appliedDate: 'Nov 28, 2025',
      status: 'interview-scheduled',
      timeline: [
        { status: 'Application submitted', date: 'Nov 28, 2025' },
        { status: 'Application viewed', date: 'Nov 30, 2025' },
        { status: 'Interview scheduled', date: 'Dec 5, 2025', note: 'Technical round with CTO' }
      ],
      nextNudgeDate: 'Dec 15, 2025',
      source: 'Qelsa',
      responseTime: 2
    },
    {
      id: '2',
      title: 'Engineering Manager',
      company: 'ScaleUp Inc',
      appliedDate: 'Nov 20, 2025',
      status: 'viewed',
      timeline: [
        { status: 'Application submitted', date: 'Nov 20, 2025' },
        { status: 'Application viewed', date: 'Nov 25, 2025' }
      ],
      nextNudgeDate: 'Dec 10, 2025',
      source: 'LinkedIn',
      responseTime: 5
    },
    {
      id: '3',
      title: 'Tech Lead',
      company: 'Innovation Labs',
      appliedDate: 'Nov 15, 2025',
      status: 'rejected',
      timeline: [
        { status: 'Application submitted', date: 'Nov 15, 2025' },
        { status: 'Application viewed', date: 'Nov 18, 2025' },
        { status: 'Not selected', date: 'Nov 22, 2025', note: 'Experience requirements not met' }
      ],
      source: 'Indeed',
      responseTime: 7
    }
  ];

  const postedJobs: PostedJob[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      location: 'San Francisco, CA (Remote)',
      status: 'active',
      postedDate: 'Nov 15, 2025',
      expiresDate: 'Dec 15, 2025',
      views: 2847,
      applications: 67,
      applicationsStarted: 142,
      completionRate: 47.2,
      interviewRate: 12.4,
      budget: 5000,
      spend: 2340,
      daysActive: 22,
      health: 'excellent',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'Product Manager',
      location: 'New York, NY',
      status: 'active',
      postedDate: 'Nov 25, 2025',
      expiresDate: 'Dec 25, 2025',
      views: 1234,
      applications: 34,
      applicationsStarted: 89,
      completionRate: 38.2,
      interviewRate: 8.8,
      daysActive: 12,
      health: 'good',
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      title: 'UX Designer',
      location: 'Austin, TX',
      status: 'paused',
      postedDate: 'Nov 10, 2025',
      expiresDate: 'Dec 10, 2025',
      views: 892,
      applications: 12,
      applicationsStarted: 45,
      completionRate: 26.7,
      interviewRate: 4.2,
      daysActive: 27,
      health: 'fair',
      lastUpdated: '3 days ago'
    }
  ];

  // Calculate overview stats
  const overviewStats = useMemo(() => {
    const urgentDeadlines = [...savedJobs, ...inProgressJobs].filter(job => {
      if ('daysUntilDeadline' in job) {
        return job.daysUntilDeadline <= 3;
      }
      return false;
    }).length;

    const expiringPosts = postedJobs.filter(job => {
      const expiresDate = new Date(job.expiresDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiresDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7 && job.status === 'active';
    }).length;

    const interviewsPending = appliedJobs.filter(
      job => job.status === 'interview-scheduled'
    ).length;

    return {
      saved: savedJobs.length,
      inProgress: inProgressJobs.length,
      applied: appliedJobs.length,
      posted: postedJobs.filter(j => j.status === 'active').length,
      urgentDeadlines,
      expiringPosts,
      interviewsPending
    };
  }, [savedJobs, inProgressJobs, appliedJobs, postedJobs]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-neon-green';
      case 'good': return 'text-neon-cyan';
      case 'fair': return 'text-neon-yellow';
      case 'poor': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-neon-green/30 text-neon-green bg-neon-green/10';
      case 'paused': return 'border-neon-yellow/30 text-neon-yellow bg-neon-yellow/10';
      case 'closed': return 'border-muted-foreground/30 text-muted-foreground bg-muted/10';
      case 'draft': return 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10';
      case 'interview-scheduled': return 'border-neon-purple/30 text-neon-purple bg-neon-purple/10';
      case 'viewed': return 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10';
      case 'rejected': return 'border-destructive/30 text-destructive bg-destructive/10';
      default: return 'border-muted-foreground/30 text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-neon-yellow';
      case 'low': return 'text-neon-cyan';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div>
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'saved' | 'in-progress' | 'applied' | 'posted')}>
          <TabsList className="glass border-glass-border mb-6">
            <TabsTrigger value="saved" className="data-[state=active]:bg-neon-cyan/20">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved ({savedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-neon-purple/20">
              <FileText className="w-4 h-4 mr-2" />
              In Progress ({inProgressJobs.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="data-[state=active]:bg-neon-green/20">
              <Send className="w-4 h-4 mr-2" />
              Applied ({appliedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="posted" className="data-[state=active]:bg-neon-pink/20">
              <Briefcase className="w-4 h-4 mr-2" />
              Posted ({postedJobs.length})
            </TabsTrigger>
          </TabsList>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved" className="space-y-4">
            {savedJobs.map((job) => (
              <Card key={job.id} className="glass border-glass-border p-6 hover:border-neon-cyan/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(job.source.toLowerCase())}`}>
                            {job.source}
                          </Badge>
                          {job.hasReminder && (
                            <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                              <Bell className="w-3 h-3 mr-1" />
                              Reminder
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{job.company} • {job.location}</p>
                        
                        {/* Auto-enriched highlights */}
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {job.salary && (
                            <div className="flex items-center gap-1 text-sm">
                              <DollarSign className="w-4 h-4 text-neon-green" />
                              <span className="text-neon-green">{job.salary}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-sm">
                            <Target className="w-4 h-4 text-neon-cyan" />
                            <span className="text-neon-cyan">{job.matchScore}% Match</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Flag className={`w-4 h-4 ${getPriorityColor(job.priority)}`} />
                            <span className={getPriorityColor(job.priority)}>{job.priority} priority</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-neon-purple/30 text-neon-purple">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Notes preview */}
                        {job.notes && (
                          <div className="glass-strong rounded p-2 text-sm text-muted-foreground mb-3">
                            <MessageSquare className="w-3 h-3 inline mr-1" />
                            {job.notes}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Posted {job.postedDate}
                          </span>
                          {job.deadline && (
                            <span className="flex items-center gap-1 text-destructive">
                              <AlertCircle className="w-3 h-3" />
                              Deadline: {job.deadline}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* One-tap actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="gradient-animated">
                        <Zap className="w-4 h-4 mr-2" />
                        Tailor Resume
                      </Button>
                      <Button size="sm" variant="outline" className="border-neon-purple/30 text-neon-purple">
                        <Star className="w-4 h-4 mr-2" />
                        Set Priority
                      </Button>
                      <Button size="sm" variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                        <Bell className="w-4 h-4 mr-2" />
                        Set Reminder
                      </Button>
                      <Button size="sm" variant="outline" className="border-glass-border">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                      <Button size="sm" variant="outline" className="border-glass-border">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-glass-border">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* In Progress Tab */}
          <TabsContent value="in-progress" className="space-y-4">
            {inProgressJobs.map((job) => (
              <Card key={job.id} className="glass border-glass-border p-6 hover:border-neon-purple/50 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                    <p className="text-muted-foreground mb-3">{job.company}</p>
                    
                    {/* Progress indicator */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Step {job.stepsCompleted} of {job.totalSteps}: {job.currentStep}
                        </span>
                        <span className="text-sm font-semibold text-neon-purple">{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>

                    {/* Deadline guardrails */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`flex items-center gap-2 text-sm ${
                        job.daysUntilDeadline <= 3 ? 'text-destructive' : 'text-neon-yellow'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {job.deadline} ({job.daysUntilDeadline} days)</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                        <Clock className="w-3 h-3 mr-1" />
                        Saved {job.lastSaved}
                      </Badge>
                    </div>

                    {/* Blockers surfaced */}
                    {job.blockers.length > 0 && (
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
                    )}
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
          </TabsContent>

          {/* Applied Jobs Tab */}
          <TabsContent value="applied" className="space-y-4">
            {appliedJobs.map((job) => (
              <Card key={job.id} className="glass border-glass-border p-6 hover:border-neon-green/50 transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                        {job.status.replace('-', ' ')}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(job.source.toLowerCase())}`}>
                        {job.source}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{job.company} • Applied {job.appliedDate}</p>

                    {/* Timeline */}
                    <div className="space-y-3 mb-4">
                      {job.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1">
                            {idx === job.timeline.length - 1 ? (
                              <div className={`w-2 h-2 rounded-full ${
                                job.status === 'rejected' ? 'bg-destructive' : 'bg-neon-green'
                              }`} />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{event.status}</p>
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                            {event.note && (
                              <p className="text-xs text-muted-foreground mt-1">{event.note}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Next nudge recommendation */}
                    {job.nextNudgeDate && job.status !== 'rejected' && (
                      <div className="glass-strong rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-neon-cyan">
                          <Bell className="w-4 h-4" />
                          <span className="text-sm">Recommended follow-up: {job.nextNudgeDate}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on typical {job.responseTime}-day response window
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {job.status === 'interview-scheduled' && (
                    <Button className="gradient-animated">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Interview Details
                    </Button>
                  )}
                  {job.status === 'viewed' && (
                    <Button variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Follow-up
                    </Button>
                  )}
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
          </TabsContent>

          {/* Posted Jobs Tab */}
          <TabsContent value="posted" className="space-y-4">
            {viewingApplications ? (
              <ApplicationsManagementPage
                jobPosting={{
                  id: viewingApplications.id,
                  title: viewingApplications.title,
                  location: viewingApplications.location,
                  mustHaves: ['3+ years React experience', 'TypeScript proficiency', 'Team leadership', 'Agile methodology', 'Testing frameworks', 'CI/CD experience']
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
                                {job.health === 'fair' && (
                                  <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                                    Low apply rate
                                  </Badge>
                                )}
                                {job.completionRate < 40 && (
                                  <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                                    High drop-off
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {job.location}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-xs ${getStatusColor(job.status)}`}>
                                {job.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                              {job.daysActive}d
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              {job.views.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              {job.applicationsStarted}
                            </TableCell>
                            <TableCell className="text-right text-sm font-medium">
                              {job.applications}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              <span className={job.completionRate < 40 ? 'text-neon-yellow' : job.completionRate > 60 ? 'text-neon-green' : ''}>
                                {job.completionRate}%
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {job.lastUpdated}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setViewingApplications(job)}
                                  className="h-8 text-xs text-neon-cyan hover:text-neon-cyan"
                                >
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
                                      {job.status === 'active' ? (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
