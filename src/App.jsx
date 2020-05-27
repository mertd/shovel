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
        <Box pt="5rem" pb="5rem" pl="20vw" pr="20vw" bg="gray.100">
          <Header />
          <Main />
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
