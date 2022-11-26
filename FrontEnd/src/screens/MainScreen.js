import Picker from "../components/Picker.js";
import fonts from "../constants/fonts";

export default function MainScreen() {
  return (
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
  );
}
