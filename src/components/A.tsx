import React from "react";

function A(props: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" >
      {props.children}
    </a>
  );
}

export default A;
