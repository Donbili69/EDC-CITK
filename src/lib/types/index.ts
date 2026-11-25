// Shared domain types. These mirror the backend entities in the project
// blueprint (Section 4) deliberately, so that swapping lib/api's mock
// implementation for real HTTP calls later requires no component changes.
// Do not duplicate these shapes ad hoc inside a component file.

export type EventStatus = "upcoming" | "ongoing" | "past";

export type AcademicYearId = string;

export interface AcademicYear {
  id: AcademicYearId;
  startYear: number;
  isCurrent: boolean;
}

export type TeamTier =
  | "faculty-mentor"
  | "advisor"
  | "chief"
  | "convener"
  | "incharge"
  | "coordinator";

export interface Module {
  slug: string;
  name: string;
  description?: string;
}

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
  startTime?: string;
  endTime?: string;
  videos?: { title: string; url: string }[];
  results?: { position: string; team: string; project?: string }[];
}

export interface Initiative {
  slug: string;
  title: string;
  description: string;
  objective: string;
  activities: string[];
  impact: string;
  relatedEventSlugs: string[];
  academicYear: AcademicYearId;
  gallery: string[];
  relatedResourceIds: string[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  tier: TeamTier;
  module?: string;
  moduleSlug?: string;
  department?: string;
  year?: string;
  academicYear: AcademicYearId;
  photo: string;
  linkedin?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

export type ResourceCategory = "documents" | "guides" | "templates" | "other";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  fileUrl: string;
  fileType: "pdf" | "docx" | "xlsx" | "pptx" | "other";
  sizeKb?: number;
  publishedAt: string;
  academicYear?: AcademicYearId;
  tags: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
  readingMinutes: number;
}

export interface GalleryMedia {
  id: string;
  type: "photo" | "video";
  src: string;
  alt: string;
  caption?: string;
  eventSlug: string;
  academicYear: AcademicYearId;
}

export interface GalleryYearSummary {
  year: AcademicYearId;
  eventCount: number;
  mediaCount: number;
}

export interface EcosystemTopic {
  slug: string;
  title: string;
  stage: number;
  summary: string;
  body: string[];
  nodeLabel: string;
}

export interface EcosystemNode {
  id: string;
  label: string;
  order: number;
  summary: string;
  href: string;
}

export interface Announcement {
  id: string;
  message: string;
  href?: string;
  startsAt: string;
  endsAt: string;
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
  | "institutional"
  | "team-student-achievements";

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

export interface JoinApplicationPayload {
  name: string;
  email: string;
  phone?: string;
  department: string;
  year: string;
  whyJoin: string;
}

export interface CollaborationRequestPayload {
  organization: string;
  contactName: string;
  email: string;
  collaborationType: string;
  message: string;
}

export interface WorkshopRequestPayload {
  institution: string;
  contactName: string;
  email: string;
  topic: string;
  proposedDate?: string;
  audienceSize?: number;
  message: string;
}

export interface MentorRequestPayload {
  name: string;
  email: string;
  expertise: string;
  organization?: string;
  linkedin?: string;
  availability: string;
  message: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormSubmission =
  | { kind: "join"; payload: JoinApplicationPayload }
  | { kind: "collaborate"; payload: CollaborationRequestPayload }
  | { kind: "invite"; payload: WorkshopRequestPayload }
  | { kind: "mentor"; payload: MentorRequestPayload }
  | { kind: "contact"; payload: ContactPayload };
