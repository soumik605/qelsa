import { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  Settings,
  Users,
  Briefcase,
  FileText,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Share2,
  Crown
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface PageAdminViewProps {
  pageId: string;
  onBack: () => void;
  onViewPublic: () => void;
  onPostJob: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'recruiter';
  joinedDate: string;
  avatar?: string;
}

export function PageAdminView({ pageId, onBack, onViewPublic, onPostJob }: PageAdminViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'editor' | 'recruiter'>('editor');

  // Mock data
  const pageStats = {
    followers: 12450,
    followersGrowth: '+12%',
    pageViews: 8920,
    pageViewsGrowth: '+23%',
    jobViews: 3450,
    jobViewsGrowth: '+18%',
    engagement: 156,
    engagementGrowth: '+8%'
  };

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'You',
      email: 'you@techcorp.com',
      role: 'admin',
      joinedDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@techcorp.com',
      role: 'editor',
      joinedDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Marcus Johnson',
      email: 'marcus@techcorp.com',
      role: 'recruiter',
      joinedDate: '2023-06-10'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'follower',
      description: 'New follower: John Doe',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'job',
      description: 'Job posted: Senior Backend Engineer',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'update',
      description: 'Update published: Series B funding announcement',
      timestamp: '1 day ago'
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-neon-green/20 text-neon-green border-0';
      case 'editor':
        return 'bg-neon-cyan/20 text-neon-cyan border-0';
      case 'recruiter':
        return 'bg-neon-purple/20 text-neon-purple border-0';
      default:
        return 'bg-muted text-muted-foreground border-0';
    }
  };

  const handleInviteMember = () => {
    console.log('Invite member:', newMemberEmail, newMemberRole);
    setNewMemberEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-strong border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pages
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Page Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                TechCorp Solutions
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onViewPublic}
                className="border-neon-cyan/30 text-neon-cyan"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Public Page
              </Button>
              <Button onClick={onPostJob} className="gradient-animated">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="glass border-glass-border mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team & Roles</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 glass border-glass-border">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-neon-cyan" />
                  <Badge className="bg-neon-green/20 text-neon-green border-0 text-xs">
                    {pageStats.followersGrowth}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{pageStats.followers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </Card>

              <Card className="p-4 glass border-glass-border">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-neon-purple" />
                  <Badge className="bg-neon-green/20 text-neon-green border-0 text-xs">
                    {pageStats.pageViewsGrowth}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{pageStats.pageViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Page Views (30d)</p>
              </Card>

              <Card className="p-4 glass border-glass-border">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="w-5 h-5 text-neon-green" />
                  <Badge className="bg-neon-green/20 text-neon-green border-0 text-xs">
                    {pageStats.jobViewsGrowth}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{pageStats.jobViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Job Views (30d)</p>
              </Card>

              <Card className="p-4 glass border-glass-border">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-neon-pink" />
                  <Badge className="bg-neon-green/20 text-neon-green border-0 text-xs">
                    {pageStats.engagementGrowth}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{pageStats.engagement}</p>
                <p className="text-xs text-muted-foreground">Engagement (30d)</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  onClick={onPostJob}
                  className="justify-start gradient-animated"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post a Job
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-neon-cyan/30 text-neon-cyan"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create Update
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-neon-purple/30 text-neon-purple"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Team & Roles Tab */}
          <TabsContent value="team" className="space-y-6">
            {/* Role Permissions Info */}
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Role Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className={getRoleBadgeColor('admin')}>
                    <Crown className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                  <p className="text-sm text-muted-foreground flex-1">
                    Full access: manage team, post jobs, create content, edit page settings
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className={getRoleBadgeColor('editor')}>
                    <Edit className="w-3 h-3 mr-1" />
                    Editor
                  </Badge>
                  <p className="text-sm text-muted-foreground flex-1">
                    Can create and edit content, post updates, manage projects
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className={getRoleBadgeColor('recruiter')}>
                    <Briefcase className="w-3 h-3 mr-1" />
                    Recruiter
                  </Badge>
                  <p className="text-sm text-muted-foreground flex-1">
                    Can post jobs, view applications, respond to candidates
                  </p>
                </div>
              </div>
            </Card>

            {/* Invite Team Member */}
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Invite Team Member</h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Email address"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="glass border-glass-border flex-1"
                />
                <Select value={newMemberRole} onValueChange={(value: any) => setNewMemberRole(value)}>
                  <SelectTrigger className="glass border-glass-border w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleInviteMember}
                  disabled={!newMemberEmail.trim()}
                  className="gradient-animated"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>
            </Card>

            {/* Team Members List */}
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Team Members ({teamMembers.length})</h3>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center">
                        <span className="text-sm font-bold text-black">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          <Badge className={getRoleBadgeColor(member.role)}>
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">Joined {member.joinedDate}</p>
                      </div>
                    </div>

                    {member.role !== 'admin' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="p-6 glass border-glass-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Content</h3>
                <Button size="sm" className="gradient-animated">
                  <Plus className="w-3 h-3 mr-1" />
                  Create
                </Button>
              </div>
              <p className="text-muted-foreground text-center py-12">
                No recent content. Create your first update, job post, or project showcase.
              </p>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 glass border-glass-border">
              <h3 className="font-semibold mb-4">Page Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Page Name</label>
                  <Input
                    defaultValue="TechCorp Solutions"
                    className="glass border-glass-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tagline</label>
                  <Input
                    defaultValue="Building the future of enterprise software"
                    className="glass border-glass-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    defaultValue="TechCorp Solutions is a forward-thinking technology company..."
                    className="glass border-glass-border min-h-32"
                  />
                </div>

                <Separator />

                <div className="flex gap-3">
                  <Button className="gradient-animated">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="border-glass-border">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}