import React from "react";
import A from "./A";
import { Box } from "@chakra-ui/core";

function Footer(props) {
  return (
    <footer {...props}>
      <Box pt="2rem" pb="2rem" pl="20vw" pr="20vw" bg="white">
        Shovel is <A href="https://github.com/mertd/shovel">open source</A>.
        Your use of this app is governed by the{" "}
        <A href="https://github.com/mertd/shovel/blob/master/LICENCE">
          MIT Licence
        </A>
        .{props.children}
      </Box>
    </footer>
  );
}

export default Footer;
