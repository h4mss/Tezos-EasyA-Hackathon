// import Picker from "../components/Picker.js";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import { NavContext } from "../context.js";

export default function CreateProjectScreen({ createProject }) {
  const { setScreenName } = useContext(NavContext);

  const handleCreateProject = async () => {
    await createProject();
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: colors.background,
        alignItems: "flex-start",
        display: "flex",
        width: "80%",
      }}
    >
      {/* //style={styles.bodyContainer} */}
      <div>
        <h1 style={{ fontWeight: fonts.Bold, marginTop: 70 }}>New project</h1>
        <div style={{ marginTop: 70 }}>
          {/* <h3>Project name</h3>
          <input type="text" name="name" placeholder="Paceholder" style={styles.textInput} />
          <h3>Project description</h3>
          <input type="text" name="name" placeholder="Paceholder" style={styles.textInput} />
          <h3>Documents</h3>
          <input type="text" name="name" placeholder="Paceholder" style={styles.textInput} />
        </div>
        <button style={styles.mainBtn}>
          <p style={styles.btnText}>Create a contract</p>
        </button> */}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: 700 }}>Project name</Form.Label>
              <Form.Control size="lg" type="email" placeholder="Placeholder" />
            </Form.Group>
            <Form.Group className="mb-3" style={{ marginTop: 20 }} controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ fontWeight: 700 }}>Project description</Form.Label>
              <Form.Control size="lg" as="textarea" rows={3} placeholder="Write your message here" />
            </Form.Group>
            <Form.Group className="mb-3" style={{ marginTop: 20 }} controlId="exampleForm.ControlTextarea1">
              <div style={{ flexDirection: "column", display: "flex" }}>
                <Form.Label style={{ fontWeight: 700 }}>Documents</Form.Label>
                <Form.Label style={{ color: colors.darkGrey, marginTop: -6 }}>Upload a hash string for each document</Form.Label>
              </div>
              <Form.Control size="lg" type="email" placeholder="Placeholder" />
            </Form.Group>
          </Form>
          <button style={styles.mainBtn} onClick={() => handleCreateProject()}>
            <p style={styles.btnText}>Create a contract</p>
          </button>
        </div>
      </div>
    </div>
  );
}
const styles = {
  bodyContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    width: "80%",
  },
  textInput: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 10,
    width: "200px",
  },
  mainBtn: {
    padding: 15,

    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 10,
    border: 0,
    backgroundColor: colors.main,
    marginTop: 70,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  btnText: { color: colors.white, alignItems: "center", justifyContent: "center", paddingTop: 10, fontWeight: fonts.Bold, fontSize: 26 },
};
