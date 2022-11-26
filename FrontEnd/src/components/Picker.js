import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
// import { Navigate } from "react-router-dom";

export default function Picker({ screen = "2" }) {
  const handleClick = () => {
    window.open("../screens/ClientScreen.tsx");
    console.log(screen);
  };
  return (
    <ListGroup as="ul">
      <ListGroup.Item style={styles.card} action onClick={handleClick}>
        {/* <text style={{ fontWeight: fonts.Bold, color: colors.main }}>Client</text> */}
        {/* <Link to={{ pathname: "../screens/ClientScreen.tsx" }}>NavigateNow</Link> */}
      </ListGroup.Item>
      <ListGroup.Item style={styles.card} action onClick={handleClick}>
        <text style={{ fontWeight: fonts.Bold, color: colors.main }}>Freelancer</text>
      </ListGroup.Item>

      <ListGroup.Item style={styles.card} action onClick={handleClick}>
        <text style={{ fontWeight: fonts.Bold, color: colors.main }}>Rewiever</text>
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
