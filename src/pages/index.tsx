import { useState, useEffect, useRef, useCallback } from 'react';
import { MainNavigation } from '../components/MainNavigation';
import { MySpacePage } from '../components/MySpacePage';
import { JobsPage } from '../components/JobsPage';
import { JobListingPage } from '../components/JobListingPage';
import { MyJobsPage } from '../components/MyJobsPage';
import { SocialFeed } from '../components/SocialFeed';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { QelsaAIPage } from '../components/QelsaAIPage';
import { JobFilterSidebar, JobFilters } from '../components/JobFilterSidebar';
import { ProfileDrawer } from '../components/ProfileDrawer';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { ProfileView } from '../components/ProfileView';
import { NetworkPage } from '../components/NetworkPage';
import { CoursesPage } from '../components/CoursesPage';
import { BlogPlatform } from '../components/BlogPlatform';
import { JobDetailPage } from '../components/JobDetailPage';
import { JobComparisonPage } from '../components/JobComparisonPage';
import { JobPostingPage } from '../components/JobPostingPage';
import { PagesHub } from '../components/PagesHub';
import { CreatePageFlow } from '../components/CreatePageFlow';
import { PageView } from '../components/PageView';
import { PageAdminView } from '../components/PageAdminView';
import type { Job } from '../components/JobListingPage';


import { 
  Users, 
  BookOpen, 
  Mail, 
  User, 
  Settings
} from 'lucide-react';

interface ResponseData {
  id: string;
  title: string;
  description: string;
  relevance: string;
  actionLabel: string;
  actionType: 'view' | 'learn' | 'apply';
  category: 'student' | 'professional' | 'job' | 'skill';
  source?: {
    platform: 'Qelsa' | 'LinkedIn' | 'Indeed' | 'Naukri' | 'AngelList' | 'Glassdoor';
    verified?: boolean;
    exclusive?: boolean;
  };
  jobDetails?: {
    company: string;
    location: string;
    salary?: string;
    workType?: string;
    experience: string;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
  };
}

interface UserData {
  fullName: string;
  username: string;
  profileType: 'student' | 'professional' | 'career-switcher';
  goals: string[];
}

