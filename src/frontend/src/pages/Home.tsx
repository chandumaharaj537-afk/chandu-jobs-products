import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  MapPin,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// ─── Static data ─────────────────────────────────────────────────────────────

const FEATURED_JOBS = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp India",
    location: "Bangalore, KA",
    category: "IT",
    salary: "₹18–28 LPA",
    type: "Full-time",
    logo: "T",
  },
  {
    id: "2",
    title: "DevOps Engineer",
    company: "CloudSystems Ltd",
    location: "Hyderabad, TS",
    category: "IT",
    salary: "₹15–22 LPA",
    type: "Full-time",
    logo: "C",
  },
  {
    id: "3",
    title: "Marketing Manager",
    company: "BrandWave Agency",
    location: "Mumbai, MH",
    category: "Non-IT",
    salary: "₹8–14 LPA",
    type: "Full-time",
    logo: "B",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "Analytix Corp",
    location: "Pune, MH",
    category: "IT",
    salary: "₹20–32 LPA",
    type: "Remote",
    logo: "A",
  },
  {
    id: "5",
    title: "HR Business Partner",
    company: "PeopleFirst HR",
    location: "Delhi, DL",
    category: "Non-IT",
    salary: "₹6–10 LPA",
    type: "Hybrid",
    logo: "P",
  },
  {
    id: "6",
    title: "Mobile App Developer",
    company: "AppNest Studios",
    location: "Chennai, TN",
    category: "IT",
    salary: "₹12–18 LPA",
    type: "Full-time",
    logo: "N",
  },
];

const FEATURED_PRODUCTS = [
  {
    id: "1",
    title: 'MacBook Pro M3 16"',
    category: "Electronics",
    price: "₹1,89,990",
    seller: "Apple India",
    rating: 4.9,
    image: "💻",
  },
  {
    id: "2",
    title: "Nike Air Max 2024",
    category: "Clothing",
    price: "₹12,499",
    seller: "Nike Store",
    rating: 4.7,
    image: "👟",
  },
  {
    id: "3",
    title: "IKEA Study Desk",
    category: "Home & Garden",
    price: "₹8,999",
    seller: "IKEA India",
    rating: 4.5,
    image: "🪑",
  },
  {
    id: "4",
    title: 'Samsung 65" QLED TV',
    category: "Electronics",
    price: "₹89,990",
    seller: "Samsung India",
    rating: 4.8,
    image: "📺",
  },
  {
    id: "5",
    title: "Instant Pot Duo 8L",
    category: "Kitchen",
    price: "₹6,499",
    seller: "Instant Brands",
    rating: 4.6,
    image: "🍲",
  },
  {
    id: "6",
    title: "Canon EOS R50 Camera",
    category: "Photography",
    price: "₹67,990",
    seller: "Canon India",
    rating: 4.8,
    image: "📷",
  },
];

