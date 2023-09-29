interface User {
  id?: string; // UUID
  created_at?: string; // Timestamp with time zone
  first_name: string | null;
  last_name: string | null;
  email: string;
  company_name: string | null;
  company_id: string | null; // UUID
  verified: boolean | null;
  email_confirmed: boolean | null;
  type: string | null;
}

interface Company {
  id?: string;
  created_at?: string; // Timestamp with time zone
  name: string | null;
  description: string | null;
  verified: boolean | null;
  size: string | null;
  average_rate: string | null;
  founding_year: string | null;
  website: string | null;
  admin: string | null;
  team: string[] | null; // Array of UUIDs
  logo_url: string | null;
  region: string | null;
  country: string | null;
}

interface Developer {
  id?: number;
  created_at?: string;
  company: string | null;
  title: string | null;
  description: string | null;
  hourly_rate: number | null;
  experience: number | null;
  status: string | null;
  public: boolean | null;
  skills: string[] | null;
  other_languages: string[] | null;
  role: string | null;
  english: string | null;
  country: string | null;
  region: string | null;
  available: string | null;
  other_skills: string[] | null;
  cv: string | null;
}


export type { Company, User, Developer };
