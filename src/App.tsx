import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
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
      <ChakraProvider>
        <ManifestsProvider>
          <Router>
            <Header />
            <Switch>
              <Route path="/search">
                <Main />
              </Route>
              <Route
                path="/bucket/:bucket/manifest/:name"
                render={(props) => (
                  <Manifest
                    name={props.match.params.name}
                    bucket={props.match.params.bucket}
                  />
                )}
              />
              <Route path="*">
                <Redirect to="/search" />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </ManifestsProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
