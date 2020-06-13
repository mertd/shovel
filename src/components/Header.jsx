import React from "react";
import A from "./A";
import { Heading, Box } from "@chakra-ui/core";

function Header(props) {
  return (
    <header {...props}>
      <Box pt="1rem" pb="1rem" pl="20vw" pr="20vw" bg="gray.100">
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
