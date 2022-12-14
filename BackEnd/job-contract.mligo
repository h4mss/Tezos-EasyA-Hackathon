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
  | CreateJob of ( nat * tez )
  | AcceptJob of ( nat * address )
  | RemoveJob of nat
  | SetJobDeadline of nat * timestamp
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

let check_client(new_job : job) : bool = 
  let price = new_job.price in
  if Tezos.get_sender() = new_job.client 
  then Tezos.get_amount() = (price + deposit_amount(price))
  else failwith "sender does not match job client"

let check_freelancer(job : job) : bool =
  if Tezos.get_sender() = job.freelancer
  then Tezos.get_amount() = deposit_amount(job.price)
  else failwith "sender does not match job freelancer"

// PRE: job with id exists
let assign_freelancer(store, id, job, freelancer: storage * nat  * job * address) : storage = 
  let jobs = store.jobs in
  let freelancers = store.freelancers in
  match (Big_map.find_opt freelancer freelancers) with
  | Some _ -> let new_jobs = (Big_map.update id (
      Some { job with freelancer = freelancer; started = True }) jobs) in
      { store with jobs = new_jobs }
  | None -> failwith "Not a registered freelancer"

// client user posts job. ensure that client has sufficient deposit.
let create_job(store, id, price : storage * nat * tez) : operation list * storage =
  let new_job : job = {
    client = Tezos.get_sender();
    freelancer = ("tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" : address);
    deadline = (0 : timestamp);
    started = False;
    finished = False;
    accepted = False;
    in_review = False;
    reviewers = Map.empty;
    ok = 0n;
    price = price;
    balance = 0tez;
  } in
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some _ -> failwith "Job already exists"
  | None -> if True
    then let new_jobs = Big_map.update id (Some new_job) store.jobs in 
      [], { store with jobs = new_jobs }
    else failwith "Insufficient funds provided"

let set_job_deadline(store, id, deadline: storage * nat * timestamp) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if job.client = Tezos.get_sender()
  then let new_jobs = Big_map.update id (Some { job with deadline = deadline }) jobs in
    [], { store with jobs = new_jobs }
  else failwith "deadline set by client only"
  | None -> failwith "job does not exist"

// freelancer user accepts job. ensure that freelancer has sufficient deposit.
let accept_job(store, id, freelancer: storage * nat * address) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if True
    then [], assign_freelancer(store, id, job, freelancer) 
    else failwith "Insufficent funds provided"
  | None -> failwith "Job does not exist"

// reviewer accepts assignment
let assign_reviewer(store, id, reviewer : storage * nat * address) : operation list * storage =
  let jobs = store.jobs in
  let reviewers = store.reviewers in
  match (Big_map.find_opt id jobs) with 
  | Some job -> (
    match (Big_map.find_opt reviewer reviewers) with
    | Some bal -> if bal < reviewer_account_minimum 
      then failwith "reviewer insufficient funds for deposit"
      else let new_reviewers = Big_map.update reviewer (bal - review_deposit) reviewers in
      let new_job_reviewers = Map.update reviewer (Some Undecided) job.reviewers in
      let new_jobs = Big_map.update id (Some { job with reviewers = new_job_reviewers; balance = job.balance + review_deposit }) jobs in
      [], { store with reviewers = new_reviewers; jobs = new_jobs }
    | None -> failwith "not a registered reviewer"
  )
  | None -> failwith "job not exist"

let vote_job(store, id, vote : storage * nat * bool) : operation list * storage =
  let jobs = store.jobs in
  let reviewer = Tezos.get_sender() in
  match (Big_map.find_opt id jobs) with
  | Some job -> (
    let reviewers = job.reviewers in
    match (Map.find_opt reviewer reviewers) with
    | Some _ -> let new_job_reviewers = 
      Map.update reviewer (Some (if vote then Yes else No)) reviewers in
    let new_jobs = Big_map.update id (Some { job with reviewers = new_job_reviewers; 
    ok = (if vote then job.ok + 1n else job.ok) }) jobs in
    [], { store with jobs = new_jobs }
    | None -> failwith "reviewer not reviewing for this job"
  )
  | None-> failwith "job not found"

let claim_complete(store, id : storage * nat) : operation list * storage = 
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if job.freelancer = Tezos.get_sender() 
  then let new_jobs = (Big_map.update id (Some {job with finished = True}) jobs) in
  [], {store with jobs = (new_jobs)}
  else failwith "not the freelancer of the job"
  | None -> failwith "no such job"

let accept_or_dispute(store, id, accepted : storage * nat * bool) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if (job.client = Tezos.get_sender() && job.finished = true)
  then let new_jobs = Big_map.update id (Some {job with accepted = accepted}) jobs in
  [], {store with jobs = new_jobs}
  else [], store
  | None -> failwith "no such job"

// cancel and remove job. refund client (and freelancer)
let remove_job(store, id : storage * nat) : operation list * storage =
  let jobs = store.jobs in 
  let operations = cancel_job(store, id) in
  match (Big_map.find_opt id jobs) with
  | Some job -> let new_jobs = (Big_map.remove id jobs) in
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
    | AcceptJob (id, freelancer) -> accept_job (store, id, freelancer) 
    | RemoveJob id -> remove_job(store, id)
    | SetJobDeadline (id, timestamp) -> set_job_deadline (store, id, timestamp)
    | ReviewerDeposit address -> reviewer_deposit (store, address) 
    | ReviewerWithDraw (address, amount) -> reviewer_withdraw (store, address, amount) in
  transaction_list, new_storage

