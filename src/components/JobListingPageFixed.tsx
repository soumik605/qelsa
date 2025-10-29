import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Building2, 
  Clock, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  Sparkles, 
  TrendingUp,
  Eye,
  Share2,
  ExternalLink,
  Users,
  BrainCircuit,
  Target,
  Award,
  MessageCircle,
  BarChart3,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
  Zap,
  Globe,
  Home,
  Briefcase
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workType: 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';
  experience: string;
  salary?: string;
  skills: string[];
  postedDate: string;
  views: number;
  applications: number;
  trending?: boolean;
  urgent?: boolean;
  isSaved: boolean;
  isQuickApplyAvailable: boolean;
  fitScore?: number;
  fitExplanation?: string;
  skillsGap?: string[];
  aiSummary: string;
  source: {
    platform: 'Qelsa' | 'LinkedIn' | 'Indeed' | 'Naukri' | 'AngelList' | 'Glassdoor';
    verified?: boolean;
    exclusive?: boolean;
  };
}

interface JobListingPageProps {
  onNavigate: (section: string) => void;
}

export function JobListingPage({ onNavigate }: JobListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [viewedJobs, setViewedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [question, setQuestion] = useState('');

  // Mock job data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop&crop=center',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experience: '3-5 years',
      salary: '$120k - $160k',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      postedDate: '2024-01-15',
      views: 245,
      applications: 23,
      trending: true,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 92,
      fitExplanation: 'Strong match based on your React and TypeScript experience',
      skillsGap: ['GraphQL', 'AWS'],
      aiSummary: 'Excellent opportunity for a senior frontend role at a fast-growing tech company. Strong focus on React ecosystem with modern tooling.',
      source: {
        platform: 'Qelsa',
        verified: true,
        exclusive: true
      }
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=center',
      location: 'Remote',
      workType: 'Remote',
      experience: '2-4 years',
      salary: '$90k - $130k',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      postedDate: '2024-01-14',
      views: 189,
      applications: 45,
      urgent: true,
      isSaved: true,
      isQuickApplyAvailable: false,
      fitScore: 78,
      fitExplanation: 'Good match for your full-stack skills, though Python experience is limited',
      skillsGap: ['Django', 'PostgreSQL'],
      aiSummary: 'Remote-first startup looking for versatile engineers. Great opportunity to work with modern Python stack.',
      source: {
        platform: 'LinkedIn',
        verified: false
      }
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      workType: 'Hybrid',
      experience: '1-3 years',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      postedDate: '2024-01-13',
      views: 156,
      applications: 67,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 65,
      fitExplanation: 'Partial match - design skills align but lacks some technical requirements',
      aiSummary: 'Creative agency seeking passionate designers. Focus on user-centered design and modern design tools.',
      source: {
        platform: 'Indeed',
        verified: true
      }
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = !experienceFilter || job.experience.includes(experienceFilter);
    const matchesWorkType = !workTypeFilter || job.workType === workTypeFilter;
    
    return matchesSearch && matchesLocation && matchesExperience && matchesWorkType;
  });

  const handleJobClick = (job: Job) => {
    // Add to viewed jobs if not already viewed
    if (!viewedJobs.includes(job.id)) {
      setViewedJobs(prev => [job.id, ...prev.slice(0, 4)]); // Keep last 5 viewed
    }
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
    
    // Update the job's saved status
    const jobIndex = jobs.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].isSaved = !jobs[jobIndex].isSaved;
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleQuickApply = (jobId: string) => {
    console.log('Quick applying to job:', jobId);
    // Implementation for quick apply
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case 'Remote':
        return <Globe className="w-4 h-4" />;
      case 'Hybrid':
        return <Home className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getSourceIcon = (platform: string) => {
    switch (platform) {
      case 'Qelsa':
        return <div className="w-4 h-4 rounded bg-neon-cyan flex items-center justify-center text-black text-xs font-bold">Q</div>;
      case 'LinkedIn':
        return <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs">in</div>;
      case 'Indeed':
        return <div className="w-4 h-4 rounded bg-blue-700 flex items-center justify-center text-white text-xs">I</div>;
      case 'Naukri':
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Job Opportunities
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover your next career move with AI-powered insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10"
              >
                <BrainCircuit className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass border-glass-border"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40 glass border-glass-border">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
                <SelectTrigger className="w-32 glass border-glass-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 glass border-glass-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date Posted</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="fit">AI Fit Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
                {locationFilter && <div>Location: {locationFilter}</div>}
                {workTypeFilter && <div>Type: {workTypeFilter}</div>}
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
                  {savedJobs.slice(0, 3).map(jobId => {
                    const job = jobs.find(j => j.id === jobId);
                    if (!job) return null;
                    return (
                      <div key={job.id} className="text-sm p-2 rounded glass-strong border border-glass-border">
                        <div className="font-medium line-clamp-1">{job.title}</div>
                        <div className="text-muted-foreground text-xs">{job.company}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* AI Assistant */}
            {showAIAssistant && (
              <Card className="p-4 glass border-glass-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-neon-purple" />
                  AI Job Assistant
                </h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Ask me anything about these jobs..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="glass border-glass-border text-sm"
                    rows={3}
                  />
                  <Button 
                    size="sm" 
                    className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white"
                  >
                    <Send className="w-3 h-3 mr-2" />
                    Ask AI
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-2">
            {/* Recently Viewed Jobs */}
            {viewedJobs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-neon-cyan" />
                  Recently Viewed ({viewedJobs.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {viewedJobs.slice(0, 3).map(jobId => {
                    const job = jobs.find(j => j.id === jobId);
                    if (!job) return null;
                    return (
                      <Card 
                        key={job.id}
                        className="p-4 glass border-glass-border cursor-pointer hover:border-neon-cyan/30 hover:glow-cyan/50 transition-all h-32 flex flex-col justify-between"
                        onClick={() => handleJobClick(job)}
                      >
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">{job.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{job.company}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs">{job.workType}</Badge>
                          <span className="text-xs text-neon-cyan">{job.fitScore}% fit</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`glass border-glass-border cursor-pointer transition-all duration-300 hover:border-neon-cyan/30 hover:glow-cyan/50 hover:scale-[1.02] job-card-height flex flex-col ${
                    selectedJobs.includes(job.id) ? 'border-neon-purple/50 bg-neon-purple/5' : ''
                  }`}
                  onClick={() => handleJobClick(job)}
                >
                  <div className="p-5 flex flex-col h-full">
                    {/* Header with Actions */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {job.companyLogo && (
                          <div className="relative flex-shrink-0">
                            <img 
                              src={job.companyLogo} 
                              alt={job.company}
                              className="w-12 h-12 rounded-xl object-cover border border-glass-border"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg line-clamp-2 hover:text-neon-cyan transition-colors mb-1">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">{job.company}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.experience}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 items-end flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectJob(job.id);
                            }}
                            className={`p-2 ${selectedJobs.includes(job.id) ? 'text-neon-purple bg-neon-purple/10' : 'text-muted-foreground hover:text-neon-purple'}`}
                          >
                            <input 
                              type="checkbox" 
                              checked={selectedJobs.includes(job.id)}
                              onChange={() => {}}
                              className="w-4 h-4"
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveJob(job.id);
                            }}
                            className="p-2 hover:text-neon-cyan hover:bg-neon-cyan/10"
                          >
                            {job.isSaved ? (
                              <BookmarkCheck className="w-4 h-4 text-neon-cyan" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {getSourceIcon(job.source.platform)}
                          <span className="text-muted-foreground">{job.source.platform}</span>
                        </div>
                      </div>
                    </div>

                    {/* Work Type */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {getWorkTypeIcon(job.workType)}
                        <span className="text-sm text-muted-foreground">{job.workType}</span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      {/* AI Insights */}
                      <div className="space-y-3">
                        {/* AI Summary */}
                        <div className="p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-neon-cyan" />
                            <span className="text-sm font-medium text-neon-cyan">AI Summary</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3">{job.aiSummary}</p>
                        </div>

                        {/* AI Fit Score */}
                        {job.fitScore && (
                          <div className="p-3 rounded-lg bg-neon-purple/5 border border-neon-purple/20">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-neon-purple" />
                                <span className="text-sm font-medium text-neon-purple">Match Score</span>
                              </div>
                              <span className="text-lg font-bold text-neon-purple">{job.fitScore}%</span>
                            </div>
                            <Progress value={job.fitScore} className="h-2" />
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-sm">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge variant="secondary" className="text-sm">
                              +{job.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-glass-border mt-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <span>{job.views} views</span>
                        <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="grid gap-2">
                        {job.isQuickApplyAvailable ? (
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickApply(job.id);
                              }}
                              className="bg-neon-green hover:bg-neon-green/90 text-black font-medium"
                            >
                              Quick Apply
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 font-medium"
                            >
                              View Details
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 font-medium w-full"
                          >
                            View Details
                          </Button>
                        )}
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
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more opportunities.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setLocationFilter('');
                    setWorkTypeFilter('');
                    setExperienceFilter('');
                  }}
                  className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}