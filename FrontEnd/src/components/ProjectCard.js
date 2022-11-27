import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { NavContext } from "../context";
export default function ProjectCard({ project, style }) {
  const { setScreenName, setProject } = useContext(NavContext);
  return (
    <Card onClick={() => [setProject(project), setScreenName("Project")]} style={{ ...styles.container, ...style }}>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Subtitle</Card.Subtitle>
        <Card.Text>{project.description}</Card.Text>
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
