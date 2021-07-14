import React from "react";

function A(props: React.ComponentPropsWithRef<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {props.children}
    </a>
  );
}

export default A;