const STATS = [
  {
    label: "Active Jobs",
    value: "12,400+",
    icon: Briefcase,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Products Listed",
    value: "38,000+",
    icon: ShoppingBag,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Companies Hiring",
    value: "2,100+",
    icon: Building2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Monthly Users",
    value: "500K+",
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Sign up in seconds using Internet Identity — no passwords, fully secure and decentralized.",
    icon: Users,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    step: "02",
    title: "Browse or Post",
    description:
      "Search thousands of IT & Non-IT jobs or products. Or list your own — it's completely free.",
    icon: Zap,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    step: "03",
    title: "Connect & Transact",
    description:
      "Apply for jobs directly or contact sellers. Everything happens on one trusted platform.",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    step: "04",
    title: "Grow Your Reach",
    description:
      "Get discovered by thousands of employers and buyers. Your listing is live 24/7 for free.",
    icon: Package,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({
  job,
  index,
}: { job: (typeof FEATURED_JOBS)[0]; index: number }) {
  const isIT = job.category === "IT";
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      data-ocid={`home.job_card.${index + 1}`}
    >
      <div className="card-elevated hover-royal p-5 cursor-pointer h-full group flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold shadow-sm ${isIT ? "bg-amber-500/15 text-amber-400" : "bg-violet-500/15 text-violet-400"}`}
            >
              {job.logo}
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none">
                {job.company}
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                {job.type}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${isIT ? "bg-amber-500/10 text-amber-400" : "bg-violet-500/10 text-violet-400"}`}
          >
            {job.category}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {job.title}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <DollarSign size={11} />
            {job.salary}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({
  product,
  index,
}: { product: (typeof FEATURED_PRODUCTS)[0]; index: number }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      data-ocid={`home.product_card.${index + 1}`}
    >
      <div className="card-elevated hover-royal cursor-pointer h-full group flex flex-col overflow-hidden">
        <div className="bg-muted/40 h-32 flex items-center justify-center text-5xl">
          {product.image}
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <span className="badge-products self-start">{product.category}</span>
          <h3 className="font-display font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-muted-foreground">{product.seller}</p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
            <span className="text-lg font-bold text-primary">
              {product.price}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star size={11} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0.038 285) 0%, oklch(0.12 0.045 270) 40%, oklch(0.11 0.032 300) 70%, oklch(0.09 0.028 285) 100%)",
          minHeight: "520px",
        }}
        data-ocid="home.hero_section"
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-royal.dim_1600x700.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 110%, oklch(0.72 0.18 60 / 0.18) 0%, transparent 70%)",
          }}
        />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.80 0.18 60) 1px, transparent 1px), linear-gradient(90deg, oklch(0.80 0.18 60) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border mb-6"
            style={{
              background: "oklch(0.80 0.18 60 / 0.12)",
              borderColor: "oklch(0.80 0.18 60 / 0.30)",
              color: "oklch(0.85 0.16 60)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            India's #1 Dual Marketplace — Jobs & Products
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-tight mb-5"
            style={{ color: "oklch(0.97 0.008 285)" }}
          >
            Your Gateway to <span className="text-gold">Jobs</span> &amp;{" "}
            <span className="text-gold">Products</span>
            <br className="hidden sm:block" />
            <span style={{ color: "oklch(0.65 0.015 285)" }}>
              {" "}
              — all in one royal place
            </span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10"
            style={{ color: "oklch(0.65 0.015 285)" }}
          >
            Browse thousands of IT &amp; Non-IT jobs, or discover and sell
            products across every category.
            <br className="hidden sm:block" /> Professional. Trusted. Free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/jobs" data-ocid="home.browse_jobs_button">
              <Button
                size="lg"
                className="gap-2 px-7 font-semibold transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.185 60), oklch(0.65 0.20 50))",
                  color: "oklch(0.10 0.02 285)",
                  border: "none",
                  boxShadow: "0 0 24px oklch(0.72 0.18 60 / 0.40)",
                }}
              >
                <Briefcase size={18} />
                Browse Jobs
                <ArrowRight size={15} />
              </Button>
            </Link>
            <Link to="/products" data-ocid="home.browse_products_button">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-7 font-semibold transition-smooth"
                style={{
                  borderColor: "oklch(0.80 0.18 60 / 0.40)",
                  color: "oklch(0.85 0.16 60)",
                  background: "oklch(0.80 0.18 60 / 0.08)",
                }}
              >
                <ShoppingBag size={18} />
                Browse Products
                <ArrowRight size={15} />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-xs"
            style={{ color: "oklch(0.55 0.015 285)" }}
          >
            {[
              "12,400+ Active Jobs",
              "38,000+ Products",
              "2,100+ Companies",
              "500K+ Users",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-amber-400/70" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section
        className="bg-muted/20 border-y border-border py-10 px-4 sm:px-6 lg:px-8"
        data-ocid="home.stats_section"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card-royal p-5 text-center flex flex-col items-center gap-2"
              >
                <div
                  className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}
                >
                  <Icon size={20} className={stat.color} />
                </div>
                <div
                  className={`font-display text-2xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Featured Jobs ──────────────────────────────────────────────────── */}
      <section
        className="bg-background py-16 px-4 sm:px-6 lg:px-8"
        data-ocid="home.featured_jobs_section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                Opportunities
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Featured Jobs
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Hand-picked IT &amp; Non-IT openings from top employers
              </p>
            </div>
            <Link to="/jobs" data-ocid="home.all_jobs_link">
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 hover:text-amber-300 gap-1 hidden sm:flex"
              >
                View all jobs <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_JOBS.map((job, idx) => (
              <JobCard key={job.id} job={job} index={idx} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/jobs" data-ocid="home.all_jobs_link_mobile">
              <Button variant="outline" size="sm" className="gap-1">
                View all jobs <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────────────────── */}
      <section
        className="bg-muted/20 border-y border-border py-16 px-4 sm:px-6 lg:px-8"
        data-ocid="home.featured_products_section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">
                Marketplace
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Top picks across electronics, fashion, home &amp; more
              </p>
            </div>
            <Link to="/products" data-ocid="home.all_products_link">
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-400 hover:text-emerald-300 gap-1 hidden sm:flex"
              >
                View all products <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/products" data-ocid="home.all_products_link_mobile">
              <Button variant="outline" size="sm" className="gap-1">
                View all products <ChevronRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section
        className="bg-background py-16 px-4 sm:px-6 lg:px-8"
        data-ocid="home.how_it_works_section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Simple &amp; Free
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Getting started takes less than 2 minutes. No credit card, no fees
              — ever.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="card-royal p-6 flex flex-col gap-4 relative"
                  data-ocid={`home.how_it_works.${idx + 1}`}
                >
                  <div className="absolute top-4 right-4 font-display text-4xl font-black text-foreground/5 leading-none select-none">
                    {step.step}
                  </div>
                  <div
                    className={`w-11 h-11 rounded-xl ${step.bg} flex items-center justify-center`}
                  >
                    <Icon size={22} className={step.color} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0.038 285) 0%, oklch(0.13 0.048 270) 50%, oklch(0.09 0.028 285) 100%)",
        }}
        data-ocid="home.cta_section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.72 0.18 60 / 0.12) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 20% 50%, oklch(0.55 0.18 280 / 0.10) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border mb-6"
            style={{
              background: "oklch(0.80 0.18 60 / 0.10)",
              borderColor: "oklch(0.80 0.18 60 / 0.25)",
              color: "oklch(0.85 0.16 60)",
            }}
          >
            <Star size={12} fill="currentColor" /> 100% Free to post &amp; list
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "oklch(0.97 0.008 285)" }}
          >
            Ready to get started?
          </h2>
          <p
            className="mb-10 text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.60 0.015 285)" }}
          >
            Post a job opening or list your product for free. Reach thousands of
            candidates and buyers instantly — no subscription required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/jobs/post" data-ocid="home.post_job_cta">
              <Button
                size="lg"
                className="gap-2 px-8 font-semibold w-full sm:w-auto transition-smooth"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.185 60), oklch(0.65 0.20 50))",
                  color: "oklch(0.10 0.02 285)",
                  border: "none",
                  boxShadow: "0 0 20px oklch(0.72 0.18 60 / 0.35)",
                }}
              >
                <Briefcase size={17} /> Post a Job
              </Button>
            </Link>
            <Link to="/products/post" data-ocid="home.post_product_cta">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 font-semibold w-full sm:w-auto transition-smooth"
                style={{
                  borderColor: "oklch(0.65 0.18 145 / 0.40)",
                  color: "oklch(0.70 0.18 145)",
                  background: "oklch(0.65 0.18 145 / 0.08)",
                }}
              >
                <ShoppingBag size={17} /> List a Product
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
