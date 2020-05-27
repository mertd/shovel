import React from "react";
import Search from "./views/Search";

function Main(props) {
  return (
    <main {...props}>
      <Search />
      {props.children}
    </main>
  );
}

export default Main;
