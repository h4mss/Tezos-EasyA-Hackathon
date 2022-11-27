import ProjectCardScroll from "../components/projectCardScroll.js";
// import Picker from "../components/Picker.js";

export default function ProjectsScreen() {
  return (
    <div
      style={{
        padding: 20,
        flex: 1,
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      {ProjectCardScroll({ title: "Live projects", subtitle: "Subtitle", description: "No description" })}
      {ProjectCardScroll({ title: "Previous projects", subtitle: "Subtitle", description: "No description" })}
    </div>
  );
}
