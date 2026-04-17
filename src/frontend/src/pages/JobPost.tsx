import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  type BackendApplyMethod,
  type BackendJobCategory,
  useCreateJob,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Briefcase, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ApplyMethodType = "url" | "email";

interface FormState {
  title: string;
  company: string;
  category: BackendJobCategory | null;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  applyMethodType: ApplyMethodType;
  applyMethodValue: string;
}

const INITIAL: FormState = {
  title: "",
  company: "",
  category: null,
  location: "",
  salary: "",
  description: "",
  requirements: "",
  applyMethodType: "url",
  applyMethodValue: "",
};

// ─── Auth guard ───────────────────────────────────────────────────────────────
function AuthGate({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="py-16 text-center max-w-md mx-auto"
      data-ocid="job_post.auth_gate"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
        <Lock size={28} className="text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Login Required
      </h2>
      <p className="text-muted-foreground mb-6">
        You need to be logged in to post a job listing. Sign in with Internet
        Identity to continue.
      </p>
      <Button
        className="bg-amber-500 hover:bg-amber-600 text-white"
        onClick={onLogin}
        data-ocid="job_post.login_button"
      >
        Sign In to Post
      </Button>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="py-16 text-center max-w-md mx-auto"
      data-ocid="job_post.success_state"
    >
      <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
        <Briefcase size={28} className="text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Job Posted!
      </h2>
      <p className="text-muted-foreground mb-6">
        Your job listing is now live and visible to candidates.
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/jobs" data-ocid="job_post.view_jobs_link">
          <Button>View All Jobs</Button>
        </Link>
        <Button
          variant="outline"
          onClick={onReset}
          data-ocid="job_post.post_another_button"
        >
          Post Another
        </Button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JobPost() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const createJob = useCreateJob();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) errs.title = "Job title is required";
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.applyMethodValue.trim())
      errs.applyMethodValue =
        form.applyMethodType === "url"
          ? "Application URL is required"
          : "Email address is required";
    else if (
      form.applyMethodType === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.applyMethodValue)
    )
      errs.applyMethodValue = "Enter a valid email address";
    else if (
      form.applyMethodType === "url" &&
      !/^https?:\/\//.test(form.applyMethodValue)
    )
      errs.applyMethodValue = "URL must start with http:// or https://";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !form.category) return;

    const applyMethod: BackendApplyMethod =
      form.applyMethodType === "url"
        ? { url: form.applyMethodValue }
        : { email: form.applyMethodValue };

    createJob.mutate(
      {
        title: form.title.trim(),
        company: form.company.trim(),
        category: form.category,
        location: form.location.trim(),
        salary: form.salary.trim() ? [form.salary.trim()] : [],
        description: form.description.trim(),
        requirements: form.requirements.trim(),
        applyMethod,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Job posted successfully!");
        },
        onError: (err) => {
          toast.error(`Failed to post job: ${err.message}`);
        },
      },
    );
  };

  if (authLoading) {
    return (
      <Layout>
        <div
          className="py-16 flex items-center justify-center gap-2 text-muted-foreground"
          data-ocid="job_post.loading_state"
        >
          <Loader2 size={18} className="animate-spin" />
          <span>Checking authentication…</span>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <AuthGate onLogin={login} />
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <SuccessState
          onReset={() => {
            setForm(INITIAL);
            setSubmitted(false);
          }}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 max-w-2xl" data-ocid="job_post.page">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          data-ocid="job_post.back_link"
        >
          <ArrowLeft size={15} /> Back to Jobs
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="text-amber-500" size={26} />
            Post a Job
          </h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details to list your job opening
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-elevated p-6 space-y-6"
          noValidate
        >
          {/* Title + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Senior React Developer"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                data-ocid="job_post.title_input"
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p
                  className="text-xs text-destructive flex items-center gap-1"
                  data-ocid="job_post.title_field_error"
                >
                  <AlertCircle size={11} /> {errors.title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                placeholder="e.g. TechCorp India"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                data-ocid="job_post.company_input"
                aria-invalid={!!errors.company}
              />
              {errors.company && (
                <p
                  className="text-xs text-destructive flex items-center gap-1"
                  data-ocid="job_post.company_field_error"
                >
                  <AlertCircle size={11} /> {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Location + Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g. Bangalore, KA"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                data-ocid="job_post.location_input"
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p
                  className="text-xs text-destructive flex items-center gap-1"
                  data-ocid="job_post.location_field_error"
                >
                  <AlertCircle size={11} /> {errors.location}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range (optional)</Label>
              <Input
                id="salary"
                placeholder="e.g. ₹10–15 LPA"
                value={form.salary}
                onChange={(e) => set("salary", e.target.value)}
                data-ocid="job_post.salary_input"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              onValueChange={(val) =>
                set("category", val === "IT" ? { IT: null } : { NonIT: null })
              }
            >
              <SelectTrigger
                data-ocid="job_post.category_select"
                aria-invalid={!!errors.category}
              >
                <SelectValue placeholder="Select IT or Non-IT" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">IT (Technology)</SelectItem>
                <SelectItem value="NonIT">Non-IT (General)</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p
                className="text-xs text-destructive flex items-center gap-1"
                data-ocid="job_post.category_field_error"
              >
                <AlertCircle size={11} /> {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Job Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting…"
              rows={5}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              data-ocid="job_post.description_textarea"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p
                className="text-xs text-destructive flex items-center gap-1"
                data-ocid="job_post.description_field_error"
              >
                <AlertCircle size={11} /> {errors.description}
              </p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">
              Requirements{" "}
              <span className="text-muted-foreground font-normal">
                (one per line)
              </span>
            </Label>
            <Textarea
              id="requirements"
              placeholder={
                "5+ years of React experience\nProficiency in TypeScript\nExperience with AWS"
              }
              rows={4}
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              data-ocid="job_post.requirements_textarea"
            />
          </div>

          {/* Apply method */}
          <div className="space-y-3">
            <Label>
              Application Method <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-4">
              {(["url", "email"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="applyMethodType"
                    value={type}
                    checked={form.applyMethodType === type}
                    onChange={() => set("applyMethodType", type)}
                    className="accent-amber-500"
                    data-ocid={`job_post.apply_method_${type}`}
                  />
                  <span className="text-sm text-foreground capitalize">
                    {type === "url" ? "Website / URL" : "Email Address"}
                  </span>
                </label>
              ))}
            </div>
            <Input
              type={form.applyMethodType === "email" ? "email" : "url"}
              placeholder={
                form.applyMethodType === "url"
                  ? "https://yourcompany.com/apply"
                  : "hr@yourcompany.com"
              }
              value={form.applyMethodValue}
              onChange={(e) => set("applyMethodValue", e.target.value)}
              data-ocid="job_post.apply_value_input"
              aria-invalid={!!errors.applyMethodValue}
            />
            {errors.applyMethodValue && (
              <p
                className="text-xs text-destructive flex items-center gap-1"
                data-ocid="job_post.apply_field_error"
              >
                <AlertCircle size={11} /> {errors.applyMethodValue}
              </p>
            )}
          </div>

          {/* Submit row */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Link to="/jobs">
              <Button
                type="button"
                variant="outline"
                data-ocid="job_post.cancel_button"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={createJob.isPending}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
              data-ocid="job_post.submit_button"
            >
              {createJob.isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Posting…
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
