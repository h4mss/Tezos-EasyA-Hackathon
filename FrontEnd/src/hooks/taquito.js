// taqito hooks
import { TezosToolkit } from "@taquito/taquito";
import { useState } from "react";

export const useTezos = () => {
  const [tezos, setTezos] = useState(new TezosToolkit("https://ghostnet.ecadinfra.com"));
  return tezos;
};

export const useAccount = () => {
  const [account, setAccount] = useState(null);
  return account;
};

export const useBalance = () => {
  const [balance, setBalance] = useState(0);
  return balance;
};

export const useContract = () => {
  const [contract, setContract] = useState(null);
  return contract;
};

export const useStorage = () => {
  const [storage, setStorage] = useState(null);
  return storage;
};

export const useContractAddress = () => {
  const [contractAddress, setContractAddress] = useState(null);
  return contractAddress;
};

export const useContractName = () => {
  const [contractName, setContractName] = useState(null);
  return contractName;
};
