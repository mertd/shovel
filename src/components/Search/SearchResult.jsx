import React from "react";
import { Box, Tag, Code, Divider, Heading, Icon, Text } from "@chakra-ui/core";
import A from "../A";

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
        <A href={result.item.homepage}>
          <Icon name="external-link" title="Homepage" />
        </A>{" "}
        {result.item.checkver.github && (
          <A href={result.item.checkver.github}>
            <Icon name="edit" title="Source Code" />
          </A>
        )}
      </Heading>
      <Divider />
      <Tag>{result.item.version}</Tag> <Tag>{result.item.bucket}</Tag>
      <Text>{result.item.description}</Text>
      <Code>scoop install {result.item.name}</Code>
      {props.children}
    </Box>
  );
}

export default SearchResult;
