// Shared domain types. These mirror the backend entities in the project
// blueprint (Section 4) deliberately, so that swapping lib/api's mock
// implementation for real HTTP calls later requires no component changes.
// Do not duplicate these shapes ad hoc inside a component file.

export type EventStatus = "upcoming" | "ongoing" | "past";

export interface EventSummary {
  slug: string;
  title: string;
  status: EventStatus;
  date: string; // ISO date
  venue: string;
  coverImage: string;
  category: string;
  academicYear: string;
}

export interface EventDetail extends EventSummary {
  description: string;
  organizers: string[];
  speakers: { name: string; role: string }[];
  schedule: { time: string; item: string }[];
  registrationUrl?: string;
  gallery: string[];
  report?: string;
  relatedEventSlugs: string[];
}

export interface Initiative {
  slug: string;
  title: string;
  description: string;
  objective: string;
  activities: string[];
  impact: string;
  relatedEventSlugs: string[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  module?: string;
  department?: string;
  year?: string;
  academicYear: string;
  photo: string;
  linkedin?: string;
}

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  department: string;
  edcRole: string;
  currentPosition: string;
  organization: string;
  linkedin?: string;
  message?: string;
}

export type AchievementCategory =
  | "competitions"
  | "recognition"
  | "innovation"
  | "entrepreneurship"
  | "collaborations"
  | "institutional";

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  description: string;
  date: string;
  academicYear: string;
}

export interface ImpactStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
}

export interface AboutContent {
  headline: string;
  intro: string;
  vision: string;
  mission: string;
  objectives: string[];
  whatWeDo: { title: string; description: string }[];
}
