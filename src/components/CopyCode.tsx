import { Code, useToast, IconButton } from "@chakra-ui/core";
import React from "react";

interface CopyCodeProps {
  code: string;
}

export default function CopyCode(props: CopyCodeProps) {
  const toast = useToast();

  async function toClipboard() {
    try {
      await navigator.clipboard.writeText(props.code);
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
      <Code>{props.code}</Code>{" "}
      <IconButton
        size="xs"
        variant="outline"
        onClick={toClipboard}
        icon="copy"
        aria-label="copy"
      />
    </div>
  );
}
