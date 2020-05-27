import React from "react";
import A from "./components/A";

function Footer(props) {
  return (
    <footer {...props}>
      Shovel is <A href="https://github.com/mertd/shovel">open source</A>. Your
      use of this app is governed by the{" "}
      <A href="https://github.com/mertd/shovel/blob/master/LICENCE">
        MIT Licence
      </A>
      .{props.children}
    </footer>
  );
}

export default Footer;
