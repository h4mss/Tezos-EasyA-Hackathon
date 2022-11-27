import ProjectCardScroll from "../components/ProjectCardScroll.js";
import fonts from "../constants/fonts.js";
import { useContext } from "react";
import { NavContext } from "../context.js";
import colors from "../constants/colors.js";
// import Picker from "../components/Picker.js";

export default function ProjectsScreen() {
  const { user } = useContext(NavContext);
  const { setScreenName } = useContext(NavContext);
  return (
    <div
      style={{
        padding: 20,
        flex: 1,
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "80%",
      }}
    >
      <div style={{ marginTop: 100 }}>
        <text style={{ fontSize: 45, fontWeight: fonts.Regular }}>
          You don’t have any live
          <br />
          contracts at the moment.
        </text>
        <button style={styles.mainBtn} onClick={() => setScreenName("Create")}>
          <p style={styles.btnText}>Create a contract</p>
        </button>
      </div>
      {user.type === "Reviewer" && ProjectCardScroll({ title: "Projects to review", subtitle: "Subtitle", description: "No description" })}

      {ProjectCardScroll({ title: "Previous projects", subtitle: "Subtitle", description: "No description" })}
    </div>
  );
}
const styles = {
  mainBtn: {
    padding: 15,

    paddingLeft: 70,
    paddingRight: 70,
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
