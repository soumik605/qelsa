import { useGetJobsQuery } from "@/features/api/jobsApi";
import { useGetPageByIdQuery } from "@/features/api/pagesApi";
import { ArrowLeft, Briefcase, Building2, Calendar, CheckCircle, ChevronRight, ExternalLink, MapPin, Share2, Star, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CompanyPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleFollowCompany = () => {
    setIsFollowing(!isFollowing);
  };

  const {
    data: pageData,
    isLoading,
    error,
  } = useGetPageByIdQuery(id ?? "", {
    skip: !id,
  });
  console.log("🚀 ~ PageView ~ pageData:", pageData);

  const { data: pageJobs, isLoading: jobsLoading, error: jobsError } = useGetJobsQuery({ page_id: id });

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading page details...</div>;

  if (error) return <div className="p-8 text-center text-destructive">Failed to load page details.</div>;

  if (!pageData) return <div className="p-8 text-center text-muted-foreground">Page not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Header */}
      <div className="glass-strong border-b border-glass-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" className="hover:bg-neon-cyan/10 hover:text-neon-cyan" onClick={() => router.push("/pages")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 overflow-hidden">
        <img src={"https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop&crop=center"} alt={`${pageData.name} cover`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        {/* Company Header Card */}
        <Card className="glass border-glass-border p-6 mb-6">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="relative flex-shrink-0">
              <img
                src={pageData.logo || "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=120&fit=crop&crop=center"}
                alt={pageData.name}
                className="w-24 h-24 rounded-xl object-cover border-2 border-glass-border bg-background"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{pageData.name}</h1>
                  <p className="text-muted-foreground mb-3">{pageData.tagline}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {/* <span className="font-medium">{pageData.rating}</span>
                      <span className="text-muted-foreground">({pageData.totalReviews} reviews)</span> */}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {/* <span>{pageData.followers.toLocaleString()} followers</span> */}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button onClick={handleFollowCompany} className={isFollowing ? "bg-white/10 hover:bg-white/20" : "bg-neon-cyan hover:bg-neon-cyan/90 text-black"}>
                    {isFollowing ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-glass-border hover:bg-white/5">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-neon-cyan" />
                  <span>{pageData.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-neon-purple" />
                  {/* <span>{pageData.companySize}</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neon-pink" />
                  {/* <span>{pageData.headquarters}</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-green" />
                  {/* <span>Founded {pageData.founded}</span> */}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass border-glass-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({pageJobs?.length || 0})</TabsTrigger>
            <TabsTrigger value="culture">Culture & Values</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* About */}
                <Card className="glass border-glass-border p-6">
                  <h2 className="text-xl font-semibold mb-4">About {pageData.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{pageData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {/* {pageData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/5">
                        {specialty}
                      </Badge>
                    ))} */}
                  </div>
                </Card>

                {/* Company Stats */}
                <Card className="glass border-glass-border p-6">
                  <h2 className="text-xl font-semibold mb-6">Company Highlights</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {/* {pageData.stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 rounded-lg glass-strong">
                        <div className="text-2xl font-bold text-neon-cyan mb-1">{stat.value}</div>
                        <div className="font-medium mb-1">{stat.label}</div>
                        <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                      </div>
                    ))} */}
                  </div>
                </Card>

                {/* Culture Ratings */}
                <Card className="glass border-glass-border p-6">
                  <h2 className="text-xl font-semibold mb-6">Culture & Benefits</h2>
                  <div className="space-y-4 mb-6">
                    {/* {Object.entries(pageData.culture).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          <span className="text-sm font-medium">{value}/5</span>
                        </div>
                        <Progress value={value * 20} className="h-2" />
                      </div>
                    ))} */}
                  </div>

                  <Separator className="my-6" />

                  <h3 className="font-semibold mb-4">Benefits & Perks</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* {pageData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))} */}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Details */}
                <Card className="glass border-glass-border p-6">
                  <h3 className="font-semibold mb-4">Company Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Website</div>
                      <a href={pageData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-neon-cyan hover:underline flex items-center gap-1">
                        {pageData.website.replace("https://", "")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Industry</div>
                      <div className="text-sm">{pageData.industry}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                      {/* <div className="text-sm">{pageData.companySize}</div> */}
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Headquarters</div>
                      {/* <div className="text-sm">{pageData.headquarters}</div> */}
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Founded</div>
                      {/* <div className="text-sm">{pageData.founded}</div> */}
                    </div>
                  </div>
                </Card>

                {/* Open Jobs CTA */}
                <Card className="glass border-glass-border p-6 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10">
                  <div className="text-center">
                    <Briefcase className="w-8 h-8 mx-auto mb-3 text-neon-cyan" />
                    <h3 className="font-semibold mb-2">{pageJobs?.length || 0} Open Positions</h3>
                    <p className="text-sm text-muted-foreground mb-4">Explore opportunities to join our team</p>
                    <Button onClick={() => setActiveTab("jobs")} className="w-full bg-neon-cyan hover:bg-neon-cyan/90 text-black">
                      View Jobs
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <Card className="glass border-glass-border p-6">
              <h2 className="text-xl font-semibold mb-6">Open Positions at {pageData.name}</h2>
              <div className="space-y-4">
                {pageJobs?.map((job) => (
                  <Card key={job.id} className="glass-strong border-glass-border hover:border-neon-cyan/30 transition-all cursor-pointer p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 hover:text-neon-cyan transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.work_type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {new Date(job.published_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {/* {job.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-white/5">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge variant="secondary" className="text-xs bg-white/5">
                              +{job.skills.length - 4}
                            </Badge>
                          )} */}
                        </div>
                      </div>
                      {/* {job.fitScore && (
                        <div className="flex items-center gap-1.5 text-sm bg-neon-green/10 border border-neon-green/30 rounded-lg px-3 py-2">
                          <Target className="w-4 h-4 text-neon-green" />
                          <span className="text-neon-green font-medium">{job.fitScore}% fit</span>
                        </div>
                      )} */}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Culture Tab */}
          <TabsContent value="culture" className="space-y-6">
            <Card className="glass border-glass-border p-6">
              <h2 className="text-xl font-semibold mb-6">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* {pageData.values.map((value, index) => (
                  <div key={index} className="p-4 rounded-lg glass-strong">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-neon-cyan" />
                      <h3 className="font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))} */}
              </div>
            </Card>
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-4">
            {/* {pageData.recentUpdates.map((update) => (
              <Card key={update.id} className="glass border-glass-border p-6">
                <div className="flex items-start gap-4">
                  {update.image && <img src={update.image} alt={update.title} className="w-24 h-24 rounded-lg object-cover border border-glass-border" />}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{update.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(update.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{update.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-neon-pink transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{update.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-neon-cyan transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{update.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-neon-purple transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))} */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
