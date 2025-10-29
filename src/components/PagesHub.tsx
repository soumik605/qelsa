import { useState } from 'react';
import { 
  Plus, 
  Building2, 
  Users, 
  User,
  Eye,
  Edit,
  Settings,
  TrendingUp,
  Briefcase,
  Search,
  Filter
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useRouter } from 'next/navigation';

interface Page {
  id: string;
  name: string;
  type: 'company' | 'community' | 'personal';
  logo?: string;
  banner?: string;
  tagline: string;
  followers: number;
  role: 'admin' | 'editor' | 'recruiter';
  jobPostings: number;
  updates: number;
}

interface PagesHubProps {
}

export function PagesHub({ }: PagesHubProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-pages');

  // Mock pages data
  const myPages: Page[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      type: 'company',
      tagline: 'Building the future of enterprise software',
      followers: 12450,
      role: 'admin',
      jobPostings: 8,
      updates: 23
    },
    {
      id: '2',
      name: 'AI Developers Community',
      type: 'community',
      tagline: 'A community for AI enthusiasts and developers',
      followers: 8920,
      role: 'editor',
      jobPostings: 0,
      updates: 156
    }
  ];

  const discoverPages: Page[] = [
    {
      id: '3',
      name: 'InnovateLabs',
      type: 'company',
      tagline: 'Innovation at scale',
      followers: 25600,
      role: 'admin',
      jobPostings: 15,
      updates: 89
    },
    {
      id: '4',
      name: 'Women in Tech',
      type: 'community',
      tagline: 'Empowering women in technology',
      followers: 42300,
      role: 'admin',
      jobPostings: 0,
      updates: 234
    }
  ];

  const getPageTypeIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <Building2 className="w-4 h-4" />;
      case 'community':
        return <Users className="w-4 h-4" />;
      case 'personal':
        return <User className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getPageTypeColor = (type: string) => {
    switch (type) {
      case 'company':
        return 'bg-neon-cyan/20 text-neon-cyan border-0';
      case 'community':
        return 'bg-neon-purple/20 text-neon-purple border-0';
      case 'personal':
        return 'bg-neon-pink/20 text-neon-pink border-0';
      default:
        return 'bg-neon-cyan/20 text-neon-cyan border-0';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-neon-green/20 text-neon-green border-0';
      case 'editor':
        return 'bg-neon-yellow/20 text-neon-yellow border-0';
      case 'recruiter':
        return 'bg-neon-purple/20 text-neon-purple border-0';
      default:
        return 'bg-muted text-muted-foreground border-0';
    }
  };

  const PageCard = ({ page, showRole = false }: { page: Page; showRole?: boolean }) => (
    <Card className="p-6 glass border-glass-border hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg gradient-animated flex items-center justify-center">
            <span className="text-xl font-bold text-black">
              {page.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{page.name}</h3>
            <p className="text-xs text-muted-foreground">{page.tagline}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getPageTypeColor(page.type)}>
            {getPageTypeIcon(page.type)}
            <span className="ml-1 capitalize">{page.type}</span>
          </Badge>
          {showRole && (
            <Badge className={getRoleBadgeColor(page.role)}>
              {page.role}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-bold text-neon-cyan">{page.followers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-neon-purple">{page.jobPostings}</p>
          <p className="text-xs text-muted-foreground">Jobs</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-neon-green">{page.updates}</p>
          <p className="text-xs text-muted-foreground">Updates</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 border-neon-cyan/30 text-neon-cyan"
        >
          <Eye className="w-3 h-3 mr-1" />
          View
        </Button>
        {showRole && (page.role === 'admin' || page.role === 'editor') && (
          <Button
            size="sm"
            className="flex-1 gradient-animated"
          >
            <Edit className="w-3 h-3 mr-1" />
            Manage
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-strong border-b border-glass-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Pages
              </h1>
              <p className="text-muted-foreground mt-2">
                Create and manage your company, community, or personal brand pages
              </p>
            </div>

            <Button onClick={() => router.push("create-page")} className="gradient-animated shadow-lg hover:shadow-neon-purple/30">
              <Plus className="w-4 h-4 mr-2" />
              Create Page
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-glass-border"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 glass border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myPages.length}</p>
                <p className="text-xs text-muted-foreground">My Pages</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 glass border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {myPages.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Followers</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 glass border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {myPages.reduce((sum, p) => sum + p.jobPostings, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 glass border-glass-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {myPages.reduce((sum, p) => sum + p.updates, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Updates</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="glass border-glass-border mb-6">
            <TabsTrigger value="my-pages">My Pages</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="my-pages" className="space-y-4">
            {myPages.length === 0 ? (
              <Card className="p-12 glass border-glass-border text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No pages yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first page to showcase your company, build a community, or establish your personal brand.
                </p>
                <Button className="gradient-animated">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Page
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPages.map((page) => (
                  <PageCard key={page.id} page={page} showRole />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverPages.map((page) => (
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}