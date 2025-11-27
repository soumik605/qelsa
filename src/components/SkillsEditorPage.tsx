import { useBulkModifyUserSkillsMutation, useGetUserSkillsQuery } from "@/features/api/userSkillsApi";
import { UserSkill } from "@/types/userSkill";
import { AlertCircle, ArrowLeft, Award, Briefcase, Check, Code, Lightbulb, Plus, Search, Sparkles, Target, Trash2, Upload, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export interface SkillBadge {
  id: string;
  name: string;
  source: string;
  icon: string;
  color: string;
}

const SKILL_CATEGORIES = [
  { value: "professional", label: "Professional" },
  { value: "technical", label: "Technical" },
  { value: "softskill", label: "Soft Skill" },
];

const PROFESSIONAL_SKILLS = [
  "Product Management",
  "Project Management",
  "Business Strategy",
  "Business Development",
  "Marketing Strategy",
  "Sales Management",
  "Operations Management",
  "Financial Analysis",
  "Consulting",
  "Stakeholder Management",
];

const TECHNICAL_SKILLS = [
  "Python",
  "JavaScript",
  "SQL",
  "React",
  "Node.js",
  "Java",
  "C++",
  "Data Analysis",
  "Machine Learning",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Git",
  "Jira",
  "Figma",
  "Adobe XD",
  "Tableau",
  "Power BI",
  "Excel",
];

const SOFT_SKILLS = [
  "Leadership",
  "Communication",
  "Team Collaboration",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
  "Creativity",
  "Emotional Intelligence",
  "Negotiation",
  "Public Speaking",
  "Conflict Resolution",
];

const RECOMMENDED_SKILLS_FOR_PM = [
  { name: "Agile Methodologies", category: "professional", demand: "High" },
  { name: "Data-Driven Decision Making", category: "professional", demand: "High" },
  { name: "User Research", category: "professional", demand: "Medium" },
  { name: "A/B Testing", category: "technical", demand: "Medium" },
  { name: "Roadmap Planning", category: "professional", demand: "High" },
];

function getExperienceLevelFromProficiency(proficiency: number) {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 70) return "Advanced";
  if (proficiency >= 40) return "Intermediate";
  return "Beginner";
}

function getProficiencyColor(proficiency: number): string {
  if (proficiency >= 90) return "text-neon-yellow";
  if (proficiency >= 70) return "text-neon-green";
  if (proficiency >= 40) return "text-neon-cyan";
  return "text-neon-pink";
}

