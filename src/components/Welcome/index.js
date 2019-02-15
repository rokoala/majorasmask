import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import MajorasMask from "../../resources/majoras.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WelcomeStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center"
};

const ButtonStyle = {
  fontSize: 30,
  backgroundColor: "white",
  border: "1px solid lightgray",
  borderRadius: 10,
  cursor: "pointer"
};

export default class Welcome extends PureComponent {
  render() {
    return (
      <div style={WelcomeStyle}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img width="300" src={MajorasMask} />
          <h2>MajorasMask</h2>
          <p>Make your own Masks</p>
          <Link to="/create">
            <button style={ButtonStyle}>
              <FontAwesomeIcon icon="mask" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
