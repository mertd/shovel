import React from "react";
import A from "./A";
import { Box } from "@chakra-ui/react";
import { version } from "../../package.json";

/**
 * Footer for any page
 */
function Footer(props: React.ComponentPropsWithRef<"footer">) {
  return (
    <footer {...props}>
      <Box pt="2rem" pb="2rem" pl="20vw" pr="20vw" bg="white">
        Shovel v{version} is{" "}
        <A href="https://github.com/mertd/shovel">open source</A>. Your use of
        this app is governed by the{" "}
        <A href="https://github.com/mertd/shovel/blob/master/LICENCE">
          MIT Licence
        </A>
        .{props.children}
      </Box>
    </footer>
  );
}

export default Footer;
