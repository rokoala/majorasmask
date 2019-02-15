import React, { Component } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SetupFace from "./components/SetupFace";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCut, faMask } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

library.add(faCut, faMask);

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