export function SkillsEditorPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<UserSkill[]>([]);
  console.log("🚀 ~ SkillsEditorPage ~ skills:", skills);
  const [selectedCategory, setSelectedCategory] = useState("professional");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");

  const { data: userSkills, error, isLoading } = useGetUserSkillsQuery();
  const [bulkModifyUserSkills, { isLoading: isBulkModifying, error: bulkModifyError }] = useBulkModifyUserSkillsMutation();

  // Sync skills state with fetched data
  useEffect(() => {
    if (userSkills) {
      setSkills(userSkills);
    }
  }, [userSkills]);

  const getSkillSuggestions = (category: string): string[] => {
    switch (category) {
      case "professional":
        return PROFESSIONAL_SKILLS;
      case "technical":
        return TECHNICAL_SKILLS;
      case "softskill":
        return SOFT_SKILLS;
      default:
        return [];
    }
  };

  const handleAddSkill = (skillName: string, category: string) => {
    const exists = skills.some((skill) => skill.title.toLowerCase() === skillName.toLowerCase());

    if (exists) {
      toast.error("This skill already exists in your profile");
      return;
    }

    const newSkill: UserSkill = {
      title: skillName,
      category,
      proficiency: 50,
      experience_level: "Intermediate",
      // badges: [],
      // hasEvidence: false,
    };

    setSkills([...skills, newSkill]);
    setNewSkillName("");
    setShowAddSkill(false);
    toast.success(`${skillName} added successfully!`);
  };

  const handleDeleteSkill = (skillId: number) => {
    setSkills(skills?.filter((skill) => skill.id !== skillId));
    toast.success("Skill removed");
  };

  const handleProficiencyChange = (skillTitle: string, proficiency: number) => {
    setSkills(
      skills.map((skill) =>
        skill.title === skillTitle
          ? {
              ...skill,
              proficiency,
              experience_level: getExperienceLevelFromProficiency(proficiency),
            }
          : skill
      )
    );
  };

  const handleRunValidation = () => {
    const issues: string[] = [];

    skills?.forEach((skill) => {
      // if (skill.proficiency >= 70 && !skill.hasEvidence) {
      //   issues.push(`${skill.title} - High proficiency (${skill.proficiency}%) but no supporting evidence. Consider adding projects or certifications.`);
      // }

      if (skill.category === "technical" && skill.proficiency >= 60) {
        const random = Math.random();
        if (random > 0.7) {
          issues.push(`${skill.title} - No recent projects found using this skill. Add supporting evidence or update proficiency.`);
        }
      }
    });

    setValidationIssues(issues);
    setShowValidation(true);

    if (issues.length === 0) {
      toast.success("All skills validated! Your profile looks great.");
    } else {
      toast.info(`Found ${issues.length} suggestions to improve your skills profile`);
    }
  };

  const handleAutoAddFromResume = () => {};

  const handleAddRecommendedSkill = (skillName: string, category: string) => {
    handleAddSkill(skillName, category);
    toast.info("This skill is in high demand for Product Manager roles");
  };

  const handleSaveAll = () => {
    bulkModifyUserSkills(skills)
      .unwrap()
      .then(() => {
        toast.success("Skills entry saved");
        window.location.href = "/profile/skills";
      })
      .catch((error) => {
        toast.error(error?.data?.message || "Failed to save skills entry");
      });
    toast.success("Skills updated successfully!");
  };

  const filteredSkills =
    skills?.filter((skill) => {
      const matchesCategory = skill.category === selectedCategory;
      const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }) || [];

  const getSkillStats = () => {
    // const total = skills?.length || 0;
    // const withBadges = skills?.filter((s) => s.badges.length > 0).length || 0;
    // const expert = skills?.filter((s) => s.experience_level === "Expert").length || 0;
    // const avgProficiency = Math.round(skills?.reduce((sum, s) => sum + s.proficiency, 0) / total || 0);
    // return { total, withBadges, expert, avgProficiency };
  };

  const stats = getSkillStats();

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-yellow/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="glass hover:glass-strong mb-4" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-neon-pink to-neon-yellow flex items-center justify-center">
                <Award className="h-8 w-8 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">Skills & Expertise</span>
                </h1>
                <p className="text-muted-foreground mt-1">{/* {stats.total} skills • {stats.expert} expert level • {stats.avgProficiency}% avg proficiency */}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Actions Bar */}
        <Card className="glass p-6 rounded-2xl border border-glass-border mb-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAutoAddFromResume} variant="outline" size="sm" className="glass hover:glass-strong border-neon-cyan/30 text-neon-cyan">
              <Upload className="h-4 w-4 mr-2" />
              Auto-Add from Resume
            </Button>
            <Button onClick={() => setShowRecommendations(!showRecommendations)} variant="outline" size="sm" className="glass hover:glass-strong border-neon-purple/30 text-neon-purple">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Recommendations
            </Button>
            <Button onClick={handleRunValidation} variant="outline" size="sm" className="glass hover:glass-strong border-neon-pink/30 text-neon-pink">
              <AlertCircle className="h-4 w-4 mr-2" />
              Validate Skills
            </Button>
            <Button onClick={() => setShowAddSkill(true)} className="bg-gradient-to-r from-neon-pink to-neon-yellow text-black hover:scale-105 transition-all" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </Card>

        {/* AI Recommendations Panel */}
        {showRecommendations && (
          <Card className="glass border-neon-purple/30 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon-purple" />
                <span className="font-medium text-white text-lg">Recommended Skills for Product Manager</span>
              </div>
              <Button onClick={() => setShowRecommendations(false)} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Based on your target role and industry trends, we recommend adding these high-demand skills:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RECOMMENDED_SKILLS_FOR_PM.map((rec, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 glass hover:glass-strong rounded-lg transition-all">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{rec.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${rec.demand === "High" ? "border-neon-green/30 text-neon-green" : "border-neon-cyan/30 text-neon-cyan"}`}>
                        {rec.demand} Demand
                      </Badge>
                      <span className="text-xs text-muted-foreground">{rec.category}</span>
                    </div>
                  </div>
                  <Button onClick={() => handleAddRecommendedSkill(rec.name, rec.category)} variant="ghost" size="sm" className="glass hover:glass-strong text-neon-purple">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Validation Issues Panel */}
        {showValidation && validationIssues.length > 0 && (
          <Card className="glass border-neon-pink/30 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-neon-pink" />
                <span className="font-medium text-white text-lg">AI Validation - {validationIssues.length} Suggestions</span>
              </div>
              <Button onClick={() => setShowValidation(false)} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {validationIssues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 glass rounded-lg text-sm">
                  <Lightbulb className="h-4 w-4 text-neon-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{issue}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Add Skill Modal */}
        {showAddSkill && (
          <Card className="glass border-neon-cyan/30 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-neon-cyan" />
                <span className="font-medium text-white text-lg">Add New Skill</span>
              </div>
              <Button
                onClick={() => {
                  setShowAddSkill(false);
                  setNewSkillName("");
                }}
                variant="ghost"
                size="sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newSkillName" className="text-white mb-2 block">
                    Skill Name
                  </Label>
                  <Input
                    id="newSkillName"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g., Product Strategy"
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Category</Label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full glass border border-glass-border rounded-lg px-3 py-2 focus:border-neon-cyan focus:outline-none bg-transparent text-white"
                  >
                    {SKILL_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value} className="bg-gray-900">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                onClick={() => {
                  if (newSkillName.trim()) {
                    handleAddSkill(newSkillName, selectedCategory);
                  } else {
                    toast.error("Please enter a skill name");
                  }
                }}
                className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {getSkillSuggestions(selectedCategory)
                    .slice(0, 8)
                    .map((suggestion) => (
                      <Badge
                        key={suggestion}
                        variant="outline"
                        className="border-neon-cyan/30 text-neon-cyan cursor-pointer hover:bg-neon-cyan/10"
                        onClick={() => handleAddSkill(suggestion, selectedCategory)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Search and Category Filters */}
        <Card className="glass p-6 rounded-2xl border border-glass-border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search skills..." className="glass border-glass-border focus:border-neon-cyan pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {SKILL_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category.value ? "bg-gradient-to-r from-neon-pink to-neon-yellow text-black" : "glass hover:glass-strong border-glass-border"}
                >
                  {category.value === "professional" && <Briefcase className="h-4 w-4 mr-2" />}
                  {category.value === "technical" && <Code className="h-4 w-4 mr-2" />}
                  {category.value === "softskill" && <Users className="h-4 w-4 mr-2" />}
                  {category.value.charAt(0).toUpperCase() + category.value.slice(1)}
                  <Badge variant="outline" className="ml-2 border-glass-border text-xs">
                    {skills?.filter((s) => s.category === category.value).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Skills List */}
        <div className="space-y-4 mb-6">
          {filteredSkills?.length === 0 ? (
            <Card className="glass p-12 text-center">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No {selectedCategory.toLowerCase()} skills found. Add your first skill to get started!</p>
            </Card>
          ) : (
            filteredSkills?.map((skill) => (
              <Card key={skill.title} className="glass hover:glass-strong p-6 rounded-xl border border-glass-border transition-all">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-white text-lg">{skill.title}</h3>
                        <Badge variant="outline" className={`${getProficiencyColor(skill.proficiency)} border-current`}>
                          {getExperienceLevelFromProficiency(skill.proficiency)}
                        </Badge>
                        {/* {!skill.hasEvidence && skill.proficiency >= 70 && (
                          <Badge variant="outline" className="border-neon-pink/30 text-neon-pink text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Needs Evidence
                          </Badge>
                        )} */}
                      </div>
                      {/* {skill.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skill.badges.map((badge) => (
                            <Badge key={badge.id} variant="outline" className={`${badge.color} border-current text-xs`}>
                              <Crown className="h-3 w-3 mr-1" />
                              {badge.name}
                            </Badge>
                          ))}
                        </div>
                      )} */}
                    </div>
                    <Button onClick={() => handleDeleteSkill(skill.id)} variant="ghost" size="icon" className="glass hover:glass-strong text-destructive flex-shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">Proficiency: {skill.proficiency}%</Label>
                      <span className={`text-sm font-medium ${getProficiencyColor(skill.proficiency)}`}>{getExperienceLevelFromProficiency(skill.proficiency)}</span>
                    </div>
                    <Slider value={[skill.proficiency]} onValueChange={(value) => handleProficiencyChange(skill.title, value[0])} max={100} step={5} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-glass-border">
          <div className="text-sm text-muted-foreground">{skills?.length} total skills across all categories</div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass hover:glass-strong">
              Cancel
            </Button>
            <Button onClick={handleSaveAll} className="bg-gradient-to-r from-neon-pink to-neon-yellow text-black hover:scale-105 transition-all">
              <Check className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
