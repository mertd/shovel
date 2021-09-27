import { Code, useToast, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { Clipboard } from "react-feather";

interface CopyCodeProps extends React.ComponentPropsWithRef<"div"> {
  code: string;
}

/**
 * Display a line of code together with a button that allows for easy copying.
 */
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
    <div {...props}>
      <Code>{props.code}</Code>{" "}
      <Button
        size="xs"
        variant="outline"
        onClick={toClipboard}
        aria-label="copy"
      >
        <Icon as={Clipboard} />
      </Button>
    </div>
  );
}
