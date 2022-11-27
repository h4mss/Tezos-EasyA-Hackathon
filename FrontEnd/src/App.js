import { BeaconWallet } from "@taquito/beacon-wallet";
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
  const contractAddress = "KT1Hk4J1X5Q4Z1Q1X5Q4Z1Q1X5Q4Z1Q1X5Q4Z1Q1X5Q4Z";
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState({
    type: null,
    wallet: {
      address: null,
      balance: null,
    },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const taquito = new TezosToolkit("https://ghostnet.tezos.marigold.dev/");

  // handle get contract info
  const handleGetContractInfo = async () => {
    const contract = await taquito.contract.at(contractAddress);
    const storage = await contract.storage();
    console.log(storage);
  };

  // get contract
  const getContract = async () => {
    const contract = await taquito.contract.at(contractAddress);
    console.log(contract);
    setContract(contract);
  };

  // handle login with tezos wallet
  const handleLogin = async (asType = "Client") => {
    const options = {
      name: "MyAwesomeDapp",
      iconUrl: "https://tezostaquito.io/img/favicon.svg",
      preferredNetwork: "mainnet",
      disableDefaultEvents: false,
      appUrl: {
        desktop: "https://tezostaquito.io",
        mobile: "https://tezostaquito.io",
      },

      preferredNetwork: "https://ghostnet.tezos.marigold.dev/",
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
    const wallet = new BeaconWallet(options);
    if (wallet.client) {
      taquito.setWalletProvider(wallet);
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
      } else {
        await wallet.requestPermissions({
          network: {
            type: "ghostnet",
          },
        });
      }
    }
  };
  // handle logout
  const handleLogout = () => {
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
  // handle join project
  const handleJoinProject = async () => {
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
  // handle create project
  const handleCreateProject = async (projectName, projectDescription) => {
    const contract = await taquito.wallet.at("KT1Hg8v3P4GFgXB4bpu6hCsGKvFCvV5rPfHd");
    const op = await contract.methods.create(projectName, projectDescription).send();
    await op.confirmation();
    setScreenName("Projects");
  };
  // handle review project
  const handleReviewProject = async (review) => {
    const contract = await taquito.wallet.at(contractAddress);
    const op = await contract.methods.review(review).send();
    await op.confirmation();
    setScreenName("Projects");
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
        <NavContext.Provider value={{ screenName, setScreenName, user, setUser }}>
          {screenName === "Main" ? <MainScreen handleLogin={handleLogin} /> : null}
          {screenName === "Projects" ? <ProjectsScreen /> : null}
          {screenName === "Project" ? <ProjectScreen /> : null}
          {screenName === "Create" ? <CreateProjectScreen /> : null}
        </NavContext.Provider>
      </div>
    </>
  );
}

export default App;
