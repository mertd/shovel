import React from "react";
import A from "./components/A";

function Header(props) {
  return (
    <header {...props}>
      <h1>Shovel</h1>
      <h4>
        Search apps installable via <A href="https://scoop.sh">scoop</A>
      </h4>
      {props.children}
    </header>
  );
}

export default Header;
