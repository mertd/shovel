import React from "react";
import A from "./A";
import { Heading, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

/**
 * Header for any page
 */
function Header(props: React.ComponentPropsWithRef<"header">) {
  return (
    <header {...props}>
      <Box pt="1rem" pb="1rem" pl="20vw" pr="20vw" bg="gray.100">
        <Heading size="xl">
          <Link to="/">Shovel</Link>
        </Heading>
        <Heading size="sm">
          Find <A href="https://scoop.sh">scoop</A> manifests instantly from the comfort of your browser
        </Heading>
        {props.children}
      </Box>
    </header>
  );
}

export default Header;
