
type job_id = nat

type job = {
    client : address;
    freelancer: address;
    finished : bool;
    deadline : timestamp;
    accepted : bool;
    ok : nat;
    not_ok : nat;
    price : tez;
  }

type reviewers = ( address, unit ) big_map

type clients = ( address, unit ) big_map

type jobs = ( nat, job ) big_map

type storage = {
    admin : address;
    reviewers : reviewers;
    clients : clients;
    jobs : jobs;
  }


type parameter =
  | CreateJob of ( nat * job )
  | AddClient of address
  | RemoveClient of address

let initial_storage : storage = {
    admin = ("tz1iJSrrZ2zTzLb6MqfyWz4pUrCuGeN1LZhz" : address);
    reviewers = Big_map.empty;
    clients = Big_map.empty;
    jobs = Big_map.empty;
  }

[@inline]
let check_admin (store : storage) : unit =
  if store.admin = Tezos.get_sender () then unit else failwith "not admin"

let create_job(store, id, new_job : storage * nat * job) =
  let _ = check_admin store in
  let jobs = store.jobs in
  match (Big_map.find_opt id jobs) with
  | Some _ -> failwith "Job exists"
  | None -> let new_map = Big_map.update id (Some new_job) store.jobs in
              {store with jobs = new_map }

let add_client(store, client : storage * address) : storage =
  let _ = check_admin store in
  let new_clients = Big_map.update client (Some ()) store.clients in
  { store with clients = new_clients }

let remove_client(store, client : storage * address) : storage =
  let _ = check_admin store in
  let new_clients = Big_map.update client None store.clients in
  { store with clients = new_clients }


let main (param, store : parameter * storage) : operation list * storage =
  let new_storage = match param with
    | CreateJob (id, job) -> create_job (store, id, job)
    | AddClient address -> add_client (store, address) in
  [], new_storage
