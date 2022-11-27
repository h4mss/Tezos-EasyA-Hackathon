import { BeaconWallet } from "@taquito/beacon-wallet";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import BalanceModal from "./components/BalanceModal";
import NavBar from "./components/NavBar.js";
import { NavContext } from "./context";
import CreateProjectScreen from "./screens/CreateProjectScreen.js";
import MainScreen from "./screens/MainScreen.js";
import ProjectScreen from "./screens/ProjectScreen.js";
import ProjectsScreen from "./screens/ProjectsScreen.js";

function App() {
  const [screenName, setScreenName] = useState("Main");
  const contractAddress = "KT19LrhoJUJWExVXxS7i2csauS8qj26kPZkk";
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState({
    type: null,
    wallet: {
      address: null,
      balance: null,
    },
  });
  const [project, setProject] = useState({
    id: "5f9f1b0b-8b1e-4b5e-8f9f-1b0b8b1e4b5e",
    name: "Project 1",
    description: "This is a description of project 1",
    is_in_review: false,
    ok: 0,
    not_ok: 0,
    client_approved: false,
    documents: [
      {
        id: "5f9f1b0b-8b1e-4b5e-8f9f-1b0b8b1e4b5e",
        name: "Document 1",
        hash: "0x5f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e",
      },
      {
        id: "5f9f1b0b-8b1e-4b5e-8f9f-1b0b8b1e4b5e",
        name: "Document 2",
        hash: "0x5f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e8f9f1b0b8b1e4b5e",
      },
    ],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const taquito = new TezosToolkit("https://ghostnet.ecadinfra.com");

  const getContractStorage = async (contractAddress) => {
    const contract = await taquito.contract.at(contractAddress);
    const storage = await contract.storage();
    console.log(storage);
    return storage;
  };

  const getContract = async (contractAddress) => {
    const contract = await taquito.contract.at(contractAddress);
    setContract(contract);
    console.log(contract);
    return contract;
  };

  // handle login with tezos wallet
  const walletOptions = {
    name: "MyAwesomeDapp",
    iconUrl: "https://tezostaquito.io/img/favicon.svg",
    preferredNetwork: "mainnet",
    disableDefaultEvents: false,
    appUrl: {
      desktop: "https://tezostaquito.io",
      mobile: "https://tezostaquito.io",
    },

    preferredNetwork: "https://ghostnet.ecadinfra.com",
    eventHandlers: {
      PERMISSION_REQUEST_SUCCESS: {
        handler: async (data) => {
          console.log("permission data:", data);
        },
      },
      OPERATION_REQUEST_SUCCESS: {
        handler: async (data) => {
          console.log("operation data:", data);
        },
      },
      OPERATION_REQUEST_ERROR: {
        handler: async (data) => {
          console.log("operation error:", data);
        },
      },
    },
  };
  const handleLogin = async (asType = "Client") => {
    const wallet = new BeaconWallet(walletOptions);
    taquito.setWalletProvider(wallet);
    taquito.setProvider({ signer: await InMemorySigner.fromSecretKey("edskRx5k2PVyGgnKj1U1uoBkSoKxtrXBwr4cNLPvLaaSoiVji4F4QMmFSuS7LxukAqYVCbxeFTg6goA5o4Yu35zxGJE2jgPJi7") });
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const accountPkh = await wallet.getPKH();
      const accountBalance = await taquito.tz.getBalance(accountPkh);
      setUser({
        type: asType,
        wallet: {
          address: accountPkh,
          balance: accountBalance.toNumber(),
        },
      });

      setIsLoggedIn(true);
      setScreenName("Projects");

      // get contract
      await addUserToContract(asType, contractAddress, accountPkh);
    }
  };
  // handle add client to contract
  const addUserToContract = async (type, contractAddress, userAddress) => {
    try {
      const contract = await getContract(contractAddress);
      let op = null;
      if (type === "Client") {
        op = await contract.methods.addClient(userAddress).send();
      } else if (type === "Freelancer") {
        op = await contract.methods.addFreelancer(userAddress).send();
      } else if (type === "Reviewer") {
        op = await contract.methods.addReviewer(userAddress).send();
      }
      await op.confirmation();
      console.log("user added to contract", op.hash);
      console.log("Operation injected: https://better-call.dev/ghostnet/" + op.hash);
    } catch (error) {
      console.log(error);
    }
  };

  // handle logout
  const handleLogout = () => {
    const wallet = new BeaconWallet(walletOptions);
    wallet.clearActiveAccount();

    setUser({
      type: null,
      wallet: {
        address: null,
        balance: null,
      },
    });
    setIsLoggedIn(false);
    setScreenName("Main");
  };

  const joinProject = async () => {
    const contract = await taquito.wallet.at(contractAddress);
    const op = await contract.methods.join().send();
    await op.confirmation();
    const accountBalance = await taquito.tz.getBalance(user.wallet.address);
    setUser({
      ...user,
      wallet: {
        ...user.wallet,
        balance: accountBalance.toNumber(),
      },
    });
    setScreenName("Projects");
  };

  const createProject = async () => {
    try {
      taquito.setProvider({ signer: await InMemorySigner.fromSecretKey("edskRx5k2PVyGgnKj1U1uoBkSoKxtrXBwr4cNLPvLaaSoiVji4F4QMmFSuS7LxukAqYVCbxeFTg6goA5o4Yu35zxGJE2jgPJi7") });
      const id = Math.floor(Math.random() * 10000) + 1;
      let price = 100;
      const contract = await getContract(contractAddress);

      // send tokens, then createJob (BATCH)
      const op = await contract.methods.createJob(1, price).send({ amount: price * 1.1 });
      await op.confirmation();
      setScreenName("Projects");
    } catch (error) {
      console.log(error);
    }
  };

  const reviewProject = async (id) => {
    try {
      const contract = await taquito.wallet.at(contractAddress);
      const op = await contract.methods.reviewJob(id).send();
      await op.confirmation();
      setScreenName("Projects");
    } catch (error) {
      console.log(error);
    }
  };
  // handle deposit
  const handleDeposit = async (amount) => {
    const op = await taquito.contract.transfer({ to: contractAddress, amount: parseInt(amount) });
    await op.confirmation();
    const accountBalance = await taquito.tz.getBalance(user.wallet.address);
    setUser({
      ...user,
      wallet: {
        ...user.wallet,
        balance: accountBalance.toNumber(),
      },
    });
    setBalanceModalVisible(false);
  };

  return (
    <>
      <BalanceModal user={user} balanceModalVisible={balanceModalVisible} setBalanceModalVisible={setBalanceModalVisible} handleDeposit={handleDeposit} />
      <div
        className="App"
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
          flex: 1,
        }}
      >
        <NavBar user={user} isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} setBalanceModalVisible={setBalanceModalVisible} />
        <NavContext.Provider value={{ screenName, setScreenName, user, setUser, project, setProject }}>
          {screenName === "Main" ? <MainScreen handleLogin={handleLogin} /> : null}
          {screenName === "Projects" ? <ProjectsScreen /> : null}
          {screenName === "Project" ? <ProjectScreen project={project} reviewProject={reviewProject} /> : null}
          {screenName === "Create" ? <CreateProjectScreen createProject={createProject} /> : null}
        </NavContext.Provider>
      </div>
    </>
  );
}

export default App;
