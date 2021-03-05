import React from "react";
import "./App.css";
import { ThemeProvider } from "@chakra-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { ManifestsProvider } from "./contexts/ManifestsContext";
import Manifest from "./components/Manifest";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ManifestsProvider>
          <Header />
          <Router>
            <Switch>
              <Route path="/search">
                <Main />
              </Route>
              <Route
                path="/manifest/:name"
                render={(props) => <Manifest name={props.match.params.name} />}
              />
              <Route path="*">
                <Redirect to="/search" />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </ManifestsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
