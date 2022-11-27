// import Picker from "../components/Picker.js";

import colors from "../constants/colors";

export default function ProjectScreen({ title = "Project Title", subtitle = "Subtitle", text = "No description", style }) {
  // returns project title, subtitle, description, and a button to join the project

  return (
    <div
      style={{
        padding: 20,
        flex: 1,
        flexDirection: "column",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{text}</p>
      <button style={styles.mainBtn}>
        <p style={styles.btnText}>Join</p>
      </button>
    </div>
  );
}

const styles = {
  mainBtn: {
    backgroundColor: colors.main,
    borderRadius: 10,
    width: 200,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
};
