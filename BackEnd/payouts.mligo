#include "types.mligo"

let reviewer_account_minimum : tez = 10tez
let review_deposit : tez = 5tez

let deposit_amount(original_price : tez) : tez = original_price / 10n

let wrap_address_as_contract (receiver : address) : unit contract =
  match (Tezos.get_contract_opt receiver : unit contract option) with
  | Some (contract) -> contract
  | None -> (failwith "Not a contract" : unit contract)

let refund_full(original_price, receiver : tez * address) : operation =
  Tezos.transaction() (deposit_amount(original_price) + original_price) (wrap_address_as_contract(receiver))

let refund_deposit(original_price, receiver : tez * address) : operation =
  Tezos.transaction() (deposit_amount(original_price)) (wrap_address_as_contract(receiver))

let cancel_job(store, id : storage * nat) : operation list =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> let ref_cli_op = refund_full(job.price, job.client) in
    if job.started 
    then [ref_cli_op; (refund_deposit(job.price, job.freelancer))] 
    else [ref_cli_op]
  | None -> failwith "job id does not exist"

let successful_job(store, id : storage * nat) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> let ref_cli_op = refund_deposit(job.price, job.client) in
  let pay_fl_op = refund_full(job.price, job.freelancer) in
  [ref_cli_op; pay_fl_op], store
  | None -> failwith "job id does not exist"

let complete_review(store, id, reviewer : storage * nat * address) : operation list * storage =
  let jobs = store.jobs in
  let reviewers = store.reviewers in
  match (Big_map.find_opt id jobs) with
  | Some job -> 
  (
    match (Map.find_opt reviewer job.reviewers) with 
    | Some vote -> 
        let num_rev = Map.size job.reviewers in
        let consensus = job.ok >= (num_rev / 2n) in
        if (vote = Yes && consensus) || (vote = No && (not consensus)) 
        then
        let minority_num : nat = if consensus then num_rev + job.ok else job.ok in
        failwith ""
        else [], store
    | None-> failwith ""
  )
  | None -> failwith ""



let reviewer_deposit(store, reviewer : storage * address) : operation list * storage = 
  let reviewers = store.reviewers in
  match (Big_map.find_opt reviewer reviewers) with
  | Some bal -> let new_reviewers = 
  (Big_map.update reviewer (Some (bal + Tezos.get_amount())) reviewers) in 
  [], { store with reviewers = new_reviewers }
  | None -> failwith "reviewer not registered, cannot deposit"

let reviewer_withdraw(store, reviewer, withdraw_amount : storage * address * tez) : operation list * storage = 
  let reviewers = store.reviewers in
  match (Big_map.find_opt reviewer reviewers) with
  | Some bal -> if bal < withdraw_amount 
  then failwith "attempted withdrawing more than balance"
  else let new_reviewers = 
  Big_map.update reviewer (bal - withdraw_amount) reviewers in
  [Tezos.transaction() withdraw_amount (wrap_address_as_contract(reviewer))], 
  { store with reviewers = new_reviewers }
  | None -> failwith "reviewer not registered, cannot withdraw"