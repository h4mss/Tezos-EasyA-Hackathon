// import Picker from "../components/Picker.js";

import colors from "../constants/colors";
import fonts from "../constants/fonts";

import React, { useContext, useState } from "react";
import { CloudDownload } from "react-bootstrap-icons";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

import { NavContext } from "../context";
export default function ProjectScreen({ title = "This is the project title", subtitle = "Subtitle", text = "No description", style }) {
  const { user } = useContext(NavContext);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isInReview, setIsInReview] = useState(false);

  const handleClick = () => {
    console.log("hui");
  };
  const handleBtnClick = () => {
    setIsReviewing(true);
  };
  const ReviewBtn = () => {
    if (user.type === "Reviewer") {
      if (isReviewing) {
        return (
          <div style={{ flexDirection: "row", display: "flex" }}>
            <button style={{ ...styles.mainBtn, ...{ marginRight: 15 } }} onClick={handleBtnClick}>
              <p style={styles.btnText}>Job complete</p>
            </button>
            <button style={{ ...styles.mainBtn, ...{ backgroundColor: colors.darkGrey } }} onClick={handleBtnClick}>
              <p style={styles.btnText}>Jop incomplete</p>
            </button>
          </div>
        );
      } else {
        return (
          <button style={styles.mainBtn} onClick={handleBtnClick}>
            <p style={styles.btnText}>Review</p>
          </button>
        );
      }
    } else {
      return <></>;
    }
  };
  const ReviewBar = () => {
    if (isInReview) {
      <div style={{ width: "100%", marginTop: 40 }}>
        <div style={{ display: "flex", flexDirecion: "row", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontWeight: "bold" }}>The projects is in review</h1>
          <h4>10 / 25 reviews</h4>
        </div>
        <ProgressBar color={colors.main} style={{ width: "100%", height: 15, borderRadius: 0, marginTop: 20 }} now={60} />
      </div>;
    } else {
      <></>;
    }
  };
  // returns project title, subtitle, description, and a button to join the project

  return (
    <div style={styles.container}>
      {ReviewBar()}
      <div style={{ display: "flex", marginTop: 70, justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", flex: 5, flexDirection: "column" }}>
          <h2 style={{ fontWeight: fonts.Bold }}>{title}</h2>

          <p style={{ marginRight: 250, marginTop: 30, fontSize: 20, lineHeight: 1.2, color: colors.darkGrey }}>{subtitle}</p>
          {subtitle === "Subtitle" ? <p>{text}</p> : null}
          <div style={{ flexDirection: "row", display: "flex", marginTop: 50 }}>
            <div style={{ marginRight: 15 }}>
              <p style={{ color: colors.darkGrey }}>Start date</p>
              <p>23 Nov 2022</p>
            </div>
            <div style={{ marginRight: 15 }}>
              <p style={{ color: colors.darkGrey }}>End date</p>
              <p>31 Dec 2022</p>
            </div>
            <div style={{ marginRight: 15 }}>
              <p style={{ color: colors.darkGrey }}>Freelancer</p>
              <p>John Doe</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
          <h5 style={{ fontWeight: "bold", marginBottom: 40 }}>Downloads</h5>
          <ListGroup as="ul">
            <ListGroup.Item
              style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}
              action
              // onClick={() => handleClick("Client")}
            >
              <text style={{ color: colors.black }}>Project Specification</text>
              <CloudDownload size={20} />
            </ListGroup.Item>
            <ListGroup.Item style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }} action>
              <text style={{ color: colors.black }}> Complete work</text>
              <CloudDownload size={20} />
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>

      {ReviewBtn()}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "flex-start",
    width: "80%",
  },
  mainBtn: {
    padding: 10,

    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 10,
    border: 0,
    backgroundColor: colors.main,
    marginTop: 70,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    color: colors.white,
  },
};
