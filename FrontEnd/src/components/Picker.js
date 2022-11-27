import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import { NavContext } from "../context";

export default function Picker({ handleLogin }) {
  const { setScreenName, user, setUser } = useContext(NavContext);
  return (
    <ListGroup as="ul">
      <ListGroup.Item style={{ ...styles.card, ...{ backgroundColor: colors.main } }} action onClick={() => handleLogin("Client")}>
        <text style={{ fontWeight: fonts.Bold, color: colors.white }}>Client</text>
      </ListGroup.Item>
      <ListGroup.Item style={styles.card} action onClick={() => handleLogin("Freelancer")}>
        <p style={{ fontWeight: fonts.Bold, color: colors.main }}>Freelancer</p>
      </ListGroup.Item>

      <ListGroup.Item style={styles.card} action onClick={() => handleLogin("Reviewer")}>
        <p style={{ fontWeight: fonts.Bold, color: colors.main }}>Reviewer</p>
      </ListGroup.Item>
    </ListGroup>
  );
}

const styles = {
  card: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 80,
    paddingRight: 80,
    alignItems: "center",
    fontWidth: fonts.Bold,
    justifyContent: "center",
    display: "flex",
  },
};
