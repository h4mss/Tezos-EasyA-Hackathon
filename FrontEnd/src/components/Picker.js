import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import { NavContext } from "../context";
// import { Navigate } from "react-router-dom";

export default function Picker({ screen = "2" }) {
  const { setScreenName, setUser } = useContext(NavContext);
  const handleClick = (entity) => {
    setScreenName("Projects");
    setUser(entity);
    // window.open("../screens/ProjectsScreen.tsx");
  };
  return (
    <ListGroup as="ul">
      <ListGroup.Item style={styles.card} action onClick={() => handleClick("Client")}>
        <text style={{ fontWeight: fonts.Bold, color: colors.main }}>Client</text>
      </ListGroup.Item>
      <ListGroup.Item style={styles.card} action onClick={() => handleClick("Freelancer")}>
        <p style={{ fontWeight: fonts.Bold, color: colors.main }}>Freelancer</p>
      </ListGroup.Item>

      <ListGroup.Item style={styles.card} action onClick={() => handleClick("Client")}>
        <p style={{ fontWeight: fonts.Bold, color: colors.main }}>Rewiever</p>
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
  },
};
