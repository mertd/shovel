import React from "react";
import Props from "../types/Props";

interface AProps extends Props {
  href: string;
}

function A(props: AProps) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" >
      {props.children}
    </a>
  );
}

export default A;
