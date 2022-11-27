type job_id = nat

type vote =
    Yes |
    No |
    Undecided

type job = {
    client : address;
    freelancer: address;
    deadline : timestamp;
    started : bool;
    finished : bool;
    accepted : bool;
    in_review : bool;
    reviewers : ( address, vote ) map;
    ok : nat;
    price : tez;
    balance : tez;
  }

type reviewers = ( address, tez ) big_map

type clients = ( address, unit ) big_map

type freelancers = ( address, unit ) big_map

type jobs = ( nat, job ) big_map

type storage = {
    admin : address;
    clients : clients;
    freelancers: freelancers;
    reviewers : reviewers;
    jobs : jobs;
  }