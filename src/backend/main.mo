import List "mo:core/List";
import Map "mo:core/Map";
import Types "types/jobs-products";
import JobsProductsMixin "mixins/jobs-products-api";

actor {
  let jobs = List.empty<Types.Job>();
  let products = List.empty<Types.Product>();
  let profiles = Map.empty<Principal, Types.UserProfile>();

  include JobsProductsMixin(jobs, products, profiles);
};
