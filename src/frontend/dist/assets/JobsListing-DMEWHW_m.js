import { r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-C8Ney5nB.js";
import { c as createLucideIcon, L as Layout, a as Briefcase, B as Button, b as Search, X } from "./Layout-CTMNymg8.js";
import { I as Input } from "./input-BoEjNKU7.js";
import { u as useListJobs, g as getSalaryText, L as LoaderCircle, i as isITCategory, f as formatPostedAt } from "./useQueries--sm0j3R0.js";
import { P as Plus } from "./plus-qMFQqghc.js";
import { M as MapPin } from "./map-pin-BpmHLB6O.js";
import { I as IndianRupee } from "./indian-rupee-u9ONvGX9.js";
import { D as DollarSign } from "./dollar-sign-B33WZ0Bp.js";
import { C as Clock } from "./clock-ia_H4yuT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SALARY_OPTIONS = [
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
  { value: 12, label: "Up to ₹12 L/yr" }
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
  "All India"
];
function parseSalaryLakhs(raw) {
  if (!raw) return null;
  const s = raw.toLowerCase().replace(/,/g, "");
  const lpaMatch = s.match(/(\d+(?:\.\d+)?)\s*(?:l(?:pa|akhs?|akh)?|lpa)/);
  if (lpaMatch) return Number.parseFloat(lpaMatch[1]);
  const rupeeMatch = s.match(/(\d+(?:\.\d+)?)/);
  if (rupeeMatch) {
    const val = Number.parseFloat(rupeeMatch[1]);
    if (val >= 1e4) return val / 1e5;
    return val;
  }
  return null;
}
function JobCard({ job, index }) {
  var _a;
  const salary = getSalaryText(job.salary);
  const isIT = isITCategory(job.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/jobs/$jobId",
      params: { jobId: job.id },
      "data-ocid": `jobs.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "card-elevated p-5 hover:border-amber-500/40 hover-royal transition-smooth cursor-pointer h-full flex flex-col group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Briefcase,
            {
              size: 18,
              className: "text-amber-600 dark:text-amber-400"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: isIT ? "badge-jobs" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
              children: isIT ? "IT" : "Non-IT"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground leading-tight mb-1 group-hover:text-amber-500 transition-colors", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: job.company }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
            job.location
          ] }),
          salary && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 11 }),
            salary
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
            formatPostedAt(job.postedAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-3", children: job.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 border-t border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: `${(_a = job.requirements.split("\n")[0]) == null ? void 0 : _a.slice(0, 40)}…` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-amber-600 dark:text-amber-400", children: "View Job →" })
        ] })
      ] })
    }
  );
}
function JobCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-5 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full mt-2" })
  ] });
}
function JobsListing() {
  const [keyword, setKeyword] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [salaryMax, setSalaryMax] = reactExports.useState("any");
  const [debouncedKeyword, setDebouncedKeyword] = reactExports.useState("");
  const [debouncedLocation, setDebouncedLocation] = reactExports.useState("");
  const [kwTimer, setKwTimer] = reactExports.useState(
    null
  );
  const [locTimer, setLocTimer] = reactExports.useState(null);
  const handleKeyword = (val) => {
    setKeyword(val);
    if (kwTimer) clearTimeout(kwTimer);
    setKwTimer(setTimeout(() => setDebouncedKeyword(val), 400));
  };
  const handleLocation = (val) => {
    setLocation(val);
    if (locTimer) clearTimeout(locTimer);
    setLocTimer(setTimeout(() => setDebouncedLocation(val), 400));
  };
  const selectCity = (city) => {
    const isSame = location.trim().toLowerCase() === city.toLowerCase();
    if (isSame) {
      setLocation("");
      setDebouncedLocation("");
    } else {
      setLocation(city);
      setDebouncedLocation(city);
    }
  };
  const filter = reactExports.useMemo(
    () => ({
      keyword: debouncedKeyword.trim() ? [debouncedKeyword.trim()] : [],
      location: debouncedLocation.trim() ? [debouncedLocation.trim()] : [],
      category: activeTab === "it" ? [{ IT: null }] : activeTab === "nonit" ? [{ NonIT: null }] : []
    }),
    [debouncedKeyword, debouncedLocation, activeTab]
  );
  const { data: jobs, isLoading, isError } = useListJobs(filter);
  const visibleJobs = reactExports.useMemo(() => {
    const all = jobs ?? [];
    if (salaryMax === "any") return all;
    return all.filter((job) => {
      const salaryText = getSalaryText(job.salary);
      const lakhs = parseSalaryLakhs(salaryText);
      if (lakhs === null) return true;
      return lakhs <= salaryMax;
    });
  }, [jobs, salaryMax]);
  const hasFilters = keyword || location || activeTab !== "all" || salaryMax !== "any";
  const clearAll = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setLocation("");
    setDebouncedLocation("");
    setActiveTab("all");
    setSalaryMax("any");
  };
  const tabs = [
    { id: "all", label: "All Jobs" },
    { id: "it", label: "IT Jobs" },
    { id: "nonit", label: "Non-IT Jobs" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "jobs.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "text-amber-500", size: 28 }),
          "Job Listings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "IT & Non-IT opportunities across India" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/post", "data-ocid": "jobs.post_job_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        " Post a Job"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4",
        "data-ocid": "jobs.search_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search jobs, companies, skills…",
                className: "pl-9",
                value: keyword,
                onChange: (e) => handleKeyword(e.target.value),
                "data-ocid": "jobs.search_input"
              }
            ),
            keyword && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setKeyword("");
                  setDebouncedKeyword("");
                },
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MapPin,
              {
                size: 16,
                className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Location (e.g. Mumbai)",
                className: "pl-9",
                value: location,
                onChange: (e) => handleLocation(e.target.value),
                "data-ocid": "jobs.location_input"
              }
            ),
            location && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setLocation("");
                  setDebouncedLocation("");
                },
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                "aria-label": "Clear location",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", "data-ocid": "jobs.city_filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13, className: "text-amber-500 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Quick Cities" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CITIES.map((city) => {
        const isActive = location.trim().toLowerCase() === city.toLowerCase();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => selectCity(city),
            "aria-pressed": isActive,
            "data-ocid": `jobs.city_filter.${city.toLowerCase().replace(/\s+/g, "_")}`,
            className: `px-3 py-1 rounded-full text-xs font-medium border transition-smooth whitespace-nowrap flex items-center gap-1 ${isActive ? "border-amber-500 bg-amber-500/15 text-amber-400 shadow-[0_0_0_1px_oklch(var(--primary)/0.4),0_2px_10px_oklch(var(--primary)/0.15)]" : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5"}`,
            children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10, className: "text-amber-400" }),
              city
            ]
          },
          city
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative flex items-center gap-2",
          "data-ocid": "jobs.salary_filter",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 14, className: "text-amber-500 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: salaryMax,
                  onChange: (e) => setSalaryMax(
                    e.target.value === "any" ? "any" : Number(e.target.value)
                  ),
                  "aria-label": "Filter by salary",
                  "data-ocid": "jobs.salary_select",
                  className: `appearance-none pl-3 pr-8 py-1.5 rounded-full text-sm font-medium border transition-smooth cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${salaryMax !== "any" ? "border-amber-500 bg-amber-500/15 text-amber-400" : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-amber-400"}`,
                  children: SALARY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "option",
                    {
                      value: opt.value,
                      className: "bg-card text-foreground",
                      children: opt.label
                    },
                    opt.value
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SlidersHorizontal,
                {
                  size: 12,
                  className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-1 flex-1", children: [
        tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap ${activeTab === tab.id ? "bg-amber-500 border-amber-500 text-white" : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-amber-500/40"}`,
            "data-ocid": `jobs.filter.${tab.id}`,
            children: tab.label
          },
          tab.id
        )),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: clearAll,
            className: "px-3 py-1.5 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground flex items-center gap-1 whitespace-nowrap transition-smooth",
            "data-ocid": "jobs.clear_filters_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
              " Clear all"
            ]
          }
        )
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        "data-ocid": "jobs.loading_state",
        children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, {}, k))
      }
    ),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 card-elevated",
        "data-ocid": "jobs.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoaderCircle,
            {
              size: 32,
              className: "mx-auto mb-3 text-muted-foreground animate-spin"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load jobs. Please try again." })
        ]
      }
    ),
    !isLoading && !isError && visibleJobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 card-elevated",
        "data-ocid": "jobs.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 40, className: "mx-auto mb-3 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No jobs found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Try adjusting your filters or be the first to post in this category." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/post", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-amber-500 hover:bg-amber-600 text-white gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            " Post a Job"
          ] }) })
        ]
      }
    ),
    !isLoading && !isError && visibleJobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
        visibleJobs.length,
        " ",
        visibleJobs.length === 1 ? "job" : "jobs",
        " ",
        "found",
        salaryMax !== "any" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-amber-500 font-medium", children: [
          "· up to ₹",
          salaryMax,
          "L/yr"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          "data-ocid": "jobs.list",
          children: visibleJobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job, index: idx }, job.id))
        }
      )
    ] })
  ] }) });
}
export {
  JobsListing as default
};
