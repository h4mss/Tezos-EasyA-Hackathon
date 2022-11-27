// scrollable list of ProjectCard components
import React, { useContext } from "react";
import fonts from "../constants/fonts";
import { NavContext } from "../context";
import ProjectCard from "./projectCard";
export default function ProjectCardScroll({ title = "Project Title", subtitle = "Subtitle", text = "No description", style }) {
  const { setScreenName } = useContext(NavContext);
  let projects = [
    {
      title: "Project 1",
      subtitle: "Subtitle",
      text: "No description",
    },
    {
      title: "Project 2",
      subtitle: "Subtitle",
      text: "No description",
    },
  ];

  if (projects)
    return (
      <>
        <h2>{title}</h2>
        <div style={styles.container}>
          <div style={styles.scrollContainer}>
            <ProjectCard title="Project 1" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 2" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 3" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 4" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 5" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 6" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 6" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
            <ProjectCard title="Project 6" subtitle="Subtitle" text="No description" style={{ marginRight: 10, marginBottom: 10 }} />
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <text style={{ fontSize: 45, fontWeight: fonts.Regular }}>
          You don’t have any live
          <br />
          contracts at the moment.
        </text>
        <button style={styles.mainBtn} onClick={() => setScreenName("Create")}>
          <p style={styles.btnText}>Create a contract</p>
        </button>
      </>
    );
}
const styles = {
  container: { marginBottom: 50 },
  scrollContainer: {
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    overflowY: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
  },
};
