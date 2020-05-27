import React from "react";
import A from "./components/A";
import { Heading } from "@chakra-ui/core";

function Header(props) {
  return (
    <header {...props}>
      <Heading size="xl">Shovel</Heading>
      <Heading size="sm">
        Search apps installable via <A href="https://scoop.sh">scoop</A>
      </Heading>
      {props.children}
    </header>
  );
}

export default Header;
