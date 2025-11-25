import { ArrowLeft, Briefcase, Calendar, Check, Edit3, GripVertical, Loader2, MapPin, Plus, Sparkles, Trash2, TrendingUp, Users, X } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isPresent: boolean;
  description: string[];
  metrics: Metric[];
  skills: string[];
  teamSize?: number;
  proofs: Proof[];
}

interface Metric {
  id: string;
  type: string;
  value: string;
  outcome: string;
}

interface Proof {
  id: string;
  name: string;
  url: string;
}

const METRIC_TYPES = ["Revenue Growth", "User Growth", "Cost Reduction", "Efficiency Improvement", "Customer Satisfaction", "Team Performance", "Time Saved", "Quality Improvement"];

const COMMON_SKILLS = ["Product Management", "Project Management", "Leadership", "Strategy", "Data Analysis", "Agile", "Scrum", "SQL", "Python", "Figma", "Jira", "Communication", "Problem Solving"];

export function WorkExperienceEditorPage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<WorkExperience>>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: null,
    isPresent: false,
    description: [""],
    metrics: [],
    skills: [],
    teamSize: undefined,
    proofs: [],
  });

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: null,
      isPresent: false,
      description: [""],
      metrics: [],
      skills: [],
      teamSize: undefined,
      proofs: [],
    });
  };

  const handleEdit = (exp: WorkExperience) => {
    setEditingId(exp.id);
    setFormData(exp);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleSaveExperience = () => {
    if (!formData.title || !formData.company || !formData.startDate) {
      return;
    }

    const duration = formData.isPresent ? `${formData.startDate} - Present` : `${formData.startDate} - ${formData.endDate}`;

    const newExperience: WorkExperience = {
      id: editingId === "new" ? Date.now().toString() : editingId!,
      title: formData.title!,
      company: formData.company!,
      location: formData.location!,
      startDate: formData.startDate!,
      endDate: formData.endDate,
      isPresent: formData.isPresent!,
      duration,
      description: formData.description!.filter((d) => d.trim() !== ""),
      metrics: formData.metrics || [],
      skills: formData.skills || [],
      teamSize: formData.teamSize,
      proofs: formData.proofs || [],
    };

    if (editingId === "new") {
      setExperiences([newExperience, ...experiences]);
    } else {
      setExperiences(experiences.map((exp) => (exp.id === editingId ? newExperience : exp)));
    }

    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAddBullet = () => {
    setFormData({
      ...formData,
      description: [...(formData.description || []), ""],
    });
  };

  const handleRemoveBullet = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description!.filter((_, i) => i !== index),
    });
  };

  const handleBulletChange = (index: number, value: string) => {
    const newDescription = [...formData.description!];
    newDescription[index] = value;
    setFormData({ ...formData, description: newDescription });
  };

  const handleAIRewriteBullet = async (index: number) => {
    setAiLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const original = formData.description![index];
    const enhanced = `Led ${original.toLowerCase()} resulting in 40% improvement in team efficiency and stakeholder satisfaction`;

    const newDescription = [...formData.description!];
    newDescription[index] = enhanced;
    setFormData({ ...formData, description: newDescription });

    setAiLoading(false);
  };

  const handleAddMetric = () => {
    const newMetric: Metric = {
      id: Date.now().toString(),
      type: "",
      value: "",
      outcome: "",
    };
    setFormData({
      ...formData,
      metrics: [...(formData.metrics || []), newMetric],
    });
  };

  const handleRemoveMetric = (id: string) => {
    setFormData({
      ...formData,
      metrics: formData.metrics!.filter((m) => m.id !== id),
    });
  };

  const handleMetricChange = (id: string, field: keyof Metric, value: string) => {
    setFormData({
      ...formData,
      metrics: formData.metrics!.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  };

  const handleAddSkill = (skill: string) => {
    if (!formData.skills?.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skill],
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills!.filter((s) => s !== skill),
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newExperiences = [...experiences];
    const draggedItem = newExperiences[draggedIndex];
    newExperiences.splice(draggedIndex, 1);
    newExperiences.splice(index, 0, draggedItem);

    setExperiences(newExperiences);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSaveAll = () => {
    
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-purple/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="glass hover:glass-strong mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Work Experience</span>
                </h1>
                <p className="text-muted-foreground mt-1">Manage your professional journey with AI-powered tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* List View */}
        {!editingId && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  {experiences.length} work {experiences.length === 1 ? "experience" : "experiences"} • Drag to reorder
                </p>
              </div>
              <Button onClick={handleAddNew} className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:scale-105 transition-all">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card
                  key={exp.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className="glass hover:glass-strong p-6 rounded-xl border border-glass-border cursor-move transition-all hover:border-neon-cyan"
                >
                  <div className="flex items-start gap-4">
                    <GripVertical className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg">{exp.title}</h3>
                          <p className="text-neon-cyan">{exp.company}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </span>
                            {exp.teamSize && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Team of {exp.teamSize}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <Button onClick={() => handleEdit(exp)} variant="ghost" size="sm" className="glass hover:glass-strong text-neon-cyan">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleDelete(exp.id)} variant="ghost" size="sm" className="glass hover:glass-strong text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {exp.description.length > 0 && (
                        <ul className="space-y-1 mb-3">
                          {exp.description.slice(0, 3).map((bullet, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-neon-cyan mt-1">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                          {exp.description.length > 3 && <li className="text-sm text-neon-pink">+{exp.description.length - 3} more achievements...</li>}
                        </ul>
                      )}

                      {exp.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {exp.metrics.map((metric) => (
                            <Badge key={metric.id} variant="outline" className="border-neon-green/30 text-neon-green">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {metric.value}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="border-neon-purple/30 text-neon-purple text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {exp.skills.length > 5 && (
                            <Badge variant="outline" className="border-neon-pink/30 text-neon-pink text-xs">
                              +{exp.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" className="glass hover:glass-strong">
                Cancel
              </Button>
              <Button onClick={handleSaveAll} className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:scale-105 transition-all">
                <Check className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        )}

        {/* Edit Form */}
        {editingId && (
          <Card className="glass p-8 rounded-2xl border border-glass-border">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-glass-border">
                <h2 className="text-2xl font-bold text-white">{editingId === "new" ? "Add New Experience" : "Edit Experience"}</h2>
                <Badge className="bg-glass-bg text-neon-cyan border-glass-border">All fields with * are required</Badge>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Product Manager"
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., TechFlow Solutions"
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">
                    Location <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Bangalore, India"
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-white">
                    Team Size
                  </Label>
                  <Input
                    id="teamSize"
                    type="number"
                    value={formData.teamSize || ""}
                    onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || undefined })}
                    placeholder="e.g., 12"
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-white">
                    Start Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="glass border-glass-border focus:border-neon-cyan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-white">
                    End Date
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="endDate"
                      type="month"
                      value={formData.endDate || ""}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      disabled={formData.isPresent}
                      className="glass border-glass-border focus:border-neon-cyan"
                    />
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={formData.isPresent}
                        onChange={(e) => setFormData({ ...formData, isPresent: e.target.checked, endDate: null })}
                        className="rounded border-glass-border"
                      />
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Responsibilities & Achievements</Label>
                  <Button onClick={handleAddBullet} variant="outline" size="sm" className="glass hover:glass-strong border-neon-cyan/30 text-neon-cyan">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bullet
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.description?.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={bullet}
                        onChange={(e) => handleBulletChange(index, e.target.value)}
                        placeholder="e.g., Led cross-functional team of 12 to deliver..."
                        rows={2}
                        className="glass border-glass-border focus:border-neon-cyan"
                      />
                      <div className="flex flex-col gap-2">
                        <Button onClick={() => handleRemoveBullet(index)} variant="ghost" size="icon" className="glass hover:glass-strong text-destructive flex-shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleAIRewriteBullet(index)} variant="ghost" size="icon" className="glass hover:glass-strong text-neon-pink flex-shrink-0" disabled={aiLoading}>
                          {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-neon-green" />
                    Impact Metrics
                  </Label>
                  <Button onClick={handleAddMetric} variant="outline" size="sm" className="glass hover:glass-strong border-neon-green/30 text-neon-green">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.metrics?.map((metric) => (
                    <Card key={metric.id} className="glass p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select
                          value={metric.type}
                          onChange={(e) => handleMetricChange(metric.id, "type", e.target.value)}
                          className="glass border border-glass-border rounded-lg px-3 py-2 focus:border-neon-green focus:outline-none bg-transparent text-white"
                        >
                          <option value="" className="bg-gray-900">
                            Select metric type
                          </option>
                          {METRIC_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-gray-900">
                              {type}
                            </option>
                          ))}
                        </select>

                        <Input
                          value={metric.value}
                          onChange={(e) => handleMetricChange(metric.id, "value", e.target.value)}
                          placeholder="e.g., 40%"
                          className="glass border-glass-border focus:border-neon-green"
                        />

                        <div className="flex gap-2">
                          <Input
                            value={metric.outcome}
                            onChange={(e) => handleMetricChange(metric.id, "outcome", e.target.value)}
                            placeholder="e.g., increased engagement"
                            className="glass border-glass-border focus:border-neon-green"
                          />
                          <Button onClick={() => handleRemoveMetric(metric.id)} variant="ghost" size="icon" className="glass hover:glass-strong text-destructive flex-shrink-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <Label className="text-white">Skills Used</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills?.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-neon-purple/30 text-neon-purple cursor-pointer hover:bg-neon-purple/10" onClick={() => handleRemoveSkill(skill)}>
                      {skill}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Click to add:</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SKILLS.filter((skill) => !formData.skills?.includes(skill)).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-glass-border text-muted-foreground cursor-pointer hover:border-neon-purple hover:text-neon-purple"
                        onClick={() => handleAddSkill(skill)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
                <Button variant="outline" onClick={handleCancel} className="glass hover:glass-strong">
                  Cancel
                </Button>
                <Button onClick={handleSaveExperience} className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white hover:scale-105 transition-all">
                  <Check className="h-4 w-4 mr-2" />
                  Save Experience
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
