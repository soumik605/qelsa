import { User } from "./user";

export type Page = {
  id?: number;
  name: string;
  type?: string;
  industry?: string;
  website?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  can_manage: boolean;
  owner?: User;
};
