import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORY_LABELS, type ProductCategory } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  Mail,
  MapPin,
  Share2,
  ShoppingBag,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";

// ─── Sample data (must match ProductsListing ids) ────────────────────────────
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "Apple iPhone 14 Pro Max 256GB",
    price: 89999,
    category: "Electronics" as ProductCategory,
    condition: "New" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
    ],
    sellerName: "Ravi Electronics",
    contactEmail: "ravi.electronics@example.com",
    location: "Hyderabad, TS",
    description:
      "Brand new sealed box iPhone 14 Pro Max 256GB Deep Purple. Original Apple warranty of 1 year included. All accessories in box. GST invoice provided.",
    tags: ["iPhone", "Apple", "Smartphone", "iOS"],
    isAvailable: true,
  },
  {
    id: "2",
    title: "Men's Slim Fit Formal Shirts (Set of 3)",
    price: 1499,
    category: "Clothing" as ProductCategory,
    condition: "New" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    sellerName: "FashionHub",
    contactEmail: "fashionhub@example.com",
    location: "Surat, GJ",
    description:
      "Premium 100% cotton formal shirts in White, Sky Blue, and Light Grey. Sizes S to XXL. Machine washable. Ideal for office and formal events.",
    tags: ["Shirts", "Formal", "Men", "Cotton"],
    isAvailable: true,
  },
  {
    id: "3",
    title: "HP Pavilion 15 Laptop i7 16GB RAM",
    price: 74999,
    category: "Electronics" as ProductCategory,
    condition: "Refurbished" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    ],
    sellerName: "Laptop World",
    contactEmail: "laptopworld@example.com",
    location: "Bangalore, KA",
    description:
      "HP Pavilion 15 certified refurbished. Intel Core i7 12th Gen, 16GB DDR5 RAM, 512GB NVMe SSD. 6-month store warranty. Battery health above 85%.",
    tags: ["HP", "Laptop", "Core i7", "Windows 11"],
    isAvailable: true,
  },
  {
    id: "4",
    title: "Cast Iron Kadai 2.5L with Lid",
    price: 1299,
    category: "HomeGarden" as ProductCategory,
    condition: "New" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?w=800&q=80",
    ],
    sellerName: "KitchenKing",
    contactEmail: "kitchenking@example.com",
    location: "Chennai, TN",
    description:
      "Pre-seasoned heavy-duty cast iron kadai. 2.5L capacity with tempered glass lid. Suitable for all cooktops including induction.",
    tags: ["Cookware", "Cast Iron", "Kitchen", "Induction"],
    isAvailable: true,
  },
  {
    id: "5",
    title: "Yoga Mat Anti-Slip 6mm with Carry Bag",
    price: 699,
    category: "Sports" as ProductCategory,
    condition: "New" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    ],
    sellerName: "FitLife Store",
    contactEmail: "fitlife@example.com",
    location: "Pune, MH",
    description:
      "6mm thick TPE yoga mat with alignment lines. Anti-slip texture on both sides. Comes with carry bag and strap. Available in Blue, Purple, and Green.",
    tags: ["Yoga", "Fitness", "Mat", "TPE"],
    isAvailable: true,
  },
  {
    id: "6",
    title: "The Lean Startup + Zero to One (Book Bundle)",
    price: 499,
    category: "Books" as ProductCategory,
    condition: "Used" as const,
    imageUrls: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    ],
    sellerName: "BookNest",
    contactEmail: "booknest@example.com",
    location: "Delhi, DL",
    description:
      "Both books in good readable condition. No torn pages, minor cover wear. Great for entrepreneurs and startup enthusiasts.",
    tags: ["Business", "Startups", "Books", "Entrepreneurship"],
    isAvailable: true,
  },
];

const CONDITION_BADGE: Record<string, string> = {
  New: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/40",
  Used: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/40",
  Refurbished:
    "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/40",
};

export default function ProductDetail() {
  const { productId } = useParams({ from: "/products/$productId" });
  const product =
    SAMPLE_PRODUCTS.find((p) => p.id === productId) ?? SAMPLE_PRODUCTS[0];
  const [imgIdx, setImgIdx] = useState(0);

  const prevImg = () => setImgIdx((i) => Math.max(0, i - 1));
  const nextImg = () =>
    setImgIdx((i) => Math.min(product.imageUrls.length - 1, i + 1));

  const mailtoHref = `mailto:${product.contactEmail}?subject=Inquiry%20about%3A%20${encodeURIComponent(product.title)}`;

  return (
    <Layout>
      <div className="py-8" data-ocid="product_detail.page">
        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-ocid="product_detail.back_button"
        >
          <ArrowLeft size={15} /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Image Gallery ── */}
          <div data-ocid="product_detail.gallery">
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3]">
              {product.imageUrls[imgIdx] ? (
                <img
                  src={product.imageUrls[imgIdx]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={48} className="text-muted-foreground/30" />
                </div>
              )}
              <span
                className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${CONDITION_BADGE[product.condition]}`}
              >
                {product.condition}
              </span>
              {product.imageUrls.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImg}
                    disabled={imgIdx === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 rounded-full p-1.5 shadow hover:bg-card transition-smooth disabled:opacity-30"
                    aria-label="Previous image"
                    data-ocid="product_detail.img_prev_button"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextImg}
                    disabled={imgIdx === product.imageUrls.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 rounded-full p-1.5 shadow hover:bg-card transition-smooth disabled:opacity-30"
                    aria-label="Next image"
                    data-ocid="product_detail.img_next_button"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.imageUrls.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    data-ocid={`product_detail.thumbnail.${i + 1}`}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-smooth ${
                      i === imgIdx
                        ? "border-emerald-500"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-5" data-ocid="product_detail.info">
            <div>
              <span className="badge-products mb-3 inline-flex">
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-1 text-emerald-600 font-bold text-3xl">
              <IndianRupee size={24} />
              {product.price.toLocaleString("en-IN")}
            </div>

            {product.isAvailable && (
              <div className="flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle2 size={16} />
                <span>Available</span>
              </div>
            )}

            <div className="bg-muted/30 rounded-xl p-4">
              <h2 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate">{product.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={14} className="shrink-0" />
                <span className="truncate">{product.sellerName}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Tag size={14} className="text-muted-foreground shrink-0" />
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-secondary rounded-full text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Separator />

            <div className="card-elevated p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Seller</p>
              <p className="font-semibold text-foreground">
                {product.sellerName}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin size={11} /> {product.location}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoHref}
                className="flex-1"
                data-ocid="product_detail.contact_button"
              >
                <Button
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base font-semibold"
                  size="lg"
                >
                  <Mail size={18} /> Contact Seller
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                aria-label="Share"
                data-ocid="product_detail.share_button"
                onClick={() =>
                  navigator.share?.({
                    title: product.title,
                    url: window.location.href,
                  })
                }
              >
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Explore more products
          </p>
          <Link to="/products">
            <Button
              variant="outline"
              className="gap-2 border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              <ShoppingBag size={15} /> Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