export default function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [jobsSearchQuery, setJobsSearchQuery] = useState('');
  const [aiJobResults, setAiJobResults] = useState<ResponseData[]>([]);
  const [showQelsaNavigation, setShowQelsaNavigation] = useState(false);
  const [showJobFilterSidebar, setShowJobFilterSidebar] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [sharedBlogPosts, setSharedBlogPosts] = useState<any[]>([]);
  const [comparedJobs, setComparedJobs] = useState<Job[]>([]);
  const [jobFilters, setJobFilters] = useState<JobFilters>({
    location: [],
    experience: [],
    salary: [0, 50],
    workType: [],
    company: [],
    jobSource: []
  });
  const [myJobsInitialTab, setMyJobsInitialTab] = useState<'saved' | 'in-progress' | 'applied' | 'posted'>('saved');
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('qelsa-onboarding-completed');
    const storedUserData = localStorage.getItem('qelsa-user-data');
    
    if (hasCompletedOnboarding && storedUserData) {
      setIsFirstTimeUser(false);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleViewAllJobs = useCallback((searchQuery: string, jobResults?: ResponseData[]) => {
    setJobsSearchQuery(searchQuery);
    if (jobResults) {
      setAiJobResults(jobResults);
    }
    setActiveSection('jobs');
  }, []);

  const handleJobSearch = useCallback((searchQuery: string) => {
    setJobsSearchQuery(searchQuery);
  }, []);

  const handleJobFilter = useCallback(() => {
    setShowJobFilterSidebar(true);
  }, []);

  const handleCloseJobFilterSidebar = useCallback(() => {
    setShowJobFilterSidebar(false);
  }, []);

  const handleApplyJobFilters = useCallback((filters: JobFilters) => {
    setJobFilters(filters);
    console.log('Applied job filters:', filters);
  }, []);

  const handleProfileClick = useCallback(() => {
    setShowProfileDrawer(true);
  }, []);

  const handleCloseProfileDrawer = useCallback(() => {
    setShowProfileDrawer(false);
  }, []);

  const handleOnboardingComplete = useCallback((userData: UserData) => {
    // Save user data and mark onboarding as completed
    localStorage.setItem('qelsa-onboarding-completed', 'true');
    localStorage.setItem('qelsa-user-data', JSON.stringify(userData));
    
    setUserData(userData);
    setIsFirstTimeUser(false);
    setActiveSection('qelsa-ai'); // Navigate directly to AI Chat
  }, []);

  const handleNavigateToSection = useCallback((section: string) => {
    try {
      // Clean up any existing timers
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }
      
      setActiveSection(section);
      setViewingProfileId(null); // Clear profile view when navigating
      
      // Reset navigation state for non-AI sections
      if (section !== 'qelsa-ai') {
        setShowQelsaNavigation(false);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, []);

  const handleViewProfile = useCallback((userId: string) => {
    setViewingProfileId(userId);
    setActiveSection('profile-view');
  }, []);

  const handleCloseProfile = useCallback(() => {
    setViewingProfileId(null);
    setActiveSection('home'); // Navigate back to feed
  }, []);

  const handleShareBlogToFeed = useCallback((blogPost: any) => {
    const sharedPost = {
      id: `shared-blog-${Date.now()}`,
      type: 'shared-blog',
      blogPost,
      timestamp: new Date().toISOString(),
      user: userData
    };
    setSharedBlogPosts(prev => [sharedPost, ...prev]);
  }, [userData]);

  const handleJobClick = useCallback((job: any) => {
    setSelectedJob(job);
    setActiveSection('job-detail');
  }, []);

  const handleBackFromJobDetail = useCallback(() => {
    setSelectedJob(null);
    setActiveSection('jobs');
  }, []);

  const handleJobApply = useCallback((jobId: string) => {
    console.log('Applying to job:', jobId);
    // Implementation for job application
  }, []);

  const handleJobSave = useCallback((jobId: string) => {
    console.log('Saving job:', jobId);
    // Implementation for job saving
  }, []);

  const handleJobShare = useCallback((jobId: string) => {
    console.log('Sharing job:', jobId);
    // Implementation for job sharing
  }, []);

  const handleToggleCompare = useCallback((job: Job) => {
    setComparedJobs(prev => {
      const isAlreadyCompared = prev.some(j => j.id === job.id);
      if (isAlreadyCompared) {
        return prev.filter(j => j.id !== job.id);
      } else {
        if (prev.length >= 4) {
          return prev; // Max 4 jobs
        }
        return [...prev, job];
      }
    });
  }, []);

  const handleRemoveFromCompare = useCallback((jobId: string) => {
    setComparedJobs(prev => prev.filter(j => j.id !== jobId));
  }, []);

  const handleCompare = useCallback(() => {
    if (comparedJobs.length >= 2) {
      setActiveSection('job-comparison');
    }
  }, [comparedJobs]);

  const handleClearCompare = useCallback(() => {
    setComparedJobs([]);
  }, []);

  const handleBackFromComparison = useCallback(() => {
    setActiveSection('jobs');
  }, []);

  const handleRemoveJobFromComparison = useCallback((jobId: string) => {
    setComparedJobs(prev => {
      const updated = prev.filter(j => j.id !== jobId);
      // If less than 2 jobs remain, go back to job listing
      if (updated.length < 2) {
        setActiveSection('jobs');
      }
      return updated;
    });
  }, []);

  // Simplified scroll handling for Qelsa AI navigation
  useEffect(() => {
    if (activeSection !== 'qelsa-ai') {
      setShowQelsaNavigation(false);
      return;
    }

    let timeoutId: NodeJS.Timeout | null = null;
    let isThrottled = false;
    
    const handleScroll = () => {
      if (isThrottled) return;
      
      isThrottled = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Clear existing timer
        if (scrollTimer.current) {
          clearTimeout(scrollTimer.current);
          scrollTimer.current = null;
        }

        // Simple scroll direction detection
        if (currentScrollY < lastScrollY.current - 10) {
          // Scrolling up - show navigation
          setShowQelsaNavigation(true);
          
          // Auto-hide after 3 seconds
          scrollTimer.current = setTimeout(() => {
            setShowQelsaNavigation(false);
          }, 3000);
        } else if (currentScrollY > lastScrollY.current + 10) {
          // Scrolling down - hide navigation immediately
          setShowQelsaNavigation(false);
        }

        lastScrollY.current = currentScrollY;
        isThrottled = false;
      });
    };

    // Initially hide navigation in Qelsa AI
    setShowQelsaNavigation(false);
    
    // Add scroll listener with passive option
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }
      isThrottled = false;
    };
  }, [activeSection]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }
    };
  }, []);

  const renderCurrentSection = useCallback(() => {
    try {
      switch (activeSection) {
        case 'profile':
          return <MySpacePage onNavigate={handleNavigateToSection} />;
        
        case 'profile-view':
          return viewingProfileId ? (
            <ProfileView userId={viewingProfileId} onClose={handleCloseProfile} />
          ) : (
            <SocialFeed onViewProfile={handleViewProfile} sharedBlogPosts={sharedBlogPosts} />
          );
        
        case 'jobs':
          return (
            <JobListingPage 
              onNavigate={handleNavigateToSection}
              onJobClick={handleJobClick}
              comparedJobs={comparedJobs}
              onToggleCompare={handleToggleCompare}
              onRemoveFromCompare={handleRemoveFromCompare}
              onCompare={handleCompare}
              onClearCompare={handleClearCompare}
              onPostJob={() => handleNavigateToSection('job-post')}
            />
          );
        
        case 'job-post':
          return (
            <JobPostingPage 
              onBack={() => handleNavigateToSection('jobs')}
              onPublish={(jobData) => {
                console.log('Job published:', jobData);
              }}
            />
          );
        
        case 'job-detail':
          return selectedJob ? (
            <JobDetailPage 
              job={selectedJob}
              onBack={handleBackFromJobDetail}
              onApply={handleJobApply}
              onSave={handleJobSave}
              onShare={handleJobShare}
            />
          ) : (
            <JobListingPage 
              onNavigate={handleNavigateToSection}
              onJobClick={handleJobClick}
              comparedJobs={comparedJobs}
              onToggleCompare={handleToggleCompare}
              onRemoveFromCompare={handleRemoveFromCompare}
              onCompare={handleCompare}
              onClearCompare={handleClearCompare}
            />
          );

        case 'job-comparison':
          return comparedJobs.length >= 2 ? (
            <JobComparisonPage 
              jobs={comparedJobs}
              onBack={handleBackFromComparison}
              onApply={handleJobApply}
              onRemoveJob={handleRemoveJobFromComparison}
            />
          ) : (
            <JobListingPage 
              onNavigate={handleNavigateToSection}
              onJobClick={handleJobClick}
              comparedJobs={comparedJobs}
              onToggleCompare={handleToggleCompare}
              onRemoveFromCompare={handleRemoveFromCompare}
              onCompare={handleCompare}
              onClearCompare={handleClearCompare}
            />
          );
        
        case 'home':
          return <SocialFeed onViewProfile={handleViewProfile} sharedBlogPosts={sharedBlogPosts} />;
        
        case 'qelsa-ai':
          return <QelsaAIPage onViewAllJobs={handleViewAllJobs} onNavigateToProfile={() => handleNavigateToSection('profile')} onProfileClick={handleProfileClick} />;
        
        case 'courses':
          return <CoursesPage onNavigate={handleNavigateToSection} />;
        
        case 'connections':
          return <NetworkPage onViewProfile={handleViewProfile} />;
        
        case 'blog':
          return <BlogPlatform onNavigate={handleNavigateToSection} onShareToFeed={handleShareBlogToFeed} />;
        
        case 'pages':
          return (
            <PagesHub
              onCreatePage={() => handleNavigateToSection('page-create')}
              onViewPage={(pageId) => {
                console.log('View page:', pageId);
                handleNavigateToSection('page-view');
              }}
              onManagePage={(pageId) => {
                console.log('Manage page:', pageId);
                handleNavigateToSection('page-admin');
              }}
            />
          );
        
        case 'page-create':
          return (
            <CreatePageFlow
              onBack={() => handleNavigateToSection('pages')}
              onComplete={(pageData) => {
                console.log('Page created:', pageData);
                handleNavigateToSection('page-admin');
              }}
            />
          );
        
        case 'page-view':
          return (
            <PageView
              pageId="1"
              isAdmin={false}
              onBack={() => handleNavigateToSection('pages')}
              onEdit={() => handleNavigateToSection('page-admin')}
              onJobClick={(jobId) => {
                console.log('Job clicked:', jobId);
                handleNavigateToSection('jobs');
              }}
            />
          );
        
        case 'page-admin':
          return (
            <PageAdminView
              pageId="1"
              onBack={() => handleNavigateToSection('pages')}
              onViewPublic={() => handleNavigateToSection('page-view')}
              onPostJob={() => handleNavigateToSection('job-post')}
            />
          );
        
        case 'settings':
          return (
            <PlaceholderPage
              title="Settings"
              description="Customize your experience, manage notifications, privacy settings, and account preferences."
              icon={Settings}
            />
          );
        
        default:
          return <SocialFeed onViewProfile={handleViewProfile} sharedBlogPosts={sharedBlogPosts} />;
      }
    } catch (error) {
      console.error('Render error:', error);
      return <div className="p-8 text-center text-white">Something went wrong. Please try refreshing the page.</div>;
    }
  }, [activeSection, viewingProfileId, selectedJob, comparedJobs, jobsSearchQuery, jobFilters, aiJobResults, sharedBlogPosts, handleNavigateToSection, handleCloseProfile, handleViewProfile, handleViewAllJobs, handleJobSearch, handleJobFilter, handleProfileClick, handleJobClick, handleBackFromJobDetail, handleJobApply, handleJobSave, handleJobShare, handleToggleCompare, handleRemoveFromCompare, handleCompare, handleClearCompare, handleBackFromComparison, handleRemoveJobFromComparison]);

  // Show onboarding for first-time users
  if (isFirstTimeUser) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Simplified background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-background">
        {/* Subtle animated elements - reduced complexity */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/3 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/3 rounded-full blur-2xl opacity-50"></div>
      </div>

      {/* Conditional navigation rendering */}
      {(activeSection !== 'qelsa-ai' || showQelsaNavigation) && (
        <div className={`${
          activeSection === 'qelsa-ai' 
            ? `lg:hidden fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
                showQelsaNavigation ? 'translate-y-0' : '-translate-y-full'
              }` 
            : ''
        }`}>
          <MainNavigation 
            activeSection={activeSection}
            onSectionChange={handleNavigateToSection}
            onJobSearch={handleJobSearch}
            onJobFilter={handleJobFilter}
            onProfileClick={handleProfileClick}
          />
        </div>
      )}

      {/* Qelsa AI Navigation Bar for Desktop */}
      {activeSection === 'qelsa-ai' && (
        <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 glass-strong border-b border-glass-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Empty left side for future navigation items if needed */}
              <div></div>
              
              {/* Centered Qelsa Logo */}
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNavigateToSection('profile')}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl gradient-animated flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <span className="text-black font-bold text-lg">Q</span>
                  </div>
                  <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple opacity-50 blur-md group-hover:opacity-70 transition-opacity"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                    Qelsa
                  </h1>
                  <span className="text-xs text-muted-foreground -mt-1">AI Assistant</span>
                </div>
              </div>
              
              {/* Empty right side for balance */}
              <div></div>
            </div>
          </div>
        </div>
      )}


      
      {/* Main content with conditional spacing */}
      <div className={activeSection === 'qelsa-ai' ? 'lg:pt-20' : 'pb-20 lg:pb-0'}>
        {renderCurrentSection()}
      </div>

      {/* Job Filter Sidebar */}
      <JobFilterSidebar
        isOpen={showJobFilterSidebar}
        onClose={handleCloseJobFilterSidebar}
        onApplyFilters={handleApplyJobFilters}
      />

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={showProfileDrawer}
        onClose={handleCloseProfileDrawer}
        onNavigate={handleNavigateToSection}
      />

    </div>
  );
}