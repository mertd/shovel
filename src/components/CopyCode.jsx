import { Code, Icon, Button } from "@chakra-ui/core";
import React from "react";

export default function CopyCode({ code }) {
  return (
    <div>
      <Code>{code}</Code>
      <Button
        size="xs"
        variant="outline"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        <Icon name="copy" />
      </Button>
    </div>
  );
}
