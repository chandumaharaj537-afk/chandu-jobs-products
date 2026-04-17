import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/jobs-products";
import Common "../types/common";
import JobsProductsLib "../lib/jobs-products";

mixin (
  jobs : List.List<Types.Job>,
  products : List.List<Types.Product>,
  profiles : Map.Map<Principal, Types.UserProfile>,
) {

  var nextJobId : Nat = 0;
  var nextProductId : Nat = 0;
  var seeded : Bool = false;

  func ensureSeeded() {
    if (not seeded) {
      let (nj, np) = JobsProductsLib.seedSampleData(jobs, products, nextJobId, nextProductId, Time.now());
      nextJobId := nj;
      nextProductId := np;
      seeded := true;
    };
  };

  // ── Job endpoints ───────────────────────────────────────────────────────────

  public shared ({ caller }) func createJob(req : Types.CreateJobRequest) : async Types.Job {
    ensureSeeded();
    let job = JobsProductsLib.createJob(jobs, nextJobId, req, caller, Time.now());
    nextJobId += 1;
    job;
  };

  public query func getJob(id : Common.JobId) : async ?Types.Job {
    JobsProductsLib.getJob(jobs, id);
  };

  public shared ({ caller }) func updateJob(req : Types.UpdateJobRequest) : async Bool {
    JobsProductsLib.updateJob(jobs, req, caller);
  };

  public shared ({ caller }) func deleteJob(id : Common.JobId) : async Bool {
    JobsProductsLib.deleteJob(jobs, id, caller);
  };

  public query func listJobs(filter : Types.JobFilter) : async [Types.Job] {
    JobsProductsLib.listJobs(jobs, filter);
  };

  // ── Product endpoints ───────────────────────────────────────────────────────

  public shared ({ caller }) func createProduct(req : Types.CreateProductRequest) : async Types.Product {
    ensureSeeded();
    let product = JobsProductsLib.createProduct(products, nextProductId, req, caller, Time.now());
    nextProductId += 1;
    product;
  };

  public query func getProduct(id : Common.ProductId) : async ?Types.Product {
    JobsProductsLib.getProduct(products, id);
  };

  public shared ({ caller }) func updateProduct(req : Types.UpdateProductRequest) : async Bool {
    JobsProductsLib.updateProduct(products, req, caller);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    JobsProductsLib.deleteProduct(products, id, caller);
  };

  public query func listProducts(filter : Types.ProductFilter) : async [Types.Product] {
    JobsProductsLib.listProducts(products, filter);
  };

  // ── User profile endpoints ──────────────────────────────────────────────────

  public shared ({ caller }) func upsertProfile(req : Types.UpsertProfileRequest) : async Types.UserProfile {
    JobsProductsLib.upsertProfile(profiles, caller, req, Time.now());
  };

  public query func getProfile(principal : Principal) : async ?Types.UserProfile {
    JobsProductsLib.getProfile(profiles, principal);
  };

  public query ({ caller }) func getMyProfile() : async ?Types.UserProfile {
    JobsProductsLib.getProfile(profiles, caller);
  };

  // ── Init endpoint: seed on first call ──────────────────────────────────────

  public shared func initSeed() : async () {
    ensureSeeded();
  };
};
