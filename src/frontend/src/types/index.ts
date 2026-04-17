// ─── Enums ───────────────────────────────────────────────────────────────────

export type JobCategory =
  | "IT_Software"
  | "IT_Hardware"
  | "IT_DataScience"
  | "IT_Cybersecurity"
  | "IT_DevOps"
  | "NonIT_Finance"
  | "NonIT_Marketing"
  | "NonIT_Sales"
  | "NonIT_Operations"
  | "NonIT_Healthcare"
  | "NonIT_Education"
  | "NonIT_Legal"
  | "NonIT_Design"
  | "NonIT_Other";

export type JobType =
  | "FullTime"
  | "PartTime"
  | "Contract"
  | "Freelance"
  | "Internship";

export type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead" | "Executive";

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "HomeGarden"
  | "Sports"
  | "Books"
  | "Automotive"
  | "Toys"
  | "Health"
  | "Food"
  | "Other";

export type UserRole = "Applicant" | "Employer" | "Seller" | "Admin";

// ─── Core Types ───────────────────────────────────────────────────────────────

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  category: JobCategory;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  description: string;
  requirements: string[];
  tags: string[];
  postedBy: string;
  createdAt: bigint;
  updatedAt: bigint;
  isActive: boolean;
  applicationUrl?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: string;
  category: JobCategory;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  description: string;
  requirements: string;
  tags: string;
  applicationUrl: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  condition: "New" | "Used" | "Refurbished";
  imageUrls: string[];
  seller: string;
  sellerName: string;
  location: string;
  tags: string[];
  createdAt: bigint;
  updatedAt: bigint;
  isAvailable: boolean;
  contactEmail?: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: ProductCategory;
  condition: "New" | "Used" | "Refurbished";
  location: string;
  tags: string;
  contactEmail: string;
}

export interface UserProfile {
  principal: string;
  name: string;
  email: string;
  bio: string;
  role: UserRole;
  avatarUrl?: string;
  location?: string;
  website?: string;
  company?: string;
  skills: string[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface UserProfileFormData {
  name: string;
  email: string;
  bio: string;
  role: UserRole;
  location: string;
  website: string;
  company: string;
  skills: string;
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
  IT_Software: "Software Development",
  IT_Hardware: "Hardware / Networking",
  IT_DataScience: "Data Science & AI",
  IT_Cybersecurity: "Cybersecurity",
  IT_DevOps: "DevOps & Cloud",
  NonIT_Finance: "Finance & Accounting",
  NonIT_Marketing: "Marketing",
  NonIT_Sales: "Sales",
  NonIT_Operations: "Operations",
  NonIT_Healthcare: "Healthcare",
  NonIT_Education: "Education",
  NonIT_Legal: "Legal",
  NonIT_Design: "Design & Creative",
  NonIT_Other: "Other",
};

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  Electronics: "Electronics",
  Clothing: "Clothing & Fashion",
  HomeGarden: "Home & Garden",
  Sports: "Sports & Outdoors",
  Books: "Books & Media",
  Automotive: "Automotive",
  Toys: "Toys & Games",
  Health: "Health & Beauty",
  Food: "Food & Grocery",
  Other: "Other",
};

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  FullTime: "Full-time",
  PartTime: "Part-time",
  Contract: "Contract",
  Freelance: "Freelance",
  Internship: "Internship",
};

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  Entry: "Entry Level",
  Mid: "Mid Level",
  Senior: "Senior Level",
  Lead: "Lead / Manager",
  Executive: "Executive",
};
