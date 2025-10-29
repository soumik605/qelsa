import { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronRight,
  MoreVertical,
  Download,
  Share2,
  MessageSquare,
  UserCheck,
  UserX,
  Archive,
  Send,
  TrendingUp,
  AlertCircle,
  Eye,
  FileText,
  GraduationCap,
  Award,
  Zap,
  Users,
  Target,
  User,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
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
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  rating: number;
  yearsExperience: number;
  keySkills: string[];
  source: 'Qelsa' | 'LinkedIn' | 'Indeed' | 'Referral' | 'Direct';
  appliedDaysAgo: number;
  status: 'new' | 'reviewed' | 'shortlisted' | 'phone-screen' | 'interview' | 'rejected';
  matchScore: number;
  location: string;
  currentRole?: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  timeline: {
    status: string;
    date: string;
    note?: string;
  }[];
  resumeUrl?: string;
  mustHavesMatched: number;
  mustHavesTotal: number;
}

interface JobPosting {
  id: string;
  title: string;
  location: string;
  mustHaves: string[];
}

interface ApplicationsManagementPageProps {
  jobPosting: JobPosting;
  onBack: () => void;
}

export function ApplicationsManagementPage({ jobPosting, onBack }: ApplicationsManagementPageProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [savedView, setSavedView] = useState('all');
  const [showMessageComposer, setShowMessageComposer] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [messageText, setMessageText] = useState('');

  // Mock applicants data
  const applicants: Applicant[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      yearsExperience: 5,
      keySkills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      source: 'Qelsa',
      appliedDaysAgo: 2,
      status: 'shortlisted',
      matchScore: 94,
      location: 'San Francisco, CA',
      currentRole: 'Senior Frontend Developer at TechCorp',
      education: [
        { degree: 'M.S. Computer Science', institution: 'Stanford University', year: '2019' },
        { degree: 'B.S. Computer Science', institution: 'UC Berkeley', year: '2017' }
      ],
      timeline: [
        { status: 'Applied', date: '2 days ago' },
        { status: 'Application viewed', date: '1 day ago' },
        { status: 'Shortlisted', date: '6 hours ago', note: 'Strong technical background' }
      ],
      mustHavesMatched: 5,
      mustHavesTotal: 6
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      rating: 4.5,
      yearsExperience: 3,
      keySkills: ['React', 'JavaScript', 'Redux', 'GraphQL'],
      source: 'LinkedIn',
      appliedDaysAgo: 5,
      status: 'reviewed',
      matchScore: 87,
      location: 'Austin, TX',
      currentRole: 'Frontend Developer at StartupXYZ',
      education: [
        { degree: 'B.S. Software Engineering', institution: 'UT Austin', year: '2020' }
      ],
      timeline: [
        { status: 'Applied', date: '5 days ago' },
        { status: 'Application viewed', date: '3 days ago' }
      ],
      mustHavesMatched: 4,
      mustHavesTotal: 6
    },
    {
      id: '3',
      name: 'Emily Watson',
      email: 'emily.watson@email.com',
      rating: 4.9,
      yearsExperience: 7,
      keySkills: ['React', 'TypeScript', 'Next.js', 'Docker', 'Kubernetes'],
      source: 'Referral',
      appliedDaysAgo: 1,
      status: 'new',
      matchScore: 96,
      location: 'Remote',
      currentRole: 'Staff Engineer at CloudTech',
      education: [
        { degree: 'Ph.D. Computer Science', institution: 'MIT', year: '2018' },
        { degree: 'B.S. Computer Engineering', institution: 'Caltech', year: '2014' }
      ],
      timeline: [
        { status: 'Applied', date: '1 day ago' }
      ],
      mustHavesMatched: 6,
      mustHavesTotal: 6
    }
  ];

  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      if (savedView === 'new-week') return applicant.appliedDaysAgo <= 7 && applicant.status === 'new';
      if (savedView === 'strong-match') return applicant.matchScore >= 90;
      if (savedView === 'needs-followup') return applicant.appliedDaysAgo > 7 && applicant.status === 'reviewed';
      return true;
    });
  }, [savedView]);

  const sortedApplicants = useMemo(() => {
    return [...filteredApplicants].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      return a.appliedDaysAgo - b.appliedDaysAgo; // Most recent first
    });
  }, [filteredApplicants, sortBy]);

  // Health metrics
  const applyRate = 23.4; // percentage
  const completionRate = 67.8; // percentage
  const medianResponseTime = 2.3; // days

  const handleBulkAction = useCallback((action: string) => {
    console.log(`Bulk action: ${action} for applicants:`, selectedApplicants);
    setSelectedApplicants([]);
  }, [selectedApplicants]);

  const handleSendMessage = useCallback(() => {
    console.log('Sending message:', messageText);
    setShowMessageComposer(false);
    setMessageText('');
  }, [messageText]);

  const messageTemplates = {
    thanks: 'Thank you for your application! We\'ve received your materials and will review them carefully. We\'ll be in touch soon.',
    phoneScreen: 'We were impressed by your application! We\'d like to schedule a brief phone screening. Are you available this week?',
    rejection: 'Thank you for your interest in this position. After careful consideration, we\'ve decided to move forward with other candidates whose experience more closely matches our current needs. We appreciate the time you took to apply and wish you the best in your job search.'
  };

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'shortlisted': return 'border-neon-purple/30 text-neon-purple bg-neon-purple/10';
      case 'phone-screen': return 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10';
      case 'interview': return 'border-neon-green/30 text-neon-green bg-neon-green/10';
      case 'rejected': return 'border-destructive/30 text-destructive bg-destructive/10';
      case 'reviewed': return 'border-neon-yellow/30 text-neon-yellow bg-neon-yellow/10';
      default: return 'border-muted-foreground/30 text-muted-foreground bg-muted/10';
    }
  }, []);

  const getSourceColor = useCallback((source: string) => {
    switch (source) {
      case 'Qelsa': return 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10';
      case 'Referral': return 'border-neon-green/30 text-neon-green bg-neon-green/10';
      default: return 'border-muted-foreground/30 text-muted-foreground bg-muted/10';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-strong border-b border-glass-border">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posted Jobs
          </Button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{jobPosting.title}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {jobPosting.location}
                </span>
                <span>•</span>
                <span>{applicants.length} applications</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="glass border-glass-border">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" className="glass border-glass-border">
                <Share2 className="w-4 h-4 mr-2" />
                Share List
              </Button>
            </div>
          </div>

          {/* Health Signals */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass border-glass-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Apply Rate</span>
                {applyRate < 30 && (
                  <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                    Low
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{applyRate}%</p>
                {applyRate < 30 && (
                  <Button size="sm" variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                    <Zap className="w-3 h-3 mr-1" />
                    Boost
                  </Button>
                )}
              </div>
            </Card>

            <Card className="glass border-glass-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                {completionRate < 70 && (
                  <Badge variant="outline" className="text-xs border-neon-yellow/30 text-neon-yellow">
                    Low
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{completionRate}%</p>
                {completionRate < 70 && (
                  <Button size="sm" variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                    <Zap className="w-3 h-3 mr-1" />
                    Simplify
                  </Button>
                )}
              </div>
            </Card>

            <Card className="glass border-glass-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Median Response Time</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{medianResponseTime} days</p>
                <Badge variant="outline" className="text-xs border-neon-green/30 text-neon-green">
                  Good
                </Badge>
              </div>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="mt-6 flex items-center gap-3">
            <Select value={savedView} onValueChange={setSavedView}>
              <SelectTrigger className="w-48 glass border-glass-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-glass-border">
                <SelectItem value="all">All Applicants</SelectItem>
                <SelectItem value="new-week">New This Week</SelectItem>
                <SelectItem value="strong-match">Strong Match (&gt;90%)</SelectItem>
                <SelectItem value="needs-followup">Needs Follow-up</SelectItem>
              </SelectContent>
            </Select>

            {selectedApplicants.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-8" />
                <Badge variant="outline" className="border-neon-purple/30 text-neon-purple">
                  {selectedApplicants.length} selected
                </Badge>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('shortlist')}>
                  <Star className="w-4 h-4 mr-2" />
                  Shortlist
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('phone-screen')}>
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Screen
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('message')}>
                  <Send className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Two-Pane Layout */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Applicants List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Applicants</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 glass border-glass-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass border-glass-border">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Ratings</SelectItem>
                  <SelectItem value="match">Best Match</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-3">
                {sortedApplicants.map((applicant) => (
                  <Card
                    key={applicant.id}
                    className={`glass border-glass-border p-4 cursor-pointer transition-all hover:border-neon-cyan/50 ${
                      selectedApplicant?.id === applicant.id ? 'border-neon-cyan/50 bg-neon-cyan/5' : ''
                    }`}
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedApplicants.includes(applicant.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedApplicants([...selectedApplicants, applicant.id]);
                          } else {
                            setSelectedApplicants(selectedApplicants.filter(id => id !== applicant.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold truncate">{applicant.name}</h3>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(applicant.status)}`}>
                            {applicant.status.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{applicant.yearsExperience}y exp</span>
                          <span>•</span>
                          <Badge variant="outline" className={`text-xs ${getSourceColor(applicant.source)}`}>
                            {applicant.source}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {applicant.keySkills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-neon-purple/30 text-neon-purple">
                              {skill}
                            </Badge>
                          ))}
                          {applicant.keySkills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{applicant.keySkills.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Applied {applicant.appliedDaysAgo}d ago
                          </span>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3 text-neon-cyan" />
                            <span className="text-neon-cyan">{applicant.matchScore}%</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right: Applicant Detail with Profile/Resume Tabs */}
          <div className="lg:col-span-2">
            {selectedApplicant ? (
              <Card className="glass border-glass-border">
                {/* Sticky Actions Bar */}
                <div className="sticky top-0 z-10 glass-strong border-b border-glass-border p-4">
                  <div className="flex gap-2">
                    <Button className="gradient-animated flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1 border-neon-purple/30 text-neon-purple">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Shortlist
                    </Button>
                    <Button variant="outline" className="flex-1 border-neon-green/30 text-neon-green">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Screen
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass border-glass-border">
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <UserX className="w-4 h-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="w-full glass-strong border-b border-glass-border rounded-none">
                    <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-neon-cyan/20">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="resume" className="flex-1 data-[state=active]:bg-neon-purple/20">
                      <FileText className="w-4 h-4 mr-2" />
                      Resume
                    </TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-28rem)]">
                      <div className="p-6 space-y-6">
                        {/* AI Summary (Top) */}
                        <div className="glass-strong rounded-lg p-4 border border-neon-purple/30">
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-neon-purple" />
                            <h3 className="font-semibold">AI Summary</h3>
                            <Badge variant="outline" className="text-xs border-neon-purple/30 text-neon-purple">
                              Generated
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            <strong className="text-foreground">Strong fit for this role.</strong> {selectedApplicant.name} has {selectedApplicant.yearsExperience} years of relevant experience 
                            and matches {selectedApplicant.mustHavesMatched} of {selectedApplicant.mustHavesTotal} must-have requirements. 
                            {selectedApplicant.matchScore >= 90 
                              ? ' Excellent technical alignment with the job description. Highly recommended for interview.' 
                              : ' Good foundation with some skill gaps. Consider for phone screening to assess cultural fit and growth potential.'}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {selectedApplicant.mustHavesMatched} must-haves matched
                            </Badge>
                            {selectedApplicant.mustHavesMatched < selectedApplicant.mustHavesTotal && (
                              <Badge variant="outline" className="border-neon-yellow/30 text-neon-yellow">
                                {selectedApplicant.mustHavesTotal - selectedApplicant.mustHavesMatched} gaps
                              </Badge>
                            )}
                            <Badge variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                              {selectedApplicant.matchScore}% overall match
                            </Badge>
                          </div>
                        </div>

                        {/* Contact and Basics */}
                        <div>
                          <h3 className="font-semibold mb-3">Contact & Basic Info</h3>
                          <div className="glass-strong rounded-lg p-4 space-y-3">
                            <div>
                              <h4 className="text-lg font-semibold">{selectedApplicant.name}</h4>
                              <p className="text-sm text-muted-foreground">{selectedApplicant.currentRole}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                                <span className="truncate">{selectedApplicant.email}</span>
                              </div>
                              {selectedApplicant.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                                  <span>{selectedApplicant.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                                <span>{selectedApplicant.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                                <span>Applied {selectedApplicant.appliedDaysAgo}d ago</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                                <span>{selectedApplicant.yearsExperience} years experience</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`text-xs ${getSourceColor(selectedApplicant.source)}`}>
                                  {selectedApplicant.source}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Must-Haves Matched Checklist */}
                        <div>
                          <h3 className="font-semibold mb-3">Must-Haves Matched</h3>
                          <div className="glass-strong rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-muted-foreground">JD Requirements</span>
                              <Badge variant="outline" className="border-neon-green/30 text-neon-green">
                                {selectedApplicant.mustHavesMatched}/{selectedApplicant.mustHavesTotal}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {jobPosting.mustHaves.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  {idx < selectedApplicant.mustHavesMatched ? (
                                    <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className={idx < selectedApplicant.mustHavesMatched ? '' : 'text-muted-foreground'}>
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Qelsa Profile Snapshot */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">Qelsa Profile</h3>
                            <Button variant="ghost" size="sm" className="text-xs text-neon-cyan hover:text-neon-cyan">
                              View Full Profile
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                          
                          {/* Experience */}
                          <div className="glass-strong rounded-lg p-4 mb-3">
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-neon-cyan" />
                              Experience
                            </h4>
                            <div className="space-y-3">
                              <div className="pb-3 border-b border-glass-border">
                                <p className="font-medium text-sm">{selectedApplicant.currentRole}</p>
                                <p className="text-xs text-muted-foreground">Current • {selectedApplicant.yearsExperience} years</p>
                              </div>
                              <Button variant="ghost" size="sm" className="w-full text-xs text-neon-cyan">
                                Show more experience
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>

                          {/* Education */}
                          <div className="glass-strong rounded-lg p-4">
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-neon-cyan" />
                              Education
                            </h4>
                            <div className="space-y-3">
                              {selectedApplicant.education.slice(0, 1).map((edu, idx) => (
                                <div key={idx} className="pb-3 border-b border-glass-border">
                                  <p className="font-medium text-sm">{edu.degree}</p>
                                  <p className="text-xs text-muted-foreground">{edu.institution} • {edu.year}</p>
                                </div>
                              ))}
                              {selectedApplicant.education.length > 1 && (
                                <Button variant="ghost" size="sm" className="w-full text-xs text-neon-cyan">
                                  Show more education
                                  <ChevronRight className="w-3 h-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Matched Skills */}
                        <div>
                          <h3 className="font-semibold mb-3">Skills Match Analysis</h3>
                          <div className="space-y-3">
                            {/* Exact Matches */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-neon-green" />
                                <span className="text-sm font-medium">Exact Matches</span>
                                <Badge variant="outline" className="text-xs border-neon-green/30 text-neon-green">
                                  {selectedApplicant.keySkills.slice(0, 3).length}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {selectedApplicant.keySkills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="border-neon-green/30 text-neon-green">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Adjacent Skills */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-neon-cyan" />
                                <span className="text-sm font-medium">Adjacent Skills</span>
                                <Badge variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                                  {selectedApplicant.keySkills.length - 3}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {selectedApplicant.keySkills.slice(3).map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="border-neon-cyan/30 text-neon-cyan">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Missing */}
                            {selectedApplicant.mustHavesMatched < selectedApplicant.mustHavesTotal && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <XCircle className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm font-medium text-muted-foreground">Missing</span>
                                  <Badge variant="outline" className="text-xs">
                                    {selectedApplicant.mustHavesTotal - selectedApplicant.mustHavesMatched}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {jobPosting.mustHaves.slice(selectedApplicant.mustHavesMatched).map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="text-muted-foreground">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Application Timeline */}
                        <div>
                          <h3 className="font-semibold mb-3">Application Timeline</h3>
                          <div className="glass-strong rounded-lg p-4 space-y-3">
                            {selectedApplicant.timeline.map((event, idx) => (
                              <div key={idx} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                  <div className={`w-2 h-2 rounded-full ${
                                    idx === 0 ? 'bg-neon-green' : 'bg-muted-foreground/30'
                                  }`} />
                                  {idx < selectedApplicant.timeline.length - 1 && (
                                    <div className="w-px h-full bg-muted-foreground/20 my-1" />
                                  )}
                                </div>
                                <div className="flex-1 pb-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium">{event.status}</p>
                                    <span className="text-xs text-muted-foreground">{event.date}</span>
                                  </div>
                                  {event.note && (
                                    <p className="text-xs text-muted-foreground">{event.note}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Notes Section */}
                        <div>
                          <h3 className="font-semibold mb-3">Team Notes</h3>
                          <div className="glass-strong rounded-lg p-4">
                            <Textarea
                              placeholder="Add notes, @mention team members, or add labels..."
                              rows={3}
                              className="mb-3 glass border-glass-border resize-none"
                            />
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="cursor-pointer text-xs border-neon-purple/30 text-neon-purple">
                                + Add Label
                              </Badge>
                              <Button size="sm" variant="ghost" className="text-xs">
                                @ Mention
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Resume Tab */}
                  <TabsContent value="resume" className="mt-0">
                    <ScrollArea className="h-[calc(100vh-28rem)]">
                      <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Sidebar Summary */}
                          <div className="lg:col-span-1 space-y-4">
                            <div className="glass-strong rounded-lg p-4 sticky top-0">
                              <h4 className="text-sm font-semibold mb-3">JD Match Summary</h4>
                              <div className="space-y-2 mb-4">
                                {jobPosting.mustHaves.slice(0, 4).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    {idx < selectedApplicant.mustHavesMatched ? (
                                      <CheckCircle2 className="w-3 h-3 text-neon-green flex-shrink-0" />
                                    ) : (
                                      <XCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                    )}
                                    <span className={idx < selectedApplicant.mustHavesMatched ? 'text-foreground' : 'text-muted-foreground'}>
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <Button size="sm" variant="outline" className="w-full border-neon-cyan/30 text-neon-cyan">
                                <Download className="w-3 h-3 mr-2" />
                                Download Resume
                              </Button>
                            </div>
                          </div>

                          {/* Resume Viewer */}
                          <div className="lg:col-span-2">
                            <div className="glass-strong rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold">Resume</h4>
                              </div>

                              {/* Resume Content Preview */}
                              <div className="bg-white/5 rounded-lg p-6 min-h-[600px]">
                                <div className="max-w-2xl mx-auto space-y-6">
                                  <div className="text-center pb-4 border-b border-glass-border">
                                    <h3 className="text-xl font-bold mb-2">{selectedApplicant.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{selectedApplicant.currentRole}</p>
                                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                      <span>{selectedApplicant.email}</span>
                                      <span>•</span>
                                      <span>{selectedApplicant.location}</span>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-bold mb-3 text-neon-cyan">EXPERIENCE</h4>
                                    <div className="space-y-4">
                                      <div>
                                        <div className="flex items-start justify-between mb-2">
                                          <div>
                                            <p className="font-semibold text-sm">{selectedApplicant.currentRole}</p>
                                            <p className="text-xs text-muted-foreground">Current • {selectedApplicant.yearsExperience} years</p>
                                          </div>
                                        </div>
                                        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                          <li>Led development of scalable web applications serving 1M+ users</li>
                                          <li>Architected microservices infrastructure reducing response time by 40%</li>
                                          <li>Mentored team of 5 junior developers and established code review practices</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-bold mb-3 text-neon-cyan">SKILLS</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <p className="text-xs font-semibold mb-1">Technical:</p>
                                        <p className="text-xs text-muted-foreground">
                                          {selectedApplicant.keySkills.join(', ')}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-bold mb-3 text-neon-cyan">EDUCATION</h4>
                                    <div className="space-y-3">
                                      {selectedApplicant.education.map((edu, idx) => (
                                        <div key={idx}>
                                          <p className="font-semibold text-sm">{edu.degree}</p>
                                          <p className="text-xs text-muted-foreground">{edu.institution} • {edu.year}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </Card>
            ) : (
              <Card className="glass border-glass-border p-12 flex flex-col items-center justify-center text-center h-[calc(100vh-24rem)]">
                <Users className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select an applicant</h3>
                <p className="text-sm text-muted-foreground">
                  Choose an applicant from the list to view their details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Message Composer (Optional - shows when clicking Message) */}
      {showMessageComposer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-strong border-glass-border p-6 max-w-2xl w-full">
            <h3 className="font-semibold mb-4">Send Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Template</label>
                <Select value={messageTemplate} onValueChange={(value) => {
                  setMessageTemplate(value);
                  setMessageText(messageTemplates[value as keyof typeof messageTemplates] || '');
                }}>
                  <SelectTrigger className="glass border-glass-border">
                    <SelectValue placeholder="Choose a template..." />
                  </SelectTrigger>
                  <SelectContent className="glass border-glass-border">
                    <SelectItem value="thanks">Thanks for applying</SelectItem>
                    <SelectItem value="phoneScreen">Phone screen invite</SelectItem>
                    <SelectItem value="rejection">Rejection with feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  rows={6}
                  className="glass border-glass-border resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSendMessage} className="gradient-animated flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowMessageComposer(false)} className="border-glass-border">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
