import { Award, Briefcase, ChevronLeft, ChevronRight, EyeOff, MapPin, MoreVertical, Pin, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Job } from "../../types/job";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Rail {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: "cyan" | "purple" | "pink" | "green" | "yellow";
  jobs?: Job[];
  isPinned: boolean;
  isHidden: boolean;
  category: "personalized" | "momentum" | "strategic" | "context" | "social" | "hygiene";
}

interface JobDiscoveryRailsProps {
  onJobClick: (job: Job) => void;
  onToggleCompare?: (job: Job) => void;
  comparedJobs?: Job[];
  jobs: any;
}

export function JobDiscoveryRails({ onJobClick, onToggleCompare, comparedJobs = [], jobs }: JobDiscoveryRailsProps) {
  const [rails, setRails] = useState<Rail[]>(generateMockRails());
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const togglePin = (railId: string) => {
    setRails((prev) =>
      prev
        .map((rail) => (rail.id === railId ? { ...rail, isPinned: !rail.isPinned } : rail))
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        })
    );
  };

  const toggleHide = (railId: string) => {
    setRails((prev) => prev.map((rail) => (rail.id === railId ? { ...rail, isHidden: !rail.isHidden } : rail)));
  };

  const scroll = (railId: string, direction: "left" | "right") => {
    const container = document.getElementById(`rail-${railId}`);
    if (!container) return;

    const scrollAmount = 400;
    const newPosition = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  function generateMockRails(): Rail[] {
    return [
      {
        id: "recommended",
        title: "Recommended for You",
        description: "Based on your profile, skills, and recent activity",
        icon: Sparkles,
        color: "cyan",
        category: "personalized",
        isPinned: true,
        isHidden: false,
      },
      {
        id: "based-skills",
        title: "Based on Your Skills",
        description: "Roles matching your verified skills and adjacent upskilling paths",
        icon: Award,
        color: "purple",
        category: "personalized",
        isPinned: false,
        isHidden: false,
      },
    ];
  }

  const visibleRails = rails.filter((rail) => !rail.isHidden);

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
          jobs={jobs}
        />
      ))}

      {/* Manage Rails Button */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="glass border-glass-border hover:border-neon-cyan/50 transition-all">
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
  onScroll: (railId: string, direction: "left" | "right") => void;
  onTogglePin: (railId: string) => void;
  onToggleHide: (railId: string) => void;
  jobs: Job[]
}

function RailSection({ rail, onJobClick, onToggleCompare, comparedJobs, onScroll, onTogglePin, onToggleHide, jobs }: RailSectionProps) {
  const Icon = rail.icon;
  const colorClasses = {
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
    pink: "text-neon-pink",
    green: "text-neon-green",
    yellow: "text-neon-yellow",
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
              {rail.isPinned && <Pin className="w-3.5 h-3.5 text-neon-cyan fill-neon-cyan" />}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{rail.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Buttons */}
          <Button variant="ghost" size="sm" onClick={() => onScroll(rail.id, "left")} className="h-8 w-8 p-0 hover:bg-white/5">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onScroll(rail.id, "right")} className="h-8 w-8 p-0 hover:bg-white/5">
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
                {rail.isPinned ? "Unpin Rail" : "Pin Rail"}
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
        <div id={`rail-${rail.id}`} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {jobs.map((job) => (
            <JobRailCard key={job.id} job={job} onClick={() => onJobClick(job)} onToggleCompare={onToggleCompare} isCompared={comparedJobs.some((j) => j.id === job.id)} />
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
      case "Qelsa":
        return "neon-cyan";
      case "LinkedIn":
        return "blue-500";
      case "Indeed":
        return "blue-600";
      case "Naukri":
        return "purple-500";
      case "jobdataapi":
        return "gray-400";
      case "Glassdoor":
        return "green-500";
      default:
        return "gray-400";
    }
  };

  if (!job) return <></>;

  return (
    <Card className="glass hover:glass-strong border-glass-border hover:border-neon-cyan/30 transition-all cursor-pointer flex-shrink-0 w-[340px] snap-start group" onClick={onClick}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {job?.company_logo && <img src={job.company_logo} alt={job.company_name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h4 className="text-white line-clamp-1 group-hover:text-neon-cyan transition-colors">{job.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-1">{job.company_name}</p>
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
              className={`h-8 w-8 p-0 flex-shrink-0 ${isCompared ? "bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30" : "hover:bg-white/5"}`}
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
            <span>{job.other_info.types?.map((type) => type.name)}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{job["experience_level"]}</span>
          </div>

          {(job.salary_max || job.salary_min) && job.salary_currency && (
            <div className="text-sm text-neon-green">
              {job.salary_max || "NA"} - {job.salary_min || "NA"} {job.salary_currency}
            </div>
          )}
        </div>

        {/* Skills */}
        {/* <div className="flex flex-wrap gap-1.5">
          {data_json.skills.slice(0, 3).map((skill, index) => (
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
        </div> */}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs border-${getSourceColor("jobdataapi")}`}>
              Job Data API
            </Badge>
            {/* {job.source.exclusive && (
              <Badge className="text-xs bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                Exclusive
              </Badge>
            )} */}
          </div>

          {/* {job.fitScore && (
            <div className="flex items-center gap-1.5 text-xs">
              <Target className="w-3.5 h-3.5 text-neon-green" />
              <span className="text-neon-green">{job.fitScore}% fit</span>
            </div>
          )} */}
        </div>
      </div>
    </Card>
  );
}
