import React, { useEffect } from "react";
import A from "./A";
import { Box, useToast } from "@chakra-ui/react";
import { version } from "../../package.json";

/**
 * Footer for any page
 */
function Footer(props: React.ComponentPropsWithRef<"footer">) {
  const toast = useToast();

  useEffect(() => {
    toast({
      status: "warning",
      title: "Archival Warning",
      duration: 10000,
      description: (
        <>
          The Scoop community chose an official web search. Please use it at{" "}
          <b>
            <a href="https://scoop.sh" target="_blank" rel="noreferrer">
              scoop.sh
            </a>
          </b>
          . Shovel will be archived and shut down after 2022. 🗄
        </>
      ),
    });
    // eslint-disable-next-line
  }, []);

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
