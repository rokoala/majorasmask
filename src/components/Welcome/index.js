import React, { PureComponent } from "react";
import MajorasMask from "../../resources/majoras.png";

const WelcomeStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center"
};

export default class Welcome extends PureComponent {
  render() {
    return (
      <div style={WelcomeStyle}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img width="300" src={MajorasMask} />
          <h2>MajorasMask</h2>
          <p>Create your own masks</p>
        </div>
      </div>
    );
  }
}
