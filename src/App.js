import React, { Component } from "react";
import Welcome from "./components/Welcome";
import SetupFace from "./components/SetupFace/SetupFace2";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome />
      </div>
    );
  }
}

export default App;
