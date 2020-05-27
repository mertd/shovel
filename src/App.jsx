import React from "react";
import "./App.css";
import { ThemeProvider, Box } from "@chakra-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Box p="7rem" bg="gray.100" height="100%">
          <Header />
          <Main />
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
