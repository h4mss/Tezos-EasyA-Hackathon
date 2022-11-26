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
  const [user, setUser] = useState("Client");
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
      <NavBar pageTitle={"Projects"} balance={2} wallet={"0xnfjrn....447"} />
      <NavContext.Provider value={{ screenName, setScreenName, user, setUser }}>
        {screenName == "Main" ? <MainScreen /> : null}
        {screenName == "Projects" ? <ProjectsScreen /> : null}
        {screenName == "Project" ? <ProjectScreen /> : null}
      </NavContext.Provider>
    </div>
  );
}

export default App;
