import React, { Component } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SetupFace from "./components/SetupFace/SetupFace2";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Welcome} />
            <Route path="/create" exact={true} component={SetupFace} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
