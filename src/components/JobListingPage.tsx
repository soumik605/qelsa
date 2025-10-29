import { Bookmark, BookmarkCheck, Briefcase, Building2, Check, Eye, Filter, Globe, Home, MapPin, Plus, Search, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { CompareJobsTray } from "./CompareJobsTray";
import { JobAIAssistantDrawer } from "./JobAIAssistantDrawer";
import { JobDiscoveryRails } from "./JobDiscoveryRails";
import { MyJobsPage } from "./MyJobsPage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workType: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";
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
    platform: "Qelsa" | "LinkedIn" | "Indeed" | "Naukri" | "AngelList" | "Glassdoor";
    verified?: boolean;
    exclusive?: boolean;
  };
  // Additional fields for JobDetailPage
  description?: string;
  responsibilities?: string[];
  requiredSkills?: string[];
  preferredSkills?: string[];
  techStack?: string[];
  companyDescription?: string;
  careerGrowth?: string;
  benefits?: string[];
  applicationDeadline?: string;
  applicants?: number;
  companyRating?: number;
  companyReviews?: number;
  isApplied?: boolean;
  appliedDate?: string;
  isFraudulent?: boolean;
  skillMatch?: number;
}

interface JobListingPageProps {
}

export function JobListingPage({}: JobListingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [viewedJobs, setViewedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiAssistantJob, setAiAssistantJob] = useState<Job | null>(null);
  const [viewMode, setViewMode] = useState<"discovery" | "all" | "my-jobs">("discovery");
  const [myJobsActiveTab, setMyJobsActiveTab] = useState<string>("saved");

  // Mock job data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=64&h=64&fit=crop&crop=center",
      location: "San Francisco, CA",
      workType: "Full-time",
      experience: "3-5 years",
      salary: "$120k - $160k",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      postedDate: "2024-01-15",
      views: 245,
      applications: 23,
      trending: true,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 92,
      fitExplanation: "Strong match based on your React and TypeScript experience",
      skillsGap: ["GraphQL", "AWS"],
      aiSummary: "Excellent opportunity for a senior frontend role at a fast-growing tech company. Strong focus on React ecosystem with modern tooling.",
      source: {
        platform: "Qelsa",
        verified: true,
        exclusive: true,
      },
      // Additional fields for JobDetailPage
      description:
        "We are looking for a passionate Senior Frontend Developer to join our dynamic team. You will be responsible for building the next generation of our web applications using cutting-edge technologies.",
      responsibilities: [
        "Develop and maintain high-quality React applications",
        "Collaborate with designers and backend developers",
        "Implement responsive and accessible user interfaces",
        "Optimize applications for maximum speed and scalability",
        "Mentor junior developers and contribute to code reviews",
      ],
      requiredSkills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Git"],
      preferredSkills: ["Node.js", "GraphQL", "AWS", "Testing frameworks"],
      techStack: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker"],
      companyDescription:
        "TechCorp is a leading technology company focused on building innovative solutions that transform how businesses operate. We pride ourselves on our collaborative culture and commitment to cutting-edge technology.",
      careerGrowth: "Clear path to Lead Frontend Developer role with opportunities to mentor team members and drive technical decisions.",
      benefits: ["Health Insurance", "Dental & Vision", "401k Matching", "Flexible PTO", "Remote Work Options", "Learning Budget"],
      applicationDeadline: "2024-02-15",
      applicants: 23,
      companyRating: 4.6,
      companyReviews: 142,
      isApplied: false,
      skillMatch: 10,
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      companyLogo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=center",
      location: "Remote",
      workType: "Remote",
      experience: "2-4 years",
      salary: "$90k - $130k",
      skills: ["Python", "Django", "React", "PostgreSQL"],
      postedDate: "2024-01-14",
      views: 189,
      applications: 45,
      urgent: true,
      isSaved: true,
      isQuickApplyAvailable: false,
      fitScore: 78,
      fitExplanation: "Good match for your full-stack skills, though Python experience is limited",
      skillsGap: ["Django", "PostgreSQL"],
      aiSummary: "Remote-first startup looking for versatile engineers. Great opportunity to work with modern Python stack.",
      source: {
        platform: "LinkedIn",
        verified: false,
      },
      // Additional fields for JobDetailPage
      description:
        "Join our fast-growing startup as a Full Stack Engineer! We are building the next generation of productivity tools and need talented engineers who can work across the entire stack.",
      responsibilities: [
        "Build scalable web applications using Python and React",
        "Design and implement REST APIs and database schemas",
        "Collaborate with product and design teams on new features",
        "Optimize application performance and user experience",
        "Participate in code reviews and technical discussions",
      ],
      requiredSkills: ["Python", "React", "JavaScript", "SQL", "Git"],
      preferredSkills: ["Django", "PostgreSQL", "Redis", "Docker"],
      techStack: ["Python", "Django", "React", "PostgreSQL", "Redis", "AWS"],
      companyDescription:
        "StartupXYZ is a remote-first company building innovative productivity tools for modern teams. We believe in work-life balance and provide a supportive environment for professional growth.",
      careerGrowth: "Opportunity to grow into a Senior Full Stack Engineer or specialize in backend/frontend development.",
      benefits: ["Competitive Salary", "Remote Work", "Health Insurance", "Learning Budget", "Flexible Hours"],
      applicationDeadline: "2024-02-20",
      applicants: 45,
      companyRating: 4.2,
      companyReviews: 28,
      isApplied: false,
      skillMatch: 20,
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "New York, NY",
      workType: "Hybrid",
      experience: "1-3 years",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      postedDate: "2024-01-13",
      views: 156,
      applications: 67,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 65,
      fitExplanation: "Partial match - design skills align but lacks some technical requirements",
      aiSummary: "Creative agency seeking passionate designers. Focus on user-centered design and modern design tools.",
      source: {
        platform: "Indeed",
        verified: true,
      },
      // Additional fields for JobDetailPage
      description:
        "We are looking for a talented UI/UX Designer to join our creative team. You will be responsible for creating intuitive and beautiful user experiences for our clients digital products.",
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with developers to ensure design implementation",
        "Present design concepts to clients and stakeholders",
      ],
      requiredSkills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      preferredSkills: ["Sketch", "InVision", "HTML/CSS", "Design Systems"],
      techStack: ["Figma", "Adobe Creative Suite", "Sketch", "InVision", "Miro"],
      companyDescription:
        "DesignStudio is a boutique design agency specializing in user experience design for startups and established brands. We create meaningful digital experiences that drive business results.",
      careerGrowth: "Path to Senior Designer or Design Lead roles with opportunities to mentor junior designers.",
      benefits: ["Competitive Salary", "Health Insurance", "Creative Development Budget", "Flexible Schedule", "Modern Office"],
      applicationDeadline: "2024-02-10",
      applicants: 67,
      companyRating: 4.4,
      companyReviews: 89,
      isApplied: false,
      skillMatch: 30,
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "CloudTech",
      companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center",
      location: "Austin, TX",
      workType: "Full-time",
      experience: "2-5 years",
      salary: "$100k - $140k",
      skills: ["Java", "Spring Boot", "Microservices", "Kubernetes", "MySQL"],
      postedDate: "2024-01-12",
      views: 312,
      applications: 31,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 85,
      fitExplanation: "Strong backend skills match well with requirements",
      skillsGap: ["Kubernetes"],
      aiSummary: "Great backend role with focus on scalable cloud infrastructure.",
      source: {
        platform: "Qelsa",
        verified: true,
        exclusive: false,
      },
      description: "Looking for a skilled Backend Developer to build scalable services.",
      responsibilities: ["Design APIs", "Optimize database queries", "Deploy services"],
      requiredSkills: ["Java", "Spring Boot", "MySQL"],
      preferredSkills: ["Kubernetes", "Docker", "Redis"],
      techStack: ["Java", "Spring Boot", "Kubernetes", "MySQL", "Redis"],
      companyDescription: "CloudTech is building the next generation of cloud services.",
      careerGrowth: "Senior Backend Developer role with leadership opportunities.",
      benefits: ["Health Insurance", "401k", "Stock Options", "Remote Flexibility"],
      applicationDeadline: "2024-02-25",
      applicants: 31,
      companyRating: 4.5,
      companyReviews: 201,
      isApplied: false,
      skillMatch: 50,
    },
    {
      id: "5",
      title: "Product Manager",
      company: "InnovateLabs",
      companyLogo: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=64&h=64&fit=crop&crop=center",
      location: "Boston, MA",
      workType: "Hybrid",
      experience: "5-7 years",
      salary: "$130k - $170k",
      skills: ["Product Strategy", "Agile", "User Research", "Analytics", "Roadmapping"],
      postedDate: "2024-01-10",
      views: 198,
      applications: 52,
      isSaved: false,
      isQuickApplyAvailable: false,
      fitScore: 72,
      fitExplanation: "Good strategic fit but requires more enterprise experience",
      aiSummary: "Strategic PM role focused on SaaS product development.",
      source: {
        platform: "LinkedIn",
        verified: true,
      },
      description: "Seeking an experienced Product Manager to lead our SaaS initiatives.",
      responsibilities: ["Define product vision", "Coordinate with stakeholders", "Analyze metrics"],
      requiredSkills: ["Product Strategy", "Agile", "Analytics"],
      preferredSkills: ["User Research", "B2B SaaS", "SQL"],
      techStack: ["Jira", "Figma", "Amplitude", "SQL"],
      companyDescription: "InnovateLabs creates cutting-edge SaaS solutions for enterprises.",
      careerGrowth: "Path to Senior PM or Director of Product roles.",
      benefits: ["Competitive Salary", "Equity", "Health Benefits", "Flexible Work"],
      applicationDeadline: "2024-02-18",
      applicants: 52,
      companyRating: 4.3,
      companyReviews: 167,
      isApplied: false,
      skillMatch: 50,
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "AI Analytics Co",
      companyLogo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=64&h=64&fit=crop&crop=center",
      location: "Seattle, WA",
      workType: "Remote",
      experience: "3-6 years",
      salary: "$120k - $160k",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
      postedDate: "2024-01-11",
      views: 287,
      applications: 44,
      trending: true,
      isSaved: true,
      isQuickApplyAvailable: true,
      fitScore: 88,
      fitExplanation: "Excellent match for ML and Python expertise",
      skillsGap: ["TensorFlow"],
      aiSummary: "Leading AI company looking for data scientists to build ML models.",
      source: {
        platform: "Qelsa",
        verified: true,
        exclusive: true,
      },
      description: "Join our ML team to develop innovative AI solutions.",
      responsibilities: ["Build ML models", "Analyze large datasets", "Deploy models to production"],
      requiredSkills: ["Python", "Machine Learning", "SQL"],
      preferredSkills: ["TensorFlow", "PyTorch", "Cloud platforms"],
      techStack: ["Python", "TensorFlow", "AWS", "SQL", "Docker"],
      companyDescription: "AI Analytics Co is at the forefront of AI innovation.",
      careerGrowth: "Senior Data Scientist or ML Engineer progression.",
      benefits: ["Competitive Pay", "Remote Work", "Learning Budget", "Health Insurance"],
      applicationDeadline: "2024-02-22",
      applicants: 44,
      companyRating: 4.7,
      companyReviews: 93,
      isApplied: false,
      skillMatch: 50,
    },
    {
      id: "7",
      title: "DevOps Engineer",
      company: "Infrastructure Pro",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=center",
      location: "Denver, CO",
      workType: "Full-time",
      experience: "4-7 years",
      salary: "$110k - $150k",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      postedDate: "2024-01-09",
      views: 223,
      applications: 38,
      isSaved: false,
      isQuickApplyAvailable: false,
      fitScore: 79,
      fitExplanation: "Good infrastructure knowledge, need more AWS experience",
      skillsGap: ["Terraform"],
      aiSummary: "DevOps role focused on cloud infrastructure and automation.",
      source: {
        platform: "Indeed",
        verified: true,
      },
      description: "Looking for a DevOps Engineer to manage our cloud infrastructure.",
      responsibilities: ["Manage AWS infrastructure", "Automate deployments", "Monitor systems"],
      requiredSkills: ["AWS", "Docker", "Kubernetes"],
      preferredSkills: ["Terraform", "Ansible", "Python"],
      techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      companyDescription: "Infrastructure Pro provides managed cloud services.",
      careerGrowth: "Senior DevOps Engineer or Cloud Architect path.",
      benefits: ["Salary", "Health Benefits", "Training Budget", "401k"],
      applicationDeadline: "2024-02-28",
      applicants: 38,
      companyRating: 4.1,
      companyReviews: 54,
      isApplied: false,
      skillMatch: 50,
    },
    {
      id: "8",
      title: "Mobile Developer (iOS)",
      company: "AppWorks",
      companyLogo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&crop=center",
      location: "Los Angeles, CA",
      workType: "Hybrid",
      experience: "2-4 years",
      salary: "$95k - $130k",
      skills: ["Swift", "SwiftUI", "iOS", "Xcode", "REST APIs"],
      postedDate: "2024-01-08",
      views: 176,
      applications: 29,
      urgent: true,
      isSaved: false,
      isQuickApplyAvailable: true,
      fitScore: 81,
      fitExplanation: "Strong iOS development skills match well",
      skillsGap: ["SwiftUI"],
      aiSummary: "iOS developer role for consumer mobile applications.",
      source: {
        platform: "Naukri",
        verified: false,
      },
      description: "Build beautiful iOS applications for millions of users.",
      responsibilities: ["Develop iOS features", "Collaborate with designers", "Optimize performance"],
      requiredSkills: ["Swift", "iOS", "Xcode"],
      preferredSkills: ["SwiftUI", "Combine", "Core Data"],
      techStack: ["Swift", "SwiftUI", "Xcode", "Firebase"],
      companyDescription: "AppWorks creates award-winning mobile applications.",
      careerGrowth: "Senior iOS Developer role with team leadership.",
      benefits: ["Competitive Salary", "Stock Options", "Gym Membership", "Health Insurance"],
      applicationDeadline: "2024-02-14",
      applicants: 29,
      companyRating: 4.4,
      companyReviews: 72,
      isApplied: false,
      skillMatch: 50,
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !locationFilter || locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = !experienceFilter || experienceFilter === "all" || job.experience.includes(experienceFilter);
    const matchesWorkType = !workTypeFilter || workTypeFilter === "all" || job.workType === workTypeFilter;

    return matchesSearch && matchesLocation && matchesExperience && matchesWorkType;
  });

  const handleJobClick = (job: Job) => {
    // Add to viewed jobs if not already viewed
    if (!viewedJobs.includes(job.id)) {
      setViewedJobs((prev) => [job.id, ...prev.slice(0, 4)]); // Keep last 5 viewed
    }

    // Update AI assistant context
    setAiAssistantJob(job);

    // Call the job click handler if provided
    // onJobClick?.(job);
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));

    // Update the job's saved status
    const jobIndex = jobs.findIndex((job) => job.id === jobId);
    if (jobIndex !== -1) {
      jobs[jobIndex].isSaved = !jobs[jobIndex].isSaved;
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]));
  };

  const handleQuickApply = (jobId: string) => {
    console.log("Quick applying to job:", jobId);
    // Implementation for quick apply
  };

  const getWorkTypeIcon = (workType: string) => {
    switch (workType) {
      case "Remote":
        return <Globe className="w-4 h-4" />;
      case "Hybrid":
        return <Home className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getSourceIcon = (platform: string) => {
    switch (platform) {
      case "Qelsa":
        return <div className="w-4 h-4 rounded bg-neon-cyan flex items-center justify-center text-black text-xs font-bold">Q</div>;
      case "LinkedIn":
        return <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-white text-xs">in</div>;
      case "Indeed":
        return <div className="w-4 h-4 rounded bg-blue-700 flex items-center justify-center text-white text-xs">I</div>;
      case "Naukri":
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Job Opportunities</h1>
              <p className="text-muted-foreground mt-1">Discover your next career move</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAIAssistant(true)}
                className="glass-strong border-neon-cyan/40 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 mr-2 text-neon-cyan" />
                <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">AI Assistant</span>
              </Button>

              <Button className="gradient-animated text-white font-bold shadow-lg hover:shadow-xl hover:shadow-neon-purple/30 transition-all duration-300 hover:scale-105 border-0">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search for jobs, companies, or skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 glass border-glass-border" />
              </div>
            </div>

            <div className="flex gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40 glass border-glass-border">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
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
                  <SelectItem value="all">All Types</SelectItem>
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

          {/* View Mode Tabs */}
          <div className="mt-6">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "discovery" | "all" | "my-jobs")}>
              <TabsList className="glass-strong border-glass-border">
                <TabsTrigger value="discovery" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Discover
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-neon-cyan/20 data-[state=active]:text-neon-cyan">
                  <Filter className="w-4 h-4 mr-2" />
                  All Jobs
                </TabsTrigger>
                <TabsTrigger value="my-jobs" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple relative">
                  <Briefcase className="w-4 h-4 mr-2" />
                  My Jobs
                  {/* Attention Badge - items needing attention */}
                  {(savedJobs.length > 0 || viewedJobs.length > 0) && (
                    <Badge variant="outline" className="ml-2 h-5 min-w-[20px] px-1.5 bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30 text-xs">
                      {savedJobs.length + Math.min(viewedJobs.length, 3)}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === "discovery" ? (
          /* Discovery Rails View - Full Width */
          <JobDiscoveryRails onJobClick={handleJobClick} />
        ) : viewMode === "my-jobs" ? (
          /* My Jobs Dashboard - Full Width */
          <div className="mt-[-2rem]">
            <MyJobsPage />
          </div>
        ) : (
          /* Traditional All Jobs View - Grid Layout */
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
                      const job = jobs.find((j) => j.id === jobId);
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
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-2">
              {/* Recently Viewed Jobs */}
              {viewedJobs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-neon-cyan" />
                    Recently Viewed ({viewedJobs.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {viewedJobs.slice(0, 3).map((jobId) => {
                      const job = jobs.find((j) => j.id === jobId);
                      if (!job) return null;
                      return (
                        <Card
                          key={job.id}
                          className="p-4 glass border-glass-border cursor-pointer hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10 hover:-translate-y-0.5 transition-all rounded-xl flex flex-col justify-between"
                          onClick={() => handleJobClick(job)}
                          style={{ minHeight: "140px" }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {job.companyLogo && <img src={job.companyLogo} alt={job.company} className="w-10 h-10 rounded-lg object-cover border border-glass-border flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 mb-1">{job.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">{job.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs px-2.5 py-1 rounded-full">
                              {job.workType}
                            </Badge>
                            {job.fitScore && (
                              <div className="flex items-center gap-1">
                                <Target className="w-3 h-3 text-neon-cyan" />
                                <span className="text-xs font-semibold text-neon-cyan">{job.fitScore}%</span>
                              </div>
                            )}
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
                        {job.companyLogo && (
                          <div className="flex-shrink-0">
                            <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border border-glass-border shadow-sm" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-neon-cyan transition-colors">{job.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{job.company}</p>
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
        )}
      </div>

      {/* Compare Jobs Tray */}
      {/* {onCompare && onRemoveFromCompare && onClearCompare && <CompareJobsTray jobs={comparedJobs} onRemoveJob={onRemoveFromCompare} onCompare={onCompare} onClear={onClearCompare} />} */}

      {/* AI Assistant Drawer */}
      <JobAIAssistantDrawer isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} selectedJob={aiAssistantJob} jobs={jobs} />
    </div>
  );
}
