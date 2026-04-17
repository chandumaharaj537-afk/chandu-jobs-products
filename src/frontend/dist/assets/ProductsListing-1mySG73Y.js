import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C8Ney5nB.js";
import { L as Layout, S as ShoppingBag, B as Button, b as Search, U as User } from "./Layout-CTMNymg8.js";
import { I as Input } from "./input-BoEjNKU7.js";
import { P as PRODUCT_CATEGORY_LABELS } from "./index-CvnLg5LN.js";
import { P as Plus } from "./plus-qMFQqghc.js";
import { I as IndianRupee } from "./indian-rupee-u9ONvGX9.js";
import { T as Tag } from "./tag-DjOCY_TK.js";
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "Apple iPhone 14 Pro Max 256GB",
    price: 89999,
    category: "Electronics",
    imageUrls: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&q=80"
    ],
    sellerName: "Ravi Electronics",
    condition: "New",
    location: "Hyderabad, TS",
    tags: ["iPhone", "Apple", "Smartphone"]
  },
  {
    id: "2",
    title: "Men's Slim Fit Formal Shirts (Set of 3)",
    price: 1499,
    category: "Clothing",
    imageUrls: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
    ],
    sellerName: "FashionHub",
    condition: "New",
    location: "Surat, GJ",
    tags: ["Shirts", "Formal", "Men"]
  },
  {
    id: "3",
    title: "HP Pavilion 15 Laptop i7 16GB RAM",
    price: 74999,
    category: "Electronics",
    imageUrls: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"
    ],
    sellerName: "Laptop World",
    condition: "Refurbished",
    location: "Bangalore, KA",
    tags: ["HP", "Laptop", "Core i7"]
  },
  {
    id: "4",
    title: "Cast Iron Kadai 2.5L with Lid",
    price: 1299,
    category: "HomeGarden",
    imageUrls: [
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?w=600&q=80"
    ],
    sellerName: "KitchenKing",
    condition: "New",
    location: "Chennai, TN",
    tags: ["Cookware", "Cast Iron", "Kitchen"]
  },
  {
    id: "5",
    title: "Yoga Mat Anti-Slip 6mm with Carry Bag",
    price: 699,
    category: "Sports",
    imageUrls: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80"
    ],
    sellerName: "FitLife Store",
    condition: "New",
    location: "Pune, MH",
    tags: ["Yoga", "Fitness", "Mat"]
  },
  {
    id: "6",
    title: "The Lean Startup + Zero to One (Book Bundle)",
    price: 499,
    category: "Books",
    imageUrls: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80"
    ],
    sellerName: "BookNest",
    condition: "Used",
    location: "Delhi, DL",
    tags: ["Business", "Startups", "Books"]
  }
];
const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "HomeGarden",
  "Sports",
  "Books",
  "Automotive",
  "Toys",
  "Health",
  "Food",
  "Other"
];
const CONDITION_COLOR = {
  New: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/40",
  Used: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/40",
  Refurbished: "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/40"
};
function ProductsListing() {
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState(
    "All"
  );
  const filtered = reactExports.useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.sellerName.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "text-emerald-500", size: 28 }),
          "Products Marketplace"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Buy & sell electronics, clothing, home goods and more" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/post", "data-ocid": "products.post_product_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-emerald-600 hover:bg-emerald-700 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        " List a Product"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", "data-ocid": "products.search_bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          size: 16,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search products, sellers, tags…",
          className: "pl-9",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "products.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 mb-6 overflow-x-auto pb-2",
        "data-ocid": "products.category_filter",
        children: CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              "data-ocid": `products.filter_tab.${cat.toLowerCase()}`,
              className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap ${isActive ? "bg-emerald-600 text-white border-emerald-600" : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-emerald-500/40"}`,
              children: cat === "All" ? "All Products" : PRODUCT_CATEGORY_LABELS[cat]
            },
            cat
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
      filtered.length,
      " product",
      filtered.length !== 1 ? "s" : "",
      " found"
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 48, className: "text-muted-foreground/40 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Try a different category or search term." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setSearch("");
                setActiveCategory("All");
              },
              children: "Clear filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        "data-ocid": "products.list",
        children: filtered.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products/$productId",
            params: { productId: product.id },
            "data-ocid": `products.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "card-elevated hover:border-emerald-500/40 transition-smooth cursor-pointer h-full flex flex-col overflow-hidden group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 bg-muted overflow-hidden", children: [
                product.imageUrls[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrls[0],
                    alt: product.title,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                    onError: (e) => {
                      e.currentTarget.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ShoppingBag,
                  {
                    size: 32,
                    className: "text-muted-foreground/40"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${CONDITION_COLOR[product.condition]}`,
                    children: product.condition
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 flex-1", children: product.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-products shrink-0", children: PRODUCT_CATEGORY_LABELS[product.category].split(
                    " "
                  )[0] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-emerald-600 font-bold text-lg mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { size: 16 }),
                  product.price.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: product.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-0.5 px-2 py-0.5 bg-secondary rounded-full text-xs text-secondary-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 9 }),
                      " ",
                      tag
                    ]
                  },
                  tag
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 border-t border-border flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 11 }),
                    " ",
                    product.sellerName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-xs h-7 border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20",
                      "data-ocid": `products.view_button.${idx + 1}`,
                      children: "View Product"
                    }
                  )
                ] })
              ] })
            ] })
          },
          product.id
        ))
      }
    )
  ] }) });
}
export {
  ProductsListing as default
};
