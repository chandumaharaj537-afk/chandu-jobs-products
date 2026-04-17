import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useCreateProduct } from "@/hooks/useQueries";
import { PRODUCT_CATEGORY_LABELS, type ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  IndianRupee,
  Loader2,
  Lock,
  ShoppingBag,
  Upload,
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[];
const CONDITIONS = ["New", "Used", "Refurbished"] as const;

type Condition = "New" | "Used" | "Refurbished";

interface FormState {
  title: string;
  description: string;
  price: string;
  category: ProductCategory;
  condition: Condition;
  location: string;
  tags: string;
  contactEmail: string;
  imageUrls: string;
  sellerName: string;
  sellerContact: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
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
  sellerContact: "",
};

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
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

export default function ProductPost() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const createProduct = useCreateProduct();

  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const submitting = createProduct.isPending;

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    const imageUrls = form.imageUrls
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
    await createProduct.mutateAsync({
      title: form.title,
      description: form.description,
      price: Number.parseFloat(form.price),
      category: form.category,
      imageUrls,
      sellerName: form.sellerName,
      sellerContact: form.sellerContact,
    });
    setSubmitted(true);
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Layout noFooter>
        <div
          className="min-h-[60vh] flex items-center justify-center"
          data-ocid="product_post.loading_state"
        >
          <Loader2 className="animate-spin text-muted-foreground" size={32} />
        </div>
      </Layout>
    );
  }

  // ── Auth gate ───────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <Layout noFooter>
        <div
          className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-16"
          data-ocid="product_post.auth_gate"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Lock
              size={28}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Sign in to List a Product
            </h2>
            <p className="text-muted-foreground max-w-sm">
              You need to be signed in with Internet Identity to post your
              product on the marketplace.
            </p>
          </div>
          <Button
            onClick={login}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6"
            data-ocid="product_post.login_button"
          >
            Sign In
          </Button>
          <Link
            to="/products"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <Layout noFooter>
        <div
          className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-16"
          data-ocid="product_post.success_state"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <CheckCircle2
              size={32}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Product Listed!
            </h2>
            <p className="text-muted-foreground">
              Your product has been submitted and is now live on the
              marketplace.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Browse Products
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setForm(INITIAL);
                setSubmitted(false);
                setErrors({});
              }}
              data-ocid="product_post.list_another_button"
            >
              List Another
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <Layout noFooter>
      <div className="py-8 max-w-2xl mx-auto" data-ocid="product_post.page">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-ocid="product_post.back_button"
        >
          <ArrowLeft size={15} /> Back to Products
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="text-emerald-500" size={26} />
            List a Product
          </h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details below to list your product for sale.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          data-ocid="product_post.form"
        >
          {/* Product Details */}
          <fieldset className="card-elevated p-6 rounded-xl space-y-5">
            <legend className="font-display font-semibold text-foreground text-lg mb-2">
              Product Details
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="pp-title">
                Product Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pp-title"
                placeholder="e.g. Apple iPhone 14 Pro Max 256GB"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                data-ocid="product_post.title_input"
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.title_field_error"
                >
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pp-category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <select
                  id="pp-category"
                  value={form.category}
                  onChange={(e) =>
                    set("category", e.target.value as ProductCategory)
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="product_post.category_select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {PRODUCT_CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pp-condition">
                  Condition <span className="text-destructive">*</span>
                </Label>
                <select
                  id="pp-condition"
                  value={form.condition}
                  onChange={(e) =>
                    set("condition", e.target.value as Condition)
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="product_post.condition_select"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-price">
                Price (₹) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <IndianRupee
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="pp-price"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className="pl-8"
                  data-ocid="product_post.price_input"
                  aria-invalid={!!errors.price}
                />
              </div>
              {errors.price && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.price_field_error"
                >
                  {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="pp-description"
                placeholder="Describe the product — condition, features, what's included, etc."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={5}
                data-ocid="product_post.description_textarea"
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.description_field_error"
                >
                  {errors.description}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-tags">
                Tags{" "}
                <span className="text-muted-foreground text-xs">
                  (optional, comma separated)
                </span>
              </Label>
              <Input
                id="pp-tags"
                placeholder="e.g. Apple, Smartphone, iOS"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                data-ocid="product_post.tags_input"
              />
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="card-elevated p-6 rounded-xl space-y-4">
            <legend className="font-display font-semibold text-foreground text-lg mb-2">
              Product Images
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="pp-image-urls">
                Image URLs{" "}
                <span className="text-muted-foreground text-xs">
                  (comma separated)
                </span>
              </Label>
              <Textarea
                id="pp-image-urls"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                value={form.imageUrls}
                onChange={(e) => set("imageUrls", e.target.value)}
                rows={3}
                data-ocid="product_post.image_urls_textarea"
              />
              <p className="text-xs text-muted-foreground">
                Paste publicly accessible image URLs. Separate multiple URLs
                with commas.
              </p>
            </div>

            <div
              className="rounded-lg border-2 border-dashed border-border p-8 text-center"
              data-ocid="product_post.dropzone"
            >
              <Upload
                size={24}
                className="mx-auto text-muted-foreground/50 mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Image upload coming soon
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                For now, please use image URLs above.
              </p>
            </div>
          </fieldset>

          {/* Location + Seller */}
          <fieldset className="card-elevated p-6 rounded-xl space-y-5">
            <legend className="font-display font-semibold text-foreground text-lg mb-2">
              Location &amp; Seller Info
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="pp-location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pp-location"
                placeholder="e.g. Hyderabad, Telangana"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                data-ocid="product_post.location_input"
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.location_field_error"
                >
                  {errors.location}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-seller-name">
                Your Name / Business Name{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pp-seller-name"
                placeholder="e.g. Ravi Electronics"
                value={form.sellerName}
                onChange={(e) => set("sellerName", e.target.value)}
                data-ocid="product_post.seller_name_input"
                aria-invalid={!!errors.sellerName}
              />
              {errors.sellerName && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.seller_name_field_error"
                >
                  {errors.sellerName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-email">
                Contact Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pp-email"
                type="email"
                placeholder="you@example.com"
                value={form.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
                data-ocid="product_post.contact_email_input"
                aria-invalid={!!errors.contactEmail}
              />
              {errors.contactEmail && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="product_post.contact_email_field_error"
                >
                  {errors.contactEmail}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pp-phone">
                Phone / WhatsApp{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Input
                id="pp-phone"
                placeholder="+91 98765 43210"
                value={form.sellerContact}
                onChange={(e) => set("sellerContact", e.target.value)}
                data-ocid="product_post.seller_contact_input"
              />
            </div>
          </fieldset>

          {/* Submit row */}
          <div className="flex flex-col sm:flex-row gap-3 pb-8">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              data-ocid="product_post.submit_button"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Listing
                  Product…
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> List Product for Sale
                </>
              )}
            </Button>
            <Link to="/products">
              <Button
                type="button"
                variant="outline"
                className="h-12 px-6"
                data-ocid="product_post.cancel_button"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
