import { Code, useToast, IconButton } from "@chakra-ui/core";
import React from "react";

export default function CopyCode({ code }) {
  const toast = useToast();

  async function toClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        status: "success",
        title: "Copied",
        description: "You can paste the command into your terminal now 📋",
        duration: 3000,
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: "Copying to clipboard is not supported in your browser 📵",
        duration: 3000,
      });
    }
  }

  return (
    <div>
      <Code>{code}</Code>{" "}
      <IconButton
        size="xs"
        variant="outline"
        onClick={toClipboard}
        icon="copy"
      />
    </div>
  );
}
