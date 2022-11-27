#include "types.mligo"
#include "user-management.mligo"
#include "payouts.mligo"

type parameter =
  | AddClient of address
  | RemoveClient of address
  | AddFreelancer of address
  | RemoveFreelancer of address
  | AddReviewer of address
  | RemoveReviewer of address
  | CreateJob of ( nat * job )
  | AcceptJob of ( nat * address )
  | ReviewerDeposit of address
  | ReviewerWithDraw of ( address * tez )

let initial_storage : storage = {
    admin = ("tz1iJSrrZ2zTzLb6MqfyWz4pUrCuGeN1LZhz" : address);
    clients = Big_map.empty;
    freelancers = Big_map.empty;
    reviewers = Big_map.empty;
    jobs = Big_map.empty;
  }

[@inline]
let check_admin (store : storage) : unit =
  if store.admin = Tezos.get_sender () then unit else failwith "not admin"

let init_job(new_job : job) : job =
  { new_job with ok = 0n; not_ok = 0n; balance = 0tez; 
  finished = False; accepted = False }

let check_client(new_job : job) : bool = 
  let price = new_job.price in
  Tezos.get_amount() = (price + deposit_amount(price))

let check_freelancer(job : job) : bool =
  Tezos.get_amount() = deposit_amount(job.price)

// PRE: job with id exists
let assign_freelancer(store, id, job, freelancer: storage * nat  * job * address) : storage = 
  let jobs = store.jobs in
  let freelancers = store.freelancers in
  match (Big_map.find_opt freelancer freelancers) with
  | Some _ -> let new_jobs = (Big_map.update id (
      Some { job with freelancer = freelancer }) jobs) in
      { store with jobs = new_jobs }
  | None -> failwith "Not a registered freelancer"

// client user posts job. ensure that client has sufficient deposit.
let create_job(store, id, new_job : storage * nat * job) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some _ -> failwith "Job already exists"
  | None -> if check_client(init_job(new_job)) 
    then let new_jobs = Big_map.update id (Some new_job) store.jobs in 
      [], { store with jobs = new_jobs }
    else failwith "Insufficient funds provided"

// freelancer user accepts job. ensure that freelancer has sufficient deposit.
let accept_job(store, id, freelancer: storage * nat * address) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if check_freelancer(job) 
    then [], assign_freelancer(store, id, job, freelancer) 
    else failwith "Insufficent funds provided"
  | None -> failwith "Job does not exist"

// cancel and remove job. refund client (and freelancer)
let remove_job(store, id : storage * nat) : operation list * storage =
  let jobs = store.jobs in 
  match (Big_map.find_opt id jobs) with
  | Some job -> let new_jobs = Big_map.remove id jobs in
  [], { store with jobs = new_jobs }
  | None -> failwith "Job does not exist"

let main (param, store : parameter * storage) : operation list * storage =
  let (transaction_list, new_storage) = match param with
    | AddClient address -> add_client (store, address) 
    | RemoveClient address -> remove_client (store, address) 
    | AddFreelancer address -> add_freelancer (store, address) 
    | RemoveFreelancer address -> remove_freelancer (store, address) 
    | AddReviewer address -> add_reviewer (store, address) 
    | RemoveReviewer address -> remove_reviewer (store, address) 
    | CreateJob (id, job) -> create_job (store, id, job)
    | AcceptJob (id, freelancer) -> accept_job(store, id, freelancer) 
    | ReviewerDeposit address -> reviewer_deposit(store, address) 
    | ReviewerWithDraw (address, amount) -> reviewer_withdraw(store, address, amount) in
  transaction_list, new_storage

