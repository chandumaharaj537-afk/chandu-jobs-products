import { r as reactExports, j as jsxRuntimeExports } from "./index-C8Ney5nB.js";
import { c as createLucideIcon, u as useAuth, L as Layout, l as LogIn, B as Button, U as User, d as Separator, S as ShoppingBag, a as Briefcase, n as Badge, M as Mail } from "./Layout-CTMNymg8.js";
import { I as Input } from "./input-BoEjNKU7.js";
import { L as Label, T as Textarea } from "./textarea-DrVhDJSz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CHeaxpSZ.js";
import { h as useMyProfile, j as useUpsertProfile, k as backendToRole, L as LoaderCircle, R as ROLE_LABELS, r as roleToBackend } from "./useQueries--sm0j3R0.js";
import { C as CircleCheck } from "./circle-check-CCSkkTiH.js";
import { C as CircleAlert } from "./circle-alert-DZzj-4B-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const ROLE_ICONS = {
  jobSeeker: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }),
  employer: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }),
  seller: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 })
};
function ProfilePreviewCard({
  name,
  role,
  contactInfo,
  bio,
  principal
}) {
  const initials = name ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "?";
  const isEmail = contactInfo.includes("@");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-royal p-6 sticky top-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4", children: "Preview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center text-2xl font-display font-bold text-primary mb-3 shadow-lg", children: initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground leading-tight", children: name || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-base", children: "Your Name" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1.5 text-xs", children: [
        ROLE_ICONS[role],
        ROLE_LABELS[role]
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
    bio ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4", children: bio }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic mb-4", children: "No bio provided" }),
    contactInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-foreground", children: [
      isEmail ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13, className: "text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 13, className: "text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: contactInfo })
    ] }),
    principal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono truncate", children: principal }) })
  ] });
}
function Profile() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
    principal
  } = useAuth();
  const { data: existingProfile, isLoading: profileLoading } = useMyProfile();
  const {
    mutateAsync: upsertProfile,
    isPending: isSaving,
    isSuccess: savedOk,
    isError: saveError
  } = useUpsertProfile();
  const [name, setName] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("jobSeeker");
  const [contactInfo, setContactInfo] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (existingProfile) {
      setName(existingProfile.name || "");
      setRole(backendToRole(existingProfile.role));
      setContactInfo(existingProfile.contactInfo || "");
      setBio(existingProfile.bio || "");
    }
  }, [existingProfile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await upsertProfile({
      name: name.trim(),
      role: roleToBackend(role),
      contactInfo: contactInfo.trim(),
      bio: bio.trim()
    });
  };
  if (authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground",
        "data-ocid": "profile.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Connecting…" })
        ]
      }
    ) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-24 text-center max-w-md mx-auto",
        "data-ocid": "profile.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 32, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Sign in to view your Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: "Set up your profile to appear as a trusted employer, job seeker, or seller on the platform." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "gap-2",
              "data-ocid": "profile.signin_button",
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 22, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: existingProfile ? "Update your account information" : "Complete your profile to get started" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "card-elevated p-6 space-y-5",
          "data-ocid": "profile.loading_state",
          children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 bg-muted/60 rounded animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-full bg-muted/40 rounded-lg animate-pulse" })
          ] }, k))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "card-elevated p-6 space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                "Full Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "e.g. Chandu Kumar",
                  required: true,
                  "data-ocid": "profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                "Account Role ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: role,
                  onValueChange: (v) => setRole(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.role_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(ROLE_LABELS).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      ROLE_ICONS[r],
                      ROLE_LABELS[r]
                    ] }) }, r)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 11 }),
                "Determines how you appear to others on the platform"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contactInfo", children: [
                "Contact Info ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "contactInfo",
                  value: contactInfo,
                  onChange: (e) => setContactInfo(e.target.value),
                  placeholder: "your@email.com or +91 98765 43210",
                  required: true,
                  "data-ocid": "profile.contact_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Visible to others who view your listings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", children: "Bio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "bio",
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  placeholder: "Tell others about yourself — your experience, skills, what you're looking for…",
                  rows: 4,
                  "data-ocid": "profile.bio_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              savedOk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium",
                  "data-ocid": "profile.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15 }),
                    "Profile saved successfully!"
                  ]
                }
              ),
              saveError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5 text-sm text-destructive",
                  "data-ocid": "profile.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15 }),
                    "Save failed. Please try again."
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isSaving,
                  className: "gap-2 ml-auto",
                  "data-ocid": "profile.save_button",
                  children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }),
                    " Saving…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                    " Save Profile"
                  ] })
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProfilePreviewCard,
        {
          name,
          role,
          contactInfo,
          bio,
          principal
        }
      ) })
    ] })
  ] }) });
}
export {
  Profile as default
};
