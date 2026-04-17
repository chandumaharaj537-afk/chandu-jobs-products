import { r as reactExports, j as jsxRuntimeExports, c as cn, L as Link, S as Skeleton } from "./index-C8Ney5nB.js";
import { e as useDirection, f as useControllableState, P as Primitive, g as useId, R as Root, I as Item, h as composeEventHandlers, i as Presence, j as createRovingFocusGroupScope, k as createContextScope, u as useAuth, L as Layout, l as LogIn, B as Button, m as LayoutDashboard, U as User, a as Briefcase, S as ShoppingBag } from "./Layout-CTMNymg8.js";
import { u as useListJobs, e as useListProducts, L as LoaderCircle, g as getSalaryText, f as formatPostedAt } from "./useQueries--sm0j3R0.js";
import { P as Plus } from "./plus-qMFQqghc.js";
import { C as CircleAlert } from "./circle-alert-DZzj-4B-.js";
import { M as MapPin } from "./map-pin-BpmHLB6O.js";
import { C as Clock } from "./clock-ia_H4yuT.js";
import { P as Package } from "./package-CXD1aNCA.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function JobRow({ job, index }) {
  const salary = getSalaryText(job.salary);
  const isIT = "IT" in job.category;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/jobs/$jobId",
      params: { jobId: job.id },
      "data-ocid": `dashboard.job_item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-amber-500/20 transition-smooth group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 16, className: "text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-amber-500 transition-colors", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: job.company }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 flex-wrap", children: [
            job.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10 }),
              " ",
              job.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
              " ",
              formatPostedAt(job.postedAt)
            ] }),
            salary && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-amber-600 dark:text-amber-400", children: salary })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 badge-jobs", children: isIT ? "IT" : "Non-IT" })
      ] })
    }
  );
}
function ProductRow({
  product,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/products/$productId",
      params: { productId: product.id },
      "data-ocid": `dashboard.product_item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-emerald-500/20 transition-smooth group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-emerald-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate group-hover:text-emerald-500 transition-colors", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400", children: [
              "₹",
              product.price.toLocaleString("en-IN")
            ] }),
            product.sellerContact && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: product.sellerContact })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-products shrink-0", children: "Active" })
      ] })
    }
  );
}
function ListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.loading_state", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 p-4 rounded-lg bg-muted/30",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-lg shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] })
      ]
    },
    k
  )) });
}
function ErrorState({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 text-destructive text-sm py-4 px-3 rounded-lg bg-destructive/10",
      "data-ocid": "dashboard.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ]
    }
  );
}
function Dashboard() {
  const { isAuthenticated, isLoading, login, principal } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("jobs");
  const {
    data: myJobs = [],
    isLoading: jobsLoading,
    isError: jobsError
  } = useListJobs({ category: [], location: [], keyword: [] });
  const filteredJobs = principal ? myJobs.filter((j) => {
    var _a, _b;
    return ((_b = (_a = j.posterPrincipal) == null ? void 0 : _a.toText) == null ? void 0 : _b.call(_a)) === principal;
  }) : [];
  const {
    data: myProducts = [],
    isLoading: productsLoading,
    isError: productsError
  } = useListProducts({ category: [], keyword: [] });
  const filteredProducts = principal ? myProducts.filter((p) => {
    var _a, _b;
    return ((_b = (_a = p.sellerPrincipal) == null ? void 0 : _a.toText) == null ? void 0 : _b.call(_a)) === principal;
  }) : [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground",
        "data-ocid": "dashboard.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Connecting to Internet Identity…" })
        ]
      }
    ) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-24 text-center max-w-md mx-auto",
        "data-ocid": "dashboard.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 32, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Sign in to your Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Access your personal dashboard to manage your job postings and product listings in one place." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "gap-2",
              "data-ocid": "dashboard.signin_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 16 }),
                "Sign In with Internet Identity"
              ]
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 22, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Dashboard" }),
          principal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5 truncate max-w-[260px]", children: principal.length > 30 ? `${principal.slice(0, 14)}…${principal.slice(-8)}` : principal })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", "data-ocid": "dashboard.profile_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
        " Edit Profile"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-royal p-4 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 20, className: "text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: jobsLoading ? "—" : filteredJobs.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Job Posts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-royal p-4 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20, className: "text-emerald-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: productsLoading ? "—" : filteredProducts.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Product Listings" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: (v) => setActiveTab(v),
        "data-ocid": "dashboard.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "dashboard.tab_list", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "jobs",
                  className: "gap-1.5",
                  "data-ocid": "dashboard.jobs_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }),
                    " My Jobs (",
                    jobsLoading ? "…" : filteredJobs.length,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "products",
                  className: "gap-1.5",
                  "data-ocid": "dashboard.products_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
                    " My Products (",
                    productsLoading ? "…" : filteredProducts.length,
                    ")"
                  ]
                }
              )
            ] }),
            activeTab === "jobs" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/post", "data-ocid": "dashboard.post_job_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
              " Post Job"
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products/post",
                "data-ocid": "dashboard.list_product_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }),
                  " List Product"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "jobs", "data-ocid": "dashboard.jobs_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated p-5", children: jobsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : jobsError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: "Failed to load job listings. Please try again." }) : filteredJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12",
              "data-ocid": "dashboard.jobs_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 26, className: "text-amber-500/60" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No jobs posted yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Post your first job listing and reach thousands of candidates." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/post", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    "data-ocid": "dashboard.jobs_empty_post_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13, className: "mr-1.5" }),
                      " Post your first job"
                    ]
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredJobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobRow, { job, index: idx + 1 }, job.id)) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "products", "data-ocid": "dashboard.products_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated p-5", children: productsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : productsError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: "Failed to load product listings. Please try again." }) : filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12",
              "data-ocid": "dashboard.products_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 26, className: "text-emerald-500/60" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: "No products listed yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "List your first product and connect with buyers across India." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/post", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    "data-ocid": "dashboard.products_empty_list_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13, className: "mr-1.5" }),
                      " List your first product"
                    ]
                  }
                ) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredProducts.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductRow,
            {
              product,
              index: idx + 1
            },
            product.id
          )) }) }) })
        ]
      }
    )
  ] }) });
}
export {
  Dashboard as default
};
