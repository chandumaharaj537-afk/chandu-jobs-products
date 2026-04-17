import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C8Ney5nB.js";
import { c as createLucideIcon, u as useAuth, L as Layout, B as Button, S as ShoppingBag } from "./Layout-CTMNymg8.js";
import { I as Input } from "./input-BoEjNKU7.js";
import { L as Label, T as Textarea } from "./textarea-DrVhDJSz.js";
import { d as useCreateProduct, L as LoaderCircle } from "./useQueries--sm0j3R0.js";
import { P as PRODUCT_CATEGORY_LABELS } from "./index-CvnLg5LN.js";
import { L as Lock } from "./lock-BjHD3h6v.js";
import { C as CircleCheck } from "./circle-check-CCSkkTiH.js";
import { A as ArrowLeft } from "./arrow-left-BmFD50RO.js";
import { I as IndianRupee } from "./indian-rupee-u9ONvGX9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const CATEGORIES = Object.keys(PRODUCT_CATEGORY_LABELS);
const CONDITIONS = ["New", "Used", "Refurbished"];
const INITIAL = {
  title: "",
  description: "",
  price: "",
  category: "Electronics",
  condition: "New",
  location: "",
  tags: "",
  contactEmail: "",
  imageUrls: "",
  sellerName: "",
  sellerContact: ""
};
function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.description.trim()) errors.description = "Description is required.";
  const priceNum = Number.parseFloat(form.price);
  if (!form.price || Number.isNaN(priceNum) || priceNum <= 0)
    errors.price = "Enter a valid price greater than 0.";
  if (!form.sellerName.trim()) errors.sellerName = "Seller name is required.";
  if (!form.contactEmail.trim())
    errors.contactEmail = "Contact email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
    errors.contactEmail = "Enter a valid email address.";
  if (!form.location.trim()) errors.location = "Location is required.";
  return errors;
}
function ProductPost() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const createProduct = useCreateProduct();
  const [form, setForm] = reactExports.useState(INITIAL);
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const submitting = createProduct.isPending;
  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: void 0 }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    const imageUrls = form.imageUrls.split(",").map((u) => u.trim()).filter(Boolean);
    await createProduct.mutateAsync({
      title: form.title,
      description: form.description,
      price: Number.parseFloat(form.price),
      category: form.category,
      imageUrls,
      sellerName: form.sellerName,
      sellerContact: form.sellerContact
    });
    setSubmitted(true);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { noFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[60vh] flex items-center justify-center",
        "data-ocid": "product_post.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-muted-foreground", size: 32 })
      }
    ) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { noFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-16",
        "data-ocid": "product_post.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Lock,
            {
              size: 28,
              className: "text-emerald-600 dark:text-emerald-400"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Sign in to List a Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "You need to be signed in with Internet Identity to post your product on the marketplace." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              className: "bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6",
              "data-ocid": "product_post.login_button",
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
              children: "← Back to Products"
            }
          )
        ]
      }
    ) });
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { noFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-16",
        "data-ocid": "product_post.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              size: 32,
              className: "text-emerald-600 dark:text-emerald-400"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Product Listed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your product has been submitted and is now live on the marketplace." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-emerald-600 hover:bg-emerald-700 text-white", children: "Browse Products" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setForm(INITIAL);
                  setSubmitted(false);
                  setErrors({});
                },
                "data-ocid": "product_post.list_another_button",
                children: "List Another"
              }
            )
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { noFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 max-w-2xl mx-auto", "data-ocid": "product_post.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/products",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6",
        "data-ocid": "product_post.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
          " Back to Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "text-emerald-500", size: 26 }),
        "List a Product"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Fill in the details below to list your product for sale." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "space-y-6",
        "data-ocid": "product_post.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card-elevated p-6 rounded-xl space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-foreground text-lg mb-2", children: "Product Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-title", children: [
                "Product Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-title",
                  placeholder: "e.g. Apple iPhone 14 Pro Max 256GB",
                  value: form.title,
                  onChange: (e) => set("title", e.target.value),
                  "data-ocid": "product_post.title_input",
                  "aria-invalid": !!errors.title
                }
              ),
              errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.title_field_error",
                  children: errors.title
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-category", children: [
                  "Category ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "pp-category",
                    value: form.category,
                    onChange: (e) => set("category", e.target.value),
                    className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "product_post.category_select",
                    children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: PRODUCT_CATEGORY_LABELS[cat] }, cat))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-condition", children: [
                  "Condition ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "pp-condition",
                    value: form.condition,
                    onChange: (e) => set("condition", e.target.value),
                    className: "w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "product_post.condition_select",
                    children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-price", children: [
                "Price (₹) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IndianRupee,
                  {
                    size: 15,
                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "pp-price",
                    type: "number",
                    min: "0",
                    step: "1",
                    placeholder: "0",
                    value: form.price,
                    onChange: (e) => set("price", e.target.value),
                    className: "pl-8",
                    "data-ocid": "product_post.price_input",
                    "aria-invalid": !!errors.price
                  }
                )
              ] }),
              errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.price_field_error",
                  children: errors.price
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-description", children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pp-description",
                  placeholder: "Describe the product — condition, features, what's included, etc.",
                  value: form.description,
                  onChange: (e) => set("description", e.target.value),
                  rows: 5,
                  "data-ocid": "product_post.description_textarea",
                  "aria-invalid": !!errors.description
                }
              ),
              errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.description_field_error",
                  children: errors.description
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-tags", children: [
                "Tags",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional, comma separated)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-tags",
                  placeholder: "e.g. Apple, Smartphone, iOS",
                  value: form.tags,
                  onChange: (e) => set("tags", e.target.value),
                  "data-ocid": "product_post.tags_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card-elevated p-6 rounded-xl space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-foreground text-lg mb-2", children: "Product Images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-image-urls", children: [
                "Image URLs",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(comma separated)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "pp-image-urls",
                  placeholder: "https://example.com/image1.jpg, https://example.com/image2.jpg",
                  value: form.imageUrls,
                  onChange: (e) => set("imageUrls", e.target.value),
                  rows: 3,
                  "data-ocid": "product_post.image_urls_textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Paste publicly accessible image URLs. Separate multiple URLs with commas." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg border-2 border-dashed border-border p-8 text-center",
                "data-ocid": "product_post.dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Upload,
                    {
                      size: 24,
                      className: "mx-auto text-muted-foreground/50 mb-2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Image upload coming soon" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "For now, please use image URLs above." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "card-elevated p-6 rounded-xl space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-foreground text-lg mb-2", children: "Location & Seller Info" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-location", children: [
                "Location ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-location",
                  placeholder: "e.g. Hyderabad, Telangana",
                  value: form.location,
                  onChange: (e) => set("location", e.target.value),
                  "data-ocid": "product_post.location_input",
                  "aria-invalid": !!errors.location
                }
              ),
              errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.location_field_error",
                  children: errors.location
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-seller-name", children: [
                "Your Name / Business Name",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-seller-name",
                  placeholder: "e.g. Ravi Electronics",
                  value: form.sellerName,
                  onChange: (e) => set("sellerName", e.target.value),
                  "data-ocid": "product_post.seller_name_input",
                  "aria-invalid": !!errors.sellerName
                }
              ),
              errors.sellerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.seller_name_field_error",
                  children: errors.sellerName
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-email", children: [
                "Contact Email ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-email",
                  type: "email",
                  placeholder: "you@example.com",
                  value: form.contactEmail,
                  onChange: (e) => set("contactEmail", e.target.value),
                  "data-ocid": "product_post.contact_email_input",
                  "aria-invalid": !!errors.contactEmail
                }
              ),
              errors.contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_post.contact_email_field_error",
                  children: errors.contactEmail
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "pp-phone", children: [
                "Phone / WhatsApp",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "pp-phone",
                  placeholder: "+91 98765 43210",
                  value: form.sellerContact,
                  onChange: (e) => set("sellerContact", e.target.value),
                  "data-ocid": "product_post.seller_contact_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: submitting,
                className: "flex-1 h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-2",
                "data-ocid": "product_post.submit_button",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
                  " Listing Product…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
                  " List Product for Sale"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "h-12 px-6",
                "data-ocid": "product_post.cancel_button",
                children: "Cancel"
              }
            ) })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  ProductPost as default
};
