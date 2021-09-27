import { Link } from "@chakra-ui/react";
import React from "react";

function A(props: React.ComponentPropsWithRef<"a">) {
  return (
    <Link target="_blank" rel="noopener noreferrer" color="blue.600" {...props}>
      {props.children}
    </Link>
  );
}

export default A;
