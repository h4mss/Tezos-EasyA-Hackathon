import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { NavContext } from "../context";
export default function ProjectCard({ title = "Project Title", subtitle = "Subtitle", text = "No description", style }) {
  const { setScreenName } = useContext(NavContext);
  return (
    <Card onClick={() => [setScreenName("Project")]} style={{ ...styles.container, ...style }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
const styles = {
  container: {
    minWidth: 200,
    flex: 1,
    height: 160,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
};
