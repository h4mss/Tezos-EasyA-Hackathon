import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { NavContext } from "../src/context";
import MainScreen from "./screens/MainScreen.js";
import ProjectsScreen from "./screens/ProjectsScreen.js";

function App() {
  const [screenName, setScreenName] = useState("Main");
  return (
    <NavContext.Provider value={{ screenName, setScreenName }}>
      {screenName == "Main" ? <MainScreen /> : null}
      {screenName == "Client" ? <ProjectsScreen /> : null}
    </NavContext.Provider>
  );
}

export default App;
