import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Backend-native types (from Motoko) ─────────────────────────────────────

export type BackendJobCategory = { IT: null } | { NonIT: null };
export type BackendApplyMethod = { url: string } | { email: string };

export interface BackendJob {
  id: string;
  title: string;
  company: string;
  category: BackendJobCategory;
  location: string;
  salary: [string] | [];
  description: string;
  requirements: string;
  postedAt: bigint;
  applyMethod: BackendApplyMethod;
  posterPrincipal: { toText: () => string };
}

export interface BackendJobFilter {
  category: [BackendJobCategory] | [];
  location: [string] | [];
  keyword: [string] | [];
}

export interface BackendCreateJobRequest {
  title: string;
  company: string;
  category: BackendJobCategory;
  location: string;
  salary: [string] | [];
  description: string;
  requirements: string;
  applyMethod: BackendApplyMethod;
}

export interface BackendProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  imageUrls: string[];
  sellerName: string;
  sellerContact: string;
  listedAt: bigint;
  sellerPrincipal: { toText: () => string };
}

export interface BackendProductFilter {
  category: [string] | [];
  keyword: [string] | [];
}

export interface BackendCreateProductRequest {
  title: string;
  category: string;
  price: number;
  description: string;
  imageUrls: string[];
  sellerName: string;
  sellerContact: string;
}

// ─── Actor interface ─────────────────────────────────────────────────────────

interface ActorInterface {
  listJobs: (filter: BackendJobFilter) => Promise<BackendJob[]>;
  getJob: (id: string) => Promise<[BackendJob] | []>;
  createJob: (req: BackendCreateJobRequest) => Promise<BackendJob>;
  listProducts: (filter: BackendProductFilter) => Promise<BackendProduct[]>;
  getProduct: (id: string) => Promise<[BackendProduct] | []>;
  createProduct: (req: BackendCreateProductRequest) => Promise<BackendProduct>;
  initSeed: () => Promise<void>;
  getMyProfile: () => Promise<[BackendUserProfile] | []>;
  upsertProfile: (
    req: BackendUpsertProfileRequest,
  ) => Promise<BackendUserProfile>;
}

export type BackendUserRole =
  | { jobSeeker: null }
  | { employer: null }
  | { seller: null };

export interface BackendUserProfile {
  principal: { toText: () => string };
  name: string;
  role: BackendUserRole;
  contactInfo: string;
  bio: string;
  createdAt: bigint;
}

export interface BackendUpsertProfileRequest {
  name: string;
  role: BackendUserRole;
  contactInfo: string;
  bio: string;
}

// ─── Role helpers ─────────────────────────────────────────────────────────────

export type RoleKey = "jobSeeker" | "employer" | "seller";

export function roleToBackend(role: RoleKey): BackendUserRole {
  if (role === "employer") return { employer: null };
  if (role === "seller") return { seller: null };
  return { jobSeeker: null };
}

export function backendToRole(role: BackendUserRole): RoleKey {
  if ("employer" in role) return "employer";
  if ("seller" in role) return "seller";
  return "jobSeeker";
}

export const ROLE_LABELS: Record<RoleKey, string> = {
  jobSeeker: "Job Seeker",
  employer: "Employer / Recruiter",
  seller: "Product Seller",
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useTypedActor() {
  const { actor, isFetching } = useActor(createActor);
  return { actor: actor as unknown as ActorInterface | null, isFetching };
}

// Jobs

export function useListJobs(filter: BackendJobFilter) {
  const { actor, isFetching } = useTypedActor();
  return useQuery<BackendJob[]>({
    queryKey: ["jobs", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetJob(id: string) {
  const { actor, isFetching } = useTypedActor();
  return useQuery<BackendJob | null>({
    queryKey: ["job", id],
    queryFn: async (): Promise<BackendJob | null> => {
      if (!actor) return null;
      const result = await actor.getJob(id);
      return result.length > 0 ? (result[0] as BackendJob) : null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 60_000,
  });
}

export function useCreateJob() {
  const { actor } = useTypedActor();
  const queryClient = useQueryClient();
  return useMutation<BackendJob, Error, BackendCreateJobRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createJob(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

// Products

export function useListProducts(filter: BackendProductFilter) {
  const { actor, isFetching } = useTypedActor();
  return useQuery<BackendProduct[]>({
    queryKey: ["products", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetProduct(id: string) {
  const { actor, isFetching } = useTypedActor();
  return useQuery<BackendProduct | null>({
    queryKey: ["product", id],
    queryFn: async (): Promise<BackendProduct | null> => {
      if (!actor) return null;
      const result = await actor.getProduct(id);
      return result.length > 0 ? (result[0] as BackendProduct) : null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 60_000,
  });
}

export function useCreateProduct() {
  const { actor } = useTypedActor();
  const queryClient = useQueryClient();
  return useMutation<BackendProduct, Error, BackendCreateProductRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Profile

export function useMyProfile() {
  const { actor, isFetching } = useTypedActor();
  return useQuery<BackendUserProfile | null>({
    queryKey: ["myProfile"],
    queryFn: async (): Promise<BackendUserProfile | null> => {
      if (!actor) return null;
      const result = await actor.getMyProfile();
      return result.length > 0 ? (result[0] as BackendUserProfile) : null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useUpsertProfile() {
  const { actor } = useTypedActor();
  const queryClient = useQueryClient();
  return useMutation<BackendUserProfile, Error, BackendUpsertProfileRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.upsertProfile(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function isITCategory(cat: BackendJobCategory): boolean {
  return "IT" in cat;
}

export function getApplyMethodValue(method: BackendApplyMethod): {
  type: "url" | "email";
  value: string;
} {
  if ("url" in method) return { type: "url", value: method.url };
  return { type: "email", value: method.email };
}

export function getSalaryText(salary: [string] | []): string | null {
  return salary.length > 0 ? (salary[0] as string) : null;
}

export function formatPostedAt(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  const diff = Date.now() - ms;
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
