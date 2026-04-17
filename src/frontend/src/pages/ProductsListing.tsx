import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORY_LABELS, type ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  IndianRupee,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Sample data ──────────────────────────────────────────────────────────────
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "Apple iPhone 14 Pro Max 256GB",
    price: 89999,
    category: "Electronics" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=600&q=80",
    ],
    sellerName: "Ravi Electronics",
    condition: "New" as const,
    location: "Hyderabad, TS",
    tags: ["iPhone", "Apple", "Smartphone"],
  },
  {
    id: "2",
    title: "Men's Slim Fit Formal Shirts (Set of 3)",
    price: 1499,
    category: "Clothing" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    sellerName: "FashionHub",
    condition: "New" as const,
    location: "Surat, GJ",
    tags: ["Shirts", "Formal", "Men"],
  },
  {
    id: "3",
    title: "HP Pavilion 15 Laptop i7 16GB RAM",
    price: 74999,
    category: "Electronics" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
    sellerName: "Laptop World",
    condition: "Refurbished" as const,
    location: "Bangalore, KA",
    tags: ["HP", "Laptop", "Core i7"],
  },
  {
    id: "4",
    title: "Cast Iron Kadai 2.5L with Lid",
    price: 1299,
    category: "HomeGarden" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?w=600&q=80",
    ],
    sellerName: "KitchenKing",
    condition: "New" as const,
    location: "Chennai, TN",
    tags: ["Cookware", "Cast Iron", "Kitchen"],
  },
  {
    id: "5",
    title: "Yoga Mat Anti-Slip 6mm with Carry Bag",
    price: 699,
    category: "Sports" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
    ],
    sellerName: "FitLife Store",
    condition: "New" as const,
    location: "Pune, MH",
    tags: ["Yoga", "Fitness", "Mat"],
  },
  {
    id: "6",
    title: "The Lean Startup + Zero to One (Book Bundle)",
    price: 499,
    category: "Books" as ProductCategory,
    imageUrls: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    ],
    sellerName: "BookNest",
    condition: "Used" as const,
    location: "Delhi, DL",
    tags: ["Business", "Startups", "Books"],
  },
];

const CATEGORIES: Array<ProductCategory | "All"> = [
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
  "Other",
];

const CONDITION_COLOR: Record<string, string> = {
  New: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/40",
  Used: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/40",
  Refurbished:
    "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/40",
};

export default function ProductsListing() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">(
    "All",
  );

  const filtered = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.sellerName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <Layout>
      <div className="py-8" data-ocid="products.page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="text-emerald-500" size={28} />
              Products Marketplace
            </h1>
            <p className="text-muted-foreground mt-1">
              Buy &amp; sell electronics, clothing, home goods and more
            </p>
          </div>
          <Link to="/products/post" data-ocid="products.post_product_button">
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus size={16} /> List a Product
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-5" data-ocid="products.search_bar">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Search products, sellers, tags…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="products.search_input"
          />
        </div>

        {/* Category filter */}
        <div
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
          data-ocid="products.category_filter"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`products.filter_tab.${cat.toLowerCase()}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-emerald-500/40"
                }`}
              >
                {cat === "All" ? "All Products" : PRODUCT_CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="products.empty_state"
          >
            <ShoppingBag size={48} className="text-muted-foreground/40 mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">
              No products found
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Try a different category or search term.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="products.list"
          >
            {filtered.map((product, idx) => (
              <Link
                key={product.id}
                to="/products/$productId"
                params={{ productId: product.id }}
                data-ocid={`products.item.${idx + 1}`}
              >
                <article className="card-elevated hover:border-emerald-500/40 transition-smooth cursor-pointer h-full flex flex-col overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-44 bg-muted overflow-hidden">
                    {product.imageUrls[0] ? (
                      <img
                        src={product.imageUrls[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag
                          size={32}
                          className="text-muted-foreground/40"
                        />
                      </div>
                    )}
                    <span
                      className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${CONDITION_COLOR[product.condition]}`}
                    >
                      {product.condition}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 flex-1">
                        {product.title}
                      </h2>
                      <span className="badge-products shrink-0">
                        {
                          PRODUCT_CATEGORY_LABELS[product.category].split(
                            " ",
                          )[0]
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-lg mb-2">
                      <IndianRupee size={16} />
                      {product.price.toLocaleString("en-IN")}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-0.5 px-2 py-0.5 bg-secondary rounded-full text-xs text-secondary-foreground"
                        >
                          <Tag size={9} /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User size={11} /> {product.sellerName}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                        data-ocid={`products.view_button.${idx + 1}`}
                      >
                        View Product
                      </Button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
