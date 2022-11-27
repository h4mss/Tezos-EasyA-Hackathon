import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import colors from "./constants/colors";
import { NavContext } from "./context";
import MainScreen from "./screens/MainScreen.js";
import ProjectScreen from "./screens/ProjectScreen.js";
import ProjectsScreen from "./screens/ProjectsScreen.js";
function App() {
  const [screenName, setScreenName] = useState("Main");
  const [user, setUser] = useState({
    type: null,
    wallet: {
      address: null,
      balance: null,
    },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const taquito = new TezosToolkit("https://ghostnet.tezos.marigold.dev/");

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

  return (
    <div
      className="App"
      style={{
        backgroundColor: colors.background,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flex: 1,
      }}
    >
      <NavBar user={user} isLoggedIn={isLoggedIn} balance={2} wallet={"0xnfjrn....447"} handleLogin={handleLogin} />
      <NavContext.Provider value={{ screenName, setScreenName, user, setUser }}>
        {screenName === "Main" ? <MainScreen handleLogin={handleLogin} /> : null}
        {screenName === "Projects" ? <ProjectsScreen /> : null}
        {screenName === "Project" ? <ProjectScreen /> : null}
      </NavContext.Provider>
    </div>
  );
}

export default App;
