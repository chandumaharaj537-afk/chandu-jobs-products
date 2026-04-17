import { Skeleton } from "@/components/ui/skeleton";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const Home = lazy(() => import("./pages/Home"));
const JobsListing = lazy(() => import("./pages/JobsListing"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const JobPost = lazy(() => import("./pages/JobPost"));
const ProductsListing = lazy(() => import("./pages/ProductsListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductPost = lazy(() => import("./pages/ProductPost"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

// ─── Page fallback ────────────────────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col gap-4 p-8 max-w-4xl mx-auto w-full">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-5 w-2/3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
          <Skeleton key={k} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ─── Root layout ─────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Outlet />
    </Suspense>
  ),
});

// ─── Routes ───────────────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: JobsListing,
});

const jobDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/$jobId",
  component: JobDetail,
});

const jobPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs/post",
  component: JobPost,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsListing,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetail,
});

const productPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/post",
  component: ProductPost,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  jobsRoute,
  jobDetailRoute,
  jobPostRoute,
  productsRoute,
  productDetailRoute,
  productPostRoute,
  dashboardRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
