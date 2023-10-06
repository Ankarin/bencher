interface User {
  id?: string // UUID
  created_at?: string // Timestamp with time zone
  first_name: string
  last_name: string
  email: string
  company_name: string
  company_id: string
  verified: boolean
  email_confirmed: boolean
  type: string
}

interface Company {
  id: string
  created_at: Date
  name: string
  description: string
  verified: boolean | null
  size: string
  average_rate: string | null
  founding_year: string
  website: string
  admin: string
  logo_url: string | null
  region: string
  country: string
}

interface Developer {
  id?: bigint
  created_at?: Date
  public?: boolean
  company: string // Assuming UUID is represented as a string
  title: string
  description?: string | null
  hourly_rate: string | null
  experience: string | null
  skills: string[] | null
  other_languages: string[] | null
  english: string
  country: string
  region: string
  asap: boolean
  cv: { url: string; name: string }
  category: string
}

export type { Company, User, Developer }
