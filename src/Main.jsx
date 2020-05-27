import React from "react";
import Search from "./views/Search";
import { Box } from "@chakra-ui/core";

function Main(props) {
  return (
    <main {...props}>
      <Box>
        <Search />
        {props.children}
      </Box>
    </main>
  );
}

export default Main;
