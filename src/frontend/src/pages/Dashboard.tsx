import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  type BackendJob,
  type BackendProduct,
  formatPostedAt,
  getSalaryText,
  useListJobs,
  useListProducts,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Briefcase,
  Clock,
  LayoutDashboard,
  Loader2,
  LogIn,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  User,
} from "lucide-react";
import { useState } from "react";

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobRow({ job, index }: { job: BackendJob; index: number }) {
  const salary = getSalaryText(job.salary);
  const isIT = "IT" in job.category;
  return (
    <Link
      to="/jobs/$jobId"
      params={{ jobId: job.id }}
      data-ocid={`dashboard.job_item.${index}`}
    >
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-amber-500/20 transition-smooth group">
        <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
          <Briefcase size={16} className="text-amber-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-amber-500 transition-colors">
            {job.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {job.company}
          </p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {job.location && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={10} /> {job.location}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={10} /> {formatPostedAt(job.postedAt)}
            </span>
            {salary && (
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                {salary}
              </span>
            )}
          </div>
        </div>
        <span className="shrink-0 badge-jobs">{isIT ? "IT" : "Non-IT"}</span>
      </div>
    </Link>
  );
}

function ProductRow({
  product,
  index,
}: { product: BackendProduct; index: number }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      data-ocid={`dashboard.product_item.${index}`}
    >
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-emerald-500/20 transition-smooth group">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
          <Package size={16} className="text-emerald-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-emerald-500 transition-colors">
            {product.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {product.category}
          </p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.sellerContact && (
              <span className="text-xs text-muted-foreground truncate">
                {product.sellerContact}
              </span>
            )}
          </div>
        </div>
        <span className="badge-products shrink-0">Active</span>
      </div>
    </Link>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3" data-ocid="dashboard.loading_state">
      {[1, 2, 3].map((k) => (
        <div
          key={k}
          className="flex items-center gap-3 p-4 rounded-lg bg-muted/30"
        >
          <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-2 text-destructive text-sm py-4 px-3 rounded-lg bg-destructive/10"
      data-ocid="dashboard.error_state"
    >
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { isAuthenticated, isLoading, login, principal } = useAuth();
  const [activeTab, setActiveTab] = useState<"jobs" | "products">("jobs");

  // Fetch my jobs (filtered by principal)
  const {
    data: myJobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useListJobs({ category: [], location: [], keyword: [] });
  const filteredJobs = principal
    ? myJobs.filter((j) => j.posterPrincipal?.toText?.() === principal)
    : [];

  // Fetch my products (filtered by principal)
  const {
    data: myProducts = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useListProducts({ category: [], keyword: [] });
  const filteredProducts = principal
    ? myProducts.filter((p) => p.sellerPrincipal?.toText?.() === principal)
    : [];

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Layout>
        <div
          className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground"
          data-ocid="dashboard.loading_state"
        >
          <Loader2 size={28} className="animate-spin text-primary" />
          <p className="text-sm">Connecting to Internet Identity…</p>
        </div>
      </Layout>
    );
  }

  // ── Not authenticated ─────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <Layout>
        <div
          className="py-24 text-center max-w-md mx-auto"
          data-ocid="dashboard.unauthenticated_state"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <LogIn size={32} className="text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Sign in to your Dashboard
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Access your personal dashboard to manage your job postings and
            product listings in one place.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="gap-2"
            data-ocid="dashboard.signin_button"
          >
            <LogIn size={16} />
            Sign In with Internet Identity
          </Button>
        </div>
      </Layout>
    );
  }

  // ── Authenticated ─────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="py-8" data-ocid="dashboard.page">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <LayoutDashboard size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                My Dashboard
              </h1>
              {principal && (
                <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate max-w-[260px]">
                  {principal.length > 30
                    ? `${principal.slice(0, 14)}…${principal.slice(-8)}`
                    : principal}
                </p>
              )}
            </div>
          </div>
          <Link to="/profile" data-ocid="dashboard.profile_link">
            <Button variant="outline" size="sm" className="gap-1.5">
              <User size={14} /> Edit Profile
            </Button>
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card-royal p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Briefcase size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {jobsLoading ? "—" : filteredJobs.length}
              </p>
              <p className="text-xs text-muted-foreground">Job Posts</p>
            </div>
          </div>
          <div className="card-royal p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <ShoppingBag size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {productsLoading ? "—" : filteredProducts.length}
              </p>
              <p className="text-xs text-muted-foreground">Product Listings</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "jobs" | "products")}
          data-ocid="dashboard.tabs"
        >
          <div className="flex items-center justify-between mb-4 gap-3">
            <TabsList data-ocid="dashboard.tab_list">
              <TabsTrigger
                value="jobs"
                className="gap-1.5"
                data-ocid="dashboard.jobs_tab"
              >
                <Briefcase size={14} /> My Jobs (
                {jobsLoading ? "…" : filteredJobs.length})
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="gap-1.5"
                data-ocid="dashboard.products_tab"
              >
                <ShoppingBag size={14} /> My Products (
                {productsLoading ? "…" : filteredProducts.length})
              </TabsTrigger>
            </TabsList>

            {activeTab === "jobs" ? (
              <Link to="/jobs/post" data-ocid="dashboard.post_job_button">
                <Button size="sm" className="gap-1.5">
                  <Plus size={13} /> Post Job
                </Button>
              </Link>
            ) : (
              <Link
                to="/products/post"
                data-ocid="dashboard.list_product_button"
              >
                <Button size="sm" className="gap-1.5">
                  <Plus size={13} /> List Product
                </Button>
              </Link>
            )}
          </div>

          {/* Jobs panel */}
          <TabsContent value="jobs" data-ocid="dashboard.jobs_section">
            <div className="card-elevated p-5">
              {jobsLoading ? (
                <ListSkeleton />
              ) : jobsError ? (
                <ErrorState message="Failed to load job listings. Please try again." />
              ) : filteredJobs.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="dashboard.jobs_empty_state"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={26} className="text-amber-500/60" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    No jobs posted yet
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Post your first job listing and reach thousands of
                    candidates.
                  </p>
                  <Link to="/jobs/post">
                    <Button
                      size="sm"
                      data-ocid="dashboard.jobs_empty_post_button"
                    >
                      <Plus size={13} className="mr-1.5" /> Post your first job
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredJobs.map((job, idx) => (
                    <JobRow key={job.id} job={job} index={idx + 1} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Products panel */}
          <TabsContent value="products" data-ocid="dashboard.products_section">
            <div className="card-elevated p-5">
              {productsLoading ? (
                <ListSkeleton />
              ) : productsError ? (
                <ErrorState message="Failed to load product listings. Please try again." />
              ) : filteredProducts.length === 0 ? (
                <div
                  className="text-center py-12"
                  data-ocid="dashboard.products_empty_state"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={26} className="text-emerald-500/60" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    No products listed yet
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    List your first product and connect with buyers across
                    India.
                  </p>
                  <Link to="/products/post">
                    <Button
                      size="sm"
                      data-ocid="dashboard.products_empty_list_button"
                    >
                      <Plus size={13} className="mr-1.5" /> List your first
                      product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product, idx) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      index={idx + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
