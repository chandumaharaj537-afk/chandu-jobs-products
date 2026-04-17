import { u as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-C8Ney5nB.js";
import { c as createLucideIcon, L as Layout, B as Button, a as Briefcase, d as Separator, E as ExternalLink, M as Mail } from "./Layout-CTMNymg8.js";
import { a as useGetJob, b as getApplyMethodValue, g as getSalaryText, i as isITCategory, f as formatPostedAt, L as LoaderCircle } from "./useQueries--sm0j3R0.js";
import { A as ArrowLeft } from "./arrow-left-BmFD50RO.js";
import { C as CircleAlert } from "./circle-alert-DZzj-4B-.js";
import { B as Building2 } from "./building-2-IF1gIxE9.js";
import { M as MapPin } from "./map-pin-BpmHLB6O.js";
import { D as DollarSign } from "./dollar-sign-B33WZ0Bp.js";
import { C as Clock } from "./clock-ia_H4yuT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode);
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated p-6 sm:p-8 space-y-4",
      "data-ocid": "job_detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-14 h-14 rounded-xl shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-6 rounded-full shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28" })
        ] })
      ]
    }
  );
}
function JobDetail() {
  const { jobId } = useParams({ from: "/jobs/$jobId" });
  const { data: job, isLoading, isError } = useGetJob(jobId);
  const [saved, setSaved] = reactExports.useState(false);
  const applyMethod = job ? getApplyMethodValue(job.applyMethod) : null;
  const salary = job ? getSalaryText(job.salary) : null;
  const isIT = job ? isITCategory(job.category) : false;
  const requirements = job ? job.requirements.split("\n").filter(Boolean) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 max-w-3xl", "data-ocid": "job_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/jobs",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors",
        "data-ocid": "job_detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
          " Back to Jobs"
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {}),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-8 text-center",
        "data-ocid": "job_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 36, className: "mx-auto mb-3 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium mb-1", children: "Failed to load job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Please check your connection and try again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "← Back to Jobs" }) })
        ]
      }
    ),
    !isLoading && !isError && !job && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated p-8 text-center",
        "data-ocid": "job_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 40, className: "mx-auto mb-3 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium mb-1", children: "Job not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "This listing may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "← Browse Jobs" }) })
        ]
      }
    ),
    !isLoading && !isError && job && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-royal p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Briefcase,
          {
            size: 24,
            className: "text-amber-600 dark:text-amber-400"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground leading-tight", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14 }),
            job.company
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `shrink-0 ${isIT ? "badge-jobs" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"}`,
            children: isIT ? "IT" : "Non-IT"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
          job.location
        ] }),
        salary && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 14 }),
          salary
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
          "Posted ",
          formatPostedAt(job.postedAt)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-3", children: "About the Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6 whitespace-pre-line", children: job.description }),
      requirements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-3", children: "Requirements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6", children: requirements.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2 text-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" }),
              req
            ]
          },
          req
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 font-medium", children: "How to apply" }),
        (applyMethod == null ? void 0 : applyMethod.type) === "url" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-foreground break-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14, className: "text-amber-500 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: applyMethod.value,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-amber-600 dark:text-amber-400 hover:underline",
              children: applyMethod.value
            }
          )
        ] }) : (applyMethod == null ? void 0 : applyMethod.type) === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-amber-500 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${applyMethod.value}`,
              className: "text-amber-600 dark:text-amber-400 hover:underline",
              children: applyMethod.value
            }
          )
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
        (applyMethod == null ? void 0 : applyMethod.type) === "url" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: applyMethod.value,
            target: "_blank",
            rel: "noopener noreferrer",
            "data-ocid": "job_detail.apply_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white", children: [
              "Apply Now ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 })
            ] })
          }
        ),
        (applyMethod == null ? void 0 : applyMethod.type) === "email" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `mailto:${applyMethod.value}`,
            "data-ocid": "job_detail.apply_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white", children: [
              "Apply via Email ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: `gap-2 transition-colors ${saved ? "border-amber-500 text-amber-600 dark:text-amber-400" : ""}`,
            onClick: () => setSaved((s) => !s),
            "aria-pressed": saved,
            "data-ocid": "job_detail.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bookmark,
                {
                  size: 15,
                  className: saved ? "fill-amber-500 text-amber-500" : ""
                }
              ),
              saved ? "Saved" : "Save Job"
            ]
          }
        )
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center mt-4 gap-2 text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
      "Loading job details…"
    ] })
  ] }) });
}
export {
  JobDetail as default
};
