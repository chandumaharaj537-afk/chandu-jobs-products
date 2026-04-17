import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type BackendJob,
  type BackendJobFilter,
  formatPostedAt,
  getSalaryText,
  isITCategory,
  useListJobs,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Clock,
  DollarSign,
  IndianRupee,
  Loader2,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type TabFilter = "all" | "it" | "nonit";

// "Any" = no salary cap; numbers = max salary in lakhs/year
type SalaryMax = "any" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12;

const SALARY_OPTIONS: { value: SalaryMax; label: string }[] = [
  { value: "any", label: "Any Salary" },
  { value: 1, label: "Up to ₹1 L/yr" },
  { value: 2, label: "Up to ₹2 L/yr" },
  { value: 3, label: "Up to ₹3 L/yr" },
  { value: 4, label: "Up to ₹4 L/yr" },
  { value: 5, label: "Up to ₹5 L/yr" },
  { value: 6, label: "Up to ₹6 L/yr" },
  { value: 7, label: "Up to ₹7 L/yr" },
  { value: 8, label: "Up to ₹8 L/yr" },
  { value: 9, label: "Up to ₹9 L/yr" },
  { value: 10, label: "Up to ₹10 L/yr" },
  { value: 12, label: "Up to ₹12 L/yr" },
];

const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Chennai",
  "Delhi",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Coimbatore",
  "Kochi",
  "Chandigarh",
  "Noida",
  "Gurugram",
  "Mysuru",
  "All India",
] as const;

// ─── Salary parser ─────────────────────────────────────────────────────────────
// Returns salary in lakhs/year, or null if unparseable
function parseSalaryLakhs(raw: string | null): number | null {
  if (!raw) return null;
  const s = raw.toLowerCase().replace(/,/g, "");

  // e.g. "12 lpa", "8 lpa", "10 lakhs", "12l"
  const lpaMatch = s.match(/(\d+(?:\.\d+)?)\s*(?:l(?:pa|akhs?|akh)?|lpa)/);
  if (lpaMatch) return Number.parseFloat(lpaMatch[1]);

  // e.g. "10,00,000" or "1200000" — raw rupees
  const rupeeMatch = s.match(/(\d+(?:\.\d+)?)/);
  if (rupeeMatch) {
    const val = Number.parseFloat(rupeeMatch[1]);
    // If value looks like full rupees (>= 10000), convert to lakhs
    if (val >= 10000) return val / 100000;
    return val; // assume already in lakhs
  }

  return null;
}

