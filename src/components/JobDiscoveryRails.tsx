import { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Award, 
  Target,
  Zap,
  Users,
  Globe,
  Plane,
  BookmarkCheck,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Pin,
  MoreVertical,
  Star,
  Building2,
  MapPin,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import type { Job } from './JobListingPage';

interface Rail {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: 'cyan' | 'purple' | 'pink' | 'green' | 'yellow';
  jobs: Job[];
  isPinned: boolean;
  isHidden: boolean;
  category: 'personalized' | 'momentum' | 'strategic' | 'context' | 'social' | 'hygiene';
}

interface JobDiscoveryRailsProps {
  onJobClick: (job: Job) => void;
  onToggleCompare?: (job: Job) => void;
  comparedJobs?: Job[];
}

export function JobDiscoveryRails({ onJobClick, onToggleCompare, comparedJobs = [] }: JobDiscoveryRailsProps) {
  const [rails, setRails] = useState<Rail[]>(generateMockRails());
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const togglePin = (railId: string) => {
    setRails(prev => prev.map(rail => 
      rail.id === railId ? { ...rail, isPinned: !rail.isPinned } : rail
    ).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    }));
  };

  const toggleHide = (railId: string) => {
    setRails(prev => prev.map(rail => 
      rail.id === railId ? { ...rail, isHidden: !rail.isHidden } : rail
    ));
  };

  const scroll = (railId: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`rail-${railId}`);
    if (!container) return;
    
    const scrollAmount = 400;
    const newPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  const visibleRails = rails.filter(rail => !rail.isHidden);

  return (
    <div className="space-y-8">
      {visibleRails.map((rail) => (
        <RailSection
          key={rail.id}
          rail={rail}
          onJobClick={onJobClick}
          onToggleCompare={onToggleCompare}
          comparedJobs={comparedJobs}
          onScroll={scroll}
          onTogglePin={togglePin}
          onToggleHide={toggleHide}
        />
      ))}

      {/* Manage Rails Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          className="glass border-glass-border hover:border-neon-cyan/50 transition-all"
        >
          <MoreVertical className="w-4 h-4 mr-2" />
          Manage Rails
        </Button>
      </div>
    </div>
  );
}

interface RailSectionProps {
  rail: Rail;
  onJobClick: (job: Job) => void;
  onToggleCompare?: (job: Job) => void;
  comparedJobs: Job[];
  onScroll: (railId: string, direction: 'left' | 'right') => void;
  onTogglePin: (railId: string) => void;
  onToggleHide: (railId: string) => void;
}

function RailSection({ 
  rail, 
  onJobClick, 
  onToggleCompare,
  comparedJobs,
  onScroll, 
  onTogglePin, 
  onToggleHide 
}: RailSectionProps) {
  const Icon = rail.icon;
  const colorClasses = {
    cyan: 'text-neon-cyan',
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
    green: 'text-neon-green',
    yellow: 'text-neon-yellow'
  };

  return (
    <div className="space-y-4">
      {/* Rail Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg glass ${colorClasses[rail.color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-white">{rail.title}</h3>
              {rail.isPinned && (
                <Pin className="w-3.5 h-3.5 text-neon-cyan fill-neon-cyan" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{rail.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onScroll(rail.id, 'left')}
            className="h-8 w-8 p-0 hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onScroll(rail.id, 'right')}
            className="h-8 w-8 p-0 hover:bg-white/5"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Rail Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong border-glass-border">
              <DropdownMenuItem onClick={() => onTogglePin(rail.id)}>
                <Pin className="w-4 h-4 mr-2" />
                {rail.isPinned ? 'Unpin Rail' : 'Pin Rail'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleHide(rail.id)}>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Rail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Job Cards Carousel */}
      <div className="relative">
        <div 
          id={`rail-${rail.id}`}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {rail.jobs.map((job) => (
            <JobRailCard
              key={job.id}
              job={job}
              onClick={() => onJobClick(job)}
              onToggleCompare={onToggleCompare}
              isCompared={comparedJobs.some(j => j.id === job.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface JobRailCardProps {
  job: Job;
  onClick: () => void;
  onToggleCompare?: (job: Job) => void;
  isCompared: boolean;
}

function JobRailCard({ job, onClick, onToggleCompare, isCompared }: JobRailCardProps) {
  const getSourceColor = (platform: string) => {
    switch (platform) {
      case 'Qelsa': return 'neon-cyan';
      case 'LinkedIn': return 'blue-500';
      case 'Indeed': return 'blue-600';
      case 'Naukri': return 'purple-500';
      case 'AngelList': return 'gray-400';
      case 'Glassdoor': return 'green-500';
      default: return 'gray-400';
    }
  };

  return (
    <Card 
      className="glass hover:glass-strong border-glass-border hover:border-neon-cyan/30 transition-all cursor-pointer flex-shrink-0 w-[340px] snap-start group"
      onClick={onClick}
    >
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {job.companyLogo && (
              <img 
                src={job.companyLogo} 
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-white line-clamp-1 group-hover:text-neon-cyan transition-colors">
                {job.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-1">{job.company}</p>
            </div>
          </div>
          
          {/* Compare Checkbox */}
          {onToggleCompare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(job);
              }}
              className={`h-8 w-8 p-0 flex-shrink-0 ${
                isCompared 
                  ? 'bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30' 
                  : 'hover:bg-white/5'
              }`}
            >
              {isCompared && <Star className="w-4 h-4 fill-current" />}
            </Button>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{job.workType}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{job.experience}</span>
          </div>
          {job.salary && (
            <div className="text-sm text-neon-green">
              {job.salary}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="text-xs bg-white/5 hover:bg-white/10 border-white/10"
            >
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge 
              variant="secondary"
              className="text-xs bg-white/5 border-white/10"
            >
              +{job.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs border-${getSourceColor(job.source.platform)}`}
            >
              {job.source.platform}
            </Badge>
            {job.source.exclusive && (
              <Badge className="text-xs bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                Exclusive
              </Badge>
            )}
          </div>
          
          {job.fitScore && (
            <div className="flex items-center gap-1.5 text-xs">
              <Target className="w-3.5 h-3.5 text-neon-green" />
              <span className="text-neon-green">{job.fitScore}% fit</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

// Mock data generator
function generateMockRails(): Rail[] {
  return [
    {
      id: 'recommended',
      title: 'Recommended for You',
      description: 'Based on your profile, skills, and recent activity',
      icon: Sparkles,
      color: 'cyan',
      category: 'personalized',
      isPinned: true,
      isHidden: false,
      jobs: generateMockJobs('recommended', 8)
    },
    {
      id: 'based-skills',
      title: 'Based on Your Skills',
      description: 'Roles matching your verified skills and adjacent upskilling paths',
      icon: Award,
      color: 'purple',
      category: 'personalized',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('skills', 6)
    },
    {
      id: 'trending',
      title: 'Trending Now',
      description: 'Rising clicks and applications in the last 24-72 hours',
      icon: TrendingUp,
      color: 'pink',
      category: 'momentum',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('trending', 7)
    },
    {
      id: 'new-week',
      title: 'New This Week',
      description: 'Freshly posted roles with recency boosts',
      icon: Clock,
      color: 'green',
      category: 'momentum',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('new', 6)
    },
    {
      id: 'strong-match',
      title: 'Strong Skill Match',
      description: 'High overlap between required skills and your profile',
      icon: Target,
      color: 'cyan',
      category: 'strategic',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('match', 5)
    },
    {
      id: 'career-step',
      title: 'Career Step Up',
      description: 'One-level-higher roles sharing core skills for progression',
      icon: TrendingUp,
      color: 'yellow',
      category: 'strategic',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('stepup', 5)
    },
    {
      id: 'skill-bridge',
      title: 'Skill Bridge',
      description: 'Roles requiring 1-2 new adjacent skills with learning paths',
      icon: Zap,
      color: 'purple',
      category: 'strategic',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('bridge', 6)
    },
    {
      id: 'remote-friendly',
      title: 'Remote-Friendly for You',
      description: 'Matches your location preferences and timezone compatibility',
      icon: Globe,
      color: 'green',
      category: 'context',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('remote', 8)
    },
    {
      id: 'fast-apply',
      title: 'Fast-Apply Ready',
      description: 'One-click application with your Qelsa profile',
      icon: Zap,
      color: 'cyan',
      category: 'context',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('fastapply', 7)
    },
    {
      id: 'companies-follow',
      title: 'From Companies You Follow',
      description: 'New roles at followed or saved employers',
      icon: Building2,
      color: 'pink',
      category: 'social',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('following', 5)
    },
    {
      id: 'saved-jobs',
      title: 'Saved Jobs',
      description: 'Quick access to your bookmarked opportunities',
      icon: BookmarkCheck,
      color: 'yellow',
      category: 'hygiene',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('saved', 4)
    },
    {
      id: 'recently-viewed',
      title: 'Recently Viewed',
      description: 'Jobs you have checked out in the last 7 days',
      icon: Eye,
      color: 'purple',
      category: 'hygiene',
      isPinned: false,
      isHidden: false,
      jobs: generateMockJobs('viewed', 6)
    }
  ];
}

function generateMockJobs(category: string, count: number): Job[] {
  const mockJobs: Job[] = [
    {
      id: `${category}-1`,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop&crop=center',
      location: 'San Francisco, CA',
      workType: 'Full-time',
      experience: '3-5 years',
      salary: '$120k - $160k',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      postedDate: '2024-01-15',
      views: 245,
      applications: 23,
      trending: category === 'trending',
      isSaved: category === 'saved',
      isQuickApplyAvailable: category === 'fastapply',
      fitScore: category === 'match' ? 95 : category === 'recommended' ? 92 : undefined,
      aiSummary: 'Excellent opportunity for a senior frontend role at a fast-growing tech company.',
      source: {
        platform: 'Qelsa',
        verified: true,
        exclusive: true
      }
    },
    {
      id: `${category}-2`,
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
      isSaved: false,
      isQuickApplyAvailable: category === 'fastapply',
      fitScore: category === 'skills' ? 88 : undefined,
      aiSummary: 'Remote-first startup looking for versatile engineers.',
      source: {
        platform: 'LinkedIn',
        verified: false
      }
    },
    {
      id: `${category}-3`,
      title: 'Product Designer',
      company: 'DesignCo',
      companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=64&h=64&fit=crop&crop=center',
      location: 'New York, NY',
      workType: 'Hybrid',
      experience: '2-4 years',
      salary: '$100k - $140k',
      skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
      postedDate: '2024-01-16',
      views: 156,
      applications: 32,
      trending: category === 'trending',
      isSaved: category === 'saved',
      isQuickApplyAvailable: true,
      fitScore: category === 'bridge' ? 75 : undefined,
      aiSummary: 'Join a creative team building next-gen design tools.',
      source: {
        platform: 'Qelsa',
        verified: true
      }
    },
    {
      id: `${category}-4`,
      title: 'Backend Engineer',
      company: 'CloudTech',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=center',
      location: 'Remote',
      workType: 'Remote',
      experience: '3-6 years',
      salary: '$130k - $170k',
      skills: ['Go', 'Kubernetes', 'AWS', 'Microservices'],
      postedDate: '2024-01-17',
      views: 298,
      applications: 54,
      isSaved: false,
      isQuickApplyAvailable: category === 'fastapply',
      fitScore: category === 'stepup' ? 82 : undefined,
      aiSummary: 'Build scalable cloud infrastructure at a leading tech company.',
      source: {
        platform: 'Indeed',
        verified: true
      }
    },
    {
      id: `${category}-5`,
      title: 'Mobile Developer (React Native)',
      company: 'AppStart',
      companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center',
      location: 'Austin, TX',
      workType: 'Full-time',
      experience: '2-4 years',
      salary: '$95k - $135k',
      skills: ['React Native', 'TypeScript', 'iOS', 'Android'],
      postedDate: '2024-01-18',
      views: 178,
      applications: 28,
      trending: category === 'new',
      isSaved: category === 'saved',
      isQuickApplyAvailable: true,
      fitScore: category === 'skills' ? 90 : undefined,
      aiSummary: 'Build mobile experiences for millions of users.',
      source: {
        platform: 'Qelsa',
        exclusive: true
      }
    },
    {
      id: `${category}-6`,
      title: 'DevOps Engineer',
      company: 'InfraCorp',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop&crop=center',
      location: 'Seattle, WA',
      workType: 'Hybrid',
      experience: '4-7 years',
      salary: '$140k - $180k',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      postedDate: '2024-01-19',
      views: 267,
      applications: 41,
      isSaved: false,
      isQuickApplyAvailable: category === 'fastapply',
      aiSummary: 'Lead infrastructure automation and deployment strategies.',
      source: {
        platform: 'Naukri',
        verified: false
      }
    },
    {
      id: `${category}-7`,
      title: 'Data Scientist',
      company: 'DataLabs',
      companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center',
      location: 'Remote',
      workType: 'Remote',
      experience: '3-5 years',
      salary: '$110k - $150k',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      postedDate: '2024-01-20',
      views: 312,
      applications: 67,
      trending: category === 'trending',
      isSaved: category === 'saved',
      isQuickApplyAvailable: true,
      fitScore: category === 'recommended' ? 87 : undefined,
      aiSummary: 'Apply ML to solve real-world business problems.',
      source: {
        platform: 'Qelsa',
        verified: true
      }
    },
    {
      id: `${category}-8`,
      title: 'Security Engineer',
      company: 'SecureNet',
      companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=64&h=64&fit=crop&crop=center',
      location: 'Boston, MA',
      workType: 'Full-time',
      experience: '4-6 years',
      salary: '$135k - $175k',
      skills: ['Security', 'Penetration Testing', 'AWS', 'Compliance'],
      postedDate: '2024-01-21',
      views: 198,
      applications: 35,
      isSaved: false,
      isQuickApplyAvailable: category === 'fastapply',
      aiSummary: 'Protect critical infrastructure and customer data.',
      source: {
        platform: 'AngelList',
        verified: true
      }
    }
  ];

  return mockJobs.slice(0, count);
}
