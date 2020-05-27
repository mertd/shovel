import React from "react";
import A from "./components/A";
import { Heading, Box } from "@chakra-ui/core";

function Header(props) {
  return (
    <header {...props}>
      <Box>
        <Heading size="xl">Shovel</Heading>
        <Heading size="sm">
          Search apps installable via <A href="https://scoop.sh">scoop</A>
        </Heading>
        {props.children}
      </Box>
    </header>
  );
}

export default Header;
