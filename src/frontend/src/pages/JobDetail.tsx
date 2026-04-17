import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPostedAt,
  getApplyMethodValue,
  getSalaryText,
  isITCategory,
  useGetJob,
} from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";

// ─── Detail skeleton ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div
      className="card-elevated p-6 sm:p-8 space-y-4"
      data-ocid="job_detail.loading_state"
    >
      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="w-16 h-6 rounded-full shrink-0" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Separator />
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-5 w-1/4" />
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JobDetail() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const { data: job, isLoading, isError } = useGetJob(jobId);
  const [saved, setSaved] = useState(false);

  const applyMethod = job ? getApplyMethodValue(job.applyMethod) : null;
  const salary = job ? getSalaryText(job.salary) : null;
  const isIT = job ? isITCategory(job.category) : false;
  const requirements = job ? job.requirements.split("\n").filter(Boolean) : [];

  return (
    <Layout>
      <div className="py-8 max-w-3xl" data-ocid="job_detail.page">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-ocid="job_detail.back_link"
        >
          <ArrowLeft size={15} /> Back to Jobs
        </Link>

        {/* Loading skeleton */}
        {isLoading && <DetailSkeleton />}

        {/* Error state */}
        {isError && (
          <div
            className="card-elevated p-8 text-center"
            data-ocid="job_detail.error_state"
          >
            <AlertCircle size={36} className="mx-auto mb-3 text-destructive" />
            <p className="text-foreground font-medium mb-1">
              Failed to load job
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Please check your connection and try again.
            </p>
            <Link to="/jobs">
              <Button variant="outline">← Back to Jobs</Button>
            </Link>
          </div>
        )}

        {/* Not found */}
        {!isLoading && !isError && !job && (
          <div
            className="card-elevated p-8 text-center"
            data-ocid="job_detail.error_state"
          >
            <Briefcase size={40} className="mx-auto mb-3 text-amber-400" />
            <p className="text-foreground font-medium mb-1">Job not found</p>
            <p className="text-muted-foreground text-sm mb-4">
              This listing may have been removed.
            </p>
            <Link to="/jobs">
              <Button variant="outline">← Browse Jobs</Button>
            </Link>
          </div>
        )}

        {/* Job detail */}
        {!isLoading && !isError && job && (
          <div className="card-royal p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <Briefcase
                  size={24}
                  className="text-amber-600 dark:text-amber-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
                  {job.title}
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Building2 size={14} />
                  {job.company}
                </p>
              </div>
              <span
                className={`shrink-0 ${
                  isIT
                    ? "badge-jobs"
                    : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                }`}
              >
                {isIT ? "IT" : "Non-IT"}
              </span>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {job.location}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5">
                  <DollarSign size={14} />
                  {salary}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                Posted {formatPostedAt(job.postedAt)}
              </span>
            </div>

            <Separator className="mb-6" />

            {/* Description */}
            <h2 className="font-display font-semibold text-foreground mb-3">
              About the Role
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
              {job.description}
            </p>

            {/* Requirements */}
            {requirements.length > 0 && (
              <>
                <h2 className="font-display font-semibold text-foreground mb-3">
                  Requirements
                </h2>
                <ul className="space-y-2 mb-6">
                  {requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Apply section */}
            <div className="bg-muted/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                How to apply
              </p>
              {applyMethod?.type === "url" ? (
                <div className="flex items-center gap-2 text-sm text-foreground break-all">
                  <ExternalLink size={14} className="text-amber-500 shrink-0" />
                  <a
                    href={applyMethod.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {applyMethod.value}
                  </a>
                </div>
              ) : applyMethod?.type === "email" ? (
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Mail size={14} className="text-amber-500 shrink-0" />
                  <a
                    href={`mailto:${applyMethod.value}`}
                    className="text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {applyMethod.value}
                  </a>
                </div>
              ) : null}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              {applyMethod?.type === "url" && (
                <a
                  href={applyMethod.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="job_detail.apply_button"
                >
                  <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                    Apply Now <ExternalLink size={14} />
                  </Button>
                </a>
              )}
              {applyMethod?.type === "email" && (
                <a
                  href={`mailto:${applyMethod.value}`}
                  data-ocid="job_detail.apply_button"
                >
                  <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                    Apply via Email <Mail size={14} />
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                className={`gap-2 transition-colors ${saved ? "border-amber-500 text-amber-600 dark:text-amber-400" : ""}`}
                onClick={() => setSaved((s) => !s)}
                aria-pressed={saved}
                data-ocid="job_detail.save_button"
              >
                <Bookmark
                  size={15}
                  className={saved ? "fill-amber-500 text-amber-500" : ""}
                />
                {saved ? "Saved" : "Save Job"}
              </Button>
            </div>
          </div>
        )}

        {/* Loading indicator for slow connections */}
        {isLoading && (
          <div className="flex items-center justify-center mt-4 gap-2 text-muted-foreground text-sm">
            <Loader2 size={14} className="animate-spin" />
            Loading job details…
          </div>
        )}
      </div>
    </Layout>
  );
}
