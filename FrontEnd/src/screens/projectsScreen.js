import NavBar from "../components/NavBar.js";
// import Picker from "../components/Picker.js";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

export default function ProjectsScreen() {
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

      <div
        style={{
          padding: 20,
          flex: 1,
          flexDirection: "column",
          display: "flex",

          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <text style={{ fontSize: 45, fontWeight: fonts.Regular }}>
          You don’t have any live
          <br />
          contracts at the moment.
        </text>
        <div></div>
      </div>
    </div>
  );
}
