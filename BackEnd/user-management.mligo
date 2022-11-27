#include "types.mligo"

[@inline]
let check_admin (store : storage) : unit =
  if store.admin = Tezos.get_sender () then unit else failwith "not admin"

// registering client users
let add_client(store, client : storage * address) : operation list * storage =
  let _ = check_admin store in
  let clients = store.clients in
  match (Big_map.find_opt client clients) with
  | Some _ -> failwith "client already registered"
  | None -> let new_clients = Big_map.update client (Some ()) clients in
    [], { store with clients = new_clients }

// deleting client users
let remove_client(store, client : storage * address) : operation list * storage =
  let _ = check_admin store in
  let new_clients = Big_map.update client None store.clients in
  [], { store with clients = new_clients }

// adding freelancer users
let add_freelancer(store, freelancer : storage * address) : operation list * storage =
  let _ = check_admin store in
  let freelancers = store.freelancers in
  match (Big_map.find_opt freelancer freelancers) with
  | Some _ -> failwith "freelancer already registered"
  | None -> let new_freelancers = Big_map.update freelancer (Some ()) freelancers in
  [], { store with freelancers = new_freelancers }

// removing freelancer users
let remove_freelancer(store, freelancer : storage * address) : operation list * storage =
  let _ = check_admin store in
  let new_freelancers = Big_map.update freelancer None store.freelancers in
  [], { store with freelancers = new_freelancers }

// addidng reviewer users
let add_reviewer(store, reviewer : storage * address) : operation list * storage =
  let _ = check_admin store in
  let reviewers = store.reviewers in
  match (Big_map.find_opt reviewer reviewers) with
  | Some _ -> failwith "reviewer already registered"
  | None -> let new_reviewers = Big_map.update reviewer (Some 0tez) reviewers in
  [], { store with reviewers = new_reviewers }

// removing reviewer users
let remove_reviewer(store, reviewer : storage * address) : operation list * storage =
  let _ = check_admin store in
  let reviewers = store.reviewers in
  match (Big_map.find_opt reviewer reviewers) with
  | Some bal -> if bal > 0tez 
  then failwith "cannot remove reviewer with balance leftover"
  else let new_reviewers = Big_map.update reviewer None reviewers in
  [], { store with reviewers = new_reviewers }
  | None -> [], store
