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
      <NavBar pageTitle={"Client"} balance={2} wallet={"0xnfjrn....447"} />

      <div style={styles.bodyContainer}>
        <text style={{ fontSize: 55, fontWeight: fonts.Regular, marginTop: 100 }}>
          You don’t have any live
          <br />
          contracts at the moment.
        </text>
        <button style={styles.mainBtn}>
          <p style={styles.btnText}>Create a contract</p>
        </button>
      </div>
    </div>
  );
}
const styles = {
  bodyContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    width: "80%",
  },
  mainBtn: {
    padding: 20,

    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 10,
    border: 0,
    backgroundColor: colors.main,
    marginTop: 70,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  btnText: { color: colors.white, alignItems: "center", justifyContent: "center", paddingTop: 10, fontWeight: fonts.Bold, fontSize: 26 },
};
