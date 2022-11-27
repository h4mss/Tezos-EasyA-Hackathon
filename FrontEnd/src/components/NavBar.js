import { ArrowBarRight } from "react-bootstrap-icons";
import colors from "../constants/colors";

export default function NavBar({ user, isLoggedIn, handleLogin, setBalanceModalVisible, handleLogout }) {
  return (
    <div style={styles.container}>
      <div style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={styles.logo}>
          <text style={{ fontWeight: "bold", lineHeight: 1, color: colors.white }}>U</text>
        </div>
        <a style={{ fontWeight: 800, marginLeft: 5, textDecoration: "none", color: colors.black }} href="../App.js">
          Unbia5
        </a>
        <text style={{ marginLeft: 12 }}>{user.type}</text>
      </div>
      {isLoggedIn ? (
        <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
          <div style={styles.wallet} onClick={() => setBalanceModalVisible(true)}>
            <text style={{ color: colors.white }}>{user.wallet.address}</text>
            <div style={{ flexDirection: "row", display: "flex", marginLeft: 50, alignItems: "center" }}>
              <text style={{ color: colors.white }}>Balance:</text>
              <div style={styles.balance}>
                <text style={{ color: colors.main }}>{user.wallet.balance / 1000000}</text>
              </div>
            </div>
          </div>
          <div onClick={handleLogout}>
            <ArrowBarRight color={colors.main} size={25} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
const styles = {
  container: {
    width: "80%",
    height: 45,

    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: colors.lighterGrey,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    marginTop: 30,
    paddingRight: 5,
  },
  logo: {
    backgroundColor: colors.main,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 5,
    marginLeft: 10,
    paddingRight: 7,
    paddingLeft: 7,
  },
  wallet: {
    backgroundColor: colors.main,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  balance: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 5,
    marginLeft: 5,
    maxHeight: 20,

    alignItems: "center",
    display: "flex",
  },
};
