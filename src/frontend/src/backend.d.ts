import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    bio: string;
    principal: Principal;
    contactInfo: string;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
}
export interface UpsertProfileRequest {
    bio: string;
    contactInfo: string;
    name: string;
    role: UserRole;
}
export type Timestamp = bigint;
export type ApplyMethod = {
    __kind__: "url";
    url: string;
} | {
    __kind__: "email";
    email: string;
};
export interface JobFilter {
    category?: JobCategory;
    keyword?: string;
    location?: string;
}
export type JobId = bigint;
export interface CreateJobRequest {
    title: string;
    salary?: string;
    applyMethod: ApplyMethod;
    description: string;
    company: string;
    category: JobCategory;
    requirements: string;
    location: string;
}
export interface ProductFilter {
    category?: string;
    keyword?: string;
}
export interface UpdateJobRequest {
    id: JobId;
    title: string;
    salary?: string;
    applyMethod: ApplyMethod;
    description: string;
    company: string;
    category: JobCategory;
    requirements: string;
    location: string;
}
export interface CreateProductRequest {
    title: string;
    imageUrls: Array<string>;
    sellerContact: string;
    description: string;
    sellerName: string;
    category: string;
    price: number;
}
export interface Job {
    id: JobId;
    title: string;
    postedAt: Timestamp;
    salary?: string;
    applyMethod: ApplyMethod;
    description: string;
    company: string;
    category: JobCategory;
    requirements: string;
    posterPrincipal: Principal;
    location: string;
}
export type ProductId = bigint;
export interface UpdateProductRequest {
    id: ProductId;
    title: string;
    imageUrls: Array<string>;
    sellerContact: string;
    description: string;
    sellerName: string;
    category: string;
    price: number;
}
export interface Product {
    id: ProductId;
    title: string;
    sellerPrincipal: Principal;
    imageUrls: Array<string>;
    listedAt: Timestamp;
    sellerContact: string;
    description: string;
    sellerName: string;
    category: string;
    price: number;
}
export enum JobCategory {
    IT = "IT",
    NonIT = "NonIT"
}
export enum UserRole {
    seller = "seller",
    employer = "employer",
    jobSeeker = "jobSeeker"
}
export interface backendInterface {
    createJob(req: CreateJobRequest): Promise<Job>;
    createProduct(req: CreateProductRequest): Promise<Product>;
    deleteJob(id: JobId): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getJob(id: JobId): Promise<Job | null>;
    getMyProfile(): Promise<UserProfile | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProfile(principal: Principal): Promise<UserProfile | null>;
    initSeed(): Promise<void>;
    listJobs(filter: JobFilter): Promise<Array<Job>>;
    listProducts(filter: ProductFilter): Promise<Array<Product>>;
    updateJob(req: UpdateJobRequest): Promise<boolean>;
    updateProduct(req: UpdateProductRequest): Promise<boolean>;
    upsertProfile(req: UpsertProfileRequest): Promise<UserProfile>;
}
