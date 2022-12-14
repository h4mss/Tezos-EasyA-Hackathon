// scrollable list of ProjectCard components
import React, { useContext } from "react";
import fonts from "../constants/fonts";
import { NavContext } from "../context";
import ProjectCard from "./ProjectCard";
import { liveProjects } from "../constants/liveProjects";
import { previousProjects } from "../constants/previousProjects";

export default function ProjectCardScroll({ title = "Project Title", subtitle = "Subtitle", text = "No description", style }) {
  const { setScreenName } = useContext(NavContext);

  const liveProjectCards = () => {
    return liveProjects.map((item) => <ProjectCard project={item} style={{ marginRight: 10, marginBottom: 10 }} />);
  };
  const previousProjectsCards = () => {
    return previousProjects.map((item) => <ProjectCard project={item} style={{ marginRight: 10, marginBottom: 10 }} />);
  };
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
        <h2 style={{ marginTop: 80, marginBottom: 45 }}>{title}</h2>
        <div style={styles.container}>
          <div style={styles.scrollContainer}>{title == "Previous projects" ? previousProjectsCards() : liveProjectCards()}</div>
        </div>
      </>
    );
  else
    return (
      <>
        <p style={{ fontSize: 45, fontWeight: fonts.Regular }}>
          You don’t have any live
          <br />
          contracts at the moment.
        </p>
        <button style={styles.mainBtn} onClick={() => setScreenName("Create")}>
          <p style={styles.btnText}>Create a contract</p>
        </button>
      </>
    );
}
const styles = {
  // container: { marginBottom: 50 },
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
