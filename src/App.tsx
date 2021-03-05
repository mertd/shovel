import React from "react";
import "./App.css";
import { ThemeProvider } from "@chakra-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ManifestsProvider } from "./contexts/ManifestsContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ManifestsProvider>
          <Router>
            <Route path="/search">
              <Header />
              <Main />
            </Route>
            <Route path="*">
              <Redirect to="/search" />
            </Route>
          </Router>
          <Footer />
        </ManifestsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
