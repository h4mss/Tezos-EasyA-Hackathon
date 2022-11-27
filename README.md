# Tezos-EasyA-Hackathon


## Deploying Smart Contract on Ghostnet

<b>Enter these commands in the terminal:<\b>
newby@noobs:~/projects/tezos/Tezos-EasyA-Hackathon/BackEnd$ ligo compile contract job-contract.mligo
newby@noobs:~/projects/tezos/Tezos-EasyA-Hackathon/BackEnd$ ligo compile storage job-contract.mligo initial_storage > job-contract-storage.tz
newby@noobs:~/projects/tezos/Tezos-EasyA-Hackathon/BackEnd$ tezos-client -E https://ghostnet-archive.tzconnect.berlin originate contract job-contract-1 transferring 0 from foo running job-contract.tz --init "`cat job-contract-storage.tz`" --burn-cap 1
