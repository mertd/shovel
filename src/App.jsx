import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
