import logo from "./logo.svg";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavContext } from "../src/context";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import colors from "./constants/colors";
import NavBar from "./components/NavBar.js";
import fonts from "./constants/fonts";
import Picker from "./components/Picker.js";
import ClientScreen from "./screens/ClientScreen.js";
import MainScreen from "./screens/MainScreen.js";

function App() {
  const [screenName, setScreenName] = useState("Main");
  return (
    <NavContext.Provider value={{ screenName, setScreenName }}>
      {screenName == "Main" ? <MainScreen /> : null}
      {screenName == "Client" ? <ClientScreen /> : null}
    </NavContext.Provider>
  );
}

export default App;
