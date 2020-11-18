import React from "react";
import { Box, Tag, Divider, Heading, Icon, Text } from "@chakra-ui/core";
import A from "../A";
import CopyCode from "../CopyCode";

function SearchResult(props) {
  const result = props.result;
  return (
    <Box
      borderWidth="1px"
      bg="white"
      shadow="md"
      rounded="md"
      p="1rem"
      {...props}
    >
      <Heading size="sm">
        {result.item.name}{" "}
        <A href={result.item.homepage} title="Homepage">
          <Icon name="external-link" />
        </A>{" "}
        {result.item.checkver && result.item.checkver.github && (
          <A href={result.item.checkver.github} title="Source Code">
            <Icon name="edit" />
          </A>
        )}
      </Heading>
      <Divider />
      <Tag>{result.item.version}</Tag> <Tag>{result.item.bucket}</Tag>
      <Text>{result.item.description}</Text>
      <p hidden={result.item.bucket === "main"}>
        <CopyCode>scoop bucket add {result.item.bucket}</CopyCode>
      </p>
      <p>
        <CopyCode>scoop install {result.item.name}</CopyCode>
      </p>
      {props.children}
    </Box>
  );
}

export default SearchResult;
