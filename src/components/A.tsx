import { Link, LinkProps } from "@chakra-ui/react";
import React from "react";

function A(props: LinkProps) {
  return (
    <Link isExternal color="blue.600" {...props}>
      {props.children}
    </Link>
  );
}

export default A;
