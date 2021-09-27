import React from "react";
import Search from "./Search";
import { Box } from "@chakra-ui/react";

/**
 * Container for search components
 */
function Main(props: React.ComponentPropsWithRef<"main">) {
  return (
    <main {...props}>
      <Box pt="1rem" pb="1rem" pl="20vw" pr="20vw" bg="gray.100">
        <Search />
        {props.children}
      </Box>
    </main>
  );
}

export default Main;
