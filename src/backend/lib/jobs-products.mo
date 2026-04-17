import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/jobs-products";
import Common "../types/common";

module {

  // ── Job operations ──────────────────────────────────────────────────────────

  public func createJob(
    jobs : List.List<Types.Job>,
    nextId : Nat,
    req : Types.CreateJobRequest,
    caller : Principal,
    now : Common.Timestamp,
  ) : Types.Job {
    let job : Types.Job = {
      id = nextId;
      title = req.title;
      company = req.company;
      category = req.category;
      location = req.location;
      salary = req.salary;
      description = req.description;
      requirements = req.requirements;
      postedAt = now;
      applyMethod = req.applyMethod;
      posterPrincipal = caller;
    };
    jobs.add(job);
    job;
  };

  public func getJob(jobs : List.List<Types.Job>, id : Common.JobId) : ?Types.Job {
    jobs.find(func(j) { j.id == id });
  };

  public func updateJob(
    jobs : List.List<Types.Job>,
    req : Types.UpdateJobRequest,
    caller : Principal,
  ) : Bool {
    var found = false;
    jobs.mapInPlace(func(j) {
      if (j.id == req.id and j.posterPrincipal == caller) {
        found := true;
        {
          j with
          title = req.title;
          company = req.company;
          category = req.category;
          location = req.location;
          salary = req.salary;
          description = req.description;
          requirements = req.requirements;
          applyMethod = req.applyMethod;
        };
      } else { j };
    });
    found;
  };

  public func deleteJob(
    jobs : List.List<Types.Job>,
    id : Common.JobId,
    caller : Principal,
  ) : Bool {
    let before = jobs.size();
    let remaining = jobs.filter(func(j) {
      not (j.id == id and j.posterPrincipal == caller)
    });
    jobs.clear();
    jobs.append(remaining);
    jobs.size() < before;
  };

  public func listJobs(
    jobs : List.List<Types.Job>,
    filter : Types.JobFilter,
  ) : [Types.Job] {
    jobs.filter(func(j) {
      let catOk = switch (filter.category) {
        case null true;
        case (?cat) {
          switch (j.category, cat) {
            case (#IT, #IT) true;
            case (#NonIT, #NonIT) true;
            case _ false;
          };
        };
      };
      let locOk = switch (filter.location) {
        case null true;
        case (?loc) {
          j.location.toLower().contains(#text (loc.toLower()))
        };
      };
      let kwOk = switch (filter.keyword) {
        case null true;
        case (?kw) {
          let k = kw.toLower();
          j.title.toLower().contains(#text k) or
          j.company.toLower().contains(#text k) or
          j.description.toLower().contains(#text k);
        };
      };
      catOk and locOk and kwOk;
    }).toArray();
  };

  // ── Product operations ──────────────────────────────────────────────────────

  public func createProduct(
    products : List.List<Types.Product>,
    nextId : Nat,
    req : Types.CreateProductRequest,
    caller : Principal,
    now : Common.Timestamp,
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      title = req.title;
      category = req.category;
      price = req.price;
      description = req.description;
      imageUrls = req.imageUrls;
      sellerName = req.sellerName;
      sellerContact = req.sellerContact;
      listedAt = now;
      sellerPrincipal = caller;
    };
    products.add(product);
    product;
  };

  public func getProduct(products : List.List<Types.Product>, id : Common.ProductId) : ?Types.Product {
    products.find(func(p) { p.id == id });
  };

  public func updateProduct(
    products : List.List<Types.Product>,
    req : Types.UpdateProductRequest,
    caller : Principal,
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == req.id and p.sellerPrincipal == caller) {
        found := true;
        {
          p with
          title = req.title;
          category = req.category;
          price = req.price;
          description = req.description;
          imageUrls = req.imageUrls;
          sellerName = req.sellerName;
          sellerContact = req.sellerContact;
        };
      } else { p };
    });
    found;
  };

  public func deleteProduct(
    products : List.List<Types.Product>,
    id : Common.ProductId,
    caller : Principal,
  ) : Bool {
    let before = products.size();
    let remaining = products.filter(func(p) {
      not (p.id == id and p.sellerPrincipal == caller)
    });
    products.clear();
    products.append(remaining);
    products.size() < before;
  };

  public func listProducts(
    products : List.List<Types.Product>,
    filter : Types.ProductFilter,
  ) : [Types.Product] {
    products.filter(func(p) {
      let catOk = switch (filter.category) {
        case null true;
        case (?cat) {
          p.category.toLower().contains(#text (cat.toLower()))
        };
      };
      let kwOk = switch (filter.keyword) {
        case null true;
        case (?kw) {
          let k = kw.toLower();
          p.title.toLower().contains(#text k) or
          p.category.toLower().contains(#text k) or
          p.description.toLower().contains(#text k);
        };
      };
      catOk and kwOk;
    }).toArray();
  };

  // ── User profile operations ─────────────────────────────────────────────────

  public func upsertProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    req : Types.UpsertProfileRequest,
    now : Common.Timestamp,
  ) : Types.UserProfile {
    let existing = profiles.get(caller);
    let profile : Types.UserProfile = switch (existing) {
      case (?p) {
        { p with name = req.name; role = req.role; contactInfo = req.contactInfo; bio = req.bio };
      };
      case null {
        {
          principal = caller;
          name = req.name;
          role = req.role;
          contactInfo = req.contactInfo;
          bio = req.bio;
          createdAt = now;
        };
      };
    };
    profiles.add(caller, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    principal : Principal,
  ) : ?Types.UserProfile {
    profiles.get(principal);
  };

  // ── Seed / sample data ──────────────────────────────────────────────────────

  public func seedSampleData(
    jobs : List.List<Types.Job>,
    products : List.List<Types.Product>,
    nextJobId : Nat,
    nextProductId : Nat,
    now : Common.Timestamp,
  ) : (Nat, Nat) {
    let anon = Principal.fromText("2vxsx-fae");

    // ── IT Jobs (8) ─────────────────────────────────────────────────────────
    let itJobs : [Types.Job] = [
      {
        id = nextJobId + 0;
        title = "Senior React Developer";
        company = "TechSpark Solutions";
        category = #IT;
        location = "Hyderabad, India";
        salary = ?"₹18–28 LPA";
        description = "Build and maintain scalable React applications for enterprise clients. Work with a talented team on cutting-edge web products.";
        requirements = "5+ years React, TypeScript, Redux, REST APIs, Git.";
        postedAt = now;
        applyMethod = #email "careers@techspark.io";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 1;
        title = "Backend Engineer – Node.js";
        company = "CloudNine Systems";
        category = #IT;
        location = "Bangalore, India";
        salary = ?"₹15–22 LPA";
        description = "Design and develop high-performance REST and GraphQL APIs. Collaborate with frontend teams and DevOps to ship reliable services.";
        requirements = "3+ years Node.js, Express, PostgreSQL, Docker, AWS basics.";
        postedAt = now;
        applyMethod = #url "https://cloudninesystems.com/jobs/backend-nodejs";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 2;
        title = "DevOps Engineer";
        company = "InfraGrid Technologies";
        category = #IT;
        location = "Pune, India";
        salary = ?"₹14–20 LPA";
        description = "Own CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS and GCP. Improve deployment velocity and reliability.";
        requirements = "Kubernetes, Terraform, Jenkins, AWS/GCP, strong Linux skills.";
        postedAt = now;
        applyMethod = #email "devops-hiring@infragrid.in";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 3;
        title = "Data Scientist";
        company = "InsightAI Labs";
        category = #IT;
        location = "Chennai, India";
        salary = ?"₹16–25 LPA";
        description = "Build predictive models and data pipelines. Translate business questions into analytical solutions using Python and ML frameworks.";
        requirements = "Python, scikit-learn, TensorFlow or PyTorch, SQL, strong statistics.";
        postedAt = now;
        applyMethod = #url "https://insightailabs.com/careers/data-scientist";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 4;
        title = "Full Stack Developer";
        company = "Nexora Digital";
        category = #IT;
        location = "Mumbai, India";
        salary = ?"₹12–18 LPA";
        description = "Develop end-to-end web features across React frontend and Spring Boot backend. Take ownership of features from design to production.";
        requirements = "React, Java/Spring Boot, MySQL, REST APIs, 3+ years experience.";
        postedAt = now;
        applyMethod = #email "join@nexora.digital";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 5;
        title = "Mobile App Developer – Flutter";
        company = "AppCraft Studio";
        category = #IT;
        location = "Delhi NCR, India";
        salary = ?"₹10–16 LPA";
        description = "Create beautiful, performant cross-platform mobile apps using Flutter. Work closely with UX designers and product managers.";
        requirements = "2+ years Flutter, Dart, REST APIs, Firebase, iOS & Android deployment.";
        postedAt = now;
        applyMethod = #url "https://appcraft.studio/careers";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 6;
        title = "Cybersecurity Analyst";
        company = "SecureNet India";
        category = #IT;
        location = "Hyderabad, India";
        salary = ?"₹14–22 LPA";
        description = "Protect company infrastructure through threat monitoring, vulnerability assessments, and incident response.";
        requirements = "CEH or CISSP preferred, SIEM tools, network security, pen testing basics.";
        postedAt = now;
        applyMethod = #email "security-jobs@securenet.in";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 7;
        title = "Cloud Architect – AWS";
        company = "Stratosphere Cloud";
        category = #IT;
        location = "Bangalore, India";
        salary = ?"₹28–40 LPA";
        description = "Design and govern cloud architecture for large-scale SaaS platforms. Lead migration projects and define best-practice standards.";
        requirements = "AWS Certified Solutions Architect, 8+ years IT, microservices, cost optimisation.";
        postedAt = now;
        applyMethod = #url "https://stratospherecloud.com/careers/architect";
        posterPrincipal = anon;
      },
    ];

    // ── Non-IT Jobs (5) ─────────────────────────────────────────────────────
    let nonItJobs : [Types.Job] = [
      {
        id = nextJobId + 8;
        title = "Sales Manager – FMCG";
        company = "BrightMart Retail";
        category = #NonIT;
        location = "Mumbai, India";
        salary = ?"₹6–10 LPA + incentives";
        description = "Lead a regional sales team for FMCG brands. Achieve revenue targets and build strong retailer relationships.";
        requirements = "5+ years FMCG sales, team management, strong communication, MBA preferred.";
        postedAt = now;
        applyMethod = #email "sales.hiring@brightmart.in";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 9;
        title = "HR Manager";
        company = "PeopleFirst Consulting";
        category = #NonIT;
        location = "Pune, India";
        salary = ?"₹7–12 LPA";
        description = "Manage end-to-end HR operations including recruitment, onboarding, performance management, and employee relations.";
        requirements = "MBA HR, 5+ years HR experience, HRIS knowledge, labour law awareness.";
        postedAt = now;
        applyMethod = #url "https://peoplefirst.co.in/jobs/hr-manager";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 10;
        title = "Accountant – CA Inter";
        company = "Finmark Advisory";
        category = #NonIT;
        location = "Chennai, India";
        salary = ?"₹4–7 LPA";
        description = "Handle day-to-day accounting, GST filing, payroll processing, and financial reporting for SME clients.";
        requirements = "CA Inter / B.Com, 2+ years experience, Tally, Excel, GST knowledge.";
        postedAt = now;
        applyMethod = #email "accounts@finmarkadvisory.com";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 11;
        title = "Digital Marketing Executive";
        company = "GrowthPulse Agency";
        category = #NonIT;
        location = "Delhi, India";
        salary = ?"₹3.5–6 LPA";
        description = "Run paid ad campaigns on Google and Meta, manage SEO strategy, create content calendars, and report on KPIs.";
        requirements = "2+ years digital marketing, Google Ads, Meta Ads, SEO tools, analytics.";
        postedAt = now;
        applyMethod = #url "https://growthpulse.agency/careers";
        posterPrincipal = anon;
      },
      {
        id = nextJobId + 12;
        title = "Operations Manager – Logistics";
        company = "SwiftMove Logistics";
        category = #NonIT;
        location = "Hyderabad, India";
        salary = ?"₹8–14 LPA";
        description = "Oversee warehouse operations, fleet management, and last-mile delivery efficiency for an e-commerce logistics provider.";
        requirements = "7+ years logistics/supply chain, WMS knowledge, team leadership, cost control.";
        postedAt = now;
        applyMethod = #email "ops.careers@swiftmove.in";
        posterPrincipal = anon;
      },
    ];

    // ── Products (8) ────────────────────────────────────────────────────────
    let sampleProducts : [Types.Product] = [
      {
        id = nextProductId + 0;
        title = "Apple MacBook Air M2 (2024)";
        category = "Electronics";
        price = 99900.0;
        description = "Ultra-thin laptop with M2 chip, 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD. Perfect for professionals on the go.";
        imageUrls = ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"];
        sellerName = "Priya Electronics";
        sellerContact = "priya.electronics@gmail.com";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 1;
        title = "Sony WH-1000XM5 Headphones";
        category = "Electronics";
        price = 24990.0;
        description = "Industry-leading noise cancellation, 30-hour battery life, exceptional call quality, and foldable design.";
        imageUrls = ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"];
        sellerName = "AudioZone Shop";
        sellerContact = "audiozone@shop.in";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 2;
        title = "Royal Enfield Meteor 350";
        category = "Vehicles";
        price = 195000.0;
        description = "2023 model, 5,800 km driven, excellent condition. Includes touring accessories — panniers, windscreen, and crash guard.";
        imageUrls = ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"];
        sellerName = "Rajan's Motors";
        sellerContact = "+91 98765 43210";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 3;
        title = "Handmade Ethnic Kurti Set";
        category = "Fashion";
        price = 1299.0;
        description = "Beautiful block-print cotton kurti with matching dupatta. Available in S, M, L, XL. Machine-washable fabric.";
        imageUrls = ["https://images.unsplash.com/photo-1594938298603-c8148c4b4d08?w=600"];
        sellerName = "Meera Boutique";
        sellerContact = "meeraboutique.jaipur@gmail.com";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 4;
        title = "2BHK Furnished Flat for Rent";
        category = "Real Estate";
        price = 22000.0;
        description = "Spacious 2BHK, fully furnished with modern appliances, 24/7 security, 2 km from Hitec City metro. Immediate availability.";
        imageUrls = ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"];
        sellerName = "SkyHomes Realty";
        sellerContact = "skyhomes.hyd@realty.in";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 5;
        title = "Samsung 55\" 4K Smart TV";
        category = "Electronics";
        price = 49990.0;
        description = "QLED 4K display, 120Hz refresh, built-in Alexa and Google Assistant, 4 HDMI ports. Great for home theatre setup.";
        imageUrls = ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600"];
        sellerName = "HomeTech Mart";
        sellerContact = "hometechmart@outlook.com";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 6;
        title = "Organic Honey – 500g Pack";
        category = "Food & Grocery";
        price = 349.0;
        description = "Pure raw forest honey from Himachal Pradesh. No added sugar, no preservatives. Lab-tested and certified organic.";
        imageUrls = ["https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600"];
        sellerName = "HillGrove Organics";
        sellerContact = "hillgrove.organics@farm.in";
        listedAt = now;
        sellerPrincipal = anon;
      },
      {
        id = nextProductId + 7;
        title = "Adjustable Dumbbells Set (5–30 kg)";
        category = "Sports & Fitness";
        price = 7500.0;
        description = "Compact adjustable dumbbell set with quick-change weight selector. Includes storage rack. Ideal for home gym workouts.";
        imageUrls = ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600"];
        sellerName = "FitZone Equipment";
        sellerContact = "fitzone.equipment@gmail.com";
        listedAt = now;
        sellerPrincipal = anon;
      },
    ];

    for (job in itJobs.values()) { jobs.add(job) };
    for (job in nonItJobs.values()) { jobs.add(job) };
    for (product in sampleProducts.values()) { products.add(product) };

    (nextJobId + 13, nextProductId + 8);
  };
};
