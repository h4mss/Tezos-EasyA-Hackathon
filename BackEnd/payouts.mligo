#include "types.mligo"

// let REVIEWER_ACCOUNT_MINIMUM : tez = 10

let deposit_amount(original_price : tez) : tez = original_price / 10n

let wrap_address_as_contract (receiver : address) : unit contract =
  match (Tezos.get_contract_opt receiver : unit contract option) with
  | Some (contract) -> contract
  | None -> (failwith "Not a contract" : unit contract)

let cancel_job(store, id : storage * nat) : operation list * storage =
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some job -> if job.accepted then [], store else [], store
  | None -> [], store

let refund_freelancer(original_price, freelancer : tez * address) : operation =
  (Tezos.transaction() (deposit_amount(original_price)) (wrap_address_as_contract(freelancer)))

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