import React from 'react'

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
  id?: string
  created_at?: Date
  name: string
  description: string
  verified: boolean
  size: string
  website: string
  admin?: string
  logo_url: string
  region: string
  country: string
}

interface Developer {
  id?: string
  created_at?: Date
  public: boolean
  company?: string
  title: string
  description: string
  hourly_rate: string
  experience: string
  skills: string[]
  other_languages: string[]
  english: string
  country: string
  region: string
  asap: boolean
  cv: {
    url: string
    name: string
  }
  category: string
}

interface ExistingDeveloper extends Developer {
  id: string
  created_at: Date
  company: string
}

interface Job {
  id?: string
  created_at?: Date
  public: boolean
  company: string
  title: string
  skills: string[]
  rate: string
  hours: string
  scope: string
  description: string
  bids?: string[] | null
  category: string
  english: string
  asap: boolean
  other_languages: string[]
  experience: string
}

interface ExistingJob extends Job {
  id: string
  created_at: Date
}

type Selecter = {
  value: string
  label: string
}

interface PageProps {
  params: {
    slug: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

interface ApplyType {
  id?: number
  created_at?: Date
  developer: string
  provider: string
  rate: string
  job: string
  poster: string
}

interface ApplyTypeWithDev {
  id: number
  created_at?: Date
  developer: ExistingDeveloper
  provider: string
  rate: string
  job: string
  poster: string
}

type FormSubmit = React.FormEvent<HTMLFormElement>

type EventChange = React.ChangeEvent<HTMLInputElement>

export type {
  Company,
  User,
  Developer,
  Job,
  ExistingJob,
  Selecter,
  PageProps,
  FormSubmit,
  EventChange,
  ApplyType,
  ExistingDeveloper,
  ApplyTypeWithDev,
}