// ─── Job card ─────────────────────────────────────────────────────────────────
function JobCard({ job, index }: { job: BackendJob; index: number }) {
  const salary = getSalaryText(job.salary);
  const isIT = isITCategory(job.category);

  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      data-ocid={`jobs.item.${index + 1}`}
    >
      <article className="card-elevated p-5 hover:border-amber-500/40 hover-royal transition-smooth cursor-pointer h-full flex flex-col group">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <Briefcase
              size={18}
              className="text-amber-600 dark:text-amber-400"
            />
          </div>
          <span
            className={
              isIT
                ? "badge-jobs"
                : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            }
          >
            {isIT ? "IT" : "Non-IT"}
          </span>
        </div>

        <h2 className="font-display font-semibold text-foreground leading-tight mb-1 group-hover:text-amber-500 transition-colors">
          {job.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{job.company}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3 mt-auto">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {job.location}
          </span>
          {salary && (
            <span className="flex items-center gap-1">
              <DollarSign size={11} />
              {salary}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {formatPostedAt(job.postedAt)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {job.description}
        </p>

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{`${job.requirements.split("\n")[0]?.slice(0, 40)}…`}</span>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            View Job →
          </span>
        </div>
      </article>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function JobCardSkeleton() {
  return (
    <div className="card-elevated p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="w-14 h-5 rounded-full" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-8 w-full mt-2" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JobsListing() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [salaryMax, setSalaryMax] = useState<SalaryMax>("any");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [debouncedLocation, setDebouncedLocation] = useState("");

  const [kwTimer, setKwTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [locTimer, setLocTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleKeyword = (val: string) => {
    setKeyword(val);
    if (kwTimer) clearTimeout(kwTimer);
    setKwTimer(setTimeout(() => setDebouncedKeyword(val), 400));
  };

  const handleLocation = (val: string) => {
    setLocation(val);
    if (locTimer) clearTimeout(locTimer);
    setLocTimer(setTimeout(() => setDebouncedLocation(val), 400));
  };

  const selectCity = (city: string) => {
    const isSame = location.trim().toLowerCase() === city.toLowerCase();
    if (isSame) {
      setLocation("");
      setDebouncedLocation("");
    } else {
      setLocation(city);
      setDebouncedLocation(city);
    }
  };

  const filter = useMemo(
    (): BackendJobFilter => ({
      keyword: debouncedKeyword.trim() ? [debouncedKeyword.trim()] : [],
      location: debouncedLocation.trim() ? [debouncedLocation.trim()] : [],
      category:
        activeTab === "it"
          ? [{ IT: null }]
          : activeTab === "nonit"
            ? [{ NonIT: null }]
            : [],
    }),
    [debouncedKeyword, debouncedLocation, activeTab],
  );

  const { data: jobs, isLoading, isError } = useListJobs(filter);

  // Client-side salary filter
  const visibleJobs = useMemo(() => {
    const all = jobs ?? [];
    if (salaryMax === "any") return all;
    return all.filter((job) => {
      const salaryText = getSalaryText(job.salary);
      const lakhs = parseSalaryLakhs(salaryText);
      // If unparseable, always show the job
      if (lakhs === null) return true;
      return lakhs <= salaryMax;
    });
  }, [jobs, salaryMax]);

  const hasFilters =
    keyword || location || activeTab !== "all" || salaryMax !== "any";

  const clearAll = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setLocation("");
    setDebouncedLocation("");
    setActiveTab("all");
    setSalaryMax("any");
  };

  const tabs: { id: TabFilter; label: string }[] = [
    { id: "all", label: "All Jobs" },
    { id: "it", label: "IT Jobs" },
    { id: "nonit", label: "Non-IT Jobs" },
  ];

  return (
    <Layout>
      <div className="py-8" data-ocid="jobs.page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="text-amber-500" size={28} />
              Job Listings
            </h1>
            <p className="text-muted-foreground mt-1">
              IT &amp; Non-IT opportunities across India
            </p>
          </div>
          <Link to="/jobs/post" data-ocid="jobs.post_job_button">
            <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
              <Plus size={16} /> Post a Job
            </Button>
          </Link>
        </div>

        {/* Search + Location row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4"
          data-ocid="jobs.search_bar"
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search jobs, companies, skills…"
              className="pl-9"
              value={keyword}
              onChange={(e) => handleKeyword(e.target.value)}
              data-ocid="jobs.search_input"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setDebouncedKeyword("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Location (e.g. Mumbai)"
              className="pl-9"
              value={location}
              onChange={(e) => handleLocation(e.target.value)}
              data-ocid="jobs.location_input"
            />
            {location && (
              <button
                type="button"
                onClick={() => {
                  setLocation("");
                  setDebouncedLocation("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear location"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* City quick-select — scrollable row */}
        <div className="mb-4" data-ocid="jobs.city_filters">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={13} className="text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Cities
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => {
              const isActive =
                location.trim().toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city)}
                  aria-pressed={isActive}
                  data-ocid={`jobs.city_filter.${city.toLowerCase().replace(/\s+/g, "_")}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-smooth whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? "border-amber-500 bg-amber-500/15 text-amber-400 shadow-[0_0_0_1px_oklch(var(--primary)/0.4),0_2px_10px_oklch(var(--primary)/0.15)]"
                      : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5"
                  }`}
                >
                  {isActive && <MapPin size={10} className="text-amber-400" />}
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Salary filter + Category tabs row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Salary dropdown */}
          <div
            className="relative flex items-center gap-2"
            data-ocid="jobs.salary_filter"
          >
            <IndianRupee size={14} className="text-amber-500 shrink-0" />
            <div className="relative">
              <select
                value={salaryMax}
                onChange={(e) =>
                  setSalaryMax(
                    e.target.value === "any"
                      ? "any"
                      : (Number(e.target.value) as SalaryMax),
                  )
                }
                aria-label="Filter by salary"
                data-ocid="jobs.salary_select"
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-sm font-medium border transition-smooth cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                  salaryMax !== "any"
                    ? "border-amber-500 bg-amber-500/15 text-amber-400"
                    : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-amber-400"
                }`}
              >
                {SALARY_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-card text-foreground"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <SlidersHorizontal
                size={12}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-amber-500/40"
                }`}
                data-ocid={`jobs.filter.${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground flex items-center gap-1 whitespace-nowrap transition-smooth"
                data-ocid="jobs.clear_filters_button"
              >
                <X size={12} /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="jobs.loading_state"
          >
            {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
              <JobCardSkeleton key={k} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div
            className="text-center py-16 card-elevated"
            data-ocid="jobs.error_state"
          >
            <Loader2
              size={32}
              className="mx-auto mb-3 text-muted-foreground animate-spin"
            />
            <p className="text-muted-foreground">
              Failed to load jobs. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && visibleJobs.length === 0 && (
          <div
            className="text-center py-16 card-elevated"
            data-ocid="jobs.empty_state"
          >
            <Briefcase size={40} className="mx-auto mb-3 text-amber-400" />
            <h3 className="font-display font-semibold text-foreground mb-1">
              No jobs found
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Try adjusting your filters or be the first to post in this
              category.
            </p>
            <Link to="/jobs/post">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white gap-2">
                <Plus size={15} /> Post a Job
              </Button>
            </Link>
          </div>
        )}

        {/* Job grid */}
        {!isLoading && !isError && visibleJobs.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {visibleJobs.length} {visibleJobs.length === 1 ? "job" : "jobs"}{" "}
              found
              {salaryMax !== "any" && (
                <span className="ml-1 text-amber-500 font-medium">
                  · up to ₹{salaryMax}L/yr
                </span>
              )}
            </p>
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              data-ocid="jobs.list"
            >
              {visibleJobs.map((job, idx) => (
                <JobCard key={job.id} job={job} index={idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
