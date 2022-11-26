import NavBar from "../components/NavBar.js";
import Picker from "../components/Picker.js";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

export default function MainScreen() {
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
      <NavBar />

      <div
        className="body"
        style={{
          padding: 20,
          flex: 1,
          flexDirection: "row",
          display: "flex",

          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <text style={{ fontSize: 45, fontWeight: fonts.Regular }}>
          Welcome.
          <br />
          Choose who to log in as:
        </text>
        <div>
          <Picker />
        </div>
      </div>
    </div>
  );
}
