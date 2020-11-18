import { Code, Icon, Button, useToast } from "@chakra-ui/core";
import React from "react";

export default function CopyCode({ code }) {
  const toast = useToast();

  async function toClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        status: "success",
        title: "Copied",
        description: "You can paste this into your terminal now.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description:
          "Copying to clipboard may not be supported in your browser.",
        duration: 3000,
      });
    }
  }

  return (
    <div>
      <Code>{code}</Code>
      <Button size="xs" variant="outline" onClick={toClipboard}>
        <Icon name="copy" />
      </Button>
    </div>
  );
}
