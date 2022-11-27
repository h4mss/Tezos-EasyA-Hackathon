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