import { Code } from "@chakra-ui/core";
import React from "react";

export default function CopyCode({ children: code }) {
  return (
    <div>
      <Code>{code}</Code>
    </div>
  );
}
