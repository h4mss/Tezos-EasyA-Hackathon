import React from "react";
import colors from "../constants/colors";

export default function NavBar({ pageTitle, balance, wallet }) {
  return (
    <div style={styles.container}>
      <div>
        <a style={{ fontWeight: 800, marginLeft: 50, textDecoration: "none", color: colors.black }} href="../App.js">
          Unbia5
        </a>
        <text style={{ marginLeft: 12 }}>{pageTitle}</text>
      </div>
      {wallet ? (
        <div style={styles.wallet}>
          <text style={{ color: colors.white }}>{wallet}</text>
          <div style={{ flexDirection: "row", display: "flex", marginLeft: 50, alignItems: "center" }}>
            <text style={{ color: colors.white }}>Balance:</text>
            <div style={styles.balance}>
              <text style={{ color: colors.main }}>{balance}</text>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
const styles = {
  container: {
    width: "80%",
    // height: 50,
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
  wallet: {
    backgroundColor: colors.main,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
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