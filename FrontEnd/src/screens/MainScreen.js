import Picker from "../components/Picker.js";
import fonts from "../constants/fonts";

export default function MainScreen({ handleLogin }) {
  return (
    <div
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
      <p style={{ fontSize: 45, fontWeight: fonts.Regular }}>
        Welcome.
        <br />
        Choose whom to log in as:
      </p>
      <div>
        <Picker handleLogin={handleLogin} />
      </div>
    </div>
  );
}
