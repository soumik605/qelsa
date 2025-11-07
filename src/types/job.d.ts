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
};
