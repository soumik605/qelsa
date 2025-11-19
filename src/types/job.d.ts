import { Page } from "./page";

export type Job = {
  id: number;
  external_id: string;
  description?: string | null;
  application_url?: string | null;
  experience_level?: string | null;
  has_remote: boolean;
  language?: string | null;
  location?: string | null;
  published_date?: string | null;
  salary_currency?: string | null;
  salary_max?: number | null;
  salary_min?: number | null;
  salary?: number | null;
  title: string;
  work_type?: string | null;
  experience?: number | null;
  screening_questions?: ScreeningQuestion[];

  // Company fields
  company_name?: string | null;
  company_logo?: string | null;
  company_twitter_handle?: string | null;
  company_website_url?: string | null;
  company_linkedin_url?: string | null;
  company_is_agency: boolean;
  company_github_url?: string | null;

  // JSON field
  other_info?: Record<string, any> | null;

  createdAt?: Date;
  updatedAt?: Date;

  page?: Page;
  is_bookmarked: boolean;
};

export interface ScreeningQuestion {
  id?: any;
  type: "multiple_choice" | "yes_no" | "scale" | "short_text" | "short-answer" | "coding" | "behavioral";
  title: string;
  required: boolean;
  is_knockout: boolean;
  weight: number;
  options?: string[];
  correct_answer_id?: string | number;
  min_value?: number;
  max_value?: number;
  knockout_condition?: "equals" | "less-than" | "greater-than" | "contains";
  knockout_value?: string | number;
  max_length?: number;
}
