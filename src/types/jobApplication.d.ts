import { Job } from "./job";
import { User } from "./user";

export type JobApplication = {
  id: number;
  job: Job;
  user: User;
  status: "applied" | "sorted" | "rejected" | "hold" | "cancelled";
  appliedAt: string;
  updatedAt: string;
  applied_at: Date;
  withdrawn_at?: Date | null;
  jobApplicationLogs: JobApplicationLog[];
  applied_days_ago?: number;
};

export type JobApplicationLog = {
  id: number;
  job: Job;
  job_application: JobApplication;
  created_by: User;
  action_type: "status_changed";
  old_status: "applied" | "sorted" | "rejected" | "hold" | "cancelled";
  new_status: "applied" | "sorted" | "rejected" | "hold" | "cancelled";
  createdAt: string;
};
