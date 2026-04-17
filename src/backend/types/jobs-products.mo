import Common "common";

module {
  // ── Job types ──────────────────────────────────────────────────────────────

  public type JobCategory = { #IT; #NonIT };

  public type ApplyMethod = { #url : Text; #email : Text };

  public type Job = {
    id : Common.JobId;
    title : Text;
    company : Text;
    category : JobCategory;
    location : Text;
    salary : ?Text;
    description : Text;
    requirements : Text;
    postedAt : Common.Timestamp;
    applyMethod : ApplyMethod;
    posterPrincipal : Principal;
  };

  public type CreateJobRequest = {
    title : Text;
    company : Text;
    category : JobCategory;
    location : Text;
    salary : ?Text;
    description : Text;
    requirements : Text;
    applyMethod : ApplyMethod;
  };

  public type UpdateJobRequest = {
    id : Common.JobId;
    title : Text;
    company : Text;
    category : JobCategory;
    location : Text;
    salary : ?Text;
    description : Text;
    requirements : Text;
    applyMethod : ApplyMethod;
  };

  public type JobFilter = {
    category : ?JobCategory;
    location : ?Text;
    keyword : ?Text;
  };

  // ── Product types ───────────────────────────────────────────────────────────

  public type Product = {
    id : Common.ProductId;
    title : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrls : [Text];
    sellerName : Text;
    sellerContact : Text;
    listedAt : Common.Timestamp;
    sellerPrincipal : Principal;
  };

  public type CreateProductRequest = {
    title : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrls : [Text];
    sellerName : Text;
    sellerContact : Text;
  };

  public type UpdateProductRequest = {
    id : Common.ProductId;
    title : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrls : [Text];
    sellerName : Text;
    sellerContact : Text;
  };

  public type ProductFilter = {
    category : ?Text;
    keyword : ?Text;
  };

  // ── User profile types ─────────────────────────────────────────────────────

  public type UserRole = { #jobSeeker; #employer; #seller };

  public type UserProfile = {
    principal : Principal;
    name : Text;
    role : UserRole;
    contactInfo : Text;
    bio : Text;
    createdAt : Common.Timestamp;
  };

  public type UpsertProfileRequest = {
    name : Text;
    role : UserRole;
    contactInfo : Text;
    bio : Text;
  };
};
